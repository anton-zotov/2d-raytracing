import { Degrees, Radians } from "../models/angle.model";
import { getAngle, normalize, toRadians } from "./radian";

describe("angle utils", () => {
    describe("toRadians", () => {
        it("converts 0 degrees to 0 radians", () => {
            expect(toRadians(0 as Degrees)).toBe(0);
        });

        it("converts 90 degrees to π/2 radians", () => {
            expect(toRadians(90 as Degrees)).toBe(Math.PI / 2);
        });

        it("converts 180 degrees to π radians", () => {
            expect(toRadians(180 as Degrees)).toBe(Math.PI);
        });

        it("converts 270 degrees to 3π/2 radians", () => {
            expect(toRadians(270 as Degrees)).toBe((3 * Math.PI) / 2);
        });

        it("converts 360 degrees to 2π radians", () => {
            expect(toRadians(360 as Degrees)).toBe(2 * Math.PI);
        });
    });

    describe("normalize", () => {
        it.each([
            { angle: 0, expected: 0 },
            { angle: Math.PI / 2, expected: Math.PI / 2 },
            { angle: Math.PI, expected: Math.PI },
            { angle: (3 * Math.PI) / 2, expected: (3 * Math.PI) / 2 },
            { angle: 2 * Math.PI, expected: 0 },
            { angle: 3 * Math.PI, expected: Math.PI },
            { angle: 5 * Math.PI, expected: Math.PI },
            { angle: -Math.PI / 2, expected: (3 * Math.PI) / 2 },
            { angle: -Math.PI, expected: Math.PI },
            { angle: -3 * Math.PI, expected: Math.PI },
        ])("normalizes the angle", ({ angle, expected }) => {
            expect(normalize(angle as Radians)).toBe(expected);
        });
    });

    describe("getAngle", () => {
        it.each([
            { start: { x: 0, y: 0 }, end: { x: 1, y: 0 }, expected: 0 },
            { start: { x: 0, y: 0 }, end: { x: 1, y: 1 }, expected: Math.PI / 4 },
            { start: { x: 0, y: 0 }, end: { x: 0, y: 1 }, expected: Math.PI / 2 },
            { start: { x: 0, y: 0 }, end: { x: -1, y: 1 }, expected: (3 * Math.PI) / 4 },
            { start: { x: 0, y: 0 }, end: { x: -1, y: 0 }, expected: Math.PI },
            { start: { x: 0, y: 0 }, end: { x: -1, y: -1 }, expected: (5 * Math.PI) / 4 },
            { start: { x: 0, y: 0 }, end: { x: 0, y: -1 }, expected: (3 * Math.PI) / 2 },
            { start: { x: 100, y: -50 }, end: { x: 200, y: 50 }, expected: toRadians(45 as Degrees) },
        ])("calculates the angle", ({ start, end, expected }) => {
            expect(getAngle(start, end)).toBe(expected);
        });
    });
});
