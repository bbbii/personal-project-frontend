import Vue from "vue";
import VueRouter from "vue-router";

import ProductListPage from "@/views/product/ProductListPage.vue";

Vue.use(VueRouter);

const productRoutes = [
  {
    path: "/product-list",
    name: "ProductListPage",
    component: ProductListPage,
  },
];
export default productRoutes;
