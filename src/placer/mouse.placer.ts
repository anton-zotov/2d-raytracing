import { Point } from "../models/point.model";
import { cursorPositionState } from "./cursor-position.state";
import { Placer } from "./placer.model";

export const createMousePlacer =
    (offset: Point = { x: 0, y: 0 }): Placer =>
    () => {
        return {
            x: offset.x + cursorPositionState.position.x,
            y: offset.y + cursorPositionState.position.y,
        };
    };
