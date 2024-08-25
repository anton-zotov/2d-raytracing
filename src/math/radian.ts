import { Degrees, Radians } from "../models/angle.model";
import { Point } from "../models/point.model";

export const toRadians = (angle: Degrees): Radians => ((angle * Math.PI) / 180) as Radians;

export const normalize = (angle: Radians): Radians => {
    const twoPi = 2 * Math.PI;
    const normalized = angle % twoPi;
    return (normalized >= 0 ? normalized : normalized + twoPi) as Radians;
};

export const getAngle = (start: Point, end: Point): Radians => {
    return normalize(Math.atan2(end.y - start.y, end.x - start.x) as Radians);
};
