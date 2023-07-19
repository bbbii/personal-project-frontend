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
  data() {
    return {
      isRegister: false,
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
          params: { productId: this.productId },
        })
        .catch(() => {});
    },
    async onDelete() {
      this.$swal("상품이 삭제되었습니다");
      localStorage.removeItem("productImage");
      await this.requestDeleteProductToSpring(this.productId);
      await this.$router.push("/product-list").catch(() => {});
    },
    goToList() {
      this.$router.push("/product-list").catch(() => {});
    },
  },
  async created() {
    await this.requestProductToSpring(this.productId);
    // console.log("상품 등록자 이메일" + this.product.registerEmail);
    // console.log("현재 사용자 이메일" + localStorage.getItem("userEmail"));
    const registerEmail = this.product.registerEmail;
    const userEmail = localStorage.getItem("userEmail");
    if (registerEmail === userEmail) {
      this.isRegister = true;
    }
  },
};
</script>

<style scoped></style>
