export type Point = {
    x: number;
    y: number;
};

export type PointWithDistance = Point & {
    distance: number;
};
