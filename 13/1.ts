import { readFileSync } from "fs";

const OFFICE_DESIGNERS_FAVORTIE_NUMBER = parseInt(
	readFileSync("input.txt", "utf8").trim()
);
const [targetColumn, targetRow] = [31, 39];
const officeLayout = Array.from(
	{ length: Math.ceil(targetRow * 1.5) },
	(row) => new Array(Math.ceil(targetColumn * 1.5))
);

const populateOffice = (officeLayout: string[][]) => {
	for (let y = 0; y < officeLayout.length; y++) {
		for (let x = 0; x < officeLayout[y].length; x++) {
			const result =
				OFFICE_DESIGNERS_FAVORTIE_NUMBER +
				(x * x + 3 * x + 2 * x * y + y + y * y);
			const binaryResult = result.toString(2);
			const numberOfOneBits = binaryResult
				.split("")
				.filter((bit) => bit === "1").length;

			numberOfOneBits % 2 === 0
				? (officeLayout[y][x] = ".")
				: (officeLayout[y][x] = "#");
		}
	}
};

populateOffice(officeLayout);

const visitedCells = new Set<string>();

const dfs = (column: number, row: number, length: number) => {
	if (column === targetColumn && row === targetRow) {
		return length;
	}

	let localShortest = Infinity;

	const directions = [
		{ dc: -1, dr: 0 },
		{ dc: 0, dr: 1 },
		{ dc: 1, dr: 0 },
		{ dc: 0, dr: -1 },
	];

	for (const direction of directions) {
		const newColumn = column + direction.dc;
		const newRow = row + direction.dr;
		const newCoordinateString = `(${newColumn}, ${newRow})`;

		if (
			newRow >= 0 &&
			newRow < officeLayout.length &&
			newColumn >= 0 &&
			newColumn < officeLayout[newRow].length &&
			!visitedCells.has(newCoordinateString) &&
			officeLayout[newRow][newColumn] === "."
		) {
			visitedCells.add(newCoordinateString);
			localShortest = Math.min(
				dfs(newColumn, newRow, length + 1),
				localShortest
			);
			visitedCells.delete(newCoordinateString);
		}
	}

	return localShortest;
};

console.log(dfs(1, 1, 0));
