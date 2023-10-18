// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'
import STATES from '@/utiles/states'
import { random } from '@/utiles/getRundomNumber'
import type Game from '@/types/game'
import type Door from '@/types/door'

export const useDoorsStore = defineStore('doors', () => {
	const state = ref(STATES.PREPARE)
	let games = ref<Game[]>([])
	let doorClicked = ref(false)
	let arr = Array(3)
		.fill(0)
		.map((item, index) => ({
			type: '',
			isOpened: false,
			selected: false,
			id: Date.now() + index,
		}))
	let doors = ref<Door[]>(arr)

	function setState(stateVal: string): void {
		state.value = stateVal
	}
		
	function setCarInDoor(): void {
		if (state.value !== STATES.PREPARE) {
			console.warn("Wrong state to set car")
			return
		}
		const selected = random()
		doors.value.forEach((door, i) => {
			door.type = i == selected ? "car" : "goat"
		})
		if( games.value.at(-1)?.isWon !== null ) {
			games.value.push({
				isChanged: null,
				isWon: null,
			})
		}
		setState(STATES.WAIT_FOR_SELECT)
	}
		
	function selectDoor(index: number): void {
		if (state.value !== STATES.WAIT_FOR_SELECT) {
			console.warn("Wrong state to select door")
		}
		const selectedDoor = doors.value.find((door) => door.selected)
		if (selectedDoor) {
			selectedDoor.selected = false
		}
		doors.value[index].selected = true
	}

	function selectedDoorApproved(): void {
		setState(STATES.DOOR_APPROVED)
	}
		
	function montyOpenDoor(): void {
		if (state.value !== STATES.DOOR_OPEN_SELF) {
			console.warn("Wrong state to select door")
			return
		}
		
		let index = doors.value.findIndex((door) => {
			return door.type !== "car" && !door.selected
		})
		
		doors.value[index].isOpened = true
		setState(STATES.WAIT_FOR_CHANGE)
	}
		
	function chooseChange(changed: boolean): void {
		if (state.value !== STATES.WAIT_FOR_CHANGE) {
			console.warn("Wrong state to select change")
			return
		}
		
		if (changed) {
			doors.value.forEach((door) => {
			if (!door.isOpened) {
				door.selected = !door.selected
			}
			})
		}

		let lastGame = getLastGame();

		if(lastGame) {
			lastGame.isChanged = changed
			setState(STATES.READY_FOR_RESULTS)
		}
	}
		
	function openResult(): void {
		if (state.value !== STATES.READY_FOR_RESULTS) {
			console.warn("Wrong state to see results")
			return
		}
		
		let selectedIndex = null
		let selected = doors.value.find((door, index) => {
			if(door.selected) {
				selectedIndex = index
			}

			return door.selected
		})

		let lastGame = getLastGame()

		if( selected && selectedIndex && lastGame) {
			selected.isOpened = true
			lastGame.isWon = doors.value[selectedIndex].type == "car"
			setState(STATES.RESULT)
		}
	}
		
	function restart(): void {
		setState(STATES.PREPARE)
		for (let i = 0; i < doors.value.length; i++) {
			doors.value[i] = {
				...doors.value[i],
				...{
					type: '',
					isOpened: false,
					selected: false,
				},
			}
		}
		setCarInDoor()
	}

	function getLastGame(): Game | undefined {
		return games.value.at(-1)
	}
  
	return { doors, state, games, doorClicked, setCarInDoor, selectDoor, selectedDoorApproved, montyOpenDoor, chooseChange, openResult, restart }
})
