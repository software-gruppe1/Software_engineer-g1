<template>
  <div>
    <!-- Display details for the specific order -->
    <div v-if="selectedOrder">
      <h1>Order Details</h1>
      <p>Order ID: {{ selectedOrder.orderId }}</p>
      <p>Order Date: {{ formatDate(selectedOrder.orderDate) }}</p>
      <p>Total Price: {{ selectedOrder.totalPrice }}</p>
      <h2>Services:</h2>
      <ul>
        <div v-for="(serviceId, index) in selectedOrder.services" :key="index">
          <div v-for="service in services" :key="service">
            <div v-if="service.uid === serviceId">
        <li>
          Service name: {{ service.serviceName }}  Price: {{ service.price }}
        </li>
      </div>
      </div>
      </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    orderId: {
      type: String,
      default: null 
    }
  },
  data() {
    return {
      accountDetails: { orders: [] },
      selectedOrder: null,
      services: []
    };
  },
  methods: {
    fetchOrderDetails() {
      const order = this.accountDetails.orders.find(order => order.orderId === parseInt(this.orderId));
      if (order) {
        this.selectedOrder = order;
      } else {
        console.error("Order not found");
      }
    },
    formatDate(dateArray) {
      return `${dateArray[0]}-${dateArray[1]}-${dateArray[2]}`;
    },
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
  },
  mounted() {
    const storedAccount = localStorage.getItem('accountDetails');
    if (storedAccount) {
      this.accountDetails = JSON.parse(storedAccount);
      this.fetchServices();
    }

    if (this.orderId) {
      this.fetchOrderDetails();
    }
  }
};
</script>
