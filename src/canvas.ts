import { Drawable } from "./models/drawable.model";

export class Canvas {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;

    constructor() {
        this._canvas = document.createElement("canvas");
        this._setCanvasSize();
        this._ctx = this._canvas.getContext("2d")!;
        document.body.appendChild(this._canvas);
    }

    private _setCanvasSize(): void {
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
    }

    clear(): void {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.fillStyle = "black";
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }

    drawBackground(img: HTMLImageElement): void {
        this._ctx.globalCompositeOperation = "multiply";
        this._ctx.drawImage(img, 0, 0, this._canvas.width, this._canvas.height);
        this._ctx.globalCompositeOperation = "source-over";
    }

    draw(drawables: Drawable[]): void {
        drawables.forEach(drawable => drawable.draw(this._ctx));
    }
}
