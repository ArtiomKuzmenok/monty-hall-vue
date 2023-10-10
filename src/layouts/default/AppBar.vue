<template>
	<v-app-bar flat>
		<v-app-bar-nav-icon @click.stop="navigationStore.toggleDrawer"></v-app-bar-nav-icon>

		<v-sheet>
			<v-img
				:width="125"
				contain
				:src="image"
				class="justify-start"
			></v-img>
		</v-sheet>

		<v-spacer></v-spacer>

		<v-btn @click="toggleTheme">toggle theme</v-btn>
	</v-app-bar>
</template>

<script setup>
	import { useTheme } from 'vuetify'
	import { useNavigationDrawerStore } from '@/store/drawer';
	import image from '@/assets/logo.jpg'

	const theme = useTheme()
	const navigationStore = useNavigationDrawerStore()

	function toggleTheme () {
		theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
	}
</script>
