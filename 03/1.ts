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

let numberOfValidTriangles = 0;

const isValidTriangle = (triangle, sum) => {
    for(const length of triangle){
        if(sum - length <= length){
            return false;
        }
    }

    return true;
}

for (const triangle of triangles) {
	const sum = triangle.reduce((p, c) => p + c, 0);

	if (isValidTriangle(triangle, sum)) {
		numberOfValidTriangles++;
	}
}

console.log(numberOfValidTriangles);
