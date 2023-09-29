<template>
    <swiper :options="swiperOptions" class="my-swiper">
      <swiper-slide>
        <img src="/images/test.avif" alt="France" />
      </swiper-slide>
      <swiper-slide>
        <img src="/images/test6.jpg" alt="Image 2" />
      </swiper-slide>
      <!-- ... additional slides as needed ... -->
    </swiper>
  </template>
  
  <script>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/swiper-bundle.css';
  
  export default {
    name: 'MyCarousel',
    components: {
      Swiper,
      SwiperSlide,
    },
    data() {
      return {
        swiperOptions: {
          slidesPerView: 1,
          spaceBetween: 10,
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
        },
      };
    },
  };
  </script>
  
  <style scoped>
  .my-swiper {
    width: 100%;
    height: 400px;  /* or whatever height you prefer */
  }
  
  .swiper-slide img {
    width: 100%;  /* Ensure the image width matches the container width */
    height: 100%;  /* Ensure the image height matches the container height */
    object-fit: fill;  /* Stretch the image to fill the container */
  }
  </style>
  