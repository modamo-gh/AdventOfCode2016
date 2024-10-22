import { readFileSync } from "fs";
import { createHash } from "crypto";

const doorID = readFileSync("input.txt", "utf8").trim();

let password = "";
let integerIndex = 0;

const PASSWORD_LENGTH = 8;

while (password.length < PASSWORD_LENGTH) {
	const md5 = createHash("md5");

	md5.update(doorID + integerIndex);

	const hash = md5.digest("hex");

	if (hash.startsWith("00000")) {
		password += hash[5];
	}

	integerIndex++;
}

console.log(password);
