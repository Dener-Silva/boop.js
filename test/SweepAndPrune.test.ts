import { SweepAndPrune } from '../src/broad/SweepAndPrune';
import { expect } from 'chai';
import { Circle } from '../src/colliders/Circle';
import { Collider } from '../src/colliders/Collider';
import { Point } from '../src/colliders/Point';

describe('Sweep And Prune test', () => {

    context('Potentials circle x circle', () => {

        it('should get the potential collisions', () => {
            let circleA = new Circle(5);
            let circleB = new Circle(5);
            expectPotentialCollisions(circleA, circleB)
        });

        it('should get no potential collisions', () => {
            let circleA = new Circle(5);
            circleA.x = 15;
            let circleB = new Circle(5);
            expectNoPotentialCollisions(circleA, circleB);
        });

        it('should get the potential collisions on Y axis', () => {
            let circleA = new Circle(5);
            let circleB = new Circle(5);
            circleB.y = -1;
            let sap = new SweepAndPrune();

            sap.add([circleA, circleB]);
            let potentials = sap.update();

            expectUnordered(potentials, [[circleA, circleB]]);
        });

        it('should ignore disabled collider', () => {
            let circleA = new Circle(5);
            let circleB = new Circle(5);
            circleB.enabled = false;
            expectNoPotentialCollisions(circleA, circleB);
        });
    });

    context('Potentials point x point', () => {

        it('should get the potential collisions', () => {
            let pointA = new Point();
            let pointB = new Point();
            pointA.x = pointA.y = pointB.x = pointB.y = 0;
            expectPotentialCollisions(pointA, pointB)
        });

        it('should get no potential collisions', () => {
            let pointA = new Point();
            let pointB = new Point();
            pointA.x = pointA.y = 0.1;
            pointB.x = pointB.y = 10;
            expectNoPotentialCollisions(pointA, pointB);
        });
    });

    context('Many objects', () => {

        it('should get no false positives', () => {
            let sap = new SweepAndPrune();
            let colliders: Collider[] = []
            for (let i = 0; i < 20; i++) {
                for (let j = 0; j < 20; j++) {
                    let circle = new Circle(0.49);
                    circle.x = i;
                    circle.y = j;
                    colliders.push(circle);
                }
            }

            sap.add(colliders);
            let potentials = sap.update();

            expect(potentials).to.be.empty;
        });

        it('should get all collisions when C is closed before B', () => {
            let sap = new SweepAndPrune();
            let a = new Circle(1),
                b = new Circle(2),
                c = new Circle(1);
            a.x = 0;
            b.x = 2;
            c.x = 4;
            a.userData = 'a';
            b.userData = 'b';
            c.userData = 'c';

            sap.add([a, b, c]);
            let potentials = sap.update();

            expectUnordered(potentials, [[a, b], [b, c]]);
        });

        it('pairs should be all combinations of the colliding objects', () => {
            let sap = new SweepAndPrune();
            let a = new Circle(3),
                b = new Circle(3),
                c = new Circle(3);
            a.x = 0;
            b.x = 1;
            c.x = 2;
            a.userData = 'a';
            b.userData = 'b';
            c.userData = 'c';

            sap.add([a, b, c]);
            let potentials = sap.update();

            expectUnordered(potentials, [[a, b], [a, c], [b, c]]);
        });
    });

    context('Persistence', () => {

        it('should clear the pairs from last frame', () => {
            let a = new Circle(5);
            let b = new Circle(5);
            let colliders = [a, b];
            let sap = new SweepAndPrune();

            sap.add(colliders);
            sap.update();
            let potentials = sap.update();

            expectUnordered(potentials, [[a, b]]);
        });
    });

    context('Remove colliders', () => {

        it('should not affect the other colliders', () => {
            let sap = new SweepAndPrune();
            let a = new Circle(3),
                b = new Circle(3),
                c = new Circle(3);
            a.x = 0;
            b.x = 1;
            c.x = 2;

            sap.add([a, b, c]);
            sap.remove([b]);
            let potentials = sap.update();

            expectUnordered(potentials, [[a, c]]);
        });
    });

});

function expectNoPotentialCollisions(a: Collider, b: Collider) {
    let colliders = [a, b];
    let sap = new SweepAndPrune();

    sap.add(colliders);
    const potentials = sap.update();

    expect(potentials).to.be.empty;
}

function expectPotentialCollisions(a: Collider, b: Collider) {
    let colliders = [a, b];
    let sap = new SweepAndPrune();

    sap.add(colliders);
    let potentials = sap.update();

    expectUnordered(potentials, [[a, b]]);
}

function expectUnordered(actual: [Collider, Collider][], expected: [Collider, Collider][]) {
    let compareColliders = (a: Collider, b: Collider) => a.x - b.x || a.y - b.y;
    for (let pair of actual) {
        pair.sort(compareColliders);
    }
    for (let pair of expected) {
        pair.sort(compareColliders);
    }
    actual.sort((a, b) => compareColliders(a[0], b[0]) || compareColliders(a[1], b[1]));
    expected.sort((a, b) => compareColliders(a[0], b[0]) || compareColliders(a[1], b[1]));

    expect(actual).to.deep.equal(expected);
}