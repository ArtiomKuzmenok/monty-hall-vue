// Utilities
import { createPinia } from 'pinia'
import { useDoorsStore } from './game'
import { useNavigationDrawerStore } from './drawer'
import { useSimulatorStore } from './simulator'

const pinia = createPinia()
pinia.use(() => useDoorsStore())
pinia.use(() => useNavigationDrawerStore())
pinia.use(() => useSimulatorStore())

export default pinia
