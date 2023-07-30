import Vue from "vue";
import Vuex from "vuex";

import accountModule from "./account/AccountModule.js";
import productModule from "./product/ProductModule.js";
import cartModule from "./cart/CartModule.js";
import paymentModule from "./payment/PaymentModule.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    accountModule: accountModule,
    productModule: productModule,
    cartModule: cartModule,
    paymentModule: paymentModule,
  },
});

export default store;
