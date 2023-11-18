<template>
    <div id="outer-container">
      <div id="service-detail-container">
        <div v-if="service">
          <h1 id="service-title">{{ service.serviceName }}</h1>
          <img :src="`http://localhost:8080/images/${service.uid}.png`" alt="Service Image" id="service-image"/>
          <p id="service-description">{{ service.description }}</p>
          <p id="service-location">Location: {{ service.location }}</p>
          <p id="service-date">Date: {{ service.date }}</p>
          <p id="service-price">Price: {{ service.price }}</p>
          <div id="service-reviews">
            <h2>Reviews</h2>
            <ul>
              <li v-for="review in service.reviews" :key="review.id">
                <strong>{{ review.author }}:</strong> {{ review.content }}
              </li>
            </ul>
          </div>
          <p id="service-provider">Service provided by: {{ service.provider }}</p>
        </div>
        <div v-else>
          <p>Loading service details...</p>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
export default {
  name: 'ServiceDetailPage',
  data() {
    return {
      service: null,
    };
  },
  methods: {
    fetchServiceData(uid) {
      // Fetch the service data based on UID
      fetch(`http://localhost:8080/advertisement/${uid}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          this.service = data;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          this.service = null; // or handle the error differently
        });
    }
  },
  mounted() {
    const uid = this.$route.params.uid;
    console.log('UID:', uid); // Log the UID to the console
    this.fetchServiceData(uid);
  }
};
</script>
  
<style>
 #outer-container {
  display: flex;
  justify-content: center;
  position: relative; /* Needed for absolute positioning of pseudo-elements */
}

#outer-container::before, #outer-container::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 450px; /* Width of the stripe */
  background-color: #145A32; /* Darker green for the stripe */
}

#outer-container::before {
  left: 0;
}

#outer-container::after {
  right: 0;
}

#service-detail-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background-color: #fff; /* White background */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow for depth */
  border-radius: 10px; /* Rounded corners */
  position: relative; /* To stack above the pseudo-elements */
  z-index: 1; /* Ensures the container is above the stripes */
}

#service-title {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #198754; /* Theme color for title */
}

#service-image {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 5px; /* Slightly rounded corners for the image */
}

#service-description, #service-location, #service-date, #service-price, #service-provider {
  margin-top: 10px;
  font-size: 1.2em;
  color: #333; /* Darker text for readability */
}

#service-reviews {
  margin-top: 30px;
  border-top: 2px solid #198754; /* Theme color top border */
  padding-top: 10px;
}

#service-reviews h2 {
  margin-bottom: 10px;
  color: #198754; /* Theme color for subheadings */
}

/* Additional Styling */
ul {
  list-style-type: none; /* Remove default list styling */
  padding: 0;
}

li {
  margin-bottom: 10px; /* Space between list items */
}

strong {
  color: #198754; /* Theme color for emphasis */
}



  </style>
  