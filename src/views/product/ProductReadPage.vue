<template lang="">
  <div>
    <h2>상품 상세 내역 보기</h2>
    <product-read-form v-if="product" :product="product" />
    <p v-else>로딩중...</p>
  </div>
</template>

<script>
import ProductReadForm from "@/components/product/ProductReadForm.vue";
import { mapActions, mapState } from "vuex";

const productModule = "productModule";

export default {
  components: {
    ProductReadForm,
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
    ...mapActions(productModule, ["requestProductToSpring"]),
  },
  created() {
    this.requestProductToSpring(this.productId);
  },
};
</script>

<style scoped></style>
