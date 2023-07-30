<template>
  <div>
    <h1>결제위젯 결제 성공</h1>
    <br />
    <p>paymentKey: {{ this.$route.query.paymentKey }}</p>
    <p>orderId: {{ this.$route.query.orderId }}</p>
    <p>amount: {{ this.$route.query.amount }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

const paymentModule = "paymentModule";

export default {
  data() {
    return {
      returnedPaymentObject: {},
    };
  },
  methods: {
    ...mapActions(paymentModule, ["requestPaymentRequestToSpring"]),
  },
  async mounted() {
    const redirectedData = {
      paymentKey: this.$route.query.paymentKey,
      orderId: this.$route.query.orderId,
      amount: this.$route.query.amount,
    };
    try {
      this.returnedPaymentObject = await this.requestPaymentRequestToSpring(redirectedData);
      console.log("결제 승인 요청 성공");
      // console.log(this.returnedPaymentObject);
    } catch (error) {
      console.error("payment API 요청 실패");
    }
  },
};
</script>
