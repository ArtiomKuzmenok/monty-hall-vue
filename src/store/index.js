// Utilities
import { createPinia } from 'pinia'
import { useDoorsStore } from './game'
import { useNavigationDrawerStore } from './drawer'

const pinia = createPinia()
pinia.use(() => useDoorsStore())
pinia.use(() => useNavigationDrawerStore())

export default pinia
