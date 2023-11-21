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
          <button @click="addToCart(accountDetails.username, service.uid)" id="add-to-cart-button">Add to Shopping Cart</button>
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
      accountDetails: null,
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
    },
    async addToCart(username, UID) {
    const url = `http://localhost:8080/user/cart/${username}/${UID}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await this.refreshAccountDetails();
      console.log('Item added to cart and account details refreshed');
      window.location.reload();
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  },
  async refreshAccountDetails() {
    try {
      // Replace with the actual API endpoint to fetch account details
      const url = `http://localhost:8080/user/account/${this.accountDetails.username}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          // Add any required headers, like authorization tokens
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedAccountDetails = await response.json();

      // Update local storage
      localStorage.setItem('accountDetails', JSON.stringify(updatedAccountDetails));

      // Update component state
      this.accountDetails = updatedAccountDetails;
    } catch (error) {
      console.error('Error fetching updated account details:', error);
    }
  }
  },
  mounted() {
    const uid = this.$route.params.uid;
    console.log('UID:', uid); // Log the UID to the console
    this.fetchServiceData(uid);

    const storedAccount = localStorage.getItem('accountDetails');
  if (storedAccount) {
    this.accountDetails = JSON.parse(storedAccount);
  }
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

#add-to-cart-button {
  background-color: #198754; /* Green background, you can choose any color */
  color: white; /* White text for contrast */
  border: none; /* No border for a modern look */
  padding: 10px 20px; /* Comfortable padding */
  border-radius: 5px; /* Rounded corners */
  font-size: 1em; /* Appropriate font size */
  cursor: pointer; /* Cursor changes to pointer to indicate it's clickable */
  transition: background-color 0.3s, transform 0.3s; /* Smooth transition for hover effects */
}

#add-to-cart-button:hover {
  background-color: #146c43; /* Slightly darker shade of green on hover */
  transform: scale(1.05); /* Slightly increase size on hover for a dynamic effect */
}

#add-to-cart-button:focus {
  outline: none; /* Remove outline to maintain the modern look */
  box-shadow: 0 0 0 2px rgba(25, 135, 84, 0.5); /* Subtle shadow to indicate focus */
}

  </style>
  