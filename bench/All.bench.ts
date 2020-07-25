import Benchmark from "benchmark";
import { Collider } from "../src/colliders/Collider";
import { SweepAndPrune } from "../src/broad/SweepAndPrune";
import { collides } from "../src/narrow/NarrowCollisionTest";
import { CollisionSystem } from "../src";

export default function test(colliders: Collider[], maxX: number, maxY: number) {

    let system = new CollisionSystem();
    system.add(...colliders);

    var suite = new Benchmark.Suite;
    suite.add('All', () => {
        system.getCollisions();
        colliders[Math.floor(Math.random() * colliders.length)].x = Math.random() * maxX;
        colliders[Math.floor(Math.random() * colliders.length)].y = Math.random() * maxY;
    }).on('error', (event: Benchmark.Event) => {
        console.log(event.target.name + ' failed')
    })
        .on('cycle', (event: Benchmark.Event) => {
            console.log(String(event.target));
        })
        .run();
}