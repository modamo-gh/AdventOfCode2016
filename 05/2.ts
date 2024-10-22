import { readFileSync } from "fs";
import { createHash } from "crypto";

const doorID = readFileSync("input.txt", "utf8").trim();
const PASSWORD_LENGTH = 8;

let password: (null | string)[] = new Array(PASSWORD_LENGTH).fill(null);
let integerIndex = 0;

while (password.includes(null)) {
	const md5 = createHash("md5");

	md5.update(doorID + integerIndex);

	const hash = md5.digest("hex");
	const position = parseInt(hash[5]);

	if (hash.startsWith("00000") && position < PASSWORD_LENGTH && !password[position] ) {
		password[position] = hash[6];
	}

	integerIndex++;
}

console.log(password.join(""));
