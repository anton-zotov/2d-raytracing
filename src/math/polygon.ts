import { Point } from "../models/point.model";

export function isConvex(points: Point[]): boolean {
    if (points.length < 3) {
        return false;
    }

    let sign = 0;
    for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        const p2 = points[(i + 1) % points.length];
        const p3 = points[(i + 2) % points.length];

        const dx1 = p2.x - p1.x;
        const dy1 = p2.y - p1.y;
        const dx2 = p3.x - p2.x;
        const dy2 = p3.y - p2.y;

        const cross = dx1 * dy2 - dy1 * dx2;
        const currentSign = Math.sign(cross);
        if (sign === 0) {
            sign = currentSign;
        } else if (sign !== currentSign) {
            return false;
        }
    }

    return true;
}
