<template>
    <div v-if="services.length === 0">Loading services...</div>
    <div v-else class="service-container">
      <div v-for="service in filteredServices" :key="service.uid" class="service-card">
        <div v-if="service.account === accountDetails.username">
        <h3>{{ service.serviceName }}</h3>
        <p>{{ service.description }}</p>
        <p>Location: {{ service.location }}</p>
        <p>Date: {{ service.date }}</p>
        <p>Price: {{ service.price }}</p>
      </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AccountServices',
    data() {
      return {
        services: [],
        accountDetails: null,
      };
    },
    computed: {
      filteredServices() {
        if (this.accountDetails && this.accountDetails.account) {
          return this.services.filter(service => service.account === this.accountDetails.account);
        } else {
          console.log("No account details found or account property missing.");
          return this.services; // or return []; if you want to show no services when account details are missing
        }
      }
    },
    mounted() {
      const storedAccount = localStorage.getItem('accountDetails');
      if (storedAccount) {
        console.log(storedAccount)
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
  