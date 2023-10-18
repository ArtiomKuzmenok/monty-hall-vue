<template>
	<div class="container">
		<div class="doors-wrapper">
			<door
				v-for="(door, index) in doors"
				:type="door.type"
				:opened="door.isOpened"
				:selected="door.selected"
				@click="onDoorClick(index)"
				:key="door.id"
			/>
		</div>

		<div class="controls-wrapper">
			<v-btn v-if="doorClicked" @click="onApprove">
				Approve
			</v-btn>
		</div>

		<div class="notes">
			<div class="d-flex flex-column align-center" v-if="state === STATES.DOOR_APPROVED">
				<div class="mb-6">
					Now I'm going to open a door that's definitely not a car behind it.
				</div>

				<v-btn @click="onMontyShouldOpenDoor">
					OK
				</v-btn>
			</div>

			<div class="d-flex flex-column align-center" v-if="state === STATES.WAIT_FOR_CHANGE">
				<div class="mb-6">
					Now you can change your selected door or keep it the same
				</div>

				<div class="d-flex">
					<v-btn class="ma-2 pa-2" @click="onChoose(false)">
						Keep Current Door
					</v-btn>

					<v-btn class="ma-2 pa-2" @click="onChoose(true)">
						Change Door
					</v-btn>
				</div>
			</div>

			<div class="d-flex flex-column align-center" v-if="state === STATES.READY_FOR_RESULTS">
				<div class="mb-6">
					Okay, we're ready to see the result
				</div>

				<v-btn @click="onShowResults">
					See result
				</v-btn>
			</div>

			<div class="d-flex flex-column align-center" v-if="state === STATES.RESULT">
				<div class="mb-6" v-if="isWon()">
					Congratulations!!!
				</div>
				<div class="mb-6" v-else>
					Maybe next time
				</div>

				<v-btn @click="onRestart">
					Restart
				</v-btn>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import Door from '@/components/Door.vue';
	import { useDoorsStore } from '@/store/game'
	import { computed, onMounted, onUnmounted } from 'vue';
	import STATES from '@/utiles/states';

	const gameStore = useDoorsStore()
	const doors = computed(() => gameStore.doors)
	const state = computed(() => gameStore.state)
	const games = computed(() => gameStore.games)
	const doorClicked = computed(() => gameStore.doorClicked)
	onMounted(() => {
		gameStore.setCarInDoor()
	})

	onUnmounted(() => {
		onRestart()
	})

	function onDoorClick(index: number): void {
		if (state.value === STATES.WAIT_FOR_SELECT) {
			if(!doorClicked.value)
				gameStore.doorClicked = true
			gameStore.selectDoor(index)
		}
	}

	function onApprove(): void {
		gameStore.doorClicked = false
		gameStore.selectedDoorApproved()
	}

	function onMontyShouldOpenDoor(): void {
		gameStore.state = STATES.DOOR_OPEN_SELF
		gameStore.montyOpenDoor()
	}

	function onChoose(isShouldChange: boolean): void {
		gameStore.chooseChange(isShouldChange)
	}

	function onShowResults(): void {
		gameStore.openResult()
	}

	function onRestart(): void {
		gameStore.doorClicked = false
		gameStore.restart()
	}

	function isWon(): boolean | null {
		return games.value.at(-1).isWon
	}
</script>

<style scoped>
	.container {
		max-width: 1040px;
		height: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 40px;
	}
	.doors-wrapper {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
