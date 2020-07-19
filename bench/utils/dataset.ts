import { Collider } from "../../src/colliders/Collider";
import { Polygon } from "../../src/colliders/Polygon";
import { Point } from "../../src/colliders/Point";
import { Circle } from "../../src/colliders/Circle";

export function createColliders(maxX: number, maxY: number): Collider[] {
    let colliders: Collider[] = [];
    for (let i = 0; i < 200; i++) {
        let triangle = new Polygon([-45, -30, -45, 30, 45, 0]);
        triangle.x = Math.random() * maxX;
        triangle.y = Math.random() * maxY;
        triangle.rotation = Math.random() * 2 * Math.PI;
        colliders.push(triangle);
    }
    for (let i = 0; i < 800; i++) {
        let point = new Point();
        point.x = Math.random() * maxX;
        point.y = Math.random() * maxY;
        colliders.push(point);
    }
    for (let i = 0; i < 200; i++) {
        let circle = new Circle(75);
        circle.x = Math.random() * maxX;
        circle.y = Math.random() * maxY;
        colliders.push(circle);
    }
    return colliders;
}