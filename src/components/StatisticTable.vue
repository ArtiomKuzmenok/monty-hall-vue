<template>
	<v-row justify="center" class="mt-6">
		<v-col cols="10">
			<v-data-table
				:headers="tableSettings.headers"
				:items="gamesStats"
				item-value="type"
				class="elevation-1"
			/>
		</v-col>
	</v-row>
	
</template>

<script lang="ts" setup>
	import { getPercentValue } from '@/utiles/getPercentValue'
	import { ref, watch, onMounted, PropType } from 'vue'
	import { VDataTable } from "vuetify/labs/VDataTable"
	import debounce from 'lodash.debounce'
	import type Game from '@/types/game'
	import type GameStats from '@/types/gameStats'

	/**
	 * Local Types
	 */
	type Headers = InstanceType<typeof VDataTable>['headers']

	type TTableSettings = {
		headers: Headers
	}
	/* --- */

	const props = defineProps({
		games: {
			required: true,
			type: Array as PropType<Game[]>
		}
	})

	watch(props.games, debounce(() => {
		updateTable()
	}, 500))

	let tableSettings = ref<TTableSettings>({
		headers: [
			{
				title: 'Тип',
				align: 'start',
				sortable: false,
				key: 'type',
				width: '25%',
			},
			{ title: 'Количество игр', align: 'end', key: 'count' },
			{ title: 'Количество побед', align: 'end', key: 'wins' },
			{ title: 'Процент побед', align: 'end', key: 'percent' },
        ],
	})

	let gamesStats = ref<GameStats[]>([])

	onMounted(() => {
		updateTable()
	})

	function updateTable (): void {
		const games = [...props.games]
		const allFinishedGames = games.filter((game) => game.isWon !== null)
		const allGamesCount = allFinishedGames.length
		const gamesWins = allFinishedGames.reduce((acc, b) => acc + (b.isWon ? 1 : 0), 0)
		const winsPercent = getPercentValue( gamesWins / allGamesCount )

		const gamesWithChange = allFinishedGames.filter((game) => game.isChanged)
		const gamesWithChangeCount = gamesWithChange.length
		const gamesWithChangeWinsCount = gamesWithChange.reduce((acc, b) => acc + (b.isWon ? 1 : 0), 0)
		const winsWithChangePercent = getPercentValue( gamesWithChangeWinsCount / gamesWithChangeCount )

		const gamesKeep = allFinishedGames.filter((game) => !game.isChanged)
		const gamesKeepCount = gamesKeep.length
		const gamesKeepWinsCount = gamesKeep.reduce((acc, b) => acc + (b.isWon ? 1 : 0), 0)
		const winsKeepPercent = getPercentValue( gamesKeepWinsCount / gamesKeepCount )

		gamesStats.value = []

		gamesStats.value.push({
			type: 'Все',
			count: allGamesCount,
			wins: gamesWins,
			percent: winsPercent,
		})

		gamesStats.value.push({
			type: 'Игр с изменением',
			count: gamesWithChangeCount,
			wins: gamesWithChangeWinsCount,
			percent: winsWithChangePercent,
		})

		gamesStats.value.push({
			type: 'Игр без изменений',
			count: gamesKeepCount,
			wins: gamesKeepWinsCount,
			percent: winsKeepPercent,
		})
	}
</script>