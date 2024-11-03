import { readFileSync } from "fs";

const instructions = readFileSync("input.txt", "utf8").trim().split("\n");
const microchipInstructions = instructions.filter((instruction) =>
	instruction.startsWith("value")
);
const botInstructions = instructions.filter((instruction) =>
	instruction.startsWith("bot")
);
const botsToMicrochips = new Map<number, { low: number; high: number }>();
const TARGET_LOW = 17;
const TARGET_HIGH = 61;

const getBot = () => {
	for (const [bot, microchip] of botsToMicrochips) {
		if (microchip.low === TARGET_LOW && microchip.high === TARGET_HIGH) {
			return bot;
		}
	}
};

for (const instruction of microchipInstructions) {
	const matches = [...instruction.matchAll(/(\d+)/g)];
	const microchipValue = parseInt(matches[0][0]);
	const botNumber = parseInt(matches[1][0]);
	const microchips = botsToMicrochips.get(botNumber) || {
		low: Infinity,
		high: -Infinity
	};

	if (!Number.isFinite(microchips.low) && !Number.isFinite(microchips.high)) {
		microchips.low = microchipValue;
		microchips.high = microchipValue;
	} else if (microchipValue < microchips.low) {
		microchips.low = microchipValue;
	} else if (microchipValue > microchips.high) {
		microchips.high = microchipValue;
	}

	botsToMicrochips.set(botNumber, microchips);

	console.log(getBot());
}

const outputToMicrochips = new Map<number, number>();

for (const instruction of botInstructions) {
	const tokens = instruction.split(/\s+/);
	const givingBotNumber = parseInt(tokens[1]);
	const givingBotMicrochips = botsToMicrochips.get(givingBotNumber) || {
		low: Infinity,
		high: -Infinity
	};

	if (tokens[5] === "bot") {
		const receivingBotNumber = parseInt(tokens[6]);
		const receivingBotMicrochips = botsToMicrochips.get(
			receivingBotNumber
		) || {
			low: Infinity,
			high: -Infinity
		};

		if (givingBotMicrochips.low < receivingBotMicrochips.low) {
			receivingBotMicrochips.low = givingBotMicrochips.low;
		} else if (givingBotMicrochips.low > receivingBotMicrochips.high) {
			receivingBotMicrochips.high = givingBotMicrochips.low;
		}

		botsToMicrochips.set(receivingBotNumber, receivingBotMicrochips);
	} else if (tokens[5] === "output") {
		const outputNumber = parseInt(tokens[6]);

		outputToMicrochips.set(outputNumber, givingBotMicrochips.low);
	}

	givingBotMicrochips.low = Infinity;

	if (tokens[10] === "bot") {
		const receivingBotNumber = parseInt(tokens[11]);
		const receivingBotMicrochips = botsToMicrochips.get(
			receivingBotNumber
		) || {
			low: Infinity,
			high: -Infinity
		};

		if (givingBotMicrochips.high > receivingBotMicrochips.high) {
			receivingBotMicrochips.high = givingBotMicrochips.high;
		} else if (givingBotMicrochips.high < receivingBotMicrochips.low) {
			receivingBotMicrochips.low = givingBotMicrochips.high;
		}

		botsToMicrochips.set(receivingBotNumber, receivingBotMicrochips);
	} else if (tokens[10] === "output") {
		const outputNumber = parseInt(tokens[11]);

		outputToMicrochips.set(outputNumber, givingBotMicrochips.high);
	}

	givingBotMicrochips.high = -Infinity;

	console.log(getBot());
}
