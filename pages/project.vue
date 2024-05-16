<script setup lang="ts">
definePageMeta({
	layout: 'dashboard'
});

const project = useActiveProject();

function runBuild() {
	// window.api.execChildProcess('echo', ['hello'], {
	// 	onStderr: console.log,
	// 	onStdout: console.log,
	// });
}
</script>

<template>
	<UDashboardPage>
		<UDashboardPanel grow>
			<UDashboardNavbar title="<project name>">
				<template #right>
					<UButton label="Build" size="lg" icon="i-heroicons-wrench-screwdriver" @click="runBuild" />

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
