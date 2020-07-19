# boop.js
2D collision detection library written in typescript

## About
Boop.js is a simple collision detection library I made for my own game.
Since it has very specific goals in mind, it may lack some features that are common in other collision detection libraries.
Feel free to fork the repository and add more features.

## Features
- Created to be used with Pixi.js
  - Y axis is inverted
  - Rotations in radians
  - Points are described as a flat list.
  ```typescript
  let polygon = new Polygon([-1, 0, 0, 1, 1, 0, 0, -1]);
  ```
- Can be used on the browser or on the server with node.js
- Good performance
  - Handles 1200 colliders at 2800 ops/sec with test data based on my game
  
## Not Features
- No overlap data, though I may add in the future
- No overlap negation
- No concave polygon support
- No pyhsics. If you want pyhsics you are better off using something like Matter.js

## Usage example
```typescript
const collisionSystem = new CollisionSystem();

let triangle = new Polygon([-1, 0, 0, -1, 1, 0]);
let point = new Point();
let circle = new Circle(1);

// Add colliders to the system
collisionSystem.add([triangle, point, circle]);

function yourGameLoop(): void {
  // First, update the positions
  triangle.x += 1
  triangle.y += 2
  triangle.rotation += Math.PI / 6;

  // Then, get the collision pairs
  let pairs = collisionSystem.getCollisions();

  for (let pair of pairs) {
    // Do your stuff
    reactToCollision(...pair);
  }
}
```
