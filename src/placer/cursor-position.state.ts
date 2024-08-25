import { Point } from "../models/point.model";

class CursorPositionState {
    private _position: Point = { x: 0, y: 0 };

    constructor() {
        window.addEventListener("mousemove", (event) => {
            this._position = { x: event.clientX, y: event.clientY };
        });
    }

    get position(): Point {
        return this._position;
    }
}

export const cursorPositionState = new CursorPositionState();
