import { Collider } from "../colliders/Collider";
import { Point } from "../colliders/Point";
import { Circle } from "../colliders/Circle";
import { Polygon } from "../colliders/Polygon";
import { circleVsPolygonSAT, polygonVsCircleSAT, pointVsPolygonSAT, polygonVsPolygonSAT } from "./SAT";

export type Vector = [number, number];

export function collides(a: Collider, b: Collider): boolean {
    // It ain't pretty but it gets the job done
    if (a instanceof Circle) {
        if (b instanceof Circle) {
            return circleVsCircle(a, b);
        } else if (b instanceof Point) {
            return circleVsPoint(a, b);
        } else if (b instanceof Polygon) {
            return circleVsPolygon(a, b);
        }
    } else if (a instanceof Point) {
        if (b instanceof Circle) {
            return circleVsPoint(b, a);
        } else if (b instanceof Point) {
            return pointVsPoint(a, b);
        } else if (b instanceof Polygon) {
            return pointVsPolygon(a, b);
        }
    } else if (a instanceof Polygon) {
        if (b instanceof Circle) {
            return circleVsPolygon(b, a);
        } else if (b instanceof Point) {
            return pointVsPolygon(b, a);
        } else if (b instanceof Polygon) {
            return polygonVsPolygon(a, b);
        }
    }
    throw new Error(`One or both colliders is of unknown type: a = ${a.constructor.name} b = ${b.constructor.name}`);
}

function circleVsCircle(a: Circle, b: Circle) {
    return Math.hypot(a.x - b.x, a.y - b.y) <= a.radius + b.radius;
}

function circleVsPoint(a: Circle, b: Point) {
    return Math.hypot(a.x - b.x, a.y - b.y) <= a.radius;
}

function circleVsPolygon(a: Circle, b: Polygon) {
    return circleVsPolygonSAT(a, b) && polygonVsCircleSAT(b, a);
}

function pointVsPoint(a: Point, b: Point) {
    return a.x === b.x && a.y === b.y;
}

function pointVsPolygon(a: Point, b: Polygon) {
    return pointVsPolygonSAT(a, b);
}

function polygonVsPolygon(a: Polygon, b: Polygon) {
    return polygonVsPolygonSAT(a, b) && polygonVsPolygonSAT(b, a);
}