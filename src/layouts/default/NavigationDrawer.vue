<template>
	<v-navigation-drawer v-model="drawer" temporary>
		<v-list>
			<v-list-item>
				<router-link to="/">Home</router-link>
			</v-list-item>

			<v-list-item>
    			<router-link to="/stats">Statistic</router-link>
			</v-list-item>

			<v-list-item>
    			<router-link to="/simulator">Simulator</router-link>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>
  
<script lang="ts" setup>
	import { useNavigationDrawerStore } from '@/store/drawer';
	import { computed } from 'vue';

	const navigationStore = useNavigationDrawerStore()
	const drawer = computed(() => navigationStore.navigationDrawer)
</script>
  