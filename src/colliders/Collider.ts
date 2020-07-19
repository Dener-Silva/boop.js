export type AABB = { minX: number; maxX: number; minY: number; maxY: number; };

export abstract class Collider {
    userData?: any;
    enabled = true;
    public x = 0;
    public y = 0;

    set rotation(_radians: number) {
    }

    get rotation(): number {
        return 0;
    }

    public abstract get aabb(): AABB;
}
