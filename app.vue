
<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(async () => {
  console.log(window.ipcRenderer);

  // const time = await window.ipcRenderer.invoke('app-start-time');
  // console.log('App start time:', time)
});
</script>

<template >
  <div>
    Wtf is going on
  </div>
</template>
