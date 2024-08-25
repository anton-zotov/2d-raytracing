import { Canvas } from "./canvas";
import { Scene } from "./scene";

export class Game {
    private _canvas: Canvas = new Canvas();
    private _scene: Scene = new Scene();
    private _background: HTMLImageElement = new Image();

    constructor() {
        this._background.src = "https://steamuserimages-a.akamaihd.net/ugc/2058741574591783688/9C6BAD68B0072EBC34EAEE00DEE08662DE28BB27/";
        this._background.onload = () => {
            this._loop();
        };
    }
    _loop() {
        this._update();
        this._draw();
        requestAnimationFrame(() => this._loop());
    }
    _update() {
        this._scene.update();
    }
    _draw() {
        this._canvas.clear();
        this._canvas.draw(this._scene.sightZones);
        this._canvas.drawBackground(this._background);
        this._canvas.draw(this._scene.drawables);
    }
}
