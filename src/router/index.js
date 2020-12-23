import Vue from "vue";
import VueRouter from "vue-router";
import Dash from "../Dash";
import SellTransaction from "../views/SellTransaction";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Dash,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: SellTransaction,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
