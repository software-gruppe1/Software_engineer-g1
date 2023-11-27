<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
    <div class="container">
      <!-- Logo -->
      <router-link class="navbar-brand" to="/home">
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
          <li class="nav-item">
            <RouterLink class="nav-link" to="/home">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/about">About</RouterLink></li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Services">Services</router-link>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/contact">Contact</RouterLink>
          </li>
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

        <div v-if="isLoggedIn" class="cart-info" @mouseover="showCartDropdown = true" @mouseleave="showCartDropdown = false">
          <img src="/images/cart.svg" alt="Cart" class="cart-icon">
          <span v-if="accountDetails.shopping_cart" class="margin-left-10">{{ accountDetails.shopping_cart.totalPrice }}</span>
          <div v-if="showCartDropdown" class="cart-dropdown">
            <div v-for="uid in accountDetails.shopping_cart.services" :key="uid" class="cart-item">
              <div v-for="item in services" :key="item.id">
                <div v-if="item.uid === uid">
                  <span class="service-item">{{ item.serviceName }} <span class="price">{{ item.price }}</span> </span>
                </div>
              </div>
            </div>
            <div class="cart-total">
              Total: {{ accountDetails.shopping_cart.totalPrice }}
            </div>
            <button v-if="accountDetails.shopping_cart.services.length !== 0" @click="createOrder" class="pay-button">Pay</button>
          </div>
        </div>

        <button v-else class="btn btn-outline-primary ms-2" @click="showLoginModal = true">Login</button>
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
import { RouterLink } from 'vue-router';

export default {
    name: 'Navbar',
    data() {
        return {
            isNavOpen: false,
            showLoginModal: false,
            isLoggedIn: false,
            showDropdown: false,
            accountDetails: null,
            showCartDropdown: false,
            services: [],
        };
    },
    computed: {
        totalPrice() {
            return this.cartItems.reduce((total, item) => total + item.price, 0);
        },
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
            }
            catch (error) {
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
        async refreshAccountDetails() {
            try {
                // Replace with the actual API endpoint to fetch account details
                const url = `http://localhost:8080/user/account/${this.accountDetails.username}`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                    // Add any required headers, like authorization tokens
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const updatedAccountDetails = await response.json();
                // Update local storage
                localStorage.setItem('accountDetails', JSON.stringify(updatedAccountDetails));
                // Update component state
                this.accountDetails = updatedAccountDetails;
            }
            catch (error) {
                console.error('Error fetching updated account details:', error);
            }
        },
        fetchServices() {
            fetch('http://localhost:8080/advertisement/services/all')
                .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
                .then(data => {
                this.services = data;
            })
                .catch(error => {
                console.error('Error fetching services:', error);
            });
        },
        async createOrder() {
            const url = `http://localhost:8080/user/order/${this.accountDetails.username}`;
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                await this.refreshAccountDetails();
                console.log('order created and account details refreshed');
                let orderId = this.accountDetails.orders[this.accountDetails.orders.length - 1].orderId
                this.$router.push({ name: 'OrderDetails', params: { orderId } });
            }
            catch (error) {
                console.error('Error could not create order:', error);
            }
        },
    },
    mounted() {
        const storedAccount = localStorage.getItem('accountDetails');
        if (storedAccount) {
            this.accountDetails = JSON.parse(storedAccount);
            this.isLoggedIn = true;
            this.fetchServices();
            console.log(this.services);
        }
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleClickOutside);
    },
    components: { RouterLink }
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
  position: relative;       
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
  top: 100%; /* Keep this to position the dropdown below the icon */
  left: 72.7%; /* Keep this to align with the left edge of the user-icon */
  background-color: #f9f9f9;
  min-width: 190px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 8px; /* Rounded corners for the dropdown */
  overflow: hidden; /* Ensures the inner content respects the border radius */
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

.cart-dropdown {
  position: absolute;
  top: 100%; /* Position directly below the cart icon */
  left: 50%; /* Start from the middle of the cart icon */
  transform: translateX(-50%); /* Shift the dropdown back by half of its width */
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 300px; /* Adjust as needed */
  max-height: 400px;
  display: none; /* Initially hidden */
  flex-direction: column;
  overflow-y: scroll;
}

.cart-item {
  border-bottom: 1px solid #ddd; /* Add a bottom border to each item */
  padding: 10px 0; /* Add some padding for spacing */
  display: flex;
  align-items: center;
}

  .cart-total {
    margin-top: 10px;
    font-weight: bold;
  }

  .pay-button {
    background-color: #198754; /* Green background */
    color: white; /* White text */
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    align-self: flex-end;
  }

  .pay-button:hover {
    background-color: #146c43; /* Darker green on hover */
  }

  .cart-info {
  display: flex;
  align-items: center;
  margin-left: 50px;
  position: relative; /* Ensure relative positioning for the dropdown */
}

  .cart-info:hover .cart-dropdown {
  display: flex; /* Show dropdown on hover */
}

.cart-item:last-child {
  border-bottom: none; /* Remove border for the last item */
}

.cart-item span {
  font-family: 'Arial', sans-serif; /* Use a modern font */
}

.service-item {
  font-family: 'Arial', sans-serif; 
  color: #198754; 
  background-color: white; 
  padding: 5px 10px; 
  border-radius: 5px; 
  display: inline-block; 
  margin: 5px; 
  font-size: 1rem;
}

.service-item::after {
  content: ',-'; 
  color: black; /* Black color for the price */
  font-weight: bold;
}

.price {
  color: black; /* Black color for the price */
  font-size: 1.1rem; /* Standard font size for price */
  font-weight: bold;
  margin-left: 10px;
  
}

.user-dropdown li {
  padding: 10px 15px; 
  border-bottom: 1px solid #eee;
  background-color: #f9f9f9; 
}

.user-dropdown li:hover {
  background-color: #f0f0f0; 
}

.user-dropdown li:last-child {
  border-bottom: none;
}

.user-dropdown::before {
  content: '';
  position: absolute;
  top: -10px; 
  right: 10px;
  border-width: 0 10px 10px 10px;
  border-style: solid;
  border-color: transparent transparent #ffffff transparent;
}
</style>
