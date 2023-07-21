import Vue from "vue";
import Vuex from "vuex";

import mutations from "@/store/cart/mutations";
import actions from "@/store/cart/actions";
import state from "@/store/cart/states";

Vue.use(Vuex);

const CartModule = {
  namespaced: true,
  state,
  actions,
  mutations,
};

export default CartModule;
