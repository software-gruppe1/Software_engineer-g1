<template>
    <div>
      <OrderListComponent v-if="!$route.params.orderId" />
      <OrdersComponent v-if="$route.params.orderId" :orderId="$route.params.orderId" />
    </div>
  </template>
  
  <script>
  import Navbar from '../components/Navbar.vue';
  import FooterComponent from '../components/FooterComponent.vue';
  import OrdersComponent from '../components/OrdersComponent.vue';
  import OrderListComponent from '../components/OrderListComponent.vue';
  
  export default {
    name: 'Orders',
    components: {
    Navbar,
    FooterComponent,
    OrdersComponent,
    OrderListComponent
},
  };
  </script>
  
  <style>
  /* Add your CSS here */
  </style>