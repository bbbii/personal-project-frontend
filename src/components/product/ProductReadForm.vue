<template lang="">
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-card class="mx-auto pa-12 pb-8" elevation="8" width="auto" rounded="lg">
          <h2 class="text-center mb-3">상품 상세 페이지</h2>

          <div class="text-subtitle-1 text-medium-emphasis">
            상품 이미지
            <div id="imagePreview">
              <!-- <img class="image-preview" id="img" :src="productImage" /> -->
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ProductReadForm",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang=""></style>
