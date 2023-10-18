// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNavigationDrawerStore = defineStore('navigationDrawer', () => {
	let navigationDrawer = ref<boolean>(false)
	
	function toggleDrawer (): void {
		navigationDrawer.value = !navigationDrawer.value
	}
  
	return { navigationDrawer, toggleDrawer }
})
