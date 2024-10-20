import { readFileSync } from "fs";

const rooms = readFileSync("input.txt", "utf8").trim().split("\n");

const isRealRoom = (room: string): [boolean, number] => {
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
			return [false, 0];
		}
	}

	return [true, sectorID];
};

let sumOfRealSectorIDs = 0;

for (const room of rooms) {
	const [isReal, sectorID] = isRealRoom(room);

	if (isReal) {
		sumOfRealSectorIDs += sectorID;
	}
}

console.log(sumOfRealSectorIDs);
