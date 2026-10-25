# Solve every sampled frame of the opening animation and write the cross-sections to JSON.
import json, math, sys, time
from mechanism import PARAMS, derive, pose, alpha_at, sample_frames

KEEP = ("t", "block_w", "block_h", "square", "board_h", "half", "endpaper_gap", "yb", "sh_x",
        "x1", "x_pd", "cover_t", "board_t", "turn_in", "endband_d", "thread_r", "kettle_in",
        "ribbon_w", "ribbon_t", "stiffener_t", "lining_t", "tube_t", "mull_flange", "case_gap",
        "R", "cv", "S", "lg", "D", "q", "leaves", "sigs", "n_left")


def rnd(x):
    if isinstance(x, float):
        return round(x, 7)
    if isinstance(x, (list, tuple)):
        return [rnd(v) for v in x]
    if isinstance(x, dict):
        return {k: rnd(v) for k, v in x.items()}
    return x


def main(path):
    Dv = derive(PARAMS)
    warm, samples, order = {}, [], None
    t0 = time.time()
    for f in sample_frames(PARAMS):
        a = alpha_at(f, PARAMS)
        P, warm = pose(a, Dv, warm)
        if order is None:
            order = list(P["leaves"].keys())
            halves = [P["leaves"][k]["half"] for k in order]
        samples.append({
            "frame": f, "alpha": a, "hinge": P["hinge"], "root_z": P["root_z"],
            "case": P["case"], "stiffener": P["stiffener"], "linings": P["linings"],
            "tube": P["tube"], "strip": P["strip"], "endband": P["endband"], "thread": P["thread"],
            "ribbon": P["ribbon"],
            "leaves": [P["leaves"][k]["U"] + P["leaves"][k]["body"] for k in order],
            "stats": P["stats"]})
        st = P["stats"]
        print(f"frame {f:3d} alpha {math.degrees(a):6.2f} sep_min {st['sep_min']*1e3:.3f}mm "
              f"len {st['leaf_len_min']*1e3:.2f}-{st['leaf_len_max']*1e3:.2f} gap {st['gap_mid']*1e3:.2f} "
              f"strip_ok {st['strip_ok']} [{time.time()-t0:.0f}s]", flush=True)
    meta = {k: Dv[k] for k in KEEP}
    meta["params"] = PARAMS
    meta["order"] = order
    meta["leaf_half"] = halves
    json.dump(rnd({"meta": meta, "samples": samples}), open(path, "w"), separators=(",", ":"))
    print("wrote", path)


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "bake.json")
