import { readFileSync } from "fs";

const instructions = readFileSync("input.txt", "utf8").trim().split(/\n/);
const registers = new Map<string, number>();

for (const token of readFileSync("input.txt", "utf8")
	.trim()
	.split(/\s+/)
	.filter((token) => token.length === 1)) {
	if (isNaN(Number(token)) && !registers.has(token)) {
		registers.set(token, 0);
	}
}

console.log(registers);

let i = 0;

while (i < instructions.length) {
	const tokens = instructions[i].trim().split(/\s+/);

	switch (tokens[0]) {
		case "cpy":
			registers.set(
				tokens[2],
				registers.get(tokens[1]) || parseInt(tokens[1])
			);
			i++;

			break;
		case "inc":
			registers.set(tokens[1], registers.get(tokens[1])! + 1);
			i++;

			break;
		case "dec":
			registers.set(tokens[1], registers.get(tokens[1])! - 1);
			i++;

			break;
		case "jnz":
			if (registers.get(tokens[1]) || parseInt(tokens[1])) {
				i += parseInt(tokens[2]);
			} else {
				i++;
			}

			break;
	}

	console.log(registers);
}
