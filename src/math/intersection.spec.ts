import { Radians } from "../models/angle.model";
import { Ray } from "../ray";
import { Segment } from "../segment";
import { areParallel, getIntersection } from "./intersection";

describe("intersection", () => {
    describe("areParallel", () => {
        it.each([
            { segmentStart: { x: 0, y: 0 }, segmentEnd: { x: 1, y: 0 }, rayAngle: 0 as Radians },
            { segmentStart: { x: 0, y: 0 }, segmentEnd: { x: 1, y: 1 }, rayAngle: (Math.PI / 4) as Radians },
            { segmentStart: { x: 0, y: 0 }, segmentEnd: { x: 0, y: 1 }, rayAngle: (Math.PI / 2) as Radians },
            { segmentStart: { x: 0, y: 0 }, segmentEnd: { x: -1, y: 1 }, rayAngle: ((3 * Math.PI) / 4) as Radians },
            { segmentStart: { x: 0, y: 0 }, segmentEnd: { x: -1, y: 0 }, rayAngle: Math.PI as Radians },
            { segmentStart: { x: 0, y: 0 }, segmentEnd: { x: -1, y: -1 }, rayAngle: ((5 * Math.PI) / 4) as Radians },
            { segmentStart: { x: 0, y: 0 }, segmentEnd: { x: 0, y: -1 }, rayAngle: ((3 * Math.PI) / 2) as Radians },
        ])("returns true when the ray and the segment are parallel", ({ segmentStart, segmentEnd, rayAngle }) => {
            const ray = new Ray({ x: 0, y: 0 }, rayAngle);
            const segment = new Segment(segmentStart, segmentEnd);
            expect(areParallel(ray, segment)).toBe(true);
        });

        it.each([
            { segmentStart: { x: 0, y: 0 }, segmentEnd: { x: 1, y: 0 }, rayAngle: (Math.PI / 2) as Radians },
            { segmentStart: { x: 0, y: 0 }, segmentEnd: { x: 1, y: 1 }, rayAngle: 0 as Radians },
            { segmentStart: { x: 0, y: 0 }, segmentEnd: { x: 0, y: 1 }, rayAngle: (Math.PI / 4) as Radians },
            { segmentStart: { x: 0, y: 0 }, segmentEnd: { x: -1, y: 1 }, rayAngle: (Math.PI / 2) as Radians },
            { segmentStart: { x: 0, y: 0 }, segmentEnd: { x: -1, y: 0 }, rayAngle: ((3 * Math.PI) / 4) as Radians },
            { segmentStart: { x: 0, y: 0 }, segmentEnd: { x: -1, y: -1 }, rayAngle: Math.PI as Radians },
            { segmentStart: { x: 0, y: 0 }, segmentEnd: { x: 0, y: -1 }, rayAngle: ((5 * Math.PI) / 4) as Radians },
        ])("returns false when the ray and the segment are not parallel", ({ segmentStart, segmentEnd, rayAngle }) => {
            const ray = new Ray({ x: 0, y: 0 }, rayAngle);
            const segment = new Segment(segmentStart, segmentEnd);
            expect(areParallel(ray, segment)).toBe(false);
        });
    });

    describe("getIntersection", () => {
        it("returns null when the ray and the segment are parallel", () => {
            const ray = new Ray({ x: 0, y: 0 }, 0 as Radians);
            const segment = new Segment({ x: 0, y: 1 }, { x: 1, y: 1 });
            expect(getIntersection(ray, segment)).toBeNull();
        });

        it.each([
            // {
            //     ray: { x: 0, y: 0, angle: (Math.PI / 2) as Radians },
            //     segment: { start: { x: 0, y: 1 }, end: { x: 1, y: 1 } },
            //     expected: { x: 0, y: 1, distance: 1 },
            // },
            {
                ray: { x: 0, y: 0, angle: 0 as Radians },
                segment: { start: { x: 1, y: -1 }, end: { x: 1, y: 1 } },
                expected: { x: 1, y: 0, distance: 1 },
            },
        ])("returns the intersection point when the ray and the segment intersect", ({ ray, segment, expected }) => {
            const rayInstance = new Ray({ x: ray.x, y: ray.y }, ray.angle);
            const segmentInstance = new Segment(segment.start, segment.end);

            const intersection = getIntersection(rayInstance, segmentInstance)!;
            console.log(intersection);
            const { x, y, distance } = intersection;
            expect(x).toBeCloseTo(expected.x);
            expect(y).toBeCloseTo(expected.y);
            expect(distance).toBeCloseTo(expected.distance);
        });
    });
});
