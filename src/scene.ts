import { Lamp } from "./lamp";
import { Drawable } from "./models/drawable.model";
import { createMousePlacer } from "./placer/mouse.placer";
import { Polygon } from "./polygon";
import { Ray } from "./ray";
import { Segment } from "./segment";
import { SightZone } from "./sight-zone";

export class Scene {
    private _polygons: Polygon[] = [];
    private _lamps: Lamp[] = [];
    private _rays: Ray[] = [];
    private _sightZones: SightZone[] = [];

    constructor() {
        this._addEdgePolygon();

        for (let i = 0; i < 25; i++) {
            this._polygons.push(Polygon.generateRegular());
        }

        this._lamps.push(new Lamp(createMousePlacer()));
        this._lamps.push(new Lamp(createMousePlacer({ x: -10, y: 0 })));
        this._lamps.push(new Lamp(createMousePlacer({ x: 10, y: 0 })));
        this._lamps.push(new Lamp(createMousePlacer({ x: 0, y: -10 })));
        this._lamps.push(new Lamp(createMousePlacer({ x: 0, y: 10 })));
    }

    get sightZones(): SightZone[] {
        return this._sightZones;
    }

    get drawables(): Drawable[] {
        return [...this._polygons, ...this._lamps];
    }

    get _segments(): Segment[] {
        return this._polygons.flatMap(polygon => polygon.segments);
    }

    update(): void {
        const t1 = performance.now();
        this._rays = [];
        this._lamps.forEach(lamp => {
            lamp.update();
            this._rays.push(...lamp.createRays(this._segments));
        });

        this._rays.forEach(ray => {
            ray.cast(this._segments);
        });
        this._addSightZones();

        this._perfStats(performance.now() - t1);
    }

    private _addEdgePolygon(): void {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const edgePolygon = new Polygon([
            { x: 0, y: 0 },
            { x: screenWidth, y: 0 },
            { x: screenWidth, y: screenHeight },
            { x: 0, y: screenHeight },
            { x: 0, y: 0 },
        ]);
        this._polygons.push(edgePolygon);
    }

    private _addSightZones(): void {
        this._sightZones = [];
        const sortedRays = this._rays.sort((a, b) => a.angle - b.angle);
        for (let i = 0; i < sortedRays.length; i++) {
            const rayA = sortedRays[i];
            const rayB = sortedRays[(i + 1) % sortedRays.length];
            this._sightZones.push(new SightZone(rayA, rayB));
        }
    }

    private _perfStats(duration: number): void {
        const performanceElement = document.getElementById("performance");
        if (performanceElement) {
            performanceElement.innerText = `Update duration: ${duration.toFixed(2)}ms`;
        }
    }
}
