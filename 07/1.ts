import { readFileSync } from "fs";

const ipAddresses = readFileSync("input.txt", "utf8").trim().split("\n");

let tlsSupportedIPs = 0;

const containsABBA = (ipAddressSegment: string) => {
	const ABBA_LENGTH = 4;

	for (let i = 0; i <= ipAddressSegment.length - ABBA_LENGTH; i++) {
		if (
			ipAddressSegment[i] === ipAddressSegment[i + 3] &&
			ipAddressSegment[i] !== ipAddressSegment[i + 1] &&
			ipAddressSegment[i + 1] === ipAddressSegment[i + 2]
		) {
			return true;
		}
	}

	return false;
};

const supportsTLS = (ipAddress: string) => {
	const hypernetRegex = new RegExp(/\[(\w+)\]/g);
	const hypernetMatches = [...ipAddress.matchAll(hypernetRegex)].map(
		(match) => match[1]
	);

	for (const match of hypernetMatches) {
		if (containsABBA(match)) {
			return false;
		}
	}

	const nonHypernetSegments = ipAddress.split(hypernetRegex);

	for (const nonHypernetSegment of nonHypernetSegments) {
		if (containsABBA(nonHypernetSegment)) {
			return true;
		}
	}

	return false;
};

for (const ipAddress of ipAddresses) {
	if (supportsTLS(ipAddress)) {
		tlsSupportedIPs++;
	}
}

console.log(tlsSupportedIPs);
