import { getAngle, normalize } from "./math/radian";
import { Radians } from "./models/angle.model";
import type { Drawable } from "./models/drawable.model";
import { Point } from "./models/point.model";

export class Segment implements Drawable {
    private _color: string = "black";
    private _angle: Radians;

    constructor(public readonly start: Point, public readonly end: Point) {
        this._angle = getAngle(this.start, this.end);
    }

    get angle(): number {
        return this._angle;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = this._color;
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.stroke();
    }
}
