import { createRouter, createWebHistory } from 'vue-router';
import services from './views/services.vue';
import HomePage from './views/HomePage.vue'; // Import the HomePage component

const routes = [
    {
        path: '/',
        redirect: '/Home' // Redirect from root to /home
      },
  {
    path: '/Home',
    name: 'Home',
    component: HomePage // Route for the homepage
  },
  {
    path: '/services',
    name: 'services',
    component: services
  },
  // ... other routes
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
