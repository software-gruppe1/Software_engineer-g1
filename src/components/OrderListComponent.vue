<template>
  <div class="orders-container">
    <h1>My Orders</h1>
    <ul class="orders-list">
      <li v-for="order in orders" :key="order.orderId" @click="navigateToOrder(order.orderId)" class="order-item">
        <span class="order-id">Order ID: {{ order.orderId }}</span>
        <span class="total-price">Total Price: {{ order.totalPrice }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    navigateToOrder(orderId) {
      this.$router.push({ name: 'OrderDetails', params: { orderId } });
    }
  },
  mounted() {
    const storedAccount = localStorage.getItem('accountDetails');
    if (storedAccount) {
      const accountDetails = JSON.parse(storedAccount);
      if (accountDetails.orders) {
        this.orders = accountDetails.orders;
      }
    }
  }
};
</script>

<style scoped>
.orders-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.orders-container h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.orders-list {
  list-style: none;
  padding: 0;
}

.order-item {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-item:hover {
  background-color: #e9e9e9;
}

.order-id {
  font-weight: bold;
  color: #555;
}

.total-price {
  color: #198754; /* Theme color */
}
</style>