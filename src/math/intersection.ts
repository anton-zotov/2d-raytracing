import { Point, PointWithDistance } from "../models/point.model";
import { Ray } from "../ray";
import { Segment } from "../segment";

export const areParallel = (ray: Ray, segment: Segment): boolean => {
    return ray.angle === segment.angle;
};

export const getIntersection = (ray: Ray, segment: Segment): PointWithDistance | null => {
    if (areParallel(ray, segment)) {
        return null;
    }

    const x1 = ray.start.x;
    const y1 = ray.start.y;
    const x2 = ray.start.x + Math.cos(ray.angle);
    const y2 = ray.start.y + Math.sin(ray.angle);
    const x3 = segment.start.x;
    const y3 = segment.start.y;
    const x4 = segment.end.x;
    const y4 = segment.end.y;

    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denominator === 0) {
        return null;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

    if (t >= 0 && u >= 0 && u <= 1) {
        return {
            x: x1 + t * (x2 - x1),
            y: y1 + t * (y2 - y1),
            distance: t,
        };
    }

    return null;
};
