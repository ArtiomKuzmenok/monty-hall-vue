type TSTATES = {
	[identifier: string]: string;
}
const STATES: TSTATES = {
	PREPARE: "prepare",
	WAIT_FOR_SELECT: "wait for select",
	DOOR_APPROVED: "door approved",
	DOOR_OPEN_SELF: "door open self",
	WAIT_FOR_CHANGE: "wait for change",
	READY_FOR_RESULTS: "ready for results",
	RESULT: "result",
}

export default STATES