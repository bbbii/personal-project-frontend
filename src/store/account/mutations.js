import { IS_SIGNIN } from "./mutation-types";

export default {
  [IS_SIGNIN](state, receivedData) {
    state.isSignIn = receivedData;
  },
};
