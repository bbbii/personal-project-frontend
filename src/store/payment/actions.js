import env from "@/env";
import {} from "./mutation-types";

import axiosInstances from "@/utility/axiosInst";

export default {
  requestPaymentRequestToSpring({}, payload) {
    const headers = {
      Authorization: `Basic ${env.api.TOSS_INCODED_KEY}`,
      "Content-Type": "application/json",
    };
    const { paymentKey, orderId, amount } = payload;
    return axiosInstances.axiosInstToApi
      .post("/v1/payments/confirm", { paymentKey, orderId, amount }, { headers })
      .then((res) => {
        console.log("payment 요청 완료");
        return res.data;
      })
      .catch(() => {
        alert("문제 발생");
      });
  },
};
