<template>
  <div class="order-details-container">
    <!-- Display details for the specific order -->
    <button @click="goBack" class="back-button">Back to Orders</button>
    <div v-if="selectedOrder">
      <h1>Order Details</h1>
      <p class="order-info">Order ID: {{ selectedOrder.orderId }}</p>
      <p class="order-info">Order Date: {{ formatDate(selectedOrder.orderDate) }}</p>
      <p class="order-info">Total Price: {{ selectedOrder.totalPrice }}</p>
      <h2>Services:</h2>
      <ul class="services-list">
        <li v-for="serviceDetail in selectedOrder.services" :key="serviceId">
              Service name: {{ serviceDetail.serviceName }} - Price: {{ serviceDetail.servicePrice }}
        </li>
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
    goBack() {
      this.$router.push('/orders');
    }
  },
  mounted() {
    const storedAccount = localStorage.getItem('accountDetails');
    if (storedAccount) {
      this.accountDetails = JSON.parse(storedAccount);
    }

    if (this.orderId) {
      this.fetchOrderDetails();
    }
  }
};
</script>

<style scoped>
.order-details-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.order-details-container h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.order-info {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.services-list {
  list-style: none;
  padding: 0;
}

.services-list li {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 1rem;
}

.services-list li:hover {
  background-color: #e9e9e9;
}

.back-button {
  
  margin: 10px;
  padding: 5px 10px;
  background-color: #198754; 
  border: 1px solid darken(#198754, 10%); 
  border-radius: 5px;
  cursor: pointer;
  color: white; 
  font-weight: bold; 
}
</style>