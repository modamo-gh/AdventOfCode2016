import { readFileSync } from "fs";

const instructions = readFileSync("input.txt", "utf8").trim().split("\n");
const keypad = [
	[null, null, 1, null, null],
	[null, 2, 3, 4, null, null],
	[5, 6, 7, 8, 9],
	[null, "A", "B", "C", null, null],
	[null, null, "D", null, null]
];
const keypadLength = keypad.length;
const coordinate = { row: 2, column: 0 };
const directions = {
	U: { dr: -1, dc: 0 },
	D: { dr: 1, dc: 0 },
	L: { dr: 0, dc: -1 },
	R: { dr: 0, dc: 1 }
};

let bathroomCode = "";

for (const instruction of instructions) {
	for (const direction of instruction) {
		coordinate.row =
			coordinate.row + directions[direction].dr >= 0 &&
			coordinate.row + directions[direction].dr < keypadLength &&
			keypad[coordinate.row + directions[direction].dr][coordinate.column]
				? coordinate.row + directions[direction].dr
				: coordinate.row;
		coordinate.column =
			coordinate.column + directions[direction].dc >= 0 &&
			coordinate.column + directions[direction].dc < keypadLength &&
			keypad[coordinate.row][coordinate.column + directions[direction].dc]
				? coordinate.column + directions[direction].dc
				: coordinate.column;
	}

	bathroomCode += keypad[coordinate.row][coordinate.column];
}

console.log(bathroomCode);
