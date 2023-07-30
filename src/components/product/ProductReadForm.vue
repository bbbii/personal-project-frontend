<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-card class="mx-auto pa-12 pb-8" elevation="8" width="auto" rounded="lg">
          <h2 class="text-center mb-3">{{ product.productName }}</h2>
          <div class="text-subtitle-1 text-medium-emphasis">
            <div class="product-main-content" style="display: flex; align-items: center">
              <div
                class="product-image"
                style="display: flex; align-items: center; flexbasis: '60%'"
              >
                <img
                  ref="mainImage"
                  :src="
                    selectedImage || product.mainImageName
                      ? getImageToS3(selectedImage || product.mainImageName)
                      : ''
                  "
                  :style="{ width: '400px', height: '400px', objectFit: 'cover', flexBasis: '60%' }"
                  @click="swapImage"
                />
                <div
                  style="display: flex; flex-basis: 40%; flex-direction: column; position: relative"
                >
                  <div
                    v-for="(fileName, index) in product.imageNameList"
                    :key="index"
                    style="width: 100px; height: 100px; text-align: center"
                  >
                    <img
                      :src="getImageToS3(fileName)"
                      :style="{
                        objectFit: 'cover',
                        width: '100px',
                        height: '100px',
                        cursor: 'pointer',
                      }"
                      @click="selectedImage = fileName"
                    />
                  </div>
                </div>
              </div>
              <div class="main-info">
                <div class="product-name-style">
                  {{ product.productName }}
                </div>
                <div class="product-price-style">
                  {{ (product.productPrice * productCount) | won }}
                </div>
                <div class="product-unit-style">
                  <span>
                    {{ product.productAmount * productCount }}&nbsp;{{ product.productAmountUnit }}
                    &nbsp;
                    {{ product.productWeight * productCount }}&nbsp;{{ product.productWeightUnit }}
                    <v-btn variant="text" icon @click="countDown">
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                    <input
                      class="updown-number"
                      type="text"
                      size="2"
                      :value="productCount"
                      readonly
                    />
                    <v-btn variant="text" icon @click="countUp">
                      <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
                  </span>
                </div>
              </div>
            </div>
            <div>
              <p><b>필수 표기정보</b></p>
              <table>
                <colgroup>
                  <col width="150px" />
                  <col width="340px" />
                  <col width="150px" />
                  <col width="*" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>원산지</th>
                    <td>{{ product.productOrigin }}</td>
                    <th>생산자</th>
                    <td>{{ product.productProducer }}</td>
                  </tr>
                  <tr>
                    <th>생산일자</th>
                    <td>{{ product.startDate }}</td>
                    <th>품질유지기한</th>
                    <td>{{ product.endDate }}</td>
                  </tr>
                  <tr>
                    <th>상품 설명</th>
                    <td>{{ product.productDescription }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="product-total-price">
              <b>
                총 가격
                <input type="text" size="10" :value="(product.productPrice * productCount) | won" />
              </b>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div>
              <v-btn class="text-right" @click="goToList">목록으로</v-btn>
            </div>
            <div>
              <v-btn class="text-right" @click="addCart">
                <v-icon>mdi-cart-arrow-down</v-icon>
                장바구니에 담기
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

const productModule = "productModule";
const cartModule = "cartModule";

export default {
  data() {
    return {
      productImage: "",
      receivedImage: "",
      userEmail: "",
      registerEmail: "",
      productCount: 1,

      selectedImage: null,
    };
  },
  name: "ProductReadForm",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(productModule, ["requestProductToSpring", "requestDeleteProductToSpring"]),
    ...mapActions(cartModule, ["requestAddCartItemToSpring"]),
    swapImage() {
      if (this.selectedImage) {
        this.selectedImage = null;
      }
    },
    getImageToS3(imageName) {
      return `https://vue-s3-3737.s3.ap-northeast-2.amazonaws.com/${imageName}`;
    },
    goToList() {
      this.$router.push("/product-list").catch(() => {});
    },
    countDown() {
      if (this.productCount > 1) {
        this.productCount--;
      }
    },
    countUp() {
      this.productCount++;
    },
    async addCart() {
      const cartItem = {
        email: localStorage.getItem("userEmail"),
        productId: this.product.productId,
        productCount: this.productCount,
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
  async mounted() {
    this.getImageToS3();
  },
};
</script>

<style scoped>
.product-image {
  width: 500px;
  height: 400px;
  margin: 10px;
}
.updown-number {
  text-align: center;
}
.product-total-price {
  text-align: right;
  font-size: large;
}
.main-info {
  vertical-align: top;
  margin-left: 40px;
}
.product-name-style {
  font-size: large;
  font-weight: bold;
  padding-bottom: 30px;
}
.product-price-style {
  color: tomato;
  font-weight: bold;
  padding-bottom: 15px;
}
.product-unit-style {
  color: forestgreen;
}
table {
  width: 100%;
  border-top: 1px solid #444444;
  border-collapse: collapse;
}
th,
td {
  text-align: left;
  border-bottom: 1px solid #aaaaaa;
  padding: 10px;
  font-weight: 400;
  font-size: small;
}
</style>
