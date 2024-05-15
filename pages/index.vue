<script setup lang="ts">
definePageMeta({
	layout: 'centered'
});

const project = useActiveProject();
const errorMessage = ref('');

const links = [
	{
		label: 'Open application',
		size: 'xl' as const,
		async click() {
			errorMessage.value = '';

			const [data, error] = await window.api.openFsBrowser();

			if (error) {
				errorMessage.value = (error as Error).message;
			} else if (data) {
				project.value = data;
				navigateTo('/project');
			}
		},
	},
];
</script>

<template>
	<UContainer>
		<ULandingCTA
			title="Vite Dashboard"
			:card="false"
			:links="links"
		>
			<template #description>
				Open a directory with a <UKbd size="md">vite.config.*</UKbd> file or <UKbd size="md">vite</UKbd> dependency to get started.
			</template>
		</ULandingCTA>

		<UAlert
			v-if="errorMessage"
	    :description="errorMessage"
			color="red"
	    variant="soft"
	  />
	</UContainer>
</template>
