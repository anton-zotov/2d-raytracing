import { Drawable } from "./models/drawable.model";
import { Radians } from "./models/angle.model";
import { Point } from "./models/point.model";
import { normalize } from "./math/radian";
import { Segment } from "./segment";
import { getIntersection } from "./math/intersection";

export class Ray implements Drawable {
    private _color: string = "red";
    private _end: Point | null = null;

    constructor(public readonly start: Point, public readonly angle: Radians) {
        this.angle = normalize(angle);
    }

    get end(): Point {
        return this._end
            ? this._end
            : {
                  x: this.start.x + Math.cos(this.angle) * 1000,
                  y: this.start.y + Math.sin(this.angle) * 1000,
              };
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = this._color;
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.stroke();
    }

    cast(segments: Segment[]): void {
        this._end = null;
        let record = Infinity;

        segments.forEach((segment) => {
            const intersection = getIntersection(this, segment);
            if (intersection && intersection.distance < record) {
                record = intersection.distance;
                this._end = intersection;
            }
        });
    }
}
