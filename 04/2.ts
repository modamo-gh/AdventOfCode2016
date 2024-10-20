import { readFileSync } from "fs";

const rooms = readFileSync("input.txt", "utf8").trim().split("\n");

const isRealRoom = (room: string): [boolean, string, number] => {
	const encryptedNameMatchResult = room.match(/((\w+-)+)/);

	let encryptedName = "";

	if (encryptedNameMatchResult) {
		encryptedName = encryptedNameMatchResult[0].replace(/-/g, "");
	}

	const sectorIDMatchResult = room.match(/(\d+)/);

	let sectorID = 0;

	if (sectorIDMatchResult) {
		sectorID = parseInt(sectorIDMatchResult[0]);
	}

	const frequencyTable = new Map();

	for (const letter of encryptedName) {
		frequencyTable.set(letter, (frequencyTable.get(letter) || 0) + 1);
	}

	const checksumMatchResult = room.match(/\[(\w+)\]/);

	let checksum = "";

	if (checksumMatchResult) {
		checksum = checksumMatchResult[1];
	}

	for (let i = 0; i < checksum.length - 1; i++) {
		if (
			!frequencyTable.has(checksum[i]) ||
			!frequencyTable.has(checksum[i + 1]) ||
			(frequencyTable.get(checksum[i]) ===
				frequencyTable.get(checksum[i + 1]) &&
				checksum[i].charCodeAt(0) > checksum[i + 1].charCodeAt(0)) ||
			frequencyTable.get(checksum[i]) <
				frequencyTable.get(checksum[i + 1])
		) {
			return [false, "", 0];
		}
	}

	return [true, encryptedName, sectorID];
};

const decrypt = (encryptedName, sectorID) => {
	let decryptedName = "";

	for (let i = 0; i < encryptedName.length; i++) {
		decryptedName += String.fromCharCode(
			encryptedName[i].charCodeAt(0) + (sectorID % 26) <= 122
				? encryptedName[i].charCodeAt(0) + (sectorID % 26)
				: encryptedName[i].charCodeAt(0) + (sectorID % 26) - 26
		);
	}

	return decryptedName;
};

for (const room of rooms) {
	const [isReal, encryptedName, sectorID] = isRealRoom(room);

	if (isReal) {
		if (decrypt(encryptedName, sectorID).includes("north")) {
			console.log(sectorID);
		}
	}
}
