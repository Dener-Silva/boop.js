import { Collider, AABB } from "./Collider";

export class Circle extends Collider {

    constructor(public radius: number) {
        super();
    }

    public get aabb(): AABB {
        return {
            minX: this.x - this.radius,
            maxX: this.x + this.radius,
            minY: this.y - this.radius,
            maxY: this.y + this.radius
        }
    }
}
