import Vue from "vue";
import VueRouter from "vue-router";

import HomeView from "../views/HomeView.vue";

import accountRoutes from "./account";
import productRoutes from "./product";
import cartRoutes from "./cart";
import awsSdkRoutes from "./aws";

import TosspayHome from "@/views/tosspay/TosspayHome.vue";
import SuccessPage from "@/views/tosspay/SuccessPage.vue";
import FailPage from "@/views/tosspay/FailPage.vue";

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
  ...awsSdkRoutes,
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
});

export default router;
