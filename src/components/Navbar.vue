<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
    <div class="container">
      <!-- Logo -->
      <router-link class="navbar-brand" to="/Home">
      <img src="/images/logo-new.png" alt="Logo" class="navbar-logo">
        </router-link>

      <!-- Navbar Toggle for Mobile View -->
      <button class="navbar-toggler" type="button" @click="isNavOpen = !isNavOpen"
              :aria-expanded="isNavOpen.toString()" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar Links and Login/User Icon -->
      <div :class="{ 'collapse': !isNavOpen, 'navbar-collapse': true }" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <!-- Navigation Links -->
          <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
          
          
          
          <li class="nav-item"><a class="nav-link" href="#">About</a></li>
          
          
          <li class="nav-item">
          <router-link class="nav-link" to="/services">Services</router-link>
          </li>
          
          
          <li class="nav-item"><a class="nav-link" href="#">Contact</a></li>
        </ul>

        <!-- Search Form -->
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>

        <!-- Conditional Rendering for Login Button or User Icon -->
        <div v-if="isLoggedIn">
          <img src="/images/person-square.svg" @click.stop="toggleDropdown" class="user-icon">
          <span class="username">{{ accountDetails.username }}</span>
          <div v-if="showDropdown" :class="{'user-dropdown': true, 'show': showDropdown}" ref="dropdownMenu">
            <a class="dropdown-item no-pointer">Hi {{ accountDetails.fullName }}</a>
            <router-link class="dropdown-item" to="/services">Services</router-link>
            <a class="dropdown-item" href="/orders">Orders</a>
            <span class="dropdown-item logout-css" @click="logout()">Log out</span>
            <div v-if="accountDetails && accountDetails.role === 'Admin'">Admin Options</div>
            
          </div>
        </div>
        
        <button v-else class="btn btn-outline-primary ms-2" @click="showLoginModal = true">Login</button>
        
        <div v-if="isLoggedIn" class="cart-info">
          <img src="/images/cart.svg" alt="Cart" class="cart-icon">
          <span v-if="accountDetails.shopping_cart" style="margin-left: 10px;">{{ accountDetails.shopping_cart.totalPrice }}</span>
        </div>
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
      isLoggedIn: false,
      showDropdown: false,
      accountDetails: null,
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
        const account = await response.json();
        if (account) {
          this.isLoggedIn = true;
          this.accountDetails = account;
          localStorage.setItem('accountDetails', JSON.stringify(account));
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
      this.showLoginModal = false;
      location.reload();
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
      console.log('Dropdown toggled. Current state:', this.showDropdown);
    },
    handleClickOutside(event) {
      const dropdownElement = this.$refs.dropdownMenu;
      if (dropdownElement && !dropdownElement.contains(event.target)) {
        this.showDropdown = false;
        console.log('Clicked outside. Dropdown closed.');
      }
    },
    
    logout() {
  console.log("Logout method called");
  localStorage.removeItem('accountDetails');
  this.isLoggedIn = false;
  this.accountDetails = null;
  window.location.reload();
  },
  },
  mounted() {
  const storedAccount = localStorage.getItem('accountDetails');
  if (storedAccount) {
    this.accountDetails = JSON.parse(storedAccount);
    this.isLoggedIn = true;
  }
  document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },



};
</script>

<style scoped>
.navbar-brand .navbar-logo {
  height: 40px;
  width: auto;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
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
  padding: 0.5rem 1rem;
  width: auto;
}

.form-control {
  padding: 0.375rem 0.75rem;
  height: 3rem;
  width: 300%;
  max-width: 500px;
  margin-top: 0.5rem;
}

button {
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

.user-icon {
  cursor: pointer;
  padding-left: 10px; 
  margin: 20px;       
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.cart-info {
  display: flex;
  align-items: center;
  margin-left: 50px; 
}

.cart-icon {
  width: 20px;
  height: auto;
  margin-right: 5px;
  width: 27px;  /* Adjust the size as needed */
    height: 27px;
}

.user-dropdown {
    display: none;
    position: absolute;
    top: 100%;
    right: 24.2%;
    background-color: #f9f9f9;
    min-width: 190px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }

  .user-dropdown.show {
    display: block;
    
  }


  .logout-css {
  cursor: pointer;
  color: #007bff; /* Bootstrap primary color for link-like appearance */
}

.logout-css:hover {
  color: #0056b3; /* Darker shade for hover effect */
  text-decoration: underline;
}

.no-pointer {
  cursor: default;
}

.margin-left-10 {
    margin-left: 10px;
}
</style>
