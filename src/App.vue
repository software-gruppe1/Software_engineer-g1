<!-- src/App.vue -->
<template>
  <div id="app">
    <Navbar />
    <router-view /> <!-- This will display the content of the current route -->
    <FooterComponent />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    FooterComponent
  },
};
</script>


