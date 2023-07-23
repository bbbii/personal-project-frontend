import { REQUEST_CART_LIST_TO_SPRING } from "./mutation-types";

import axiosInstances from "@/utility/axiosInst";

export default {
  requestCartListToSpring({ commit }, email) {
    axiosInstances.springAxiosInst
      .get("/cart/list", { params: { email } })
      .then((res) => {
        // console.log(email);
        commit(REQUEST_CART_LIST_TO_SPRING, res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
