import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Plugin } from "vue-fragment";
import Swal from "sweetalert2";
import moment from "moment";
import "./assets/style.scss";
import "./bootstrap";

Vue.config.productionTip = false;

Vue.use(Plugin);

moment.locale("id");

window.Swal = Swal;
window.moment = moment();
window.EventBus = new Vue();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
