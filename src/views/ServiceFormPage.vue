<template>
    <div>
      <create-service-form />
    </div>
  </template>

<script>
import Navbar from '../components/Navbar.vue';
import FooterComponent from '../components/FooterComponent.vue';
import CreateServiceForm from '../components/CreateServiceForm.vue'; 

export default {
  name: 'ServicesFormPage',
  components: {
    Navbar,
    FooterComponent,
    CreateServiceForm 
  }
};
</script>

<style>
/* Add your CSS here */
</style>