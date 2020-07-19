import { Collider } from "./colliders/Collider";
import { SweepAndPrune } from "./broad/SweepAndPrune";
import { collides } from "./narrow/NarrowCollisionTest";

export type ColliderPairs = [Collider, Collider][]

export class CollisionSystem {

    private sap = new SweepAndPrune();

    add(colliders: Collider[]) {
        this.sap.add(colliders);
    }

    remove(colliders: Collider[]) {
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

