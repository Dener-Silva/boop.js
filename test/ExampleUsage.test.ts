import { expect } from 'chai'
import { CollisionSystem, Collider, Circle, Point, Polygon } from '../src';

describe('Example Usage', () => {

    context('Usage example found in README.md', () => {

        it('should create colliders, update the system and get result', () => {
            const collisionSystem = new CollisionSystem();

            let triangle = new Polygon([-1, 0, 0, -1, 1, 0]);
            let point = new Point();
            let circle = new Circle(1);

            // Add colliders to the system
            collisionSystem.add(triangle, point, circle);

            function yourGameLoop(): void {
                // First, update the positions
                triangle.x += 1
                triangle.y += 2
                triangle.rotation += Math.PI / 6;

                // Then, get the collision pairs
                let pairs = collisionSystem.getCollisions();

                for (let pair of pairs) {
                    // Do your stuff
                    reactToCollision(...pair);
                }
            }

            for (let _ of [1, 2, 3]) {
                yourGameLoop();
            }
        });

    });

});

function reactToCollision(a: Collider, b: Collider) {
    expect(a).to.not.equal(b);
}