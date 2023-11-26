<template>
  <div class="transparent-box">
    <!-- Cards Section -->
    <div class="card-container">
      <div v-for="card in services" :key="card" class="card">
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
  setup() {
    const cards = ref([
      { id: 1, image: '/images/mexico.jpg', title: 'Card 1', description: 'Description for card 1' },
      { id: 2, image: '/images/india.jpg', title: 'Card 2', description: 'Description for card 2' },
      { id: 3, image: '/images/turkey.jpg', title: 'Card 3', description: 'Description for card 3' },
      { id: 4, image: '/images/italy.jpg', title: 'Card 4', description: 'Description for card 4' },
      { id: 5, image: '/images/amerika.jpg', title: 'Card 5', description: 'Description for card 5' },
      { id: 6, image: '/images/jordan.jpg', title: 'Card 6', description: 'Description for card 6' },
      // Add more card objects as needed
    ]);

    return { cards };
  },
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
.card:hover{
  transform: scale(1.1); 
  .card-title{
    color: #198754
  }
  .card-description{
    color: #198754
  }
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
