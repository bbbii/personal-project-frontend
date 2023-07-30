import { REQUEST_PAYMENT_TO_SPRING } from "./mutation-types";

export default {
  [REQUEST_PAYMENT_TO_SPRING](state, receivedData) {
    state.payment = receivedData;
  },
};
