import { Point } from "../colliders/Point";
import { Circle } from "../colliders/Circle";
import { Polygon } from "../colliders/Polygon";
import { Vector } from "./NarrowCollisionTest";
import { dot } from "./VectorFunctions";

export function projectPolygonOnAxis(polygon: Polygon, axis: Vector): Vector {
    let min = Infinity;
    let max = -Infinity;
    for (let ix = 0, iy = 1; ix < polygon.points.length; ix += 2, iy += 2) {
        const x = polygon.points[ix];
        const y = polygon.points[iy];
        const projected = dot(axis, x, y);
        min = Math.min(min, projected);
        max = Math.max(max, projected);
    }
    return [min, max];
}

export function projectCircleOnAxis(circle: Circle, axis: Vector): Vector {
    // Axis is expected to be normalized
    const projectedCenter = dot(axis, circle.x, circle.y);
    return [projectedCenter - circle.radius, projectedCenter + circle.radius];
}

export function projectPointOnAxis(point: Point, axis: Vector): Vector {
    const projectedPoint = dot(axis, point.x, point.y);
    return [projectedPoint, projectedPoint];
}
