import { Collider as ColliderExport } from "./colliders/Collider";
import { SweepAndPrune } from "./broad/SweepAndPrune";
import { collides } from "./narrow/NarrowCollisionTest";
import { Circle as CircleExport } from "./colliders/Circle";
import { Point as PointExport } from "./colliders/Point";
import { Polygon as PolygonExport } from "./colliders/Polygon";

export type ColliderPairs = [Collider, Collider][]

export class CollisionSystem {

    private sap = new SweepAndPrune();

    add(...colliders: Collider[]) {
        this.sap.add(colliders);
    }

    remove(...colliders: Collider[]) {
        this.sap.remove(colliders);
    }

    getCollisions(): ColliderPairs {
        const potentials = this.broadPhase();
        return this.narrowPhase(potentials);
    }

    private broadPhase(): ColliderPairs {
        return this.sap.update();
    }

    private narrowPhase(potentials: ColliderPairs): ColliderPairs {
        const collisions: ColliderPairs = []
        for (const pair of potentials) {
            if (collides(...pair)) {
                collisions.push(pair);
            }
        }
        return collisions;
    }
}

// Exports for the API
export const Collider = ColliderExport;
export type Collider = ColliderExport;
export const Circle = CircleExport;
export type Circle = CircleExport;
export const Point = PointExport;
export type Point = PointExport;
export const Polygon = PolygonExport;
export type Polygon = PolygonExport;