<template>
	<h2 class="text-h1 text-center ma-6">
		Your statistic
	</h2>

	<v-table class="ma-6">
		<thead>
			<tr>
				<th>Тип</th>
				<th>Количество игр</th>
				<th>Количество побед</th>
				<th>Процент побед</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Все</td>
				<td>{{ allGamesCount }}</td>
				<td>{{ gamesWins }}</td>
				<td>{{ winsPercent }}</td>
			</tr>

			<tr>
				<td>Игр с изменением:</td>
				<td>{{ gamesWithChangeCount }}</td>
				<td>{{ gamesWithChangeWinsCount }}</td>
				<td>{{ winsWithChangePercent }}</td>
			</tr>

			<tr>
				<td>Игр без изменений:</td>
				<td>{{ gamesKeepCount }}</td>
				<td>{{ gamesKeepWinsCount }}</td>
				<td>{{ winsKeepPercent }}</td>
			</tr>
		</tbody>
	</v-table>
</template>

<script setup>
	import { useDoorsStore } from '@/store/game'
	import { getPercentValue } from '@/utiles/getPercentValue'
	import { computed } from 'vue';

	const gameStore = useDoorsStore()
	const games = computed(() => gameStore.games)
	const allFinishedGames = games.value.filter((game) => game.isWon !== null)

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
</script>