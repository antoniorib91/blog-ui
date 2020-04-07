<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
  </div>
</template>
<script lang="ts">
import Navbar from '@/components/navbar/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
  @import '@/assets/scss/media.scss';
  @import '@/assets/scss/variables.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>
