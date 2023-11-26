<template>
    <div class="contact-page">
      <ContactInformation />
    </div>
  </template>
  
  <script>
  import ContactInformation from '../components/ContactInformation.vue';
  
  export default {
    name: 'Contact',
    components: {
      ContactInformation
    }
  };
  </script>
  
  <style>
  
  
  .contact-information {
    background-color: #ffffff; 
    border: 1px solid #198754; 
    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2); 
    border-radius: 10px;
    padding: 20px;
    margin: 20px 0;
    font-family: 'Arial', sans-serif;
    color: #333333; 
    line-height: 1.6;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .contact-information h1 {
    color: #198754; 
  }
  
  .contact-information p {
    color: #555555; 
  }
  </style>
  