<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img src="/images/logo.png" alt="Logo" class="navbar-logo">
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
      <div :class="{ 'navbar-collapse': true, collapse: !isNavOpen }" id="navbarNav">
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
  data() {
    return {
      isNavOpen: false
    };
  }
};
</script>

<style scoped lang="scss">
.navbar {
  background-color: #ffdd00;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  .navbar-brand .navbar-logo {
    height: 40px;
    width: auto;
  }

  .navbar-nav .nav-link {
    color: #028476;
    &:hover {
      color: #B3DAD5;
    }
    margin-right: 1rem; // Add right margin to each nav link
  }

  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(2, 132, 118, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  }

  .btn {
    border-color: #028476;
    color: #028476;
    &:hover {
      background-color: #028476;
      color: #ffdd00;
    }
  }

  .btn-outline-primary {
    margin-left: 2rem; // Add left margin to the Login button
  }

  .form-control {
    margin-right: 1rem; // Add right margin to the search input
  }

  // Adjusting style for collapsed navbar
  @media (max-width: 992px) {
    .btn-outline-primary {
      margin-left: 0 !important; // Override the left margin in mobile view
      margin-top: 0.5rem; // Add top margin to the button
    }

    .navbar-nav .nav-link {
      margin-right: 0; // Remove right margin from nav links
    }
  }
}
</style>



