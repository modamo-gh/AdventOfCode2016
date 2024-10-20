import { readFileSync } from "fs";

const triangles = readFileSync("input.txt", "utf8")
	.trim()
	.split("\n")
	.map((triangle) =>
		triangle
			.trim()
			.split(/\s+/)
			.map((length) => parseInt(length))
	);

const isValidTriangle = (triangle, sum) => {
	for (const length of triangle) {
		if (sum - length <= length) {
			return false;
		}
	}

	return true;
};

let numberOfValidTriangles = 0;

for (let column = 0; column < triangles[0].length; column++) {
	for (let row = 0; row < triangles.length; row += 3) {
		const sum =
			triangles[row][column] +
			triangles[row + 1][column] +
			triangles[row + 2][column];

		if (
			isValidTriangle(
				[
					triangles[row][column],
					triangles[row + 1][column],
					triangles[row + 2][column]
				],
				sum
			)
		) {
			numberOfValidTriangles++;
		}
	}
}

console.log(numberOfValidTriangles);
