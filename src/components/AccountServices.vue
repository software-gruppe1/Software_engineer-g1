<template>
    <div v-if="services.length === 0">Loading services...</div>
    <div v-else class="service-container">
      <div v-for="service in filteredServices" :key="service.uid" class="service-card">
        <h3>{{ service.serviceName }}</h3>
        <p>{{ service.description }}</p>
        <p>Location: {{ service.location }}</p>
        <p>Date: {{ service.date }}</p>
        <p>Price: {{ service.price }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AccountServices',
    data() {
      return {
        services: [],
        accountDetails: null, // Initialize accountDetails
      };
    },
    computed: {
        filteredServices() {
    return this.services; // Temporarily return all services
  }
    },
    mounted() {
      // Retrieve accountDetails from localStorage
      const storedAccount = localStorage.getItem('accountDetails');
      if (storedAccount) {
        this.accountDetails = JSON.parse(storedAccount);
      }
  
      fetch('http://localhost:8080/advertisement/services/all')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          this.services = data;
        })
        .catch(error => {
          console.error('Error fetching services:', error);
        });
    }
  };
  </script>
  
  <style>
  /* Add styles for your service cards here */
  </style>
  