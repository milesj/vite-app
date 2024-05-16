<script setup lang="ts">
definePageMeta({
	layout: 'centered'
});

const project = useActiveProject();
const errorMessage = ref();

async function openProject() {
	errorMessage.value = '';

	const [data, error] = await window.api.openProject(true);

	if (error) {
		errorMessage.value = (error as Error).message;
	} else if (data) {
		project.value = data;
		navigateTo('/project');
	}
}
</script>

<template>
	<UContainer>
		<ULandingGrid>
			<ULandingCard
				to="/scaffold"
				class="col-span-6 row-span-6"
				description="Scaffold Vite into a new project or existing project, using our guided walkthrough."
			>
				<template #icon>
					<Icon name="i-heroicons-cube" class="w-10 h-10 flex-shrink-0 text-gray-900 dark:text-white" />
				</template>

				<template #title>
					<span class="text-xl">Scaffold a Vite project</span>
				</template>
			</ULandingCard>

			<ULandingCard
				to="#"
				class="col-span-6 row-span-6"
				description="Open an existing project that uses Vite, either directly, or through a framework like Nuxt or Remix."
				@click="openProject"
			>
				<template #icon>
					<Icon name="i-heroicons-cube-transparent" class="w-10 h-10 flex-shrink-0 text-gray-900 dark:text-white" />
				</template>

				<template #title>
					<span class="text-xl">Open existing Vite project</span>
				</template>
			</ULandingCard>
		</ULandingGrid>

		<UAlert
			v-if="errorMessage"
			:description="errorMessage"
			class="mt-8"
			color="red"
			variant="soft"
		/>
	</UContainer>
</template>
