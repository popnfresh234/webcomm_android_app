import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import axios from "axios";
import VueAxios from "vue-axios";
import "./assets/common.css";

const app = createApp(App).use(store).use(router);
app.use(VueAxios, axios);
app.provide("axios", app.config.globalProperties.axios); // provide 'axios'
app.mount("#app");
