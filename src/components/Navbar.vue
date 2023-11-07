<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img src="/images/logo-new.png" alt="Logo" class="navbar-logo">
      </a>
      <button
        class="navbar-toggler"
        type="button"
        @click="isNavOpen = !isNavOpen"
        :aria-expanded="isNavOpen.toString()"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div :class="{ 'collapse': !isNavOpen, 'navbar-collapse': true }" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Services</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Contact</a>
          </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
        <!-- Trigger/Login Button -->
        <button class="btn btn-outline-primary ms-2" type="button" @click="showLoginModal = true">Login</button>
      </div>
    </div>

    <!-- Login Modal -->
    <div v-if="showLoginModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showLoginModal = false">&times;</span>
        <button @click="login('User')">Login as User</button>
        <button @click="login('Admin')">Login as Admin</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isNavOpen: false,
      showLoginModal: false,
    };
  },
  methods: {
    async login(role) {
      try {
        const url = `http://localhost:8080/user/account/${role}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        this.$emit('user-logged-in', data);
      } catch (error) {
        console.error('Fetch error:', error);
        // Here, you might want to update the UI to show the error
      }

      this.showLoginModal = false;
    },
  },
};
</script>


<style scoped>
.navbar {
  /* Add your existing navbar styles here */
}

.navbar-brand .navbar-logo {
  height: 40px; /* Adjust this value to control the size of the logo */
  width: auto; /* This will maintain the aspect ratio of the image */
}

/* Modal styles */
.modal {
  display: block; /* Show the modal */
  position: fixed; /* Stay in place */
  z-index: 1000; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 30%; /* Could be more or less, depending on screen size */
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.btn-outline-primary {
  padding: 0.5rem 1rem; /* Adjust padding to control height and width */
  width: auto; /* Auto width based on content, or you can set a specific width */
  /* Add any additional styling you want for the button here */
}

.form-control {
  padding: 0.375rem 0.75rem; /* Smaller padding to reduce height */
  height: 3rem; /* Adjust height if needed, or keep it auto */
  width: 300%; /* Full width of its container */
  max-width: 500px; /* Maximum width it can expand to */
  margin-top: 0.5rem;
  /* Add any additional styling you want for the input here */
}

/* Button styles for the modal */
button {
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}
</style>