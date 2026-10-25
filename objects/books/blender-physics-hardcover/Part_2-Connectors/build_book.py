# Physically driven hardcover book: opening animation from a scripted elastica bake.
#
# The cross-section mechanism (book_mechanism.py + book_solvers.py, stored as Text blocks)
# solves the book at 31 sampled opening angles: rigid case spine, boards turning in the
# joint grooves, an inextensible elastica spine strip, 20 sewn signatures whose 162 leaves
# are heavy elastic plates resting on their stacks, the hollow-back tube, endbands, thread
# and ribbon. Those cross-sections are stored in the Text block "book_bake.json".
#
# This script turns the bake into meshes: every deforming part gets one shape key per
# sample, crossfaded linearly, so the animation plays with no handlers or simulation.
# Only the "Book" collection is replaced. Ground, Camera and Light are re-aimed, not rebuilt.
#
# To change the book: edit PARAMS in book_mechanism.py, set REBAKE = True and run this
# script (Text Editor > Run Script). Rebaking solves 31 poses and takes ~4 minutes.
import bpy, bmesh, json, math, sys, types
from mathutils import Vector

REBAKE = False
BAKE_TEXT = "book_bake.json"
BAKE_PATH = globals().get("BAKE_PATH")          # optional: load a bake file from disk


# ---------- bake data ----------
def load_module(name):
    mod = types.ModuleType(name)
    exec(compile(bpy.data.texts[name + ".py"].as_string(), name + ".py", "exec"), mod.__dict__)
    sys.modules[name] = mod
    return mod


def get_bake():
    if REBAKE:
        load_module("solvers")
        load_module("mechanism")
        bake = load_module("bake")
        path = bpy.app.tempdir + "book_bake.json"
        bake.main(path)
        src = open(path).read()
    elif BAKE_PATH:
        src = open(BAKE_PATH).read()
    else:
        return json.loads(bpy.data.texts[BAKE_TEXT].as_string())
    txt = bpy.data.texts.get(BAKE_TEXT) or bpy.data.texts.new(BAKE_TEXT)
    txt.from_string(src)
    return json.loads(src)


data = get_bake()
M, SAMPLES = data["meta"], data["samples"]
H = M["board_h"]
SQ = M["square"]
FRAMES = [s["frame"] for s in SAMPLES]


def W(u, v, h):
    """Cross-section (u across, v up) and height h from the tail -> Blender XYZ."""
    return (u, h - H / 2, v)


# ---------- scene helpers ----------
def collection():
    col = bpy.data.collections.get("Book")
    if col is None:
        col = bpy.data.collections.new("Book")
        bpy.context.scene.collection.children.link(col)
    for ob in list(col.objects):
        data_block = ob.data
        bpy.data.objects.remove(ob, do_unlink=True)
        if data_block is not None and data_block.users == 0:
            if isinstance(data_block, bpy.types.Mesh):
                bpy.data.meshes.remove(data_block)
            elif isinstance(data_block, bpy.types.Curve):
                bpy.data.curves.remove(data_block)
    return col


def obj(name, me, col, parent=None):
    ob = bpy.data.objects.new(name, me)
    col.objects.link(ob)
    ob.parent = parent
    return ob


def empty(name, col, parent=None, kind="PLAIN_AXES", size=0.02):
    ob = obj(name, None, col, parent)
    ob.empty_display_type = kind
    ob.empty_display_size = size
    return ob


def mesh_from(name, verts, faces):
    me = bpy.data.meshes.new(name)
    me.from_pydata(verts, [], faces)
    me.update()
    for p in me.polygons:
        p.use_smooth = True
    return me


def sheet(profiles, h0, h1, closed=False):
    """Several cross-section polylines extruded from height h0 to h1 as strips of quads.
    Returns (vertex builder, faces); the builder maps one sample's profiles to vertices."""
    faces, base = [], 0
    for prof in profiles:
        n = len(prof)
        for i in range(n if closed else n - 1):
            j = (i + 1) % n
            faces.append((base + i, base + j, base + n + j, base + n + i))
        base += 2 * n

    def verts(profs):
        out = []
        for prof in profs:
            out += [W(u, v, h0) for u, v in prof]
            out += [W(u, v, h1) for u, v in prof]
        return out
    return verts, faces


def solidify(ob, thickness, offset=0.0, rim_offset=0):
    m = ob.modifiers.new("Solidify", "SOLIDIFY")
    m.thickness = thickness
    m.offset = offset
    m.use_even_offset = True
    if rim_offset:
        m.material_offset_rim = rim_offset
    return m


def bake_shape_keys(ob, verts_per_sample):
    """Basis = first sample; one key per sample with a triangular LINEAR weight, so
    consecutive solved poses crossfade (piecewise-linear vertex motion)."""
    ob.shape_key_add(name="Basis", from_mix=False)
    keys = []
    for fr, vs in zip(FRAMES, verts_per_sample):
        sk = ob.shape_key_add(name=f"f{fr:03d}", from_mix=False)
        sk.data.foreach_set("co", [c for v in vs for c in v])
        sk.slider_min, sk.slider_max = 0.0, 1.0
        keys.append(sk)
    for i, sk in enumerate(keys):
        for k in (i - 1, i, i + 1):
            if 0 <= k < len(FRAMES):
                sk.value = 1.0 if k == i else 0.0
                sk.keyframe_insert("value", frame=FRAMES[k])
    ob.data.shape_keys.use_relative = True


def deforming(name, col, parent, profiles_of, h0, h1, closed=False, mat=None):
    """Mesh whose cross-sections come from every sample (shape keys)."""
    verts, faces = sheet(profiles_of(SAMPLES[0]), h0, h1, closed)
    ob = obj(name, mesh_from(name, verts(profiles_of(SAMPLES[0])), faces), col, parent)
    bake_shape_keys(ob, [verts(profiles_of(s)) for s in SAMPLES])
    if mat:
        ob.data.materials.append(mat)
    return ob


# ---------- materials ----------
def material(name, build):
    mat = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    mat.use_nodes = True
    nt = mat.node_tree
    for nd in list(nt.nodes):
        nt.nodes.remove(nd)
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    bsdf = nt.nodes.new("ShaderNodeBsdfPrincipled")
    nt.links.new(bsdf.outputs[0], out.inputs[0])
    build(nt, bsdf, out)
    return mat


def set_in(node, name, value):
    if name in node.inputs:
        node.inputs[name].default_value = value


def paper(rgb, translucency):
    def build(nt, bsdf, out):
        # Gutter shadow: ambient occlusion darkens the paper where the leaves close in.
        ao = nt.nodes.new("ShaderNodeAmbientOcclusion")
        ao.inputs["Color"].default_value = (*rgb, 1)
        ao.inputs["Distance"].default_value = 0.02
        nt.links.new(ao.outputs["Color"], bsdf.inputs["Base Color"])
        set_in(bsdf, "Roughness", 0.9)
        # Thin paper lets some light through when a leaf is backlit.
        tr = nt.nodes.new("ShaderNodeBsdfTranslucent")
        tr.inputs["Color"].default_value = (*rgb, 1)
        mix = nt.nodes.new("ShaderNodeMixShader")
        mix.inputs["Fac"].default_value = translucency
        nt.links.new(bsdf.outputs[0], mix.inputs[1])
        nt.links.new(tr.outputs[0], mix.inputs[2])
        nt.links.new(mix.outputs[0], out.inputs[0])
    return build


def page_edge(nt, bsdf, out):
    # Leaf edges: slightly aged, with soft variation between neighbouring leaves.
    tc = nt.nodes.new("ShaderNodeTexCoord")
    noise = nt.nodes.new("ShaderNodeTexNoise")
    noise.inputs["Scale"].default_value = 400.0
    ramp = nt.nodes.new("ShaderNodeValToRGB")
    ramp.color_ramp.elements[0].color = (0.70, 0.64, 0.52, 1)
    ramp.color_ramp.elements[1].color = (0.86, 0.81, 0.70, 1)
    nt.links.new(tc.outputs["Object"], noise.inputs["Vector"])
    nt.links.new(noise.outputs["Fac"], ramp.inputs["Fac"])
    nt.links.new(ramp.outputs["Color"], bsdf.inputs["Base Color"])
    set_in(bsdf, "Roughness", 0.95)


def cloth(nt, bsdf, out):
    bsdf.inputs["Base Color"].default_value = (0.32, 0.03, 0.03, 1)
    set_in(bsdf, "Roughness", 0.8)
    set_in(bsdf, "Sheen Weight", 0.3)
    # Book cloth weave: a fine crossed wave bump.
    tc = nt.nodes.new("ShaderNodeTexCoord")
    wx = nt.nodes.new("ShaderNodeTexWave")
    wx.bands_direction = "X"
    wx.inputs["Scale"].default_value = 900.0
    wy = nt.nodes.new("ShaderNodeTexWave")
    wy.bands_direction = "Y"
    wy.inputs["Scale"].default_value = 900.0
    add = nt.nodes.new("ShaderNodeMath")
    add.operation = "MULTIPLY"
    bump = nt.nodes.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = 0.25
    bump.inputs["Distance"].default_value = 0.0002
    for w in (wx, wy):
        nt.links.new(tc.outputs["Object"], w.inputs["Vector"])
    nt.links.new(wx.outputs["Fac"], add.inputs[0])
    nt.links.new(wy.outputs["Fac"], add.inputs[1])
    nt.links.new(add.outputs[0], bump.inputs["Height"])
    nt.links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])


def flat(rgb, rough=0.8, **extra):
    def build(nt, bsdf, out):
        bsdf.inputs["Base Color"].default_value = (*rgb, 1)
        set_in(bsdf, "Roughness", rough)
        for k, v in extra.items():
            set_in(bsdf, k.replace("_", " "), v)
    return build


def endband(nt, bsdf, out):
    tc = nt.nodes.new("ShaderNodeTexCoord")
    wave = nt.nodes.new("ShaderNodeTexWave")
    wave.bands_direction = "X"
    wave.inputs["Scale"].default_value = 700.0
    ramp = nt.nodes.new("ShaderNodeValToRGB")
    ramp.color_ramp.interpolation = "CONSTANT"
    ramp.color_ramp.elements[0].color = (0.55, 0.04, 0.03, 1)
    ramp.color_ramp.elements[1].position = 0.5
    ramp.color_ramp.elements[1].color = (0.85, 0.65, 0.15, 1)
    nt.links.new(tc.outputs["Object"], wave.inputs["Vector"])
    nt.links.new(wave.outputs["Fac"], ramp.inputs["Fac"])
    nt.links.new(ramp.outputs["Color"], bsdf.inputs["Base Color"])
    set_in(bsdf, "Roughness", 0.55)
    set_in(bsdf, "Sheen Weight", 0.5)


MAT = {
    "leaf": material("Book_Leaf", paper((0.93, 0.90, 0.82), 0.12)),
    "edge": material("Book_LeafEdge", page_edge),
    "fly": material("Book_Endpaper", paper((0.88, 0.82, 0.68), 0.08)),
    "cloth": material("Book_Cloth", cloth),
    "board": material("Book_Board", flat((0.35, 0.33, 0.30), 0.9)),
    "mull": material("Book_Mull", flat((0.84, 0.80, 0.70), 1.0)),
    "tube": material("Book_Tube", flat((0.45, 0.30, 0.17), 0.85)),
    "thread": material("Book_Thread", flat((0.80, 0.76, 0.66), 0.7)),
    "band": material("Book_Endband", endband),
    "ribbon": material("Book_Ribbon", flat((0.33, 0.015, 0.03), 0.32, Sheen_Weight=0.6)),
}


# ---------- build ----------
pref = bpy.context.preferences.edit
old_interp = pref.keyframe_new_interpolation_type
pref.keyframe_new_interpolation_type = "LINEAR"

col = collection()
root = empty("Book_Root", col, kind="PLAIN_AXES", size=0.05)
for k, v in M["params"].items():
    if isinstance(v, (int, float)):
        root[k] = v

e, ct, t = M["endpaper_gap"], M["cover_t"], M["t"]
hb = M["block_h"]

# Hinges: boards turn about the joint-groove axes (along the spine, Blender Y).
hinges = {}
for side in ("L", "R"):
    (au, av), beta = SAMPLES[0]["hinge"][side]
    hg = empty(f"Book_Hinge_{side}", col, root, "SINGLE_ARROW", 0.03)
    hg.location = W(au, av, H / 2)
    hg.rotation_mode = "XYZ"
    for s in SAMPLES:
        hg.rotation_euler = (0.0, -s["hinge"][side][1], 0.0)      # (u,v) ccw = -Y rotation
        hg.keyframe_insert("rotation_euler", index=1, frame=s["frame"])
    hinges[side] = (hg, (au, av))

for s in SAMPLES:
    root.location = (0.0, 0.0, s["root_z"])
    root.keyframe_insert("location", index=2, frame=s["frame"])

# Boards and pastedowns: rigid, in each hinge's frame (closed-book geometry minus the axis).
blk = M["leaves"] * t / 2                                   # half the text block thickness
for side, sg in (("L", -1), ("R", 1)):
    hg, (au, av) = hinges[side]
    def local(u, v):
        return (u - au, v - av)
    # 0.3 mm clearance under the cloth: between samples the cloth's vertices move on
    # chords while the board turns on an arc, which would otherwise poke through.
    clear = 0.0003
    u_in, u_out, v_fore = sg * (blk + e), sg * (M["yb"] - clear), M["x1"] - clear
    box = [local(u_in, M["sh_x"]), local(u_in, v_fore), local(u_out, v_fore), local(u_out, M["sh_x"])]
    verts, faces = sheet([box], 0.0, H, closed=True)
    n = len(box)
    faces += [tuple(range(n - 1, -1, -1)), tuple(range(n, 2 * n))]
    b = obj(f"Book_Board_{side}", mesh_from(f"Book_Board_{side}", verts([box]), faces), col, hg)
    bm = bmesh.new()
    bm.from_mesh(b.data)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(b.data)
    bm.free()
    for p in b.data.polygons:
        p.use_smooth = False
    b.data.materials.append(MAT["board"])
    bev = b.modifiers.new("Bevel", "BEVEL")
    bev.width, bev.segments = 0.0004, 2
    # Pastedown: the endpaper half glued to the board, over the cloth turn-ins.
    pu = sg * (abs(M["x_pd"]) - t / 2)
    prof = [local(pu, M["sh_x"]), local(pu, M["block_w"])]
    verts, faces = sheet([prof], SQ, SQ + hb)
    pd = obj(f"Book_Pastedown_{side}", mesh_from(f"Book_Pastedown_{side}", verts([prof]), faces), col, hg)
    pd.data.materials.append(MAT["fly"])
    solidify(pd, t * 0.9)

# Case covering: one continuous cloth profile (turn-in, boards, joints, spine).
case = deforming("Book_Case", col, root, lambda s: [s["case"]], 0.0, H, mat=MAT["cloth"])
solidify(case, ct)

stiff_verts, stiff_faces = sheet([SAMPLES[0]["stiffener"]], 0.0, H)
stiff = obj("Book_CaseSpine_Stiffener", mesh_from("Book_CaseSpine_Stiffener", stiff_verts([SAMPLES[0]["stiffener"]]), stiff_faces), col, root)
stiff.data.materials.append(MAT["board"])
solidify(stiff, M["stiffener_t"])

lin = deforming("Book_Linings", col, root, lambda s: [s["linings"]], SQ + 0.006, SQ + hb - 0.006, mat=MAT["mull"])
solidify(lin, M["lining_t"])

tube = deforming("Book_Tube", col, root, lambda s: [s["tube"]], SQ + 0.002, SQ + hb - 0.002, closed=True, mat=MAT["tube"])
solidify(tube, M["tube_t"])

# Leaves: 160 text leaves + 2 flyleaves, each its own sheet (fold, set arc, free curve,
# lying part). Solidify gives every leaf its caliper and a real edge face.
order = M["order"]
leaves = deforming("Book_Leaves", col, root, lambda s: s["leaves"], SQ, SQ + hb, mat=MAT["leaf"])
leaves.data.materials.append(MAT["edge"])
fly_idx = [i for i, k in enumerate(order) if "fly" in k]
if fly_idx:
    leaves.data.materials.append(MAT["fly"])
    per = len(SAMPLES[0]["leaves"][0]) - 1
    for i in fly_idx:
        for f in range(i * per, (i + 1) * per):
            leaves.data.polygons[f].material_index = 2
solidify(leaves, t * 0.92, rim_offset=1)
leaves.modifiers["Solidify"].material_offset = 0


# Endbands: a round silk-wrapped core riding on the spine folds at head and tail.
def tube_mesh(name, centres_of, radius, ring=8):
    """Tube along a cross-section polyline (in the u-v plane) at height h, as rings."""
    def build(s):
        out = []
        for (u, v), (nu, nv), h in centres_of(s):
            for k in range(ring):
                a = 2 * math.pi * k / ring
                du, dv, dh = nu * math.cos(a) * radius, nv * math.cos(a) * radius, math.sin(a) * radius
                out.append(W(u + du, v + dv, h + dh))
        return out
    n = len(centres_of(SAMPLES[0]))
    faces = [(i * ring + k, i * ring + (k + 1) % ring, (i + 1) * ring + (k + 1) % ring, (i + 1) * ring + k)
             for i in range(n - 1) for k in range(ring)]
    faces += [tuple(range(ring - 1, -1, -1)), tuple(range((n - 1) * ring, n * ring))]
    ob = obj(name, mesh_from(name, build(SAMPLES[0]), faces), col, root)
    bake_shape_keys(ob, [build(s) for s in SAMPLES])
    return ob


re_ = M["endband_d"] / 2
for nm, h in (("Head", SQ + hb - re_ * 0.6), ("Tail", SQ + re_ * 0.6)):
    eb = tube_mesh(f"Book_Endband_{nm}", lambda s, h=h: [(p, n, h) for p, n in s["endband"]], re_, ring=10)
    eb.data.materials.append(MAT["band"])

# Sewing thread inside the opened signature's centre fold: visible between the kettle
# stitches and the three tape stations (12 mm tapes), where it runs inside the fold.
ki, tape = M["kettle_in"], 0.012
stations = [SQ + ki + (hb - 2 * ki) * k / 4 for k in (1, 2, 3)]
runs, h0 = [], SQ + ki
for c in stations:
    runs.append((h0, c - tape / 2))
    h0 = c + tape / 2
runs.append((h0, SQ + hb - ki))


def thread_centres(s):
    u, v = s["thread"]
    out = []
    for a, b in runs:
        for h in (a, b):
            out.append(((u, v), (1.0, 0.0), h))
    return out


def thread_mesh():
    ring, r = 6, M["thread_r"]
    def build(s):
        out = []
        u, v = s["thread"]
        for a, b in runs:
            for h in (a, b):
                for k in range(ring):
                    ang = 2 * math.pi * k / ring
                    out.append(W(u + r * math.cos(ang), v + r * math.sin(ang), h))
        return out
    faces = []
    for i in range(len(runs)):
        b0 = 2 * i * ring
        faces += [(b0 + k, b0 + (k + 1) % ring, b0 + ring + (k + 1) % ring, b0 + ring + k) for k in range(ring)]
    ob = obj("Book_Thread", mesh_from("Book_Thread", build(SAMPLES[0]), faces), col, root)
    bake_shape_keys(ob, [build(s) for s in SAMPLES])
    ob.data.materials.append(MAT["thread"])
    return ob


thread_mesh()


# Ribbon bookmark: lies on the right-hand page from the head, leaves at the tail, hangs.
def ribbon_verts(s):
    cl, wv = s["ribbon"]
    hw_ = M["ribbon_w"] / 2
    out = []
    for (u, h, v), (wu, _, wvv) in zip(cl, wv):
        out.append(W(u - wu * hw_, v - wvv * hw_, h))
        out.append(W(u + wu * hw_, v + wvv * hw_, h))
    return out


nr = len(SAMPLES[0]["ribbon"][0])
rfaces = [(2 * i, 2 * i + 1, 2 * i + 3, 2 * i + 2) for i in range(nr - 1)]
rib = obj("Book_Ribbon", mesh_from("Book_Ribbon", ribbon_verts(SAMPLES[0]), rfaces), col, root)
bake_shape_keys(rib, [ribbon_verts(s) for s in SAMPLES])
rib.data.materials.append(MAT["ribbon"])
solidify(rib, M["ribbon_t"])

pref.keyframe_new_interpolation_type = old_interp


def linearize(id_block):
    """Force LINEAR keys: shape-key weights must sum to 1 between samples (eased keys
    would leak the closed-book Basis into every in-between frame)."""
    ad = id_block.animation_data
    if not ad or not ad.action:
        return
    try:
        from bpy_extras import anim_utils
        fcurves = anim_utils.action_get_channelbag_for_slot(ad.action, ad.action_slot).fcurves
    except (ImportError, AttributeError):
        fcurves = ad.action.fcurves
    for fc in fcurves:
        for kp in fc.keyframe_points:
            kp.interpolation = "LINEAR"
        fc.update()


for ob in col.objects:
    linearize(ob)
    if ob.type == "MESH" and ob.data.shape_keys:
        linearize(ob.data.shape_keys)

# ---------- scene: frame range, render, cameras ----------
sc = bpy.context.scene
sc.frame_start, sc.frame_end = FRAMES[0], FRAMES[-1]
sc.frame_set(FRAMES[-1])
try:
    sc.eevee.use_raytracing = True
except AttributeError:
    pass


def aim(cam, target):
    d = Vector(target) - cam.location
    cam.rotation_mode = "XYZ"
    cam.rotation_euler = d.to_track_quat("-Z", "Y").to_euler()


cam = bpy.data.objects.get("Camera")
if cam:
    cam.location = (0.36, -0.42, 0.30)
    cam.data.lens = 55
    aim(cam, (0.0, 0.0, 0.055))
head = bpy.data.objects.get("Camera_Head")
if head is None:
    head = bpy.data.objects.new("Camera_Head", bpy.data.cameras.new("Camera_Head"))
    sc.collection.objects.link(head)
head.location = (0.035, 0.30, 0.028)
head.data.lens = 85
head.data.clip_start = 0.005
aim(head, (0.0, H / 2, 0.02))
light = bpy.data.objects.get("Light")
if light:
    light.location = (0.30, -0.25, 0.60)
    aim(light, (0.0, 0.0, 0.03))

print({"samples": len(SAMPLES), "frames": (FRAMES[0], FRAMES[-1]), "leaves": len(order),
       "objects": sorted(o.name for o in col.objects)})
