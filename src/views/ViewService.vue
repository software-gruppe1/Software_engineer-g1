<template>
    <div>
      <ServiceDetailPage />
    </div>
  </template>

<script>
import Navbar from '../components/Navbar.vue';
import FooterComponent from '../components/FooterComponent.vue';
import ServiceDetailPage from '../components/ServiceDetailPage.vue'; 

export default {
  name: 'ServicesFormPage',
  components: {
    Navbar,
    FooterComponent,
    ServiceDetailPage
  }
};
</script>

<style>
/* Add your CSS here */
</style>