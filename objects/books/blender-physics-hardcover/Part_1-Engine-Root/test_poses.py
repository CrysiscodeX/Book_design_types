import json, math, sys, time
from mechanism import PARAMS, derive, pose
from solvers import sub, cross

def seg_cross(a, b, c, d):
    def o(p, q, r): return cross(sub(q, p), sub(r, p))
    return (o(a, b, c) * o(a, b, d) < 0) and (o(c, d, a) * o(c, d, b) < 0)

def crossings(A, B):
    n = 0
    for i in range(len(A) - 1):
        for k in range(len(B) - 1):
            if seg_cross(A[i], A[i + 1], B[k], B[k + 1]):
                n += 1
    return n

Dv = derive(PARAMS)
angles = [int(a) for a in sys.argv[1:]] or [0, 30, 60, 90]
warm, data = {}, {}
for a in angles:
    t0 = time.time()
    P, warm = pose(math.radians(a), Dv, warm)
    st = P["stats"]
    frees = sorted(lf["free"] for lf in P["leaves"].values())
    bad = 0
    for h in "LR":
        lv = sorted((lf for lf in P["leaves"].values() if lf["half"] == h), key=lambda x: x["j"])
        for i in range(1, len(lv)):
            bad += crossings(lv[i - 1]["U"] + lv[i - 1]["body"][:24], lv[i]["U"] + lv[i]["body"][:24]) > 0
    lv = {h: sorted((lf for lf in P["leaves"].values() if lf["half"] == h), key=lambda x: x["j"]) for h in "LR"}
    between = crossings(lv["L"][-1]["U"] + lv["L"][-1]["body"][:30], lv["R"][-1]["U"] + lv["R"][-1]["body"][:30])
    print(f"{a:3d}deg {time.time()-t0:4.1f}s strip {st['strip_len']*1e3:.3f} lift {st['lift']*1e3:.2f} "
          f"len {st['leaf_len_min']*1e3:.2f}-{st['leaf_len_max']*1e3:.2f} sep_min {st['sep_min']*1e3:.3f}mm "
          f"gap {st['gap_mid']*1e3:.2f} free med {frees[len(frees)//2]*1e3:.1f} max {frees[-1]*1e3:.1f} "
          f"crossing-pairs {bad} halves-cross {between}")
    data[str(a)] = {"strip": P["strip"], "case": P["case"], "tube": P["tube"],
                    "leaves": {k: lf["U"] + lf["body"] for k, lf in P["leaves"].items()}}
json.dump(data, open("poses_test.json", "w"))
