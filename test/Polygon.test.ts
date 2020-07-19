import chai from 'chai'
import chaiAlmost from 'chai-almost';
chai.use(chaiAlmost());
const expect = chai.expect;
import { Polygon } from "../src/colliders/Polygon";
import { AABB } from "../src/colliders/Collider";

describe('Polygon', () => {

    context('Axis Aligned Bounding Box', () => {

        it('should get the correct aabb', () => {
            let polygon = new Polygon([-1, -1, -1, 1, 1, 1, 1, -1]);

            // The AABB is the smallest box that can contain the object in any rotation
            let expected: AABB = {
                minX: -Math.SQRT2,
                maxX: Math.SQRT2,
                minY: -Math.SQRT2,
                maxY: Math.SQRT2
            }
            expect(polygon.aabb).to.eql(expected);
        });

    });

    context('Validate points', () => {

        it('should only accept array of points with even length', () => {
            for (let i = 0; i < 100; i++) {
                const points = new Array<number>(i).fill(0).map(() => Math.random());
                if (i % 2) {
                    expect(() => new Polygon(points)).to.throw();
                } else {
                    expect(() => new Polygon(points)).to.not.throw();
                }
            }
        });

    });

    context('Rotation', () => {

        it('should rotate 90 degrees', () => {
            let polygon = new Polygon([-1, -1, -1, 1, 1, 1, 1, -1]);

            polygon.rotation = Math.PI / 2;

            let expected = [1, -1, -1, -1, -1, 1, 1, 1];
            expect(polygon.points).to.deep.almost.equal(new Float64Array(expected));
        });

        it('should rotate 45 degrees', () => {
            let polygon = new Polygon([-1, -1, -1, 1, 1, 1, 1, -1]);

            polygon.rotation = Math.PI / 4;

            let expected = [0, -Math.SQRT2, -Math.SQRT2, 0, 0, Math.SQRT2, Math.SQRT2, 0];
            expect(polygon.points).to.deep.almost.equal(new Float64Array(expected));
        });

        it('should rotate 90 degrees on the correct pivot', () => {
            let polygon = new Polygon([-1, -1, -1, 1, 1, 1, 1, -1]);
            polygon.x = polygon.y = 1;

            polygon.rotation = Math.PI / 2;

            let expected = [2, 0, 0, 0, 0, 2, 2, 2];
            expect(polygon.points).to.deep.almost.equal(new Float64Array(expected));
        });

        it('should update the points when rotating', () => {
            let polygon = new Polygon([-1, -1, -1, 1, 1, 1, 1, -1]);

            polygon.points
            polygon.rotation = Math.PI / 2;

            let expected = [1, -1, -1, -1, -1, 1, 1, 1];
            expect(polygon.points).to.deep.almost.equal(new Float64Array(expected));
        });

    });

});