import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import './styles/main.scss'
import '@fontsource-variable/oswald';
import axios from 'axios';
import VueAxios from 'vue-axios';


const app = createApp(App);

app.use(VueAxios, axios);

app.mount('#app');
