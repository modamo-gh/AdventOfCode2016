import { readFileSync } from "fs";

const instructions = readFileSync("input.txt", "utf8").trim().split(/\n/g);
const botsToMicrochips = new Map<number, number[]>();
const outputToMicrochips = new Map<number, number>();

for (const instruction of instructions) {
	const botMatches = [...instruction.matchAll(/bot (\d+)/g)];
	const outputMatches = [...instruction.matchAll(/output (\d+)/g)];

	for (const match of botMatches) {
		const botNumber = parseInt(match[1]);

		if (!botsToMicrochips.has(botNumber)) {
			botsToMicrochips.set(botNumber, []);
		}
	}

	for (const match of outputMatches) {
		const outputNumber = parseInt(match[1]);

		if (!outputToMicrochips.has(outputNumber)) {
			outputToMicrochips.set(outputNumber, -1);
		}
	}
}

const microchipInstructions = instructions.filter((instruction) =>
	instruction.startsWith("value")
);

for (const instruction of microchipInstructions) {
	const matches = [...instruction.matchAll(/value (\d+) goes to bot (\d+)/g)];

	for (const match of matches) {
		const botNumber = parseInt(match[2]);
		const microchipValue = parseInt(match[1]);
		const microchips = botsToMicrochips.get(botNumber)!;

		microchips?.push(microchipValue);
		microchips?.sort((a, b) => a - b);
		botsToMicrochips.set(botNumber, microchips);
	}
}

const botInstructions = new Set<string>(
	instructions.filter((instruction) => instruction.startsWith("bot"))
);

const TARGET_LOW = 17;
const TARGET_HIGH = 61;

for (const instruction of botInstructions) {
	const matches = [
		...instruction.matchAll(
			/bot (\d+) gives low to (\w+) (\d+) and high to (\w+) (\d+)/g
		),
	];

	for (const match of matches) {
		const givingBotNumber = parseInt(match[1]);
		const lowDestinationType = match[2];
		const lowDestinationNumber = parseInt(match[3]);
		const highDestinationType = match[4];
		const highDestinationNumber = parseInt(match[5]);

		const givingBotMicrochips = botsToMicrochips.get(givingBotNumber)!;
		const [givingBotLow, givingBotHigh] = givingBotMicrochips;

		if (givingBotMicrochips.length === 2) {
			const transferMicrochip = (takingBotNumber: number, value: string) => {
				const givingBotValue = value === "low" ? givingBotLow : givingBotHigh;
				const takingBotMicrochips = botsToMicrochips.get(takingBotNumber)!;

				if (takingBotMicrochips.length < 2) {
					takingBotMicrochips.push(givingBotValue);
					takingBotMicrochips.sort((a, b) => a - b);
				} else if (takingBotMicrochips.length === 2) {
					takingBotMicrochips[0] = Math.min(
						takingBotMicrochips[0],
						givingBotValue
					);
					takingBotMicrochips[1] = Math.max(
						takingBotMicrochips[1],
						givingBotValue
					);
				}

				botsToMicrochips.set(takingBotNumber, takingBotMicrochips);
			};

			if (lowDestinationType === "output") {
				outputToMicrochips.set(lowDestinationNumber, givingBotLow);
			} else if (lowDestinationType === "bot") {
				transferMicrochip(lowDestinationNumber, "low");
			}

			givingBotMicrochips[0] = Infinity;

			if (highDestinationType === "output") {
				outputToMicrochips.set(highDestinationNumber, givingBotHigh);
			} else if (highDestinationType === "bot") {
				transferMicrochip(highDestinationNumber, "high");
			}

			givingBotMicrochips[1] = -Infinity;
			botsToMicrochips.set(givingBotNumber, givingBotMicrochips);

			botInstructions.delete(instruction);
		} else {
			botInstructions.delete(instruction);
			botInstructions.add(instruction);
		}
	}
}

console.log(
	outputToMicrochips.get(0)! *
	outputToMicrochips.get(1)! *
	outputToMicrochips.get(2)!
);
