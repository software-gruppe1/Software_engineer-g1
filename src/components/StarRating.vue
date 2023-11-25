<template>
    <div class="star-rating">
      <img v-for="index in 5" :key="index"
           :src="getStarImage(index)"
           class="star"
           @click="setRating(index)" />
    </div>
  </template>
  
  <script>
  import fullStar from '/images/star-fill.svg';
  import emptyStar from '/images/star.svg';
  
  export default {
    name: 'StarRating',
    props: {
      value: {
        type: Number,
        default: 0
      },
      isReadOnly: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        rating: this.value
      };
    },
    methods: {
      getStarImage(index) {
        return this.rating >= index ? fullStar : emptyStar;
      },
      setRating(index) {
        if (!this.isReadOnly) {
          this.rating = index;
          this.$emit('update:rating', index);
        }
      }
    },
    watch: {
      value(newValue) {
        this.rating = newValue;
      }
    }
  };
  </script>
  
  <style>
  .star {
    cursor: pointer;
    width: 30px; 
    height: auto;
  }
  
  .non-interactive {
    pointer-events: none; 
  }
  </style>
  