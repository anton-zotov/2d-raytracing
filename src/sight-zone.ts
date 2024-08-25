import { Drawable } from "./models/drawable.model";

export class SightZone implements Drawable {
    constructor(private readonly _rayA, private readonly _rayB) {}

    draw(ctx: CanvasRenderingContext2D): void {
        const length = 1;
        const zoneEnd = {
            x: (this._rayA.end.x + this._rayB.end.x) / 2,
            y: (this._rayA.end.y + this._rayB.end.y) / 2,
        };
        const normalizedEnd = {
            x: zoneEnd.x + (zoneEnd.x - this._rayA.start.x) * length,
            y: zoneEnd.y + (zoneEnd.y - this._rayA.start.y) * length,
        };
        const gradient = ctx.createLinearGradient(
            this._rayA.start.x,
            this._rayA.start.y,
            normalizedEnd.x,
            normalizedEnd.y
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(this._rayA.start.x, this._rayA.start.y);
        ctx.lineTo(this._rayA.end.x, this._rayA.end.y);
        ctx.lineTo(this._rayB.end.x, this._rayB.end.y);
        ctx.lineTo(this._rayB.start.x, this._rayB.start.y);
        ctx.fill();
    }
}
