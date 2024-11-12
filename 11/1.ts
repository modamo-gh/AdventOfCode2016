import { readFileSync } from "node:fs";
import { State } from "./State";
import { TreeNode } from "./TreeNode";

const state: State = { E: 1 };
const arrangement = readFileSync("input.txt", "utf8").trim().split("\n");

for (let floor = 0; floor < arrangement.length; floor++) {
	const matches = [
		...arrangement[floor].matchAll(/((\w+-?\w*) (microchip|generator))/g)
	];

	matches.forEach(
		(match) =>
			(state[
				`${match[2]
					.slice(0, 2)
					.toUpperCase()}${match[3][0].toUpperCase()}`
			] = floor + 1)
	);
}

const root = new TreeNode(state);

const isValidState = (node: TreeNode) => {
	// If item is microchip (ends in M)
	// If that floor has an item that ends in G
	// If that item shares the same element as the microchip, true
	// Else false
	for (const item in node.state) {
		if (
			item.endsWith("M") &&
			node.state[item.slice(0, 2) + "G"] !== node.state[item]
		) {
			return false;
		}
	}

	return true;
};

const uniqueStates = new Set<string>([JSON.stringify(root.state)]);

const areAllElementsOnFourthFloor = (state: State) => {
	for (const element in state) {
		if (state[element] !== 4) {
			return false;
		}
	}

	return true;
};

const expandStateTree = (node: TreeNode) => {
	if (areAllElementsOnFourthFloor(node.state)) {
		return;
	}

	for (const item in node.state) {
		if (item !== "E" && node.state[item] === node.state["E"]) {
			const elevatorMovement = [-1, 1];

			for (const direction of elevatorMovement) {
				const stateClone: State = { ...node.state };
				const newElevatorFloor = stateClone["E"] + direction;

				if (newElevatorFloor >= 0 && newElevatorFloor <= 4) {
					stateClone[item] += direction;
					stateClone["E"] += direction;
				}

				const childNode = new TreeNode(stateClone);

				if (
					isValidState(childNode) &&
					!uniqueStates.has(JSON.stringify(childNode.state))
				) {
					node.children.push(childNode);
					uniqueStates.add(JSON.stringify(childNode.state));
					expandStateTree(childNode);
				}
			}
		}
	}
};

expandStateTree(root);

console.log(root);

// let minSteps = Infinity;

// const findMinStepsViaDFS = (node: TreeNode, steps: number) => {
// 	if (
// 		node.state.you_onRight &&
// 		node.state.corn_onRight &&
// 		node.state.chicken_onRight &&
// 		node.state.fox_onRight
// 	) {
// 		minSteps = Math.min(steps, minSteps);
// 		return;
// 	}

// 	for (const child of node.children) {
// 		findMinStepsViaDFS(child, steps + 1);
// 	}
// };

// findMinStepsViaDFS(root, 0);
// console.log(minSteps);
