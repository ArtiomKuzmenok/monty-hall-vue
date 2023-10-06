<template>
	<v-app>
		<default-bar />

		<navigation-drawer />

		<default-view />
	</v-app>
</template>

<script setup>
	import NavigationDrawer from './NavigationDrawer.vue'
	import DefaultBar from './AppBar.vue'
	import DefaultView from './View.vue'
</script>
