<template>
<v-app>
  <Game />
</v-app>
</template>
<script lang="ts">
import Game from '@/components/Game.vue'

export default {
  name: 'App',
  components: { Game }
}
</script>

<style lang="scss">
body {
  height: 100vh;
}
</style>
