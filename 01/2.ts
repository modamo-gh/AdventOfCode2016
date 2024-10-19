import { readFileSync } from 'node:fs';
 
const instructions = readFileSync('input.txt', 'utf8')
  .trim()
  .split(',')
  .map((instruction) => instruction.trim())
  .map((instruction) => ({
    direction: instruction[0],
    numberOfSteps: parseInt(instruction.slice(1)),
  }));
 
const directions = [
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
];
 
let cardinalDirection = 0;
 
const coordinates = { x: 0, y: 0 };
const visitedLocations = new Set(['(0, 0)']);
 
let hqFound = false;
 
for (const instruction of instructions) {
  if (instruction.direction === 'L') {
    cardinalDirection = cardinalDirection - 1 >= 0 ? cardinalDirection - 1 : 3;
  } else if (instruction.direction === 'R') {
    cardinalDirection = cardinalDirection + 1 <= 3 ? cardinalDirection + 1 : 0;
  }
 
  for (let i = 0; i < instruction.numberOfSteps; i++) {
    coordinates.x += directions[cardinalDirection].x;
    coordinates.y += directions[cardinalDirection].y;
 
    const updatedCoordinateString = `(${coordinates.x}, ${coordinates.y})`;
 
    if (!visitedLocations.has(updatedCoordinateString)) {
      visitedLocations.add(updatedCoordinateString);
    } else {
      hqFound = true;
      break;
    }
  }
 
  if (hqFound) {
    break;
  }
}
 
console.log(Math.abs(coordinates.x) + Math.abs(coordinates.y));