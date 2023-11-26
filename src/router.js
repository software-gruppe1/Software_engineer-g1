import { createRouter, createWebHistory } from 'vue-router';
import Services from './views/Services.vue'; // Changed to PascalCase
import HomePage from './views/HomePage.vue';
import ServiceFormPage from './views/ServiceFormPage.vue';
import ServiceDetailPage from './components/ServiceDetailPage.vue';
import ViewAllServices from './views/ViewAllServices.vue';
import Orders from './views/Orders.vue';
import About from './views/About.vue';
import Contact from './views/Contact.vue';

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: HomePage // Direct route for the homepage
  },
  {
    path: '/services',
    name: 'Services',
    component: Services
  },
  {
    path: '/service-form',
    name: 'ServiceFormPage',
    component: ServiceFormPage
  },
  {
    path: '/:uid', // Changed to lowercase and more descriptive
    name: 'ServiceDetail',
    component: ServiceDetailPage,
    props: true
  },
  {
    path: '/view-all-services',
    name: 'ViewAllServices',
    component: ViewAllServices
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/order/:orderId',
    name: 'OrderDetails',
    component: Orders,
    props: true
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/contact', // New route for the Contact page
    name: 'Contact',
    component: Contact
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
