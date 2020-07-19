import { Vector } from "./NarrowCollisionTest";

export function overlaps(projectedA: Vector, projectedB: Vector) {
    const aMin = projectedA[0],
        aMax = projectedA[1],
        bMin = projectedB[0],
        bMax = projectedB[1];

    return aMin <= bMax && bMin <= aMax;
}

export function normal(vector: Vector) {
    // Rotates the vector 90 degrees
    const tempX = vector[0];
    vector[0] = -vector[1];
    vector[1] = tempX;
}

export function normalize(vector: Vector) {
    const magnitude = Math.hypot(...vector);
    vector[0] /= magnitude;
    vector[1] /= magnitude;
}

export function dot(axis: Vector, x: number, y: number) {
    return axis[0] * x + axis[1] * y;
}
