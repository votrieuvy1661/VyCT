import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App.vue";

createApp(App).use(createPinia()).use(router).mount("#app");
