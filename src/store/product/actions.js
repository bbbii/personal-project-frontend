import { REQUEST_PRODUCT_LIST_TO_SPRING, REQUEST_PRODUCT_TO_SPRING } from "./mutation-types";

import axiosInstances from "@/utility/axiosInst";

export default {
  requestProductListToSpring({ commit }) {
    axiosInstances.springAxiosInst.get("/product/list").then((res) => {
      commit(REQUEST_PRODUCT_LIST_TO_SPRING, res.data);
    });
  },
  requestRegisterProductInfoToSpring({}, payload) {
    const { productName, productPrice, productDescription, productTags } = payload;

    return axiosInstances.springAxiosInst
      .post("/product/register", { productName, productPrice, productDescription, productTags })
      .then((res) => {
        // alert("파일 저장 요청 성공");
        // console.log(res.data.productId);
        return res.data.productId;
      })
      .catch(() => {
        alert("문제 발생");
      });
  },
  requestProductToSpring({ commit }, productId) {
    return axiosInstances.springAxiosInst.get(`/product/${productId}`).then((res) => {
      commit(REQUEST_PRODUCT_TO_SPRING, res.data);
    });
  },
};
