import { readFileSync } from "fs";
import { createHash } from "crypto";

const salt = readFileSync("input.txt", "utf8").trim();

let index = 0;

const keys: number[] = [];
const indexToHash = new Map<number, string>();

const generateHash = (index: number) => {
	let hash = "";

	if (indexToHash.has(index)) {
		hash = indexToHash.get(index)!;
	} else {
		const md5 = createHash("md5");

		md5.update(salt + index);

		hash = md5.digest("hex");

		indexToHash.set(index, hash);
	}

	return hash;
};

const foundQuintuple = (index: number, character: string) => {
	for (let i = index + 1; i < index + 1000; i++) {
		const hash = generateHash(i);
		const regex = new RegExp(character.repeat(5));

		if (regex.test(hash)) {
			return true;
		}
	}

	return false;
};

while (keys.length < 64) {
	const hash = generateHash(index);
	const match = hash.match(/(\w)\1\1/);

	if (match && foundQuintuple(index, match[1])) {
		keys.push(index);
	}

	index++;
}

console.log(keys.pop());
