import { expect } from 'chai'
import { Point } from '../src/colliders/Point';
import { collides } from '../src/narrow/NarrowCollisionTest';
import { Circle } from '../src/colliders/Circle';
import { Collider } from '../src/colliders/Collider';
import { Polygon } from '../src/colliders/Polygon';

describe('SAT', () => {

    context('Unknown collider type', () => {

        it('should fail with unknown A', () => {
            let a = undefined as unknown as Collider,
                b = new Circle(1);

            expect(() => collides(a, b)).to.throw;
        });

        it('should fail with unknown B', () => {
            let a = new Circle(1),
                b = undefined as unknown as Collider;

            expect(() => collides(a, b)).to.throw;
        });

        it('should fail with unknown A and B', () => {
            let a = undefined as unknown as Collider,
                b = undefined as unknown as Collider;

            expect(() => collides(a, b)).to.throw;
        });

        it('should not fail with known A and B', () => {
            let colliders = [new Circle(1), new Point(), new Polygon([0, 0, 1, 0, 0, 1])];

            for (let a of colliders) {
                for (let b of colliders) {
                    expect(() => collides(a, b)).to.not.throw;
                }
            }
        });

    });

    context('Circle vs Circle', () => {

        it('should collide', () => {
            let a = new Circle(1),
                b = new Circle(1);
            a.x = 2;

            expect(collides(a, b)).to.be.true;
        });

        it('should not collide', () => {
            let a = new Circle(1),
                b = new Circle(1);
            a.x = 2.1;

            expect(collides(a, b)).to.be.false;
        });

    });

    context('Circle vs Point', () => {

        it('should collide', () => {
            let a = new Circle(1),
                b = new Point();
            a.x = 1;

            expect(collides(a, b)).to.be.true;
            expect(collides(b, a)).to.be.true;
        });

        it('should not collide', () => {
            let a = new Circle(1),
                b = new Point();
            a.x = 1.1;

            expect(collides(a, b)).to.be.false;
            expect(collides(b, a)).to.be.false;
        });

    });

    context('Circle vs Polygon', () => {

        it('should collide', () => {
            let a = new Circle(1),
                b = new Polygon([-1, 0, 0, 1, 1, 0, 0, -1]);

            // Up
            a.y = -2;
            expect(collides(a, b)).to.be.true;
            expect(collides(b, a)).to.be.true;

            // Down Right
            a.x = a.y = (Math.sqrt(2) / 2) + 0.5;
            expect(collides(a, b)).to.be.true;
            expect(collides(b, a)).to.be.true;
        });

        it('should not collide', () => {
            let a = new Circle(1),
                b = new Polygon([-1, 0, 0, 1, 1, 0, 0, -1]);

            // Up, will bail out on circle vs polygon
            a.y = -2.1;
            expect(collides(a, b)).to.be.false;
            expect(collides(b, a)).to.be.false;

            // Down Right, will bail out on polygon vs circle
            a.x = a.y = (Math.sqrt(2) / 2) + 0.51;
            expect(collides(a, b)).to.be.false;
            expect(collides(b, a)).to.be.false;
        });

    });

    context('Point vs Point', () => {

        it('should collide', () => {
            let a = new Point(),
                b = new Point();

            expect(collides(a, b)).to.be.true;
        });

        it('should not collide', () => {
            let a = new Point(),
                b = new Point();
            a.x = 0.1;

            expect(collides(a, b)).to.be.false;
        });

    });

    context('Point vs Polygon', () => {

        it('should collide', () => {
            let a = new Point(),
                b = new Polygon([-1, 0, 0, 1, 1, 0, 0, -1]);

            // Up
            a.y = -1;
            expect(collides(a, b)).to.be.true;
            expect(collides(b, a)).to.be.true;

            // Down Right
            a.x = a.y = 0.5;
            expect(collides(a, b)).to.be.true;
            expect(collides(b, a)).to.be.true;
        });

        it('should not collide', () => {
            let a = new Point(),
                b = new Polygon([-1, 0, 0, 1, 1, 0, 0, -1]);

            // Up, will bail out on circle vs polygon
            a.y = -2.1;
            expect(collides(a, b)).to.be.false;
            expect(collides(b, a)).to.be.false;

            // Down Right, will bail out on polygon vs circle
            a.x = a.y = (Math.sqrt(2) / 2) + 0.51;
            expect(collides(a, b)).to.be.false;
            expect(collides(b, a)).to.be.false;
        });

    });

    context('Polygon vs Polygon', () => {

        it('should collide', () => {
            let a = new Polygon([-1, 0, 0, 1, 1, 0, 0, -1]),
                b = new Polygon([-1, 0, 0, 1, 1, 0, 0, -1]);

            a.x = a.y = - 1;
            expect(collides(a, b)).to.be.true;
            expect(collides(b, a)).to.be.true;
        });

        it('should not collide', () => {
            let a = new Polygon([-1, 0, 0, 1, 1, 0, 0, -1]),
                b = new Polygon([-1, 0, 0, 1, 1, 0, 0, -1]);

            a.x = a.y = - 1.1;
            expect(collides(a, b)).to.be.false;
            expect(collides(b, a)).to.be.false;
        });

        it('triangles facing outward should not collide', () => {
            let a = new Polygon([0, 1, 0, -1, 1, 0]),
                b = new Polygon([0, 1, 0, -1, -1, 0]);
            a.userData = 'a';
            b.userData = 'b';

            a.x = 0.1;
            expect(collides(a, b)).to.be.false;
            expect(collides(b, a)).to.be.false;
        });

    });

});