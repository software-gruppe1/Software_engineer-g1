// src/components/Navbar.vue
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img src="/images/logo.png" alt="Logo" class="navbar-logo">
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
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
        <button class="btn btn-outline-primary ms-2" type="button">Login</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped lang="scss">
.navbar {
  background-color: #ffdd00;  // A bright yellow color for a vibrant and modern look
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);  // A subtle shadow for a lifted appearance

  .navbar-brand .navbar-logo {
    height: 40px;
    width: auto;
  }

  .navbar-nav .nav-link {
    color: #028476;  // Teal text for a fresh look
    &:hover {
      color: #B3DAD5;  // White color on hover for contrast
    }
  }

  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(2, 132, 118, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");  // Teal hamburger icon
  }

  .btn {
    border-color: #028476;  // Teal border for buttons
    color: #028476;  // Teal text for buttons
    &:hover {
      background-color: #028476;  // Teal background on hover
      color: #ffdd00;  // Bright yellow text on hover for contrast
    }
  }
}
</style>
