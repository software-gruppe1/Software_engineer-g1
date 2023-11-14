<template>
    <MyCarousel />
    <BigButton />
    <TransparentBox />
    <!-- Other homepage-specific content -->
  </template>
  
  <script>
  import MyCarousel from '../components/MyCarousel.vue';
  import BigButton from '../components/BigButton.vue';
  import TransparentBox from '../components/TransparentBox.vue';
  
  export default {
    components: {
      MyCarousel,
      BigButton,
      TransparentBox
    }
  };
  </script>
  
  <style>
  /* Homepage specific styles */
  </style>
  