import { readFileSync } from "fs";

const instructions = readFileSync("input.txt", "utf8").trim().split("\n");
const SCREEN_WIDTH = 50
const SCREEN_LENGTH = 6;
const screen = Array.from({ length: SCREEN_LENGTH }, () => Array(SCREEN_WIDTH).fill("."));

const createRect = (width: number, length: number) => {
	for (let i = 0; i < width; i++) {
		for (let j = 0; j < length; j++) {
			screen[i][j] = "#";
		}
	}
};

const rotateRow = (row: number, rotationAmount: number) => {
	const rowClone = [...screen[row]];
	const rowLength = screen[row].length;

	for (let i = 0; i < rowLength; i++) {
		screen[row][i] = rowClone[(i + (rowLength - rotationAmount)) % rowLength];
	}
};

const rotateColumn = (column: number, rotationAmount: number) => {
	const columnClone = [];
	const columnLength = screen.length;

	for (let i = 0; i < columnLength; i++) {
		columnClone.push(screen[i][column]);
	}

	for (let i = 0; i < columnLength; i++) {
		screen[i][column] = columnClone[(i + (columnLength - rotationAmount)) % columnLength];
	}
};

for (const instruction of instructions) {
	const tokens = instruction.split(" ");
	const action = tokens[0];

	if (action === "rect") {
		const [width, length] = tokens[1]
			.split("x")
			.map((dimension) => parseInt(dimension));

		createRect(length, width);
	} else if (action === "rotate" && tokens[1] === "row") {
		const row = parseInt(tokens[2].split("=")[1]);
		const rotationAmount = parseInt(tokens[4]);

		rotateRow(row, rotationAmount);
	} else if (action === "rotate" && tokens[1] === "column") {
		const column = parseInt(tokens[2].split("=")[1]);
		const rotationAmount = parseInt(tokens[4]);

		rotateColumn(column, rotationAmount);
	}
}

let numberOfLitPixels = 0;

for(let i = 0; i < screen.length; i++){
	for(let j = 0; j < screen[i].length; j++){
		if(screen[i][j] === "#"){
			numberOfLitPixels++;
		}
	}
}

console.log(numberOfLitPixels)