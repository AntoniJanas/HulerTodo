import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import './styles/_base.scss';

createApp(App).use(store).mount('#app');
