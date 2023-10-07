<template>
    <footer class="footer">
      <div class="container">
        <div class="logo-container">
          <img src="/images/logo-new.png" alt="Company Logo" class="logo"/>
        </div>
        <div class="social-media">
          <a href="#" class="social-icon" aria-label="Twitter">
            <img src="/images/twitter-badge.svg" alt="Twitter" />
          </a>
          <a href="#" class="social-icon" aria-label="Facebook">
            <img src="/images/facebook-badge.svg" alt="Facebook" />
          </a>
          <a href="#" class="social-icon" aria-label="Instagram">
            <img src="/images/instagram-badge.svg" alt="Instagram" />
          </a>
        </div>
        <p class="copyright">
          Copyright ©2023 All rights reserved
        </p>
      </div>
    </footer>
</template>
  
<script>
export default {
  name: 'FooterComponent',
}
</script>
  
<style scoped>
.footer {
  text-align: center;
  padding: 20px;
  background-color: #f8f8f8;
}

.company-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.logo-container {
  margin: 10px 0; /* Adjust as per your design */
}

.logo {
  width: 300px; /* Adjust as per your design */
  height: auto;
}

.social-media {
  margin: 20px 0;
}

.social-icon {
  display: inline-block;
  margin: 0 10px;
  border-radius: 50%;
  overflow: hidden;
  width: 40px;
  height: 40px;
}

.social-icon img {
  width: 100%;
  height: 100%;
}

.copyright {
  font-size: 14px;
  color: #666;
}
</style>
