
<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(async () => {
  const time = await window.ipc.invoke('app:start-time');

  // eslint-disable-next-line no-console
  console.log('App start time:', time)
});
</script>

<template >
  <NuxtLoadingIndicator />

  <UMain>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UMain>

  <UModals />
  <UNotifications />
</template>
