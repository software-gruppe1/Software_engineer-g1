import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import '@fontsource-variable/oswald';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router'; // Make sure this imports your router configuration
const app = createApp(App);

app.use(VueAxios, axios);
app.use(router); // Add this line to use Vue Router
app.mount('#app');
