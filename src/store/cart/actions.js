import { REQUEST_CART_LIST_TO_SPRING, REQUEST_CART_ITEM_ID_LIST_TO_SPRING } from "./mutation-types";

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
        console.error("cartList API 조회 실패", error);
      });
  },
  requestAddCartItemToSpring({}, payload) {
    const { email, productId, productCount } = payload;
    return axiosInstances.springAxiosInst
      .post("/cart/add-item", {
        email,
        productId,
        productCount,
      })
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((error) => {
        console.error("addToCart API 요청 실패:", error);
      });
  },
  requestDeleteCartItemToSpring({ commit }, payload) {
    const { email, id } = payload;
    // console.log(payload);
    return axiosInstances.springAxiosInst
      .delete(`/cart/${id}`, { params: { email } })
      .then((res) => {
        commit(REQUEST_CART_LIST_TO_SPRING, res.data);
        return res.data;
      })
      .catch((error) => {
        console.error("deleteToCart API 요청 실패:", error);
      });
  },
  requestDeleteAllItemToSpring({ commit }, payload) {
    const { email, arr } = payload;
    return axiosInstances.springAxiosInst
      .delete(`/cart?arr=${arr}`, { params: { email } })
      .then((res) => {
        commit(REQUEST_CART_LIST_TO_SPRING, res.data);
      })
      .catch((error) => {
        console.error("deleteAllItem API 요청 실패:", error);
      });
  },
};
