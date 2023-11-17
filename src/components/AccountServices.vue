<template>
  <div class="services-box">
    <h2 class="services-title">Your Services ({{ nonEmptyServiceCount }})</h2>
    <div class="button-container">
      <button class="modern-button" @click="navigateToServiceForm">Make Services</button>
    </div>
    <div v-if="services.length === 0">Loading services...</div>
    <div v-else class="service-container">
      <div v-for="service in filteredServices" :key="service.uid" class="service-card">
        <div v-if="service.account === accountDetails.username">
          <router-link :to="`/${formatServiceNameToURL(service.uid)}`" >
          <h3>{{ service.serviceName }}</h3>
          <img :src="`http://localhost:8080/images/${service.uid}.png`" alt="Service Image" width="250" height="250">
          <p>{{ service.description }}</p>
          <p>Location: {{ service.location }}</p>
          <p>Date: {{ service.date }}</p>
          <p>Price: {{ service.price }}</p>
          </router-link>
          <button class="delete-button" @click="confirmDelete(service.uid)">Delete</button>
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
    navigateToServiceForm() {
      this.$router.push({ name: 'ServiceFormPage' });
    },

    formatServiceNameToURL(serviceName) {
      return serviceName.toLowerCase().replace(/\s+/g, '-');
    },
    
    fetchServiceImages() {
      this.services.forEach(service => {
        // Assuming each service has a unique identifier in `service.uid`
        fetch(`http://localhost:8080/images/${service.uid}.png`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.blob();
          })
          .then(imageBlob => {
            // Convert blob to URL and assign it to the service object
            service.imageUrl = URL.createObjectURL(imageBlob);
          })
          .catch(error => {
            console.error('Error fetching image:', error);
            service.imageUrl = ''; // Handle missing image case
          });
      });
    },
    confirmDelete(serviceId) {
      if (confirm("Are you sure you want to delete this service?")) {
        this.deleteService(serviceId);
      }
    },

    deleteService(serviceId) {
      const apiUrl = `http://localhost:8080/admin/services/${serviceId}`;
      fetch(apiUrl, {
        method: 'DELETE',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.services = this.services.filter(service => service.uid !== serviceId);
      })
      .catch(error => {
        console.error('Error deleting service:', error);
      });
    },
    
    deleteService(serviceId) {
      const apiUrl = `http://localhost:8080/user/services/${serviceId}`;
      fetch(apiUrl, {
        method: 'DELETE',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.services = this.services.filter(service => service.uid !== serviceId);
      })
      .catch(error => {
        console.error('Error deleting service:', error);
      });
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
        this.fetchServiceImages();
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

.modern-button {
  background-color: #198754; /* Green background */
  color: white; /* White text */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

}

.modern-button:hover {
  background-color: #146c43; /* Darker green on hover */
  transform: translateY(-2px); /* Slight lift on hover */
}

.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 25px;
}

.delete-button {
    background-color: #dc3545; /* Red background */
    color: white; /* White text */
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    margin-top: 10px; /* Adjust as needed */
    display: flex;
    margin-left: 180px;
  }

  .service-card h3 {
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  max-width: 100%; 
}
</style>

