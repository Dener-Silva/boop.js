import { Collider, AABB } from "./Collider";

export class Polygon extends Collider {

    private _rotation = 0;
    private _x = 0;
    private _y = 0;

    private radius: number;
    // Optimization: Float64Array is about 25% faster than number[] in this case
    private originalPoints: Float64Array;
    private _points: Float64Array;
    // Optimization: Points are cached for better performance.
    // They need to be recalculated every time x, y or rotation are changed.
    protected needsRecalcualtion = true;

    constructor(points: number[]) {
        super();
        if (points.length % 2) {
            throw new Error(`Points array size should be multiple of two. The actual size is ${points.length}.`)
        }
        this.originalPoints = new Float64Array(points);
        this._points = new Float64Array(points);
        this.radius = this.getRadius(points);
    }

    set x(x: number) {
        this._x = x;
        this.needsRecalcualtion = true;
    }

    get x(): number {
        return this._x;
    }

    set y(y: number) {
        this._y = y;
        this.needsRecalcualtion = true;
    }

    get y(): number {
        return this._y;
    }

    set rotation(radians: number) {
        this._rotation = radians % (Math.PI * 2);
        this.needsRecalcualtion = true;
    }

    get rotation(): number {
        return this._rotation;
    }

    private getRadius(points: number[]) {
        let radius = 0;
        for (let ix = 0, iy = 1; ix < points.length; ix += 2, iy += 2) {
            let distance = Math.hypot(points[ix], points[iy]);
            radius = Math.max(radius, distance);
        }
        return radius;
    }

    get aabb(): AABB {
        return {
            minX: this.x - this.radius,
            maxX: this.x + this.radius,
            minY: this.y - this.radius,
            maxY: this.y + this.radius
        }
    }

    get points() {
        if (this.needsRecalcualtion) {
            this.recalculate();
            this.needsRecalcualtion = false;
        }
        return this._points;
    }

    protected recalculate() {
        const cos = Math.cos(this._rotation);
        const sin = Math.sin(this._rotation);

        // Recalculate points
        for (let ix = 0, iy = 1; ix < this.originalPoints.length; ix += 2, iy += 2) {
            // Start at original points
            const originalX = this.originalPoints[ix];
            const originalY = this.originalPoints[iy];
            // Rotate and translate
            this._points[ix] = (originalX * cos - originalY * sin) + this.x;
            this._points[iy] = (originalX * sin + originalY * cos) + this.y;
        }
    }
}
