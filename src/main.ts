import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import PrimeVue from 'primevue/config';

import "primevue/resources/themes/vela-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';

import Button from "primevue/button";
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import TabMenu from 'primevue/tabmenu';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

import { SpaceTraders } from 'spacetraders-sdk';

const app = createApp(App);

app.use(store).use(router).use(PrimeVue, { ripple: true }).use(ToastService);

app.component("Button", Button)
    .component('Card', Card)
    .component('InputText', InputText)
    .component('TabMenu', TabMenu)
    .component('Toast', Toast);
app.config.globalProperties.$space = new SpaceTraders();
app.mount('#app');
