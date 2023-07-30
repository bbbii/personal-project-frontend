<template lang="">
  <div>
    <div style="display: flex; align-items: center; justify-content: space-between; width: 100%">
      <h3>
        <a @click="goToList" class="clickable-text">
          <v-icon>mdi-keyboard-backspace</v-icon>
          <span>상품 목록으로</span>
        </a>
      </h3>
      <div class="button-registered">
        <v-btn v-if="isRegister" @click="onModify">수정</v-btn>
        <v-btn v-if="isRegister" class="ms-1" @click="onDelete">삭제</v-btn>
      </div>
    </div>
    <product-read-form v-if="product" :product="product" />
    <p v-else>로딩중...</p>
  </div>
</template>

<script>
import ProductReadForm from "@/components/product/ProductReadForm.vue";
import { mapActions, mapState } from "vuex";

const productModule = "productModule";

export default {
  data() {
    return {
      isRegister: true,
    };
  },
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
    ...mapActions(productModule, ["requestProductToSpring", "requestDeleteProductToSpring"]),
    onModify() {
      this.$router
        .push({
          name: "ProductModifyPage",
          params: { productId: this.product.productId.toString() },
        })
        .catch(() => {});
    },
    async onDelete() {
      this.$swal("상품이 삭제되었습니다");
      await this.requestDeleteProductToSpring(this.product.productId);
      await this.$router.push("/product-list").catch(() => {});
    },
    goToList() {
      this.$router.push("/product-list").catch(() => {});
    },
  },
  created() {
    this.requestProductToSpring(this.productId);
  },
};
</script>

<style scoped>
.button-registered {
  text-align: right;
}
.clickable-text {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  vertical-align: middle;
  align-items: center;
}
.clickable-text:hover {
  text-decoration: underline;
}
</style>
