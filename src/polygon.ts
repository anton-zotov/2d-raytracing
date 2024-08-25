import { Drawable } from "./models/drawable.model";
import { Point } from "./models/point.model";
import { Segment } from "./segment";

export class Polygon implements Drawable {
    constructor(private _points: Point[] = []) {}

    static generateRandom(): Polygon {
        const sides = Math.floor(Math.random() * 5) + 3;
        const polygon = new Polygon();

        const center = { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight };

        for (let i = 0; i < sides - 1; i++) {
            polygon.addPoint({
                x: Math.random() * 200 - 100 + center.x,
                y: Math.random() * 150 - 75 + center.y,
            });
        }

        polygon.addPoint(polygon._points[0]);
        return polygon;
    }

    static generateRegular(): Polygon {
        const width = Math.random() * 100 + 50;
        const height = Math.random() * 100 + 50;
        const cx = Math.random() * window.innerWidth;
        const cy = Math.random() * window.innerHeight;

        const polygon = new Polygon();
        polygon.addPoint({ x: cx - width / 2, y: cy - height / 2 });
        polygon.addPoint({ x: cx + width / 2, y: cy - height / 2 });
        polygon.addPoint({ x: cx + width / 2, y: cy + height / 2 });
        polygon.addPoint({ x: cx - width / 2, y: cy + height / 2 });
        polygon.addPoint(polygon._points[0]);
        return polygon;
    }

    get segments(): Segment[] {
        const segments: Segment[] = [];
        for (let i = 0; i < this._points.length - 1; i++) {
            segments.push(new Segment(this._points[i], this._points[i + 1]));
        }
        return segments;
    }

    addPoint(point: Point): void {
        this._points.push(point);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = "white";
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.moveTo(this._points[0].x, this._points[0].y);
        this._points.forEach(point => ctx.lineTo(point.x, point.y));
        ctx.closePath();
        ctx.stroke();
        // ctx.fill();
    }
}
