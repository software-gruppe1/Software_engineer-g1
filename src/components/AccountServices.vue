<template>
  <div class="services-box">
    <h2 class="services-title">Your Services ({{ nonEmptyServiceCount }})</h2>
    <div v-if="services.length === 0">Loading services...</div>
    <div v-else class="service-container">
      <div v-for="service in filteredServices" :key="service.uid" class="service-card">
        <div v-if="service.account === accountDetails.username">
          <router-link :to="`/${formatServiceNameToURL(service.serviceName)}`" >
          <h3>{{ service.serviceName }}</h3>
          <img :src="`/images/${service.uid}.png`" alt="Service Image" width="250" height="250">
          <p>{{ service.description }}</p>
          <p>Location: {{ service.location }}</p>
          <p>Date: {{ service.date }}</p>
          <p>Price: {{ service.price }}</p>
          </router-link>
        </div>
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
    },
    nonEmptyServiceCount() {
      return this.filteredServices.filter(service => {
        return service.account === this.accountDetails.username &&
               (service.serviceName || service.description || service.location || service.date || service.price);
      }).length;
    }
  },
  methods: {
    formatServiceNameToURL(serviceName) {
      return serviceName.toLowerCase().replace(/\s+/g, '-');
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
.service-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.service-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.service-card h3 {
  color: #333;
  margin-bottom: 10px;
}

.service-card p {
  color: #666;
  line-height: 1.5;
}



.service-card:empty {
  display: none;
}
.services-box {
  border: 1px solid #ddd;
  border-radius: 15px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.services-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.service-card img {
  border-radius: 8px; /* Example: rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Example: shadow effect */
  /* Add other styles as needed */
}

.router-link-active, .router-link-exact-active, a {
  text-decoration: none;
}
</style>

  