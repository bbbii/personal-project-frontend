<template>
  <div class="hello">
    <div class="payment-type" id="payment-method"></div>
    <div class="total-price">
      <span>총 상품가격</span>
      <b class="priceInfo">{{ totalPrice | won }}</b>
      <v-icon>mdi-plus</v-icon>
      <span>총 배송비</span>
      <b class="priceInfo">{{ deliveryFee | won }}</b>
      <v-icon>mdi-equal</v-icon>
      <span>총 주문금액</span>
      <b class="priceInfo">{{ (totalPrice + deliveryFee) | won }}</b>
    </div>
    <div class="button-style">
      <v-btn large @click="goToList">목록으로</v-btn>
      <v-btn large color="secondary" @click="clickPaymentButton">결제하기</v-btn>
    </div>
  </div>
</template>

<script>
import { generateRandomString } from "@/utility/util";
import env from "@/env";

const clientKey = env.api.TOSS_API_KEY;
const customerKey = "rot2DuJyq9UMKRuoWMtZQ";
const paymentWidget = PaymentWidget(clientKey, customerKey);

export default {
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      totalPrice: 0,
      deliveryFee: 4000,
    };
  },
  async mounted() {
    this.calcTotalPrice(this.cart);
    paymentWidget.renderPaymentMethods("#payment-method", { value: this.totalPrice });
  },
  watch: {
    cart: {
      deep: true,
      handler() {
        this.calcTotalPrice(this.cart);
      },
    },
  },
  methods: {
    calcTotalPrice(cart) {
      var sum = 0;
      for (let i = 0; i < cart.length; i++) {
        sum += this.cart[i].productPrice * this.cart[i].productCount;
      }
      this.totalPrice = sum;
    },
    goToList() {
      this.$router.push("/product-list").catch(() => {});
    },
    clickPaymentButton() {
      paymentWidget.renderPaymentMethods("#payment-method", { value: this.totalPrice });
      paymentWidget
        .requestPayment({
          orderId: generateRandomString(),
          orderName: "과일세트",
          successUrl: window.location.origin + "/tosspay-success",
          failUrl: window.location.origin + "/tosspay-fail",
          customerEmail: "hyeongjin1326@gmail.com", // 고객 이메일 (선택)
          customerName: "김형진", // 고객 이름 (선택)
        })
        .then((v) => console.log(v));
    },
  },
};
</script>

<style scoped>
/* .hello {
  margin-top: 5%;
  margin-bottom: 10%;
} */
.payment-type {
  text-align: center;
}
.button-style {
  display: flex;
  justify-content: flex-end;
  margin-right: 5%;
}
.v-btn {
  margin-left: 1%;
}
.total-price {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}
.priceInfo {
  font-size: 2em;
  margin-right: 1%;
  margin-left: 1%;
}
</style>
