import Benchmark from "benchmark";
import { Collider } from "../src/colliders/Collider";
import { SweepAndPrune } from "../src/broad/SweepAndPrune";
import { collides } from "../src/narrow/NarrowCollisionTest";

export default function test(colliders: Collider[], maxX: number, maxY: number) {

    let sap = new SweepAndPrune();
    sap.add(colliders);

    var suite = new Benchmark.Suite;
    suite.add('All', () => {
        const potentials = sap.update();
        for (const pair of potentials) {
            collides(...pair);
        }
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