import Benchmark from "benchmark";
import { Collider } from "../src/colliders/Collider";
import { SweepAndPrune } from "../src/broad/SweepAndPrune";

export default function test(colliders: Collider[], maxX: number, maxY: number) {

    let sap = new SweepAndPrune();
    sap.add(colliders);

    var suite = new Benchmark.Suite;
    suite.add('Broad phase', () => {
        sap.update();
        colliders[Math.floor(Math.random() * colliders.length)].x = Math.random() * maxX;
        colliders[Math.floor(Math.random() * colliders.length)].y = Math.random() * maxY;
    }).add('Remove colliders from system', () => {
        sap.remove(colliders);
        sap.add(colliders);
    }).on('error', (event: Benchmark.Event) => {
        console.log(event.target.name + ' failed')
    })
        .on('cycle', (event: Benchmark.Event) => {
            console.log(String(event.target));
        })
        .run();
}