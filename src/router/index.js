import Vue from "vue";
import VueRouter from "vue-router";
import Dash from "../Dash";
import SellTransaction from "../views/SellTransaction";
import Inventory from "../views/Inventory";
import Dashboard from "../views/Dashboard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Dash,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/transaction",
        name: "Sell Transaction",
        component: SellTransaction,
      },
      {
        path: "inventory",
        name: "Inventory",
        component: Inventory,
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
