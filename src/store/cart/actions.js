import { REQUEST_CART_LIST_TO_SPRING } from "./mutation-types";

import axiosInstances from "@/utility/axiosInst";

export default {
  requestCartListToSpring({ commit }) {
    axiosInstances.springAxiosInst.get("/cart/list").then((res) => {
      commit(REQUEST_CART_LIST_TO_SPRING, res.data);
    });
  },
};
