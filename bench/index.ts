import seededRandom from "./utils/SeededRNG"
Math.random = seededRandom
import testBroadPhase from "./BroadPhase.bench"
import testNarrowPhase from "./NarrowPhase.bench"
import testAll from "./All.bench"
import { createColliders } from "./utils/dataset";

let maxX = 13000, maxY = 13000;
let colliders = createColliders(maxX, maxY);

testBroadPhase(colliders, maxX, maxY);
testNarrowPhase(colliders)
testAll(colliders, maxX, maxY);