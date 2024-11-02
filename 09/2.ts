import { readFileSync } from "fs";

const strings = readFileSync("input.txt", "utf8").trim().split("\n");

const getDecompressedStringLength = (string: string): number => {
	const matches = [...string.matchAll(/\((\d+)x(\d+)\)/g)];

	if (!matches.length) {
		return string.length;
	}

	const match = matches[0];
	const marker = match[0];
	const markerLength = marker.length;
	const subsequenceLength = parseInt(match[1]);
	const postMarkerIndex = match.index + markerLength;
	const postSubsequenceIndex = postMarkerIndex + subsequenceLength;

	return (
		match.index +
		parseInt(match[2]) *
			getDecompressedStringLength(
				string.slice(postMarkerIndex, postSubsequenceIndex)
			) +
		getDecompressedStringLength(string.slice(postSubsequenceIndex))
	);
};

for (const string of strings) {
	console.log(getDecompressedStringLength(string));
}
