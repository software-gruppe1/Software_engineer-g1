<template>
  <div class="transparent-box">
    <!-- Cards Section -->
    <div class="card-container">
      <div v-for="(card, index) in services.slice(0, 6)" :key="card" class="card">
        <router-link :to="`/${formatServiceNameToURL(card.uid)}`">
        <img :src="`http://localhost:8080/images/${card.uid}.png`" alt="Card image" class="card-image"/>
        <h2 class="card-title">{{ card.serviceName }}</h2>
        <p class="card-description">{{ card.description }}</p>
      </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'TransparentBox',
  data(){
    return{
      services : []
    }
  },
  methods: {
    fetchServices() {
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
    },
    formatServiceNameToURL(serviceName) {
      return serviceName.toLowerCase().replace(/\s+/g, '-');
    },
    
  },
  mounted(){
    this.fetchServices();
  }
})
</script>

<style scoped>
.transparent-box {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.5);
}

.card-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: stretch;
  gap: 15px;
  padding: 15px;
}

.card {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  width: 30%;
  margin-bottom: 15px;
  transition: transform 0.2s ease; 
}
.card:hover {
  transform: scale(1.1); 
}

.card:hover .card-title {
  color: #198754;
}

.card:hover .card-description {
  color: #198754;
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.card-title {
  font-size: 2em;
  margin-bottom: 15px;
  color: black;
}

.card-description {
  font-size: 1.2em;
  color: black;
}

/* Mobile view: 1x6 grid */
@media (max-width: 768px) {
  .card-container {
    flex-direction: column;
    align-items: center;
  }

  .card {
    width: 80%; /* Adjust width as per your design */
  }
}



</style>
