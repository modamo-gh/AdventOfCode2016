import { readFileSync } from "node:fs";

const instructions: { direction: string; numberOfSteps: number }[] =
	readFileSync("input.txt", "utf8")
		.trim()
		.split(",")
		.map((instruction: string) => instruction.trim())
		.map((instruction: string) => ({
			direction: instruction[0],
			numberOfSteps: parseInt(instruction.slice(1))
		}));

const directions = [
	{ x: 0, y: 1 },
	{ x: 1, y: 0 },
	{ x: 0, y: -1 },
	{ x: -1, y: 0 }
];

let cardinalDirection = 0;

const coordinates = { x: 0, y: 0 };

for (const instruction of instructions) {
	if (instruction.direction === "L") {
		cardinalDirection =
			cardinalDirection - 1 >= 0 ? cardinalDirection - 1 : 3;
	} else if (instruction.direction === "R") {
		cardinalDirection =
			cardinalDirection + 1 <= 3 ? cardinalDirection + 1 : 0;
	}

	coordinates.x =
		coordinates.x +
		directions[cardinalDirection].x * instruction.numberOfSteps;

	coordinates.y =
		coordinates.y +
		directions[cardinalDirection].y * instruction.numberOfSteps;
}

console.log(Math.abs(coordinates.x) + Math.abs(coordinates.y));
