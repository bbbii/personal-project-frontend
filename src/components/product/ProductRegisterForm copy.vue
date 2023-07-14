<template lang="">
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-card class="mx-auto pa-12 pb-8" elevation="8" width="auto" rounded="lg">
          <h2 class="text-center mb-3">상품 등록</h2>

          <div class="text-subtitle-1 text-medium-emphasis">
            상품 이미지
            <div id="imagePreview">
              <img v-if="!productImage" src="@/assets/preview.png" />
              <img v-else class="image-preview" id="img" :src="productImage" />
            </div>
            <div align="center">
              <label for="upload-image">
                <div class="btn-upload">이미지 업로드</div>
              </label>
            </div>
            <input
              id="upload-image"
              type="file"
              ref="images"
              accept="image/*"
              @change="getProductImage($event) && handleFileUpload()"
            />
          </div>

          <div class="text-subtitle-1 text-medium-emphasis">
            상품명
            <v-text-field
              outlined
              placeholder="상품 이름을 적어주세요"
              v-model="productName"
              prepend-inner-icon="mdi-card-text-outline"
              :rules="[(v) => !!v || '상품명을 입력해주세요!']"
            />
          </div>

          <div class="text-subtitle-1 text-medium-emphasis">
            가격
            <v-text-field
              outlined
              v-model="productPrice"
              prepend-inner-icon="mdi-currency-krw"
              :rules="[(v) => !!v || '상품가격을 입력해주세요!']"
            />
          </div>

          <div class="text-subtitle-1 text-medium-emphasis">
            상품 설명
            <v-textarea
              type="text"
              auto-grow
              outlined
              required
              v-model="productDescription"
              prepend-inner-icon="mdi-comment-text-outline"
            />
          </div>

          <div class="text-subtitle-1 text-medium-emphasis">
            태그
            <v-text-field
              v-model="productTags"
              type="text"
              outlined
              hide-details="auto"
              prepend-inner-icon="mdi-label-outline"
            />
          </div>

          <div
            class="text-subtitle-1 text-medium-emphasis d-flex justify-content-between align-items-center"
          >
            <v-btn
              class="flex-grow-1"
              height="48"
              prepend-icon="$vuetify"
              stacked
              @click="productInsert"
            >
              등록
            </v-btn>

            <v-btn class="flex-grow-1" height="48" variant="tonal" @click="goToList"> 취소 </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

const accountModule = "accountModule";
const productModule = "productModule";

export default {
  data() {
    return {
      productImage: "",
      productName: "",
      productPrice: 0,
      productDescription: "",
      productTags: "",
    };
  },
  computed: {
    ...mapState(accountModule, ["email"]),
    receivedEmail() {
      console.log(this.email);
      return this.email;
    },
  },
  mounted() {
    this.userToken = localStorage.getItem("userToken");
    this.userEmail = localStorage.getItem("userEmail");
    if (this.userToken == null) {
      alert("로그인을 해야 이용할 수 있습니다.");
      this.$router.push("/").catch(() => {});
    }
  },
  methods: {
    ...mapActions(productModule, ["requestRegisterProductInfoToSpring"]),
    handleFileUpload() {
      this.images = this.$refs.images.files;
    },
    async getProductImage(event) {
      const file = event.target.files[0];
      this.productImage = await this.base64(file);
    },
    base64(file) {
      return new Promise((resolve) => {
        let reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    },
    goToList() {
      this.$router.push("/").catch(() => {});
    },
    productInsert() {
      if (this.productImage == "") {
        return this.$swal("상품 이미지를 등록해주세요!");
      }
      if (this.productName == "") {
        return this.$swal("상품명을 입력해주세요!");
      }
      if (this.productPrice == "" || this.productPrice == 0) {
        return this.$swal("상품가격을 입력해주세요!");
      }
      if (this.productDescription == "") {
        return this.$swal("상품설명을 입력해주세요!");
      }
      this.$swal
        .fire({
          title: "상품을 등록하시겠습니까?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "등록",
          cancelButtonText: "취소",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.$swal.fire("상품이 등록되었습니다!", "", "success");

            const product = {
              productName: this.productName,
              productPrice: this.productPrice,
              productDescription: this.productDescription,
              productTags: this.productTags,
              receivedEmail: this.userEmail,
            };
            console.log(product);

            const getProductId = await this.requestRegisterProductInfoToSpring(product);
            // console.log(getProductId);
            this.$router
              .push({
                name: "ProductReadPage",
                params: { productId: getProductId.toString() },
              })
              .catch(() => {});
          }
        });
    },
  },
};
</script>

<style scoped>
#upload-image {
  display: none;
}
.image-preview {
  object-fit: scale-down; /* 사진 크기와 같게 */
  max-width: 500px; /* 너비 */
  max-height: 200px; /* 높이 */
  background: #fff; /* 배경 색 */
  font-weight: 500; /* 글자 두께 */
  vertical-align: middle;
}
#imagePreview {
  text-align: center;
  border: 1px solid rgb(150, 150, 150);
  border-radius: 4px;
  display: auto;
  align-items: center;
  justify-content: center;
}
label .btn-upload {
  text-align: center;
  width: 150px;
  border: 1px solid rgb(150, 150, 150);
  border-radius: 4px;
}
</style>
