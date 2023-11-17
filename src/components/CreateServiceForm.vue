<template>
    <form @submit.prevent="submitForm" id="special-form">
      <div>
        <label for="serviceName">Service Name:</label>
        <input type="text" id="serviceName" v-model="serviceData.serviceName" required>
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" v-model="serviceData.description" required></textarea>
      </div>
      <div>
        <label for="location">Location:</label>
        <input type="text" id="location" v-model="serviceData.location" required>
      </div>
      <div>
        <label for="date">Date:</label>
        <input type="date" id="date" v-model="serviceData.date" required>
      </div>
      <div>
        <label for="price">Price:</label>
        <input type="number" id="price" v-model="serviceData.price" required>
      </div>
      <div>
        <label for="picture">Picture:</label>
        <input type="file" id="picture" @change="handleFileSelection" required>
      </div>
      <input type="hidden" v-model="serviceData.account">
      <input type="hidden" v-model="serviceData.uid">
      <button type="submit">Create Service</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        serviceData: {
          serviceName: '',
          description: '',
          location: '',
          date: '',
          price: '',
          account: this.getCurrentUserAccount(),
          uid: '',
          file: null
        }
      };
    },
    methods: {
      handleFileSelection(event) {
        const file = event.target.files[0];
        if (file) {
          this.serviceData.file = file;
          this.serviceData.uid = this.generateUID(5);
        }
      },
  
      uploadFile(file, uid) {
        const formData = new FormData();
        const modifiedFile = new File([file], `${uid}.png`, { type: file.type });
        formData.append('file', modifiedFile);
  
        const uploadUrl = 'http://localhost:8080/upload-image';
        return fetch(uploadUrl, {
          method: 'POST',
          body: formData,
        });
      },
  
      generateUID(length) {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
      },
  
      submitForm() {
      if (this.serviceData.file) {
        this.uploadFile(this.serviceData.file, this.serviceData.uid)
          .then(response => response.text())
          .then(data => {
            console.log('Image upload response:', data);
            return this.submitServiceData();
          })
          .then(() => {
            // Redirect to the services page after successful submission
            this.$router.push({ name: 'services' });
          })
          .catch(error => {
            console.error('Error uploading file:', error);
            // Handle file upload error
          });
      } else {
        this.submitServiceData()
          .then(() => {
            // Redirect to the services page after successful submission
            this.$router.push({ name: 'services' });
          })
          .catch((error) => {
            console.error('Error creating service:', error);
            // Handle service creation error
          });
      }
    }
,
  
submitServiceData() {
  const apiUrl = 'http://localhost:8080/advertisement/services';
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(this.serviceData),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch((error) => {
    console.error('Error creating service:', error);
  });
},
  
      getCurrentUserAccount() {
        const accountDetails = JSON.parse(localStorage.getItem('accountDetails'));
        return accountDetails && accountDetails.username ? accountDetails.username : null;
      }
    }
  };
  </script>


<style>
#special-form {
  max-width: 500px;
  margin: 0 auto;
  margin-top: 50px; 
  margin-bottom: 50px; 
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

#special-form div {
  margin-bottom: 15px;
}

#special-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

#special-form input[type="text"],
#special-form input[type="date"],
#special-form input[type="number"],
#special-form textarea,
#special-form input[type="file"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

#special-form button {
  background-color: #198754; /* Green background */
  color: white; /* White text */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

#special-form button:hover {
  background-color: #146c43; /* Darker green on hover */
  transform: translateY(-2px); /* Slight lift on hover */
}

/* Additional styles for responsiveness and aesthetics */
@media (max-width: 600px) {
  #special-form {
    width: 90%;
    padding: 15px;
    margin-top: 50px;
    margin-bottom: 50px;
  }
}

</style>
  