<script setup lang="ts">
interface Props {
	icon: string;
	title: string;
	selected?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
	<div
		class="relative group hover:ring-2 hover:ring-primary-500 dark:hover:ring-primary-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-lg divide-y divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900 cursor-pointer text-center"
		:class="{
			['ring-2 ring-primary-500 dark:ring-primary-400 ']: selected || false
		}"
	>
		<div class="px-4 py-5 sm:p-6">
			<div class="mb-6 flex justify-center">
				<UIcon :name="icon" class="w-10 h-10 flex-shrink-0 text-primary" />
			</div>

			<p class="text-gray-900 dark:text-white text-xl font-semibold gap-1.5">
				{{ title }}
			</p>
		</div>
	</div>
</template>
