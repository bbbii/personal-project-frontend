<template lang="">
  <div class="data_table">
    <h3>장바구니 목록</h3>
    <table style="margin: 10px">
      <tr>
        <th align="center" width="10%">상품 번호</th>
        <th align="center" width="30%">이미지</th>
        <th align="center" width="10%">상품명</th>
        <th align="center" width="10%">가격</th>
        <th align="center" width="15%">수량</th>
        <th align="center" width="10%">합계</th>
        <th align="center" width="10%">삭제</th>
      </tr>
      <tr v-if="!cart || (Array.isArray(cart) && cart.length === 0)">
        <td align="center" colspan="4">장바구니가 비어있습니다</td>
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
          {{ item.productPrice | won }}
        </td>
        <td align="center">
          <span>
            <v-btn variant="text" icon @click="countDown(item) & calcTotalPrice(cart)">
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
            {{ item.productCount }}
            <v-btn variant="text" icon @click="countUp(item) & calcTotalPrice(cart)">
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
          </span>
        </td>
        <td align="center">
          {{ (item.productPrice * item.productCount) | won }}
        </td>
        <td align="center">
          <v-btn variant="text" icon @click="removeItem(item)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </td>
      </tr>
    </table>

    <div class="total-row">
      <v-btn @click="removeAllItem">장바구니 비우기</v-btn>
      <span class="price-text">
        총 상품가격 <b class="total-price">{{ totalPrice | won }}</b>
      </span>
    </div>
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
      totalPrice: 0,
    };
  },
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ...mapActions(cartModule, ["requestDeleteCartItemToSpring", "requestDeleteAllItemToSpring"]),
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
    calcTotalPrice(cart) {
      var sum = 0;
      for (let i = 0; i < cart.length; i++) {
        sum += this.cart[i].productPrice * this.cart[i].productCount;
      }
      this.totalPrice = sum;
    },
    removeItem(item) {
      const payload = {
        email: localStorage.getItem("userEmail"),
        id: item.id,
      };
      console.log(item.id);
      this.requestDeleteCartItemToSpring(payload);
    },
    removeAllItem() {
      const arr = [];
      for (let i = 0; i < this.cart.length; i++) {
        arr.push(this.cart[i].id);
      }
      const payload = {
        email: localStorage.getItem("userEmail"),
        arr: arr,
      };
      this.$swal
        .fire({
          title: "장바구니를 비우겠습니까?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "장바구니 비우기",
          cancelButtonText: "취소",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.requestDeleteAllItemToSpring(payload);
          }
        });
    },
  },
  watch: {
    cart: {
      deep: true,
      handler() {
        this.calcTotalPrice(this.cart);
      },
    },
  },
  mounted() {
    this.getImageToS3();
    this.calcTotalPrice(this.cart);
  },
};
</script>

<style scoped>
img {
  width: 300px;
  height: 300px;
  object-fit: cover;
}
.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin-left: 5%;
}
.price-text {
  min-width: 200px;
  max-width: 80%;
  white-space: nowrap;
}
.total-price {
  font-size: 2em;
  font-weight: 50px;
  color: #060713;
  margin-right: 10%;
}
</style>
