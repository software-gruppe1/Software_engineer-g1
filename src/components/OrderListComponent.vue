<template>
  <div>
    <h1>My Orders</h1>
    <ul>
      <li v-for="order in orders" :key="order.orderId" @click="navigateToOrder(order.orderId)">
        Order ID: {{ order.orderId }}, Total Price: {{ order.totalPrice }}
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