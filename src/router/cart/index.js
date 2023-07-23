import Vue from "vue";
import VueRouter from "vue-router";

import CartPage from "@/views/cart/CartPage.vue";

Vue.use(VueRouter);

const cartRoutes = [
  {
    path: "/cart-list",
    name: "CartPage",
    component: CartPage,
  },
];
export default cartRoutes;
