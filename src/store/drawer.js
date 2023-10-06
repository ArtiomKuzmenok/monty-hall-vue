// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNavigationDrawerStore = defineStore('navigationDrawer', () => {
	let navigationDrawer = ref(false)
	
	function toggleDrawer () {
		navigationDrawer.value = !navigationDrawer.value
	}
  
	return { navigationDrawer, toggleDrawer }
})
