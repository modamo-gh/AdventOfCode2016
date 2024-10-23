import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8").trim().split("\r\n");
const lengthOfMessage = input[0].length;
const errorCorrectedMessage = new Array(lengthOfMessage);

for (let i = 0; i < lengthOfMessage; i++) {
	const letterFrequencyMap = new Map();

	let highestFrequency = -Infinity;

	for (let j = 0; j < input.length; j++) {
		const currentCharacter = input[j][i];

		letterFrequencyMap.set(
			currentCharacter,
			(letterFrequencyMap.get(currentCharacter) || 0) + 1
		);

		const letterFrequency = letterFrequencyMap.get(currentCharacter);

		if (letterFrequency > highestFrequency) {
			errorCorrectedMessage[i] = currentCharacter;
			highestFrequency = letterFrequency;
		}
	}
}

console.log(errorCorrectedMessage.join(""));
