import { readFileSync } from "fs";

const files = readFileSync("input.txt", "utf8").trim().split("\n");

for(const file of files){
    let decompressedString = "";

    const matches = file.matchAll(/((\d)x(\d))/g);

    for(const match of matches){
        const sequenceLength = parseInt(match[2]);
        const numberOfRepetitions = parseInt(match[3]);

        console.log(sequenceLength, numberOfRepetitions)
    }
}