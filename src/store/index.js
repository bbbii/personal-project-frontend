import Vue from "vue";
import Vuex from "vuex";

import accountModule from "./account/AccountModule.js";
import productModule from "./product/ProductModule.js";
import cartModule from "./cart/CartModule.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    accountModule: accountModule,
    productModule: productModule,
    cartModule: cartModule,
  },
});

export default store;
