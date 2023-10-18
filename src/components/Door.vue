<template>
	<div class="door-wrapper" :class="{'selected': props.selected}">
		<div class="door" :class="{'opened': props.opened}"></div>
		<div class="door__type">
			<img :src="imageSrc" :alt="props.type" class="result-image">
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { computed } from 'vue';
	import car from '@/assets/car.webp'
	import goat from '@/assets/goat.png'

	/**
	 * Local Types
	 */
	 type DoorImages = {
		car: string,
		goat: string
	 }
	/* --- */

	const images: DoorImages = {
		car,
		goat
	}

	const props = defineProps<{
		type: string,
		opened: boolean,
		selected: boolean
	}>()

	let imageSrc = computed(() => images[props.type as keyof DoorImages] )
</script>

<style scoped>
	.door-wrapper {
		width: 200px;
		height: 400px;
		position: relative;
		border: 10px solid brown;
		perspective: 1000px;
	}

	.door {
		transform-origin: top left;
		transition: transform 0.4s ease;
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 1;
	}

	.door.opened {
		transform: rotateY(-100deg);
	}

	.door:not(.opened) {
		cursor: pointer;
	}

	.door::before {
		content: "";
		position: absolute;
		inset: 0;
		background-color: brown;
		border: 2px solid darkgoldenrod;
		z-index: 1;
	}

	.door::after {
		content: "";
		position: absolute;
		top: 50%;
		right: 10px;
		width: 20px;
		height: 20px;
		border-radius: 99px;
		background-color: gold;
		z-index: 1;
	}

	.door__type {
		position: absolute;
		width: 100%;
		top: 50%;
		transform: translateY(-50%);
	}

	.selected::after {
		content: "";
		position: absolute;
		top: -30px;
		left: 50%;
		transform: translateX(-50%);
		height: 0;
		width: 0;
		border: 10px solid brown;
		border-left-color: transparent;
		border-right-color: transparent;
		border-bottom-color: transparent;
	}

	.selected::before {
		content: "SELECTED";
		position: absolute;
		top: -50px;
		left: 50%;
		transform: translateX(-50%);
		border-bottom-color: transparent;
	}

	.result-image {
		position: absolute;
		max-width: 160px;
		transform: translate(-50%, -50%);
		left: 50%;
	}
</style>