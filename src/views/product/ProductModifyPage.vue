<template lang="">
  <div>
    <h2>상품 수정</h2>
    <product-modify-form v-if="product" :product="product" @submit="onSubmit" />
    <p v-else>상품 정보를 불러오는 중...</p>
  </div>
</template>

<script>
import ProductModifyForm from "@/components/product/ProductModifyForm.vue";
import { mapActions, mapState } from "vuex";
const productModule = "productModule";

export default {
  components: {
    ProductModifyForm,
  },
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(productModule, ["product"]),
  },
  methods: {
    ...mapActions(productModule, ["requestProductToSpring", "requestProductModifyToSpring"]),
    async onSubmit(payload) {
      const modifiedProduct = await this.requestProductModifyToSpring(payload);

      await this.$router.push({
        name: "ProductReadPage",
        params: { productId: modifiedProduct.toString() },
      });
    },
  },
  created() {
    this.requestProductToSpring(this.productId);
  },
};
</script>

<style lang=""></style>
