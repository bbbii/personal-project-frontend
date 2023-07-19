<template lang="">
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-card class="mx-auto pa-12 pb-8" elevation="8" width="auto" rounded="lg">
          <h2 class="text-center mb-3">상품 상세 페이지</h2>

          <div class="text-subtitle-1 text-medium-emphasis">
            상품 이미지
            <div id="imagePreview">
              <img class="product-image" id="img" :src="productImage" />
            </div>
          </div>

          <div class="text-subtitle-1 text-medium-emphasis">
            상품명
            <v-text-field
              outlined
              prepend-inner-icon="mdi-card-text-outline"
              :value="product.productName"
              readonly
            />
          </div>

          <div class="text-subtitle-1 text-medium-emphasis">
            가격
            <v-text-field
              outlined
              prepend-inner-icon="mdi-currency-krw"
              :value="product.productPrice"
              readonly
            />
          </div>

          <div class="text-subtitle-1 text-medium-emphasis">
            상품 설명
            <v-textarea
              outlined
              prepend-inner-icon="mdi-comment-text-outline"
              :value="product.productDescription"
              readonly
            />
          </div>

          <div class="text-subtitle-1 text-medium-emphasis">
            태그
            <v-text-field
              outlined
              prepend-inner-icon="mdi-label-outline"
              :value="product.productTags"
              readonly
            />
          </div>

          <div style="display: flex; justify-content: space-between">
            <div>
              <template v-if="isRegister">
                <v-btn class="ms-4" @click="onModify">수정</v-btn>
                <v-btn class="ms-1" @click="onDelete">삭제</v-btn>
              </template>
            </div>
            <div>
              <v-btn class="text-right" @click="goToList">목록으로</v-btn>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
const productModule = "productModule";

export default {
  data() {
    return {
      productImage: "",
      receivedImage: "",
      isRegister: false,
    };
  },
  name: "ProductReadForm",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(productModule, ["product"]),
  },
  methods: {
    ...mapActions(productModule, ["requestProductToSpring", "requestDeleteProductToSpring"]),
    getImageToS3(imageName) {
      return `https://vue-s3-3737.s3.ap-northeast-2.amazonaws.com/${imageName}`;
    },
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
  watch: {
    product() {
      localStorage.setItem("productImage", this.product.productImageName);
      this.receivedImage = localStorage.getItem("productImage");
      this.productImage = this.getImageToS3(this.receivedImage);
    },
  },
};
</script>

<style scoped>
.product-image {
  text-align: center;
  object-fit: scale-down;
  max-width: 300px;
  max-height: 300px;
}
</style>
