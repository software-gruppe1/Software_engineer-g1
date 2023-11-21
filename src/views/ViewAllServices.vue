<template>
    <div>
      <AllServices />
    </div>
  </template>

<script>
import Navbar from '../components/Navbar.vue';
import FooterComponent from '../components/FooterComponent.vue';
import AllServices from '../components/AllServices.vue';

export default {
  name: 'ServicesFormPage',
  components: {
    Navbar,
    FooterComponent,
    AllServices
}
};
</script>

<style>
/* Add your CSS here */
</style>