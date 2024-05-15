<script setup lang="ts">
const project = useActiveProject();
</script>

<template>
	<UDashboardPage>
		<UDashboardPanel grow>
			<UDashboardNavbar title="<project name>">
				<template #right>
					<UButton label="Build" size="lg" icon="i-heroicons-wrench-screwdriver" />
					<UButton label="Develop" size="lg" icon="i-heroicons-rocket-launch" class="ml-2" />
				</template>
			</UDashboardNavbar>

			<UDashboardPanelContent>
				wtf
				{{ JSON.stringify(project) }}
			</UDashboardPanelContent>

			<UDashboardPanelContent>
				wtf
				{{ JSON.stringify(project) }}
			</UDashboardPanelContent>
		</UDashboardPanel>
	</UDashboardPage>
</template>
