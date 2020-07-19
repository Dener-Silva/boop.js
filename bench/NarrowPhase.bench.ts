import Benchmark from "benchmark";
import { Collider } from "../src/colliders/Collider";
import { SweepAndPrune } from "../src/broad/SweepAndPrune";
import { collides } from "../src/narrow/NarrowCollisionTest";

export default function test(colliders: Collider[]) {

    let sap = new SweepAndPrune();
    sap.add(colliders);
    let potentials = sap.update();

    var suite = new Benchmark.Suite;
    suite.add('Narrow phase', () => {
        for (const pair of potentials) {
            collides(...pair);
        }
    }).on('error', (event: Benchmark.Event) => {
        console.log(event.target.name + ' failed')
    })
        .on('cycle', (event: Benchmark.Event) => {
            console.log(String(event.target));
        })
        .run();
}