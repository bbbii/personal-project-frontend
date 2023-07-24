<template lang="">
  <div class="data_table">
    <h3>장바구니 목록</h3>
    <table style="margin: 10px">
      <tr>
        <th align="center" width="10%">상품 번호</th>
        <th align="center" width="30%">상품 이미지</th>
        <th align="center" width="10%">상품명</th>
        <th align="center" width="10%">단가</th>
        <th align="center" width="15%">개수</th>
        <th align="center" width="10%">가격</th>
        <th align="center" width="10%">삭제</th>
      </tr>
      <tr v-if="!cart || (Array.isArray(cart) && cart.length === 0)">
        <td align="center" colspan="4">장바구니가 비어있습니다{{ cart }}</td>
      </tr>

      <tr v-else v-for="item in cart" :key="item.productId">
        <td align="center">
          {{ item.productId }}
        </td>
        <td align="center">
          <router-link
            :to="{
              name: 'ProductReadPage',
              params: { productId: item.productId.toString() },
            }"
          >
            <img class="image-preview" :src="getImageToS3(item.mainImageName)" />
          </router-link>
        </td>
        <td align="center">
          {{ item.productName }}
        </td>
        <td align="center">
          {{ item.productPrice }}
        </td>
        <td align="center">
          <span>
            <v-btn variant="text" icon @click="countDown(item)">
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
            {{ item.productCount }}
            <v-btn variant="text" icon @click="countUp(item)">
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
          </span>
        </td>
        <td align="center">
          {{ item.productPrice * item.productCount }}
        </td>
        <td align="center">
          <v-btn variant="text" icon @click="removeItem(item)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapActions } from "vuex";

const cartModule = "cartModule";

export default {
  name: "CartForm",
  data() {
    return {
      mainImageNameList: [],
    };
  },
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ...mapActions(cartModule, ["requestDeleteCartItemToSpring"]),
    getImageToS3(imageName) {
      return `https://vue-s3-3737.s3.ap-northeast-2.amazonaws.com/${imageName}`;
    },
    countDown(item) {
      if (item.productCount > 1) {
        this.$set(item, "productCount", item.productCount - 1);
      }
    },
    countUp(item) {
      this.$set(item, "productCount", item.productCount + 1);
    },
    removeItem(item) {
      const payload = {
        email: localStorage.getItem("userEmail"),
        id: item.id,
      };
      console.log(item.id);
      this.requestDeleteCartItemToSpring(payload);
    },
  },
  async mounted() {
    this.getImageToS3();
  },
};
</script>

<style scoped>
img {
  width: 300px;
  height: 300px;
  object-fit: cover;
}
</style>
