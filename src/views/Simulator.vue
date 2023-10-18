<template>
	<h2 class="text-h1 text-center ma-6">
		Simulator
	</h2>

	<div class="d-flex flex-column align-center">
		<div class="mb-6">
			Click button to start simulation
		</div>

		<v-btn @click="startSimulation" v-if="!isSimulationStarted">
			Start simulation
		</v-btn>
	</div>

	<statistic-table :games="games"/>
</template>

<script lang="ts" setup>
	import { useSimulatorStore } from '@/store/simulator';
	import StatisticTable from '@/components/StatisticTable.vue';
	import { computed } from 'vue';

	const simulatorStore = useSimulatorStore()
	const games = computed(() => simulatorStore.gamesSimulator)
	const isSimulationStarted = computed(() => simulatorStore.isSimulationStarted)

	function startSimulation(events: Event, times = 1000): void {
		simulatorStore.isSimulationStarted = true
		let i = 0
		while ( i < times ) {
			simulatorStore.oneGameIteration()
			i++
		}

		simulatorStore.isSimulationStarted = false
	}
</script>