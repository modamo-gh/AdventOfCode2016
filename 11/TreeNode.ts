import { State } from "./State";

export class TreeNode {
	state: State;
	children: TreeNode[];

	constructor(state: State) {
		this.state = state;
		this.children = [];
	}
}
