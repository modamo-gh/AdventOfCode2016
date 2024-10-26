import { readFileSync } from "fs";

const ipAddresses = readFileSync("input.txt", "utf8").trim().split("\n");

let sslSupportedIPs = 0;

const getBABs = (ipAddressSegment: string) => {
	const ABA_LENGTH = 3;
	const BABs = new Set<string>();

	for (let i = 0; i <= ipAddressSegment.length - ABA_LENGTH; i++) {
		const potentialA = ipAddressSegment[i];
		const potentialB = ipAddressSegment[i + 1];
		if (
			potentialA === ipAddressSegment[i + 2] &&
			potentialA !== potentialB
		) {
			BABs.add(`${potentialB}${potentialA}${potentialB}`);
		}
	}

	return BABs;
};

const supportsSSL = (ipAddress: string) => {
	const hypernetRegex = new RegExp(/\[\w+\]/g);
	const hypernetMatches = [...ipAddress.matchAll(hypernetRegex)].map(
		(match) => match[0]
	);
	const babs = new Set<string>();

	hypernetMatches.forEach((match) =>
		getBABs(match).forEach((bab) => babs.add(bab))
	);

	const supernetSegments = ipAddress.split(hypernetRegex);

	for (const supernetSegment of supernetSegments) {
		for (const bab of babs) {
			if (supernetSegment.includes(bab)) {
				return true;
			}
		}
	}

	return false;
};

for (const ipAddress of ipAddresses) {
	if (supportsSSL(ipAddress)) {
		sslSupportedIPs++;
	}
}

console.log(sslSupportedIPs);
