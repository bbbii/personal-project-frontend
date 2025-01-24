<template lang="">
  <div class="data_table">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="(product, index) in products" :key="index">
          <v-card max-width="300">
            <router-link
              :to="{ name: 'ProductReadPage', params: { productId: product.productId.toString() } }"
            >
              <v-img :src="getImageToS3(product.mainImageName)" aspect-ratio="1" />
            </router-link>
            <v-card-text>
              <div>
                <h2 class="title primary--text mb-2 product-name">
                  <router-link
                    :to="{
                      name: 'ProductReadPage',
                      params: { productId: product.productId.toString() },
                    }"
                  >
                    {{ product.productName }}
                  </router-link>
                </h2>
                <p class="price-style mb-1">{{ product.productDescription }}</p>
                <p class="price-style mb-0">{{ product.productPrice | won }}</p>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn outlined color="green" @click="addCart(product)">
                <v-icon>mdi-cart-arrow-down</v-icon>
                장바구니 담기
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <tr v-if="!products || (Array.isArray(products) && products.length === 0)">
        <td align="center" colspan="4">현재 등록된 게시물이 없습니다!</td>
      </tr>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";

const cartModule = "cartModule";

export default {
  data() {
    return {
      mainImageNameList: [],
    };
  },
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ...mapActions(cartModule, ["requestAddCartItemToSpring"]),
    getImageToS3(imageName) {
      return `https://vue-s3-3737.s3.ap-northeast-2.amazonaws.com/${imageName}`;
    },
    async addCart(product) {
      console.log(product);
      const cartItem = {
        email: localStorage.getItem("userEmail"),
        productId: product.productId,
        productCount: 1,
      };
      try {
        await this.requestAddCartItemToSpring(cartItem);
        this.$swal
          .fire({
            title: "상품을 장바구니에 담았습니다",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "장바구니로 이동",
            cancelButtonText: "확인",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.$router.push("/cart-list").catch(() => {});
            }
          });
      } catch (error) {
        this.$swal.fire({
          title: "상품을 장바구니에 담을 수 없습니다",
          text: "다시 시도해주세요.",
          icon: "error",
        });
        console.error("addCart API 요청 실패:", error);
      }
    },
  },
};
</script>

<style scoped>
.image-preview {
  object-fit: scale-down;
  max-width: 150px;
  max-height: 150px;
}
.price-style {
  text-align: right;
}
.product-name {
  font-size: 1.3em; /* 글자 크기 설정 */
  white-space: nowrap; /* 한 줄로 나열 */
  overflow: hidden; /* 넘칠 때 숨김 처리 */
  text-overflow: ellipsis; /* 넘칠 때 생략 부호 표시 */
}
</style>
