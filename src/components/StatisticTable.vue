<template>
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
	import { getPercentValue } from '@/utiles/getPercentValue'
	import { ref, watch } from 'vue';

	const props = defineProps({
		games: Array
	})

	let games = ref([])
	watch(props.games, updateTable)

	let allFinishedGames = ref([])
	let allGamesCount = ref(0)
	let gamesWins = ref(0)
	let winsPercent = ref(0)

	let gamesWithChange = ref([])
	let gamesWithChangeCount = ref(0)
	let gamesWithChangeWinsCount = ref(0)
	let winsWithChangePercent = ref(0)

	let gamesKeep = ref([])
	let gamesKeepCount = ref(0)
	let gamesKeepWinsCount = ref(0)
	let winsKeepPercent = ref(0)

	function updateTable () {
		games.value = [...props.games]
		allFinishedGames.value = games.value.filter((game) => game.isWon !== null)
		allGamesCount.value = allFinishedGames.value.length
		gamesWins.value = allFinishedGames.value.reduce((acc, b) => acc + (b.isWon ? 1 : 0), 0)
		winsPercent.value = getPercentValue( gamesWins.value / allGamesCount.value )

		gamesWithChange.value = allFinishedGames.value.filter((game) => game.isChanged)
		gamesWithChangeCount.value = gamesWithChange.value.length
		gamesWithChangeWinsCount.value = gamesWithChange.value.reduce((acc, b) => acc + (b.isWon ? 1 : 0), 0)
		winsWithChangePercent.value = getPercentValue( gamesWithChangeWinsCount.value / gamesWithChangeCount.value )

		gamesKeep.value = allFinishedGames.value.filter((game) => !game.isChanged)
		gamesKeepCount.value = gamesKeep.value.length
		gamesKeepWinsCount.value = gamesKeep.value.reduce((acc, b) => acc + (b.isWon ? 1 : 0), 0)
		winsKeepPercent.value = getPercentValue( gamesKeepWinsCount.value / gamesKeepCount.value )
	}
</script>