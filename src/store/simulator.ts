import { defineStore } from 'pinia'
import { ref } from 'vue'
import { random } from '@/utiles/getRundomNumber'
import type Game from '@/types/game'
import type Door from '@/types/door'

export const useSimulatorStore = defineStore('simulator', () => {
	let gamesSimulator = ref<Game[]>([])
	let isSimulationStarted = ref(false)
	let arr = Array(3)
		.fill(0)
		.map((item, index) => ({
			type: '',
			isOpened: false,
			selected: false,
			id: Date.now() + index,
		}))
	let doors: Array<Door> = arr

	function oneGameIteration (): void {
		const carType = random()
		doors.forEach((door, i) => {
			door.type = i == carType ? "car" : "goat"
		})

		gamesSimulator.value.push({
			isChanged: null,
			isWon: null,
		})

		let selectedDoorIndex = random()
		let selectedDoor = doors[selectedDoorIndex]
		selectedDoor.selected = true

		let montyOpenDoorIndex = doors.findIndex((door) => {
			return door.type !== "car" && !door.selected
		})
		
		doors[montyOpenDoorIndex].isOpened = true

		let chooseChnages = random(1)

		if (chooseChnages) {
			doors.forEach((door, index) => {
				if (!door.isOpened) {
					door.selected = !door.selected
					if (door.selected) {
						selectedDoor = door
						selectedDoorIndex = index
					}
				}
			})
		}
		gamesSimulator.value.at(-1).isChanged = !!chooseChnages

		selectedDoor.isOpened = true
		gamesSimulator.value.at(-1).isWon = doors[selectedDoorIndex].type == "car"
		reset()
	}

	function reset(): void {
		for (let i = 0; i < doors.length; i++) {
			doors[i] = {
				...doors[i],
				...{
					type: '',
					isOpened: false,
					selected: false,
				},
			}
		}
	}

	return { gamesSimulator, isSimulationStarted, oneGameIteration, reset }
})