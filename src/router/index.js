import Vue from "vue";
import VueRouter from "vue-router";

import HomeView from "../views/HomeView.vue";

import accountRoutes from "./account";
import productRoutes from "./product";
import cartRoutes from "./cart";

import TosspayHome from "@/views/payment/TosspayHome.vue";
import SuccessPage from "@/views/payment/SuccessPage.vue";
import FailPage from "@/views/payment/FailPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  ...accountRoutes,
  ...productRoutes,
  ...cartRoutes,
  {
    path: "/tosspay",
    name: "Home",
    component: TosspayHome,
  },
  {
    path: "/tosspay-success",
    name: "SuccessPage",
    component: SuccessPage,
  },
  {
    path: "/tosspay-fail",
    name: "FailPage",
    component: FailPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
