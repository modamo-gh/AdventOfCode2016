import { readFileSync } from "fs";

const strings = readFileSync("input.txt", "utf8").trim().split("\n");

const getDecompressedStringLength = (string: string): number => {
  const matches = [...string.matchAll(/\((\d+)x(\d+)\)/g)];

  if (!matches.length) {
    return string.length;
  }

  const match = matches[0];
  const subsequenceLength = match[1];

  return (
    match.index +
    parseInt(subsequenceLength) * parseInt(match[2]) +
    getDecompressedStringLength(
      string.slice(match.index + match[0].length + parseInt(subsequenceLength))
    )
  );
};

for (const string of strings) {
  console.log(getDecompressedStringLength(string));
}
