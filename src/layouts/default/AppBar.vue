<template>
	<v-app-bar flat>
		<v-app-bar-nav-icon @click.stop="navigationStore.toggleDrawer"></v-app-bar-nav-icon>

		<v-app-bar-title text="Monty Hall"></v-app-bar-title>
		<v-img
			:width="150"
			contain
			:src="image"
		></v-img>

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
