<template lang="">
  <div>
    <h2>상품 등록 페이지</h2>
    <product-register-form @submit="onSubmit" />
  </div>
</template>

<script>
import ProductRegisterForm from "@/components/product/ProductRegisterForm.vue";
import { mapActions } from "vuex";
const productModule = "productModule";

export default {
  components: {
    ProductRegisterForm,
  },
  name: "ProductRegisterPage",
  methods: {
    ...mapActions(productModule, ["requestRegisterProductInfoToSpring"]),
    async onSubmit(payload) {
      const product = await this.requestRegisterProductInfoToSpring(payload);

      await this.$router.push({
        name: "ProductReadPage",
        params: { productId: product.toString() },
      });
    },
  },
};
</script>

<style lang=""></style>
