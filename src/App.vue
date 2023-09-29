<!-- src/App.vue -->
<template>
  <div id="app">
    <Navbar />
    <MyCarousel />
    <!-- ... other content ... -->
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import MyCarousel from './components/MyCarousel.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    MyCarousel,
  },
};
</script>

<style lang="scss">
/* Global styles */
</style>
