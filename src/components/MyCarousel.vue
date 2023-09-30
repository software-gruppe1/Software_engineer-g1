<template>
  <Carousel :autoplay="5000" :wrap-around="true" pause-autoplay-on-hover>
    <Slide v-for="image in images" :key="image" class="carousel__slide">
      <img :src="image" alt="Carousel Image" class="carousel__image" />
    </Slide>

    <template #addons>
      <Pagination />
    </template>
  </Carousel>
</template>

<script>
import { defineComponent } from 'vue'
import { Carousel, Pagination, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  name: 'MyCarousel',
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  data() {
    return {
      images: [
        '/images/test.avif',
        '/images/test6.jpg',
        '/images/skopje.jpg',
        // ... add more image paths as needed
      ]
    };
  }
})
</script>

<style scoped>
.carousel__slide {
  height: 400px;
  overflow: hidden; /* This will hide any part of the image that exceeds the slide's dimensions */
}

.carousel__image {
  height: 100%;
  width: 100%;
  object-fit: cover; /* This will ensure the image covers the entire slide without distortion */
}

</style>
