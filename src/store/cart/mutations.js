import { REQUEST_CART_LIST_TO_SPRING, REQUEST_CART_ITEM_ID_LIST_TO_SPRING } from "./mutation-types";

export default {
  [REQUEST_CART_ITEM_ID_LIST_TO_SPRING](state, receivedData) {
    state.carts = receivedData;
  },
  [REQUEST_CART_LIST_TO_SPRING](state, receivedData) {
    state.cart = receivedData;
  },
};
