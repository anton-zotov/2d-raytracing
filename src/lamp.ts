import { getAngle } from "./math/radian";
import { Radians } from "./models/angle.model";
import { Drawable } from "./models/drawable.model";
import { Point } from "./models/point.model";
import { Placer } from "./placer/placer.model";
import { Ray } from "./ray";
import { Segment } from "./segment";

export class Lamp implements Drawable {
    private _position: Point = { x: 0, y: 0 };

    constructor(private readonly _getPlace: Placer) {}

    get position(): Point {
        return this._position;
    }

    update(): void {
        this._updatePosition();
    }

    createRays(segments: Segment[]): Ray[] {
        const edges = segments.flatMap(segment => [segment.start, segment.end]);
        const uniqueAngles = new Set(
            edges.flatMap(edge => {
                const angle = getAngle(this._position, edge);
                return [angle - 0.0001, angle, angle + 0.0001] as Radians[];
            })
        );
        return Array.from(uniqueAngles).map(angle => new Ray(this._position, angle));
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(this._position.x, this._position.y, 5, 0, 2 * Math.PI);
        ctx.fill();
    }

    private _updatePosition(): void {
        this._position = this._getPlace();
    }
}
