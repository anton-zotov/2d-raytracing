import { isConvex } from "./polygon";

describe("isConvex", () => {
    it("returns false for less than 3 points", () => {
        expect(isConvex([])).toBe(false);
        expect(isConvex([{ x: 0, y: 0 }])).toBe(false);
        expect(
            isConvex([
                { x: 0, y: 0 },
                { x: 1, y: 1 },
            ])
        ).toBe(false);
    });

    it("returns true for a convex polygon", () => {
        expect(
            isConvex([
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 1, y: 1 },
            ])
        ).toBe(true);
    });

    it("returns true for a concave polygon", () => {
        expect(
            isConvex([
                { x: 0, y: 0 },
                { x: 1, y: 1 },
                { x: 0, y: 1 },
            ])
        ).toBe(false);
    });
});
