<script setup lang="ts">
interface Props {
	description: string;
	title: string;
	value: string;
}

const props = defineProps<Props>();
</script>

<template>
	<div class="mb-6">
		<div class="flex items-start gap-x-2.5 font-mono text-sm">
			<div class="flex flex-1 gap-x-2.5">
				<span class="rounded-md font-semibold text-primary">{{ title }}</span>
			</div>

			<div class="text-right">
				{{ value }}
			</div>
		</div>

		<div v-if="$slots.default || description" class="mt-2 mb-0 text-gray-500 dark:text-gray-400 text-sm space-y-3">
			<slot>
				{{ description }}
			</slot>
		</div>
	</div>
</template>
