<template lang="">
  <div class="cart">
    <h2>장바구니</h2>
    <cart-form :cart="cart" />
    <tosspay-home :cart="cart" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CartForm from "@/components/cart/CartForm.vue";
import TosspayHome from "@/views/tosspay/TosspayHome.vue";

const cartModule = "cartModule";

export default {
  components: {
    CartForm,
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

<style lang=""></style>
