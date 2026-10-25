# Minimal PNG plotter for cross-sections (no third-party libraries).
import zlib, struct, json, sys


class Canvas:
    def __init__(self, w, h, bounds):
        self.w, self.h = w, h
        self.px = bytearray([255] * (w * h * 3))
        (self.u0, self.v0, self.u1, self.v1) = bounds
        sx = w / (self.u1 - self.u0)
        sy = h / (self.v1 - self.v0)
        self.s = min(sx, sy)

    def map(self, p):
        return (int((p[0] - self.u0) * self.s), int(self.h - 1 - (p[1] - self.v0) * self.s))

    def dot(self, x, y, c):
        if 0 <= x < self.w and 0 <= y < self.h:
            i = (y * self.w + x) * 3
            self.px[i:i + 3] = bytes(c)

    def line(self, a, b, c):
        (x0, y0), (x1, y1) = self.map(a), self.map(b)
        n = max(abs(x1 - x0), abs(y1 - y0), 1)
        if n > 4000:
            return
        for i in range(n + 1):
            self.dot(x0 + (x1 - x0) * i // n, y0 + (y1 - y0) * i // n, c)

    def poly(self, pts, c, closed=False):
        for i in range(len(pts) - 1):
            self.line(pts[i], pts[i + 1], c)
        if closed:
            self.line(pts[-1], pts[0], c)

    def save(self, path):
        raw = b"".join(b"\x00" + bytes(self.px[y * self.w * 3:(y + 1) * self.w * 3]) for y in range(self.h))
        def chunk(t, d):
            return struct.pack(">I", len(d)) + t + d + struct.pack(">I", zlib.crc32(t + d) & 0xffffffff)
        png = b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", self.w, self.h, 8, 2, 0, 0, 0))
        png += chunk(b"IDAT", zlib.compress(raw, 9)) + chunk(b"IEND", b"")
        open(path, "wb").write(png)


def draw(pose, path, bounds, w=900, h=700):
    c = Canvas(w, h, bounds)
    for k, lf in pose["leaves"].items():
        col = (170, 120, 40) if "fly" in k else (110, 110, 110)
        c.poly(lf, col)
    c.poly(pose["case"], (30, 80, 200))
    c.poly(pose["tube"], (20, 160, 90), closed=True)
    c.poly(pose["strip"], (210, 30, 30))
    c.save(path)


if __name__ == "__main__":
    data = json.load(open(sys.argv[1]))
    for a, p in data.items():
        draw(p, f"plot_{a}_full.png", (-0.17, -0.02, 0.17, 0.17))
        draw(p, f"plot_{a}_gutter.png", (-0.025, -0.012, 0.025, 0.028))
