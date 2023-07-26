<template lang="">
  <div>
    <h2>장바구니</h2>
    <cart-form :cart="cart" />
    <details>
      <summary class="give-me-money">Kakao 결제하기</summary>
      <kakaopay-home :cart="cart" />
    </details>
    <details>
      <summary class="give-me-money">Toss 결제하기</summary>
      <tosspay-home :cart="cart" />
    </details>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CartForm from "@/components/cart/CartForm.vue";
import KakaopayHome from "@/views/payment/kakao/KakaopayHome.vue";
import TosspayHome from "@/views/payment/toss/TosspayHome.vue";

const cartModule = "cartModule";

export default {
  components: {
    CartForm,
    KakaopayHome,
    TosspayHome,
  },
  data() {
    return {
      cartData: [],
    };
  },
  computed: {
    ...mapState(cartModule, ["cart"]),
  },
  methods: {
    ...mapActions(cartModule, ["requestCartListToSpring"]),
  },
  mounted() {
    const userEmail = localStorage.getItem("userEmail");
    // console.log(userEmail);
    this.requestCartListToSpring(userEmail);
  },
};
</script>

<style scoped>
.give-me-money {
  background: #eae5ff;
  color: #000000;
  padding: 10px;
  outline: 0;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.5s;
  text-align: left;
  box-shadow: 1px 1px 2px gray;
}
</style>
