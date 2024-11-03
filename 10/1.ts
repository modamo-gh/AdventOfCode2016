import { readFileSync } from "fs";

const instructions = readFileSync("input.txt", "utf8").trim().split("\n");
const microchipIndtructions = instructions.filter((instruction) =>
  instruction.startsWith("value")
);
const botInstructions = instructions.filter((instruction) =>
  instruction.startsWith("bot")
);
const botsToMicrochips = new Map<number, {low: number, high: number}>();

for (const instruction of microchipIndtructions) {
  const matches = [...instruction.matchAll(/(\d+)/g)];
  const botNumber = parseInt(matches[1][0]);
  const microchips = botsToMicrochips.get(botNumber) || {low: Infinity, high: -Infinity};

  microchips.low = parseInt(matches[0][0]);
  botsToMicrochips.set(botNumber, microchips);
}

console.log(botsToMicrochips)
