# Book mechanism: solves every cross-section for one opening angle (pure Python).
# Cross-section plane coordinates (u, v): u across the book, v up. The spine is at the
# bottom; the two halves open upward into a V. Height runs along a third axis (Blender Y).
import math
from solvers import (add, sub, mul, dot, norm, unit, rot, rot_about, ccw, cw, angle, wrap,
                     polyline_length, cumulative, point_at, resample_by_length, resample_graded,
                     nearest_on, hermite, hermite_fixed_length, clamped_elastica, leaf_energy_solve,
                     project_out_of, enforce_length, catenary_drop,
                     to_graph, rest_on, clamp_wall)

PARAMS = {
    "block_w": 0.150, "block_h": 0.230, "pages": 320, "pages_per_sig": 16, "ppi": 400,
    "grammage": 0.080, "E_cd": 2.5e9,            # kg/m^2, Pa (cross-direction, approximate)
    "board_t": 0.0025, "square": 0.003, "cover_t": 0.0004, "endpaper_gap": 0.00066,   # turn-in + pastedown + flyleaf
    "turn_in": 0.015, "round_arc_deg": 120.0, "case_gap": 0.001, "stiffener_t": 0.0005,
    "lining_t": 0.0003, "tube_t": 0.00015, "mull_flange": 0.030,
    "open_at_page": 168, "open_total_deg": 90.0,
    "p_close_q": 1000.0,                         # closing pressure, in multiples of leaf weight q
    "endband_d": 0.003, "thread_r": 0.00012, "kettle_in": 0.012,
    "set_radius": 0.0015,
    "hinge_drop": 0.0035,                        # joint-groove pivot, spineward of the shoulder                        # shoulder bend set in by backing
    "ribbon_w": 0.006, "ribbon_t": 0.0003, "ribbon_extra": 0.060,
    "frame_start": 1, "frame_end": 120, "sample_every": 4,
}


def derive(P):
    Dv = dict(P)
    t = 0.0254 * 2 / P["ppi"]
    leaves = P["pages"] // 2
    lps = P["pages_per_sig"] // 2
    q = P["grammage"] * 9.81
    D = P["E_cd"] * t ** 3 / 12
    half = leaves * t / 2
    yb = half + P["endpaper_gap"] + P["board_t"]
    arc = math.radians(P["round_arc_deg"])
    R = yb / math.sin(arc / 2)
    Dv.update(t=t, leaves=leaves, lps=lps, sheets=lps // 2, sigs=leaves // lps, q=q, D=D,
              lg=(D / q) ** (1 / 3), half=half, yb=yb, arc=arc, R=R, cv=R * math.cos(arc / 2),
              S=R * arc, sh_x=0.003, x1=P["block_w"] + P["square"],
              board_h=P["block_h"] + 2 * P["square"], L=P["block_w"],
              n_left=P["open_at_page"] // 2)
    Dv["x_pd"] = -(half + P["endpaper_gap"]) + P["cover_t"] + t   # pastedown top (left, closed)
    return Dv


def alpha_at(frame, P):
    """Opening angle (radians) between the halves at a frame."""
    full = math.radians(P["open_total_deg"])
    f = frame
    if f <= 10:
        return 0.0
    if f <= 100:
        x = (f - 10) / 90
        return full * (x ** 3 * (x * (6 * x - 15) + 10))
    return full + math.radians(1.5) * math.sin(math.pi * (f - 100) / 10) * math.exp(-(f - 100) / 8)


def sample_frames(P):
    fr = list(range(P["frame_start"], P["frame_end"] - 2, P["sample_every"]))
    if fr[-1] != P["frame_end"]:
        fr.append(P["frame_end"])
    return fr


def leaf_order(Dv):
    """Leaves in book order: (sig, sheet, side) with side 'f' (front) or 'b' (back)."""
    out = []
    for k in range(Dv["sigs"]):
        out += [(k, s, "f") for s in range(Dv["sheets"])]
        out += [(k, s, "b") for s in reversed(range(Dv["sheets"]))]
    return out


def pose(alpha, Dv, warm=None):
    t, yb, S, q, D, L = Dv["t"], Dv["yb"], Dv["S"], Dv["q"], Dv["D"], Dv["L"]
    half, e, ct = Dv["half"], Dv["endpaper_gap"], Dv["cover_t"]
    beta = alpha / 2
    # Boards pivot in the joint grooves, where the covering leaves the rigid case spine.
    # That axis lies outside and below the shoulder, so opening swings the shoulders
    # apart and lets the spine strip flatten.
    Rcov = Dv["R"] + Dv["case_gap"] + Dv["stiffener_t"] + ct / 2
    AL = (-Rcov * math.cos(math.radians(30)), Dv["cv"] - Rcov * math.sin(math.radians(30)))
    AR = (-AL[0], AL[1])
    TL = lambda p: rot_about(p, AL, beta)
    TR = lambda p: rot_about(p, AR, -beta)
    JL, JR = TL((-yb, 0.0)), TR((yb, 0.0))                 # shoulder tips
    TLv = lambda v: rot(v, beta)
    TRv = lambda v: rot(v, -beta)
    g_hat = (0.0, -1.0)
    warm = warm or {}
    new_warm = {}
    out = {"alpha": alpha, "beta": beta}

    # --- spine strip (linings + folds): inextensible, clamped at the shoulders ---
    tL0 = (math.sin(math.radians(30)), -math.cos(math.radians(30)))   # (0.5, -0.866)
    tR0 = (math.sin(math.radians(30)), math.cos(math.radians(30)))    # (0.5,  0.866)
    dL, dR = TLv((0.0, 1.0)), TRv((0.0, 1.0))
    centre = (0.0, Dv["cv"])
    r_max = Dv["R"] + Dv["case_gap"] - Dv["lining_t"] - Dv["tube_t"]

    def build_strip(lift):
        a, b = add(JL, mul(dL, lift)), add(JR, mul(dR, lift))
        pts, phi, ok = clamped_elastica(a, TLv(tL0), b, TRv(tR0), S, n=48, guess=warm.get("strip"))
        new_warm["strip"] = phi
        return resample_by_length(pts, 97), ok

    def penetration(st):
        return max(norm(sub(p, centre)) - r_max for p in st[8:-8])

    # Contact with the case spine: if the strip would press into the tube, the case
    # pushes back and both block halves ride up their boards by the smallest lift.
    lift = 0.0
    strip, strip_ok = build_strip(0.0)
    if penetration(strip) > 0:
        lo, hi = 0.0, 0.008
        for _ in range(30):
            mid = 0.5 * (lo + hi)
            if penetration(build_strip(mid)[0]) > 0:
                lo = mid
            else:
                hi = mid
        lift = hi
        strip, strip_ok = build_strip(lift)
    cum = cumulative(strip)
    strip0 = resample_by_length(clamped_elastica((-yb, 0.0), tL0, (yb, 0.0), tR0, S, n=48)[0], 97)
    cum0 = cumulative(strip0)
    out["strip"] = strip
    out["lift"] = lift

    def strip_at(s):
        p, tng = point_at(strip, s, cum)
        return p, tng, ccw(tng)          # normal toward the pages

    # --- closing pressure: the case squeezes the block shut, released by ~30 degrees ---
    x = min(max(alpha / math.radians(30), 0.0), 1.0)
    p_close = Dv["p_close_q"] * q * (1 - x * x * (3 - 2 * x))

    # --- leaves ---
    order = leaf_order(Dv)
    m = 0.0008
    sheets = Dv["sheets"]
    r0 = (sheets - 0.5) * t

    def start_of(kind):
        """Fold-side start point, start tangent, and U-prefix points for a leaf."""
        if kind[0] == "fly":
            s = m * 0.5 if kind[1] == "L" else S - m * 0.5
            F, tau, n = strip_at(s)
            r = 0.5 * t
            C = add(F, mul(n, r))
            sgn = -1 if kind[1] == "L" else 1
        else:
            k, sh, side = kind
            s = m + (S - 2 * m) * (k + 0.5) / Dv["sigs"]
            F, tau, n = strip_at(s)
            C = add(F, mul(n, r0))
            r = (sheets - 0.5 - sh) * t
            sgn = -1 if side == "f" else 1
        U = [sub(C, add(mul(n, r * math.cos(ph)), mul(tau, -sgn * r * math.sin(ph))))
             for ph in [math.pi / 2 * i / 4 for i in range(5)]]
        # Backing set the leaf's turn from the fold to the closed stack direction (0, 1).
        # That set shape rides with its fold: rotate it by how far this piece of spine
        # has turned since the book was closed.
        delta = wrap(angle(tau) - angle(point_at(strip0, s, cum0)[1]))
        t_set = rot((0.0, 1.0), delta)
        phi = wrap(angle(t_set) - angle(n))
        P = U[-1]
        if abs(phi) > 1e-3:
            sg = 1.0 if phi > 0 else -1.0
            rho = Dv["set_radius"] + sgn * r * sg        # nested sheets keep their order
            cc = add(P, mul(ccw(n), rho * sg))
            arc = [rot_about(P, cc, phi * i / 6) for i in range(7)]
        else:
            arc = [add(P, mul(n, 0.0002 * i / 6)) for i in range(7)]   # same vertex count
        U = U[:-1] + arc[:-1]
        return arc[-1], t_set, U, C

    halves = {"L": [("fly", "L")] + order[:Dv["n_left"]],
              "R": [("fly", "R")] + list(reversed(order[Dv["n_left"]:]))}
    leaves_out = {}
    sep_min = 1.0
    # The opened signature's centre fold divides the two halves.
    k_open = Dv["n_left"] // Dv["lps"]
    C_open = start_of((k_open, sheets - 1, "f"))[3]
    for hname, items in halves.items():
        T, Tv, side = (TL, TLv, -1) if hname == "L" else (TR, TRv, 1)
        sign_u = -1 if hname == "L" else 1
        x_pd = Dv["x_pd"] if hname == "L" else -Dv["x_pd"]
        d = Tv((0.0, 1.0))
        nrm = ccw(d) if side > 0 else cw(d)
        n_items = len(items)
        # 1) Each leaf on its own: bending + gravity + the weight of the leaves above
        #    pressing it onto its place in the stack (plus the case's closing pressure).
        solved = []
        prev_x = prev_T = None
        for j, kind in enumerate(items):
            p0, t0, U, C = start_of(kind)
            line_u = x_pd - sign_u * (j + 0.5) * t
            Q = add(T((line_u, 0.0)), mul(d, lift))
            n_above = n_items - 1 - j
            p_ext = q * abs(dot(g_hat, nrm)) * n_above + p_close
            # The facing top pages meet in the gutter at the opened fold; leaf j stays
            # behind them by the thickness of the leaves above it.
            wall = ((C_open[0] - sign_u * (2.5 - n_above) * t, C_open[1]), (float(sign_u), 0.0))
            key = str(kind)
            res = leaf_energy_solve(p0, t0, Q, d, side, L, D, q, g_hat, p_close=p_ext,
                                    guess=warm.get(key, prev_x), a_support=Dv["sh_x"],
                                    wall=wall, after=prev_T)
            new_warm[key] = prev_x = res["x"]
            prev_T = res["touchdown"]
            solved.append((key, j, U, res, wall))
        # 2) Contact, bottom-up. All supports in a half are parallel, so every leaf is a
        #    height function over one frame and contact is h_j >= h_(j-1) + t.
        O = add(T((x_pd, 0.0)), mul(d, lift))
        below_g = [(Dv["sh_x"] - lift, -0.5 * t), (Dv["x1"], -0.5 * t)]   # pastedown face
        for key, j, U, res, wall in solved:
            pts, sep = rest_on(clamp_wall(res["points"], wall), below_g, t, O, d, nrm)
            pts = enforce_length(clamp_wall(pts, wall), L, d)
            pts, sep = rest_on(pts, below_g, t, O, d, nrm)       # contact has the last word
            sep_min = min(sep_min, sep)
            body = resample_graded(pts, 48)            # dense in the gutter, sparse on the stack
            leaves_out[key] = {"half": hname, "j": j, "U": U, "body": body,
                               "len": polyline_length(pts), "free": res["free_len"]}
            below_g = to_graph(U + pts, O, d, nrm)          # its fold and set arc too
    out["leaves"] = leaves_out

    # --- boards, pastedowns: rigid, described by hinge angles ---
    out["hinge"] = {"L": (AL, beta), "R": (AR, -beta)}

    # --- case covering: one continuous profile ---
    Rcov = Dv["R"] + Dv["case_gap"] + Dv["stiffener_t"] + ct / 2
    cvp = (0.0, Dv["cv"])
    def arc_pt(radius, a): return (cvp[0] + radius * math.cos(a), cvp[1] + radius * math.sin(a))
    a0, a1 = math.radians(-150), math.radians(-30)
    uin, uout, vtop = -(half + e) + ct / 2, -yb - ct / 2, Dv["x1"] + ct / 2
    left = [TL(p) for p in [(uin, Dv["x1"] - Dv["turn_in"]), (uin, vtop), (uout, vtop), (uout, Dv["sh_x"])]]
    right = [TR(p) for p in [(-uout, Dv["sh_x"]), (-uout, vtop), (-uin, vtop), (-uin, Dv["x1"] - Dv["turn_in"])]]
    EL, ER = arc_pt(Rcov, a0), arc_pt(Rcov, a1)
    tEL, tER = (-math.sin(a0), math.cos(a0)), (-math.sin(a1), math.cos(a1))
    jl = hermite(left[-1], TLv((0, -1)), EL, tEL, norm(sub(EL, left[-1])) * 1.2, 10)
    jr = hermite(ER, tER, right[0], TRv((0, 1)), norm(sub(ER, right[0])) * 1.2, 10)
    arcpts = [arc_pt(Rcov, a0 + (a1 - a0) * i / 24) for i in range(25)]
    case = left + jl[1:-1] + arcpts + jr[1:-1] + right
    out["case"] = case
    out["stiffener"] = [arc_pt(Rcov - ct / 2 - Dv["stiffener_t"] / 2, a0 + (a1 - a0) * i / 24) for i in range(25)]
    root_z = -min(p[1] for p in case) + ct / 2
    out["root_z"] = root_z

    # --- linings (mull + kraft) with flanges under the pastedowns ---
    xm = -(half + e) + ct + 0.00005
    flL = [TL((xm, Dv["mull_flange"])), TL((xm, Dv["sh_x"]))]
    flR = [TR((-xm, Dv["sh_x"])), TR((-xm, Dv["mull_flange"]))]
    s33 = resample_by_length(strip, 33)
    offs = []
    for i, p in enumerate(s33):
        tng = unit(sub(s33[min(i + 1, 32)], s33[max(i - 1, 0)]))
        offs.append(add(p, mul(ccw(tng), -Dv["lining_t"] / 2)))
    out["linings"] = flL + offs + flR

    # --- hollow tube: lens between linings and the case spine ---
    top = []
    for i, p in enumerate(s33):
        tng = unit(sub(s33[min(i + 1, 32)], s33[max(i - 1, 0)]))
        top.append(add(p, mul(ccw(tng), -(Dv["lining_t"] + Dv["tube_t"] / 2))))
    rin = Dv["R"] + Dv["case_gap"] - Dv["tube_t"] / 2
    bottom = [arc_pt(rin, a1 + (a0 - a1) * i / 24) for i in range(25)]
    out["tube"] = top + bottom
    mid_strip, _, _ = strip_at(S / 2)
    out["gap_mid"] = mid_strip[1] - (Dv["cv"] - (Dv["R"] + Dv["case_gap"]))

    # --- endbands: follow the spine strip just inside it ---
    re_ = Dv["endband_d"] / 2
    eb = []
    for i in range(17):
        s = re_ + (S - 2 * re_) * i / 16
        p, tng, n = strip_at(s)
        eb.append((add(p, mul(n, re_ * 0.8)), n))
    out["endband"] = eb

    # --- sewing thread inside the opened signature's centre fold ---
    k_open = Dv["n_left"] // Dv["lps"]
    s_open = m + (S - 2 * m) * (k_open + 0.5) / Dv["sigs"]
    F, tau, n = strip_at(s_open)
    C = add(F, mul(n, r0))
    out["thread"] = add(C, mul(n, -0.5 * t + Dv["thread_r"]))

    # --- ribbon: on the top leaf of the right half, then hanging off the tail ---
    top_leaf = leaves_out[str(halves["R"][-1])]
    body = top_leaf["body"]
    bcum = cumulative(body)
    sq = Dv["square"]
    y_head, y_tail = sq + Dv["block_h"] - 0.002, sq
    cl, wv = [], []
    for i in range(20):
        k = i / 19
        s = 0.006 + (0.035 - 0.006) * k
        p, tng = point_at(body, s, bcum)
        up_n = ccw(tng)                         # right half free side
        pp = add(p, mul(up_n, t / 2 + Dv["ribbon_t"] / 2))
        cl.append((pp[0], y_head + (y_tail - y_head) * k, pp[1]))
        wv.append((tng[0], 0.0, tng[1]))
    on_page = sum(math.dist(cl[i], cl[i + 1]) for i in range(19))
    remaining = Dv["block_h"] + Dv["ribbon_extra"] - on_page
    A = cl[-1]
    drop = A[2] + root_z
    for hz, dn in catenary_drop(remaining, drop, 8)[1:]:
        cl.append((A[0], A[1] - hz, A[2] - dn))
        wv.append((1.0, 0.0, 0.0))
    out["ribbon"] = (cl, wv)

    # --- stats ---
    lens = [lf["len"] for lf in leaves_out.values()]
    out["stats"] = {"strip_len": polyline_length(strip), "strip_ok": strip_ok,
                    "leaf_len_min": min(lens), "leaf_len_max": max(lens),
                    "sep_min": sep_min, "gap_mid": out["gap_mid"], "root_z": root_z,
                    "lift": lift,
                    "n_leaves": len(leaves_out)}
    return out, new_warm
