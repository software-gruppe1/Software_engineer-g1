<template>
  <div>
    <AccountServices />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import FooterComponent from '../components/FooterComponent.vue';
import AccountServices from '../components/AccountServices.vue'; // Import AccountServices component

export default {
  name: 'Services',
  components: {
    Navbar,
    FooterComponent,
    AccountServices // Register AccountServices component
  }
};
</script>

<style>
/* Add your CSS here */
</style>
