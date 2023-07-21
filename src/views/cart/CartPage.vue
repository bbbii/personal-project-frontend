<template lang="">
  <div>
    <h2>장바구니</h2>
    <cart-form :cart="cart" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CartForm from "@/components/cart/CartForm.vue";

const cartModule = "cartModule";

export default {
  components: {
    CartForm,
  },
  computed: {
    ...mapState(cartModule, ["cart"]),
  },
  methods: {
    ...mapActions(cartModule, ["requestCartListToSpring"]),
  },
  //   mounted() {
  //     this.requestCartListToSpring();
  //   },
};
</script>

<style lang=""></style>
