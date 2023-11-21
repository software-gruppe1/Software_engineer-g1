<!-- src/components/BigButton.vue -->
<template>
    <div class="button-container">
      <button class="big-button btn" @click="navigateToViewAllServices"> Uncover thrilling new destinations for your tourist journey</button> <!-- Added the .btn class -->
    </div>
  </template>
  
  <script>
export default {
  name: 'BigButton',
  methods: {
    navigateToViewAllServices() {
      this.$router.push({ name: 'ViewAllServices' }); // Use the route name or path of your ViewAllServices component
    }
  }
}
</script>
  
  <style scoped>
  
  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    padding: 20px;
  }
  
  .big-button {
    font-size: 24px;
    padding: 20px;
    cursor: pointer;
    margin-left: 32px;
    width: 106.25rem;
  }
  
  /* Added CSS */
  .btn{
    color: #000;
    background: linear-gradient(135deg, #8ae553 0%, #8ae553 22%, #6ecb47 22%, #6ecb47 28%, #53b03b 28%, #53b03b 72%, #37962f 72%, #37962f 100%);
    background-size: 200% 100%;
    background-position: 0 0;
    font-family: 'Oswald Variable', sans-serif;
    text-transform: uppercase;
    font-weight: 700;
    padding: 13px 20px 12px;
    border-radius: 32px;
    border: none;
    position: relative;
    z-index: 1;
    transition: all 0.6s ease 0s;
  }
  .btn:hover{ 
    color: #fff; 
    background-position: 100% 0;
  }
  .btn:before{ 
    content:"";
    background-color: #fff;
    border-radius: 50px;
    position: absolute;
    top: 6px;
    left: 6px;
    right: 6px;
    bottom: 6px;
    transition: all 0.5s;
    z-index: -1;
  }
  .btn:hover:before{ opacity: 0; }
  @media only screen and (max-width: 767px){
    .big-button {
    margin-left: 0; /* Remove left margin */
  }
    .btn{ margin-bottom: 30px; }
  }

  
  </style>
  