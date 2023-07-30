import Vue from "vue";
import Vuex from "vuex";

import mutations from "@/store/payment/mutations";
import actions from "@/store/payment/actions";
import state from "@/store/payment/states";

Vue.use(Vuex);

const PaymentModule = {
  namespaced: true,
  state,
  actions,
  mutations,
};

export default PaymentModule;
