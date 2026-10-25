# Pure-Python geometry and mechanics solvers for the book model (no bpy).
# All quantities are SI: metres, newtons. 2D points are (u, v) tuples, v up.
import math


# ---------- 2D vector helpers ----------
def add(a, b): return (a[0] + b[0], a[1] + b[1])
def sub(a, b): return (a[0] - b[0], a[1] - b[1])
def mul(a, k): return (a[0] * k, a[1] * k)
def dot(a, b): return a[0] * b[0] + a[1] * b[1]
def cross(a, b): return a[0] * b[1] - a[1] * b[0]
def norm(a): return math.hypot(a[0], a[1])
def unit(a):
    n = norm(a)
    return (a[0] / n, a[1] / n) if n > 0 else (1.0, 0.0)
def rot(a, ang):
    c, s = math.cos(ang), math.sin(ang)
    return (a[0] * c - a[1] * s, a[0] * s + a[1] * c)
def rot_about(p, centre, ang): return add(centre, rot(sub(p, centre), ang))
def ccw(a): return (-a[1], a[0])
def cw(a): return (a[1], -a[0])
def angle(a): return math.atan2(a[1], a[0])
def wrap(a): return (a + math.pi) % (2 * math.pi) - math.pi


# ---------- polylines ----------
def polyline_length(pts):
    return sum(norm(sub(pts[i + 1], pts[i])) for i in range(len(pts) - 1))


def cumulative(pts):
    out = [0.0]
    for i in range(len(pts) - 1):
        out.append(out[-1] + norm(sub(pts[i + 1], pts[i])))
    return out


def point_at(pts, s, cum=None):
    """Point and unit tangent at arc length s along a polyline (clamped)."""
    cum = cum or cumulative(pts)
    s = min(max(s, 0.0), cum[-1])
    for i in range(len(pts) - 1):
        if cum[i + 1] >= s or i == len(pts) - 2:
            seg = cum[i + 1] - cum[i]
            k = (s - cum[i]) / seg if seg > 0 else 0.0
            return add(pts[i], mul(sub(pts[i + 1], pts[i]), k)), unit(sub(pts[i + 1], pts[i]))
    return pts[-1], unit(sub(pts[-1], pts[-2]))


def resample_by_length(pts, n):
    cum = cumulative(pts)
    return [point_at(pts, cum[-1] * i / (n - 1), cum)[0] for i in range(n)]


def resample_graded(pts, n, power=1.8):
    """n points along the polyline, packed toward its start (s_i ~ (i/(n-1))^power)."""
    cum = cumulative(pts)
    return [point_at(pts, cum[-1] * (i / (n - 1)) ** power, cum)[0] for i in range(n)]


def nearest_on(pts, p, with_param=False):
    """Nearest point on polyline, with the tangent of that segment."""
    best = None
    for i in range(len(pts) - 1):
        a, b = pts[i], pts[i + 1]
        ab = sub(b, a)
        l2 = dot(ab, ab)
        k = 0.0 if l2 == 0 else min(max(dot(sub(p, a), ab) / l2, 0.0), 1.0)
        c = add(a, mul(ab, k))
        d = norm(sub(p, c))
        if best is None or d < best[0]:
            best = (d, c, unit(ab), i + k)
    if with_param:
        return best[1], best[2], best[3] / (len(pts) - 1)
    return best[1], best[2]


# ---------- cubic Hermite with fixed arc length (clamped-strip approximation) ----------
def hermite(p0, t0, p1, t1, h, n):
    m0, m1 = mul(t0, h), mul(t1, h)
    out = []
    for i in range(n):
        s = i / (n - 1)
        h00, h10 = 2 * s**3 - 3 * s**2 + 1, s**3 - 2 * s**2 + s
        h01, h11 = -2 * s**3 + 3 * s**2, s**3 - s**2
        out.append((h00 * p0[0] + h10 * m0[0] + h01 * p1[0] + h11 * m1[0],
                    h00 * p0[1] + h10 * m0[1] + h01 * p1[1] + h11 * m1[1]))
    return out


def hermite_fixed_length(p0, t0, p1, t1, L, n=97):
    """Hermite curve with unit end tangents t0, t1 whose arc length is L.
    Returns (points, ok). ok is False when the chord is longer than L."""
    chord = norm(sub(p1, p0))
    lo, hi = 1e-6, max(4.0 * L, 1e-4)
    f = lambda h: polyline_length(hermite(p0, t0, p1, t1, h, n)) - L
    if f(lo) > 0:
        return hermite(p0, t0, p1, t1, lo, n), chord <= L
    while f(hi) < 0 and hi < 50 * L:
        hi *= 2
    for _ in range(60):
        mid = 0.5 * (lo + hi)
        if f(mid) > 0:
            hi = mid
        else:
            lo = mid
    return hermite(p0, t0, p1, t1, 0.5 * (lo + hi), n), True


def clamped_elastica(p0, t0, p1, t1, L, n=48, guess=None, iters=30):
    """Weightless inextensible strip of length L clamped at both ends (positions and
    unit tangents): minimise the bending energy sum((phi_i - phi_(i-1))^2) over the n
    segment angles phi, subject to reaching p1. Newton on the Lagrangian.
    Returns (points, angles, ok)."""
    h = L / n
    a0, a1 = angle(t0), angle(t1)
    a1 = a0 + wrap(a1 - a0)
    if guess is None:
        pts, _ = hermite_fixed_length(p0, t0, p1, t1, L, n=4 * n + 1)
        pts = resample_by_length(pts, n + 1)
        phi, prev = [], a0
        for i in range(n):
            ang = prev + wrap(angle(sub(pts[i + 1], pts[i])) - prev)
            phi.append(ang)
            prev = ang
    else:
        phi = list(guess)
    lam = [0.0, 0.0]
    dx, dy = p1[0] - p0[0], p1[1] - p0[1]
    ok = False
    for _ in range(iters):
        ext = [a0] + phi + [a1]
        F = []
        for i in range(n):
            g = 2 * (ext[i + 1] - ext[i]) - 2 * (ext[i + 2] - ext[i + 1])
            g += -lam[0] * h * math.sin(phi[i]) + lam[1] * h * math.cos(phi[i])
            F.append(g)
        F.append(sum(h * math.cos(p) for p in phi) - dx)
        F.append(sum(h * math.sin(p) for p in phi) - dy)
        if math.sqrt(sum(v * v for v in F)) < 1e-12:
            ok = True
            break
        N = n + 2
        J = [[0.0] * N for _ in range(N)]
        for i in range(n):
            J[i][i] = 4 - lam[0] * h * math.cos(phi[i]) - lam[1] * h * math.sin(phi[i])
            if i > 0:
                J[i][i - 1] = -2
            if i < n - 1:
                J[i][i + 1] = -2
            J[i][n] = -h * math.sin(phi[i])
            J[i][n + 1] = h * math.cos(phi[i])
            J[n][i] = -h * math.sin(phi[i])
            J[n + 1][i] = h * math.cos(phi[i])
        try:
            step = _solve_linear(J, [-v for v in F])
        except ZeroDivisionError:
            break
        phi = [phi[i] + step[i] for i in range(n)]
        lam = [lam[0] + step[n], lam[1] + step[n + 1]]
    else:
        ok = math.sqrt(sum(v * v for v in F)) < 1e-9
    pts = [p0]
    for p in phi:
        pts.append(add(pts[-1], (h * math.cos(p), h * math.sin(p))))
    return pts, phi, ok


# ---------- heavy elastica ----------
def rk4_elastica(p0, th0, N0, M0, s_end, D, q, g_hat, steps):
    """Integrate a planar inextensible heavy rod from s=0 to s_end.
    State: x, y, theta, M.  N(s) = N0 - q*g_hat*s is the force the part beyond s
    exerts on the part before s (load per length f = q*g_hat, dN/ds = -f).
    dM/ds = -(t x N), M = D*dtheta/ds."""
    gx, gy = g_hat

    def f(s, st):
        x, y, th, M = st
        Nx, Ny = N0[0] - q * gx * s, N0[1] - q * gy * s
        c, sn = math.cos(th), math.sin(th)
        return (c, sn, M / D, -(c * Ny - sn * Nx))

    h = s_end / steps
    st = (p0[0], p0[1], th0, M0)
    pts = [p0]
    s = 0.0
    for _ in range(steps):
        k1 = f(s, st)
        k2 = f(s + h / 2, tuple(st[i] + h / 2 * k1[i] for i in range(4)))
        k3 = f(s + h / 2, tuple(st[i] + h / 2 * k2[i] for i in range(4)))
        k4 = f(s + h, tuple(st[i] + h * k3[i] for i in range(4)))
        st = tuple(st[i] + h / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]) for i in range(4))
        s += h
        pts.append((st[0], st[1]))
    Nend = (N0[0] - q * gx * s_end, N0[1] - q * gy * s_end)
    return pts, st, Nend


def _solve_linear(A, b):
    n = len(b)
    M = [list(A[i]) + [b[i]] for i in range(n)]
    for c in range(n):
        p = max(range(c, n), key=lambda r: abs(M[r][c]))
        if abs(M[p][c]) < 1e-14:
            raise ZeroDivisionError
        M[c], M[p] = M[p], M[c]
        for r in range(n):
            if r != c:
                k = M[r][c] / M[c][c]
                for j in range(c, n + 1):
                    M[r][j] -= k * M[c][j]
    return [M[i][n] / M[i][i] for i in range(n)]


def solve_leaf(p0, t0, Q, d, L, D, q, g_hat=(0.0, -1.0), guess=None, steps=40, tol=1e-7, max_iter=40):
    """Leaf clamped at p0 with start tangent t0, resting tangentially on the support
    line through Q with direction d (toward the fore-edge), total length L.

    Unknowns (scaled): N0x, N0y, M0, s*.  Conditions at touchdown s*:
      on the line, tangent == d, M == 0, and the tangential force carries the weight of
      the lying part (frictionless support): N(s*).d == q*(L - s*)*(g_hat.d).
    Returns dict(points, s_star, ok, x) where points is the whole leaf (free + lying)."""
    lg = (D / q) ** (1.0 / 3.0)
    Fs, Ms = q * lg, q * lg * lg
    th0, thd = angle(t0), angle(d)
    gd = dot(g_hat, d)

    def unpack(x):
        return (x[0] * Fs, x[1] * Fs), x[2] * Ms, x[3] * lg

    def residual(x):
        N0, M0, s_star = unpack(x)
        if s_star <= 1e-5 or s_star >= L:
            return None, None
        pts, st, Nend = rk4_elastica(p0, th0, N0, M0, s_star, D, q, g_hat, steps)
        p = (st[0], st[1])
        r = [cross(sub(p, Q), d) / lg,
             wrap(st[2] - thd),
             st[3] / Ms,
             (dot(Nend, d) - q * (L - s_star) * gd) / Fs]
        return r, pts

    # Initial guess from the geometry.
    if guess is None:
        dist = abs(cross(sub(p0, Q), d))
        s0 = max(1.5 * dist + 0.004 * abs(wrap(thd - th0)), 0.002)
        s0 = min(s0, 0.5 * L)
        tgt = q * (L - s0) * gd
        Nend = mul(d, tgt)
        N0 = (Nend[0] + q * g_hat[0] * s0, Nend[1] + q * g_hat[1] * s0)
        M0 = D * wrap(thd - th0) / s0
        guess = [N0[0] / Fs, N0[1] / Fs, M0 / Ms, s0 / lg]

    x = list(guess)
    r, pts = residual(x)
    ok = False
    if r is not None:
        for _ in range(max_iter):
            nr = math.sqrt(sum(v * v for v in r))
            if nr < tol:
                ok = True
                break
            J = [[0.0] * 4 for _ in range(4)]
            for j in range(4):
                hstep = 1e-6 * max(1.0, abs(x[j]))
                xp = list(x)
                xp[j] += hstep
                rp, _ = residual(xp)
                if rp is None:
                    xp[j] -= 2 * hstep
                    rp, _ = residual(xp)
                    hstep = -hstep
                if rp is None:
                    break
                for i in range(4):
                    J[i][j] = (rp[i] - r[i]) / hstep
            try:
                dx = _solve_linear(J, [-v for v in r])
            except ZeroDivisionError:
                break
            lam, accepted = 1.0, False
            while lam > 1e-4:
                xn = [x[i] + lam * dx[i] for i in range(4)]
                rn, pn = residual(xn)
                if rn is not None and math.sqrt(sum(v * v for v in rn)) < nr:
                    x, r, pts, accepted = xn, rn, pn, True
                    break
                lam *= 0.5
            if not accepted:
                break
        else:
            ok = math.sqrt(sum(v * v for v in r)) < tol

    if not ok:
        # Fallback: clamped Hermite from the fold to a touchdown point on the line.
        proj = add(Q, mul(d, dot(sub(p0, Q), d)))
        dist = norm(sub(p0, proj))
        T = add(proj, mul(d, max(2.0 * dist, 0.003)))
        pts = hermite(p0, t0, T, d, max(norm(sub(T, p0)), 1e-4), steps + 1)
        s_star = polyline_length(pts)
        x = None
    else:
        s_star = unpack(x)[2]
    rest = max(L - polyline_length(pts), 0.0)
    T, td = pts[-1], d
    pts = list(pts) + [add(T, mul(td, rest))]
    return {"points": pts, "s_star": s_star, "ok": ok, "x": x}


def nelder_mead(f, x0, step, iters=120, tol=1e-12):
    n = len(x0)
    simplex = [list(x0)]
    for i in range(n):
        x = list(x0)
        x[i] += step[i]
        simplex.append(x)
    vals = [f(x) for x in simplex]
    for _ in range(iters):
        order = sorted(range(n + 1), key=lambda i: vals[i])
        simplex = [simplex[i] for i in order]
        vals = [vals[i] for i in order]
        if abs(vals[-1] - vals[0]) <= tol * (abs(vals[0]) + 1e-30):
            break
        c = [sum(simplex[i][j] for i in range(n)) / n for j in range(n)]
        xr = [c[j] + (c[j] - simplex[-1][j]) for j in range(n)]
        fr = f(xr)
        if fr < vals[0]:
            xe = [c[j] + 2 * (c[j] - simplex[-1][j]) for j in range(n)]
            fe = f(xe)
            simplex[-1], vals[-1] = (xe, fe) if fe < fr else (xr, fr)
        elif fr < vals[-2]:
            simplex[-1], vals[-1] = xr, fr
        else:
            xc = [c[j] + 0.5 * (simplex[-1][j] - c[j]) for j in range(n)]
            fc = f(xc)
            if fc < vals[-1]:
                simplex[-1], vals[-1] = xc, fc
            else:
                for i in range(1, n + 1):
                    simplex[i] = [simplex[0][j] + 0.5 * (simplex[i][j] - simplex[0][j]) for j in range(n)]
                    vals[i] = f(simplex[i])
    i = min(range(n + 1), key=lambda k: vals[k])
    return simplex[i], vals[i]


def floor_lookup(below, Q, d, nrm, gap, bin_w=0.00025):
    """Turn the leaf below into a fast floor h_min(a) in the support's (a, h) coordinates."""
    ah = [(dot(sub(p, Q), d), dot(sub(p, Q), nrm)) for p in below]
    dense = []
    for i in range(len(ah) - 1):
        (a0, h0), (a1, h1) = ah[i], ah[i + 1]
        k = max(1, int(abs(a1 - a0) / bin_w) + 1)
        dense += [(a0 + (a1 - a0) * j / k, h0 + (h1 - h0) * j / k) for j in range(k)]
    dense.append(ah[-1])
    amin = min(a for a, _ in dense)
    amax = max(a for a, _ in dense)
    nb = int((amax - amin) / bin_w) + 2
    bins = [None] * nb
    for a, h in dense:
        i = int((a - amin) / bin_w)
        bins[i] = h if bins[i] is None else max(bins[i], h)
    last = None
    for i in range(nb):
        if bins[i] is None:
            bins[i] = last
        last = bins[i]
    return amin, bin_w, bins, gap


def leaf_energy_solve(p0, t0, Q, d, side, L, D, q, g_hat=(0.0, -1.0), p_close=0.0,
                      guess=None, n=40, below=None, gap=0.0, a_support=-1.0, wall=None, after=None, prior=0.1):
    """Minimum potential energy shape of a leaf clamped at p0 (tangent t0) that comes
    to rest tangentially on the support line (Q, d); `side` (+1/-1) is the support's
    free side (ccw/cw normal of d).

    Energy = bending  D/2 * sum(kappa^2 ds)
           + gravity  q * sum(height ds)            (free part + lying part)
           + contact  p_n * sum(distance-to-support ds), p_n = q*|g.n| + p_close
           + a stiff penalty for points on the wrong side of the support.
    Below a_support (along d from Q) the leaf may still wrap the shoulder.
    The free part is a cubic Hermite with parameters (a, h0, h1): touchdown distance
    along d past p0's projection, and the two handle lengths."""
    nrm = ccw(d) if side > 0 else cw(d)
    proj = add(Q, mul(d, dot(sub(p0, Q), d)))
    p_n = p_close          # external pressure only; the leaf's own weight is in e_g
    up = mul(g_hat, -1.0)
    # The leaf below (offset by `gap`) cannot be penetrated.
    fl = floor_lookup(below, Q, d, nrm, gap) if below else None

    def curve(x):
        la, k0, k1 = x
        a = math.exp(la)
        T = add(proj, mul(d, a))
        c = norm(sub(T, p0))                     # handles scale with the chord
        return _hermite2(p0, t0, k0 * c, T, d, k1 * c, n)

    def energy(x):
        la, k0, k1 = x
        if la < math.log(2e-4) or min(k0, k1) < 0.2 or max(k0, k1) > 1.5:
            return 1e9      # below 0.2 the end kinks hide between samples; above 1.5 it loops
        pts = curve(x)
        free = 0.0
        e_b = e_g = e_c = pen = 0.0
        for i in range(n - 1):
            seg = sub(pts[i + 1], pts[i])
            ds = norm(seg)
            free += ds
            mid = mul(add(pts[i], pts[i + 1]), 0.5)
            e_g += q * dot(mid, up) * ds
            dist = dot(sub(mid, Q), nrm)
            e_c += p_n * abs(dist) * ds
            if wall is not None and mid[1] > wall[0][1]:
                w = dot(sub(mid, wall[0]), wall[1])
                if w < 0:
                    pen += w * w * ds            # stays in its own half of the book
            if dist < 0 and dot(sub(mid, Q), d) > a_support:
                pen += dist * dist * ds          # above the shoulder: never below its support
            if fl is not None:
                amin, bw, bins, gp = fl
                bi = int((dot(sub(mid, Q), d) - amin) / bw)
                if 0 <= bi < len(bins):
                    lim = bins[bi] + gp
                    if dist < lim:
                        pen += (lim - dist) ** 2 * ds
            if i > 0:
                prev = sub(pts[i], pts[i - 1])
                ang = wrap(angle(seg) - angle(prev))
                dsm = 0.5 * (ds + norm(prev))
                if dsm > 0:
                    e_b += 0.5 * D * (ang / dsm) ** 2 * dsm
        if free > L:
            return 1e3 * (1.0 + free - L)        # too long: steer back smoothly
        rest = L - free
        T = pts[-1]
        e_g += q * rest * dot(add(T, mul(d, rest / 2)), up)
        if after is not None:
            lag = dot(sub(after, T), d)          # touchdown may not precede the leaf below
            if lag > 0:
                pen += lag * lag * 1e-3
        return e_b + e_g + e_c + 1e11 * pen

    # Detachment length of a plate pressed by p onto a plane (linear theory):
    # p*l^4/(24D) - theta*l - 3*h0 = 0, with theta the fold's lift-off angle and h0 its
    # height above the support. It anchors the touchdown so the solve cannot jump to a
    # different branch from one leaf to the next.
    h0 = dot(sub(p0, Q), nrm)
    theta = max(math.atan2(dot(t0, nrm), max(dot(t0, d), 1e-6)), 0.05)
    p_eff = max(p_close + q * abs(dot(g_hat, nrm)), 1e-6)
    f = lambda l: p_eff * l ** 4 / (24 * D) - theta * l - 3 * h0
    lo, hi = 1e-5, 10.0
    for _ in range(80):
        mid = 0.5 * (lo + hi)
        lo, hi = (mid, hi) if f(mid) < 0 else (lo, mid)
    ell = 0.5 * (lo + hi)
    a_star = min(max(math.sqrt(max(ell * ell - h0 * h0, 0.0)), 0.002), 0.9 * L)
    la_star = math.log(a_star)
    energy0 = energy
    energy = lambda x: energy0(x) + prior * (x[0] - la_star) ** 2
    if guess is None:
        guess = [la_star, 0.6, 0.6]
    best, e = nelder_mead(energy, guess, [0.5, 0.2, 0.2], iters=200)
    # One restart from the best point shakes Nelder-Mead out of shallow stalls.
    best, e = nelder_mead(energy, best, [0.25, 0.1, 0.1], iters=120)
    pts = curve(best)
    free = polyline_length(pts)
    pts = pts + [add(pts[-1], mul(d, max(L - free, 0.0)))]
    return {"points": pts, "x": best, "free_len": free, "energy": e, "efun": energy, "ell": ell,
            "curve": curve, "touchdown": pts[-2]}


def to_graph(pts, O, d, nrm):
    """Leaf as a height function over the half's shared support frame: sorted (a, h)
    pairs, a along d from O, h along nrm. Points that double back in a are dropped."""
    g = []
    for p in pts:
        a, h = dot(sub(p, O), d), dot(sub(p, O), nrm)
        if not g or a > g[-1][0] + 1e-9:
            g.append((a, h))
    return g


def graph_eval(g, a):
    """Height of graph g at a, or None outside its domain."""
    if a < g[0][0] or a > g[-1][0]:
        return None
    lo, hi = 0, len(g) - 1
    while hi - lo > 1:
        mid = (lo + hi) // 2
        if g[mid][0] <= a:
            lo = mid
        else:
            hi = mid
    (a0, h0), (a1, h1) = g[lo], g[hi]
    k = (a - a0) / (a1 - a0) if a1 > a0 else 0.0
    return h0 + (h1 - h0) * k


def rest_on(pts, below_g, gap, O, d, nrm):
    """Contact with the leaf below: lift every point (except the fold end) so that it
    stays at least `gap` above the graph of the leaf below. Returns (points, min sep)."""
    out, sep = [pts[0]], 1.0
    for p in pts[1:]:
        a, h = dot(sub(p, O), d), dot(sub(p, O), nrm)
        hb = graph_eval(below_g, a)
        if hb is not None:
            sep = min(sep, h - hb)
            if h < hb + gap:
                p = add(p, mul(nrm, hb + gap - h))
        out.append(p)
    return out, sep


def clamp_wall(pts, wall):
    """Keep points above the wall's base height on the wall's free side."""
    (Pc, nc), out = wall, [pts[0]]
    for p in pts[1:]:
        if p[1] > Pc[1]:
            w = dot(sub(p, Pc), nc)
            if w < 0:
                p = add(p, mul(nc, -w))
        out.append(p)
    return out


def _hermite2(p0, t0, h0, p1, t1, h1, n):
    m0, m1 = mul(t0, h0), mul(t1, h1)
    out = []
    for i in range(n):
        s = i / (n - 1)
        a, b = 2 * s**3 - 3 * s**2 + 1, s**3 - 2 * s**2 + s
        c, e = -2 * s**3 + 3 * s**2, s**3 - s**2
        out.append((a * p0[0] + b * m0[0] + c * p1[0] + e * m1[0],
                    a * p0[1] + b * m0[1] + c * p1[1] + e * m1[1]))
    return out


def enforce_length(pts, L, d):
    """Make the polyline length exactly L: extend the lying part along d, or cut the
    curve at length L when the free part alone is already longer."""
    free = polyline_length(pts[:-1])
    pts = list(pts)
    if free <= L:
        pts[-1] = add(pts[-2], mul(d, L - free))
        return pts
    cum = cumulative(pts[:-1])
    p, tng = point_at(pts[:-1], L, cum)
    keep = [pts[i] for i in range(len(cum)) if cum[i] < L]
    return keep + [p, add(p, mul(tng, 1e-6))]


def project_out_of(pts, below, gap, side, n_free, start=1):
    """Push points start..n_free-1 of pts to stay at least `gap` from polyline `below`,
    on the side given by `side` (+1: ccw normal of below's tangent, -1: cw)."""
    out = list(pts)
    for i in range(start, min(n_free, len(pts))):
        c, tng, u = nearest_on(below, out[i], True)
        if u <= 0.0 or u >= 1.0:
            continue                             # beyond the leaf below: no contact

        nrm = ccw(tng) if side > 0 else cw(tng)
        dist = dot(sub(out[i], c), nrm)
        if dist < gap:
            out[i] = add(out[i], mul(nrm, gap - dist))
    return out


def catenary_drop(length, drop, n):
    """Simple hanging path: returns (horizontal, vertical-down) offsets for a strip of
    `length` hanging from an edge, bending over a small radius, then lying on the floor."""
    r = min(0.008, max(drop, 1e-4) * 0.5)
    arc = math.pi / 2 * r
    pts = []
    for i in range(6):
        a = (math.pi / 2) * i / 5
        pts.append((r * math.sin(a), r * (1 - math.cos(a))))
    remaining = max(length - arc, 0.0)
    vertical = min(remaining, max(drop - r, 0.0))
    pts.append((r, r + vertical))
    floor = max(remaining - vertical, 0.0)
    pts.append((r + floor, r + vertical))
    return pts
