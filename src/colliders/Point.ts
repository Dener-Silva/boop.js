import { Collider, AABB } from "./Collider";

export class Point extends Collider {

    constructor() {
        super();
    }

    public get aabb(): AABB {
        return { minX: this.x, maxX: this.x, minY: this.y, maxY: this.y }
    }

}
