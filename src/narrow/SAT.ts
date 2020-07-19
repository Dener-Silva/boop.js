import { Point } from "../colliders/Point";
import { Circle } from "../colliders/Circle";
import { Polygon } from "../colliders/Polygon";
import { projectPolygonOnAxis, projectCircleOnAxis, projectPointOnAxis } from "./Projections";
import { normal, overlaps, normalize } from "./VectorFunctions";
import { Vector } from "./NarrowCollisionTest";

export function polygonVsPolygonSAT(a: Polygon, b: Polygon) {
    for (let i = 0; i < b.points.length; i += 2) {
        const lineSegmentX1 = b.points[i];
        const lineSegmentY1 = b.points[i + 1];
        const lineSegmentX2 = b.points[(i + 2) % b.points.length];
        const lineSegmentY2 = b.points[(i + 3) % b.points.length];

        // vector representing the slope of the line segment
        const axis: Vector = [lineSegmentX2 - lineSegmentX1, lineSegmentY2 - lineSegmentY1];
        // We get the normal axis
        normal(axis);
        // Then we project the polygons on the axis. No need to normalize
        const projectedA = projectPolygonOnAxis(a, axis);
        const projectedB = projectPolygonOnAxis(b, axis);

        if (!overlaps(projectedA, projectedB)) {
            return false;
        }
    }

    return true;
}

export function circleVsPolygonSAT(a: Circle, b: Polygon) {
    // Get closest point to circle's center
    let closestX = NaN,
        closestY = NaN,
        minimumDistance = Infinity;
    for (let ix = 0, iy = 1; ix < b.points.length; ix += 2, iy += 2) {
        const x = b.points[ix];
        const y = b.points[iy];
        const distance = Math.hypot(x - a.x, y - a.y);
        if (distance < minimumDistance) {
            minimumDistance = distance;
            closestX = x;
            closestY = y;
        }
    }
    // Project on the axis from center to the closest point on polygon
    const axis: Vector = [closestX - a.x, closestY - a.y];
    // Normalizing is necessary for projecting the cricle
    normalize(axis);
    const projectedA = projectCircleOnAxis(a, axis);
    const projectedB = projectPolygonOnAxis(b, axis);
    return overlaps(projectedA, projectedB);
}

export function polygonVsCircleSAT(a: Polygon, b: Circle) {
    for (let i = 0; i < a.points.length; i += 2) {
        const lineSegmentX1 = a.points[i];
        const lineSegmentY1 = a.points[i + 1];
        const lineSegmentX2 = a.points[(i + 2) % a.points.length];
        const lineSegmentY2 = a.points[(i + 3) % a.points.length];

        // Vector representing the slope of the line segment
        const axis: Vector = [lineSegmentX2 - lineSegmentX1, lineSegmentY2 - lineSegmentY1];
        // We get the normal axis
        normal(axis);
        // Normalizing is necessary for projecting the cricle
        normalize(axis);
        // Then we project the polygon and the circle on the axis
        const projectedA = projectCircleOnAxis(b, axis);
        const projectedB = projectPolygonOnAxis(a, axis);

        if (!overlaps(projectedA, projectedB)) {
            return false;
        }
    }

    return true;
}

export function pointVsPolygonSAT(a: Point, b: Polygon) {
    for (let i = 0; i < b.points.length; i += 2) {
        const lineSegmentX1 = b.points[i];
        const lineSegmentY1 = b.points[i + 1];
        const lineSegmentX2 = b.points[(i + 2) % b.points.length];
        const lineSegmentY2 = b.points[(i + 3) % b.points.length];

        // Vector representing the slope of the line segment
        const axis: Vector = [lineSegmentX2 - lineSegmentX1, lineSegmentY2 - lineSegmentY1];
        // We get the normal axis
        normal(axis);
        // Then we project the polygon on the axis. No need to normalize
        const projectedA = projectPointOnAxis(a, axis);
        const projectedB = projectPolygonOnAxis(b, axis);

        if (!overlaps(projectedA, projectedB)) {
            return false;
        }
    }

    return true;
}
