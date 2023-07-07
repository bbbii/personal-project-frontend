import { REQUEST_PRODUCT_LIST_TO_SPRING, REQUEST_PRODUCT_TO_SPRING } from "./mutation-types";

import axiosInstances from "@/utility/axiosInst";

export default {
  requestProductListToSpring({ commit }) {
    axiosInstances.springAxiosInst.get("/product/list").then((res) => {
      commit(REQUEST_PRODUCT_LIST_TO_SPRING, res.data);
    });
  },
};