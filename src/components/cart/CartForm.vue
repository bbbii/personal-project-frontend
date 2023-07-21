<template lang="">
  <div class="data_table">
    <h3>장바구니 목록</h3>
    <table style="margin: 10px">
      <tr>
        <th align="center" width="10%">상품 번호</th>
        <th align="center" width="30%">상품 이미지</th>
        <th align="center" width="10%">상품명</th>
        <th align="center" width="10%">상품 가격</th>
        <th align="center" width="10%">개수</th>
      </tr>
      <tr v-if="!cart || (Array.isArray(cart) && cart.length === 0)">
        <td align="center" colspan="4">장바구니가 비어있습니다</td>
      </tr>

      <tr v-else v-for="product in cart" :key="product.productId">
        <td align="center">
          {{ product.productId }}
        </td>
        <td align="center">
          <router-link
            :to="{
              name: 'ProductReadPage',
              params: { productId: product.productId.toString() },
            }"
          >
            <img class="image-preview" :src="getImageToS3(product.mainImageName)" />
          </router-link>
        </td>
        <td align="center">
          {{ product.productName }}
        </td>
        <td align="center">
          {{ product.productPrice }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
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
    getImageToS3(imageName) {
      return `https://vue-s3-3737.s3.ap-northeast-2.amazonaws.com/${imageName}`;
    },
  },
  async mounted() {
    this.getImageToS3();
  },
};
</script>

<style scoped></style>
