<!-- src/App.vue -->
<template>
  <div id="app">
    <Navbar />
    <MyCarousel />
    <BigButton />
    <!-- ... other content ... -->
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import MyCarousel from './components/MyCarousel.vue';
import BigButton from './components/BigButton.vue'; // Importing the new component

export default {
  name: 'App',
  components: {
    Navbar,
    MyCarousel,
    BigButton, // Registering the new component
  },
};
</script>

<style lang="scss">
/* Global styles */
</style>
