import { REQUEST_BOARD_LIST_TO_SPRING, REQUEST_BOARD_TO_SPRING, SET_EMAIL } from "./mutation-types";

export default {
  [REQUEST_BOARD_LIST_TO_SPRING](state, receivedData) {
    state.boards = receivedData;
  },
  [REQUEST_BOARD_TO_SPRING](state, receivedData) {
    state.board = receivedData;
  },
  [SET_EMAIL](state, email) {
    state.email = email;
  },
};
