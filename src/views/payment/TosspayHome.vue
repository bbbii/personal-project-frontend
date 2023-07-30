<template>
  <div class="hello">
    <div class="payment-type" id="payment-method"></div>
    <div class="total-price">
      <span>총 상품가격</span>
      <b class="price-info">{{ totalPrice | won }}</b>
      <v-icon>mdi-plus</v-icon>
      <span>총 배송비</span>
      <b class="price-info">{{ deliveryFee | won }}</b>
      <v-icon>mdi-equal</v-icon>
      <span>총 주문금액</span>
      <b class="price-info">{{ (totalPrice + deliveryFee) | won }}</b>
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
const customerKey = generateRandomString();
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
      productsName: "",
    };
  },
  async mounted() {
    this.calcTotalPrice(this.cart);
    paymentWidget.renderPaymentMethods("#payment-method", {
      value: this.totalPrice + this.deliveryFee,
    });
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
    setProductName() {
      if (this.cart.length == 1) {
        this.productsName = `${this.cart[0].productName}`;
      } else {
        this.productsName = `${this.cart[0].productName} 외 ${this.cart.length - 1}개`;
      }
      // console.log(this.cart);
      // console.log(this.cart[0].productName);
      // console.log(this.productsName);
    },
    goToList() {
      this.$router.push("/product-list").catch(() => {});
    },
    clickPaymentButton() {
      this.setProductName();
      paymentWidget.renderPaymentMethods("#payment-method", {
        value: this.totalPrice + this.deliveryFee,
      });
      paymentWidget
        .requestPayment({
          orderId: generateRandomString(),
          orderName: `${this.productsName}`,
          successUrl: window.location.origin + "/tosspay-success",
          failUrl: window.location.origin + "/tosspay-fail",
          customerEmail: localStorage.getItem("userEmail"),
          customerName: "1",
        })
        .then((v) => console.log(v));
    },
  },
};
</script>

<style scoped>
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
.price-info {
  font-size: 2em;
  margin-right: 1%;
  margin-left: 1%;
}
</style>
