<template lang="">
  <div>
    <h2>상품 수정</h2>
    <product-modify-form v-if="product" :productInfo="product" @submit="onSubmit" />
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
      const { productName, productPrice, productDescription, productTags, receivedEmail } = payload;
      const productId = this.productId;
      console.log("page 도착" + payload.productName);
      await this.requestProductModifyToSpring({
        productName,
        productPrice,
        productDescription,
        productTags,
        receivedEmail,
        productId,
      });
      await this.$router.push({
        name: "ProductReadPage",
        params: { productId: this.productId },
      });
    },
  },
  created() {
    this.requestProductToSpring(this.productId);
  },
};
</script>

<style lang=""></style>
