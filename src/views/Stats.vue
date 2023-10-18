<template>
	<h2 class="text-h1 text-center ma-6">
		Your statistic
	</h2>

	<statistic-table :games="games"/>
</template>

<script lang="ts" setup>
	import StatisticTable from '@/components/StatisticTable.vue';
	import { useDoorsStore } from '@/store/game'
	import { computed } from 'vue';

	const gameStore = useDoorsStore()
	const games = computed(() => gameStore.games)
</script>