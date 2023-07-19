<template lang="">
  <form @submit.prevent="productInsert">
    <v-container>
      <v-row justify="center">
        <v-col>
          <v-card class="mx-auto pa-12 pb-8" elevation="8" width="auto" rounded="lg">
            <h2 class="text-center mb-3">상품 정보 수정</h2>

            <div class="text-subtitle-1 text-medium-emphasis">
              상품 이미지
              <div id="imagePreview">
                <img class="image-preview" :src="productImage" />
              </div>
              <div align="center">
                <label for="file-selector">
                  <div class="btn-upload">이미지 업로드</div>
                </label>
              </div>
              <input
                id="file-selector"
                type="file"
                ref="images"
                accept="image/*"
                @change="getProductImage($event)"
              />
            </div>

            <div class="text-subtitle-1 text-medium-emphasis">
              상품명
              <v-text-field
                outlined
                placeholder="상품 이름을 적어주세요"
                v-model="productInfo.productName"
                prepend-inner-icon="mdi-card-text-outline"
                :rules="[(v) => !!v || '상품명을 입력해주세요!']"
              />
            </div>

            <div class="text-subtitle-1 text-medium-emphasis">
              가격
              <v-text-field
                outlined
                v-model="productInfo.productPrice"
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
                v-model="productInfo.productDescription"
                prepend-inner-icon="mdi-comment-text-outline"
              />
            </div>

            <div class="text-subtitle-1 text-medium-emphasis">
              태그
              <v-text-field
                v-model="productInfo.productTags"
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
                type="submit"
              >
                수정 완료
              </v-btn>

              <v-btn class="flex-grow-1" height="48" variant="tonal" @click="goToList">
                취소
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </form>
</template>

<script>
import AWS from "aws-sdk";
import { mapState } from "vuex";
const productModule = "productModule";

export default {
  data() {
    return {
      // AWS S3
      images: null,
      awsBucketName: "vue-s3-3737",
      awsBucketRegion: "ap-northeast-2",
      awsIdentityPoolId: "ap-northeast-2:80a79c65-d48c-4b8e-88d8-229292796a41",
      s3: null,
      awsFileList: [],

      // Product
      productName: "",
      productPrice: 0,
      productDescription: "",
      productTags: "",
      receivedEmail: "",
      productImage: "",
    };
  },
  props: {
    productInfo: {
      type: Object,
      required: true,
    },
  },
  watch: {
    product() {
      localStorage.setItem("productImage", this.product.productImageName);
      this.receivedImage = localStorage.getItem("productImage");
      this.productImage = this.getImageToS3(this.receivedImage);
    },
  },
  computed: {
    ...mapState(productModule, ["product"]),
  },
  methods: {
    getImageToS3(imageName) {
      return `https://vue-s3-3737.s3.ap-northeast-2.amazonaws.com/${imageName}`;
    },
    handleFileUpload(event) {
      this.images = event.target.files[0];
    },
    getProductImage(event) {
      this.handleFileUpload(event);
      const file = this.images;
      localStorage.setItem("productImage", file.name);
      this.uploadAwsS3(file);
      this.receivedImage = localStorage.getItem("productImage");
      this.productImage = this.getImageToS3(this.receivedImage);
    },
    awsS3Config() {
      AWS.config.update({
        region: this.awsBucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: this.awsIdentityPoolId,
        }),
      });
      this.s3 = new AWS.S3({
        apiVersion: "2006-03-01",
        params: {
          Bucket: this.awsBucketName,
        },
      });
    },
    uploadAwsS3() {
      this.awsS3Config();
      this.s3.upload(
        {
          Key: this.images.name,
          Body: this.images,
          ACL: "public-read",
        },
        (err, data) => {
          if (err) {
            console.log(err);
            return alert("업로드 중 문제 발생 (사진 파일에 문제가 있음)", err.message);
          }
          // alert("업로드 성공");
          this.getAwsS3Files();
        }
      );
    },
    getAwsS3Files() {
      this.awsS3Config();
      let res = this.s3.listObjects(
        {
          Delimiter: "/",
          MaxKeys: 1,
        },
        (err, data) => {
          if (err) {
            return alert("AWS 버킷 내에 문제가 있습니다: " + err.message);
          } else {
            this.awsFileList = data.Contents;
            console.log("s3 리스트: ", data);
          }
        }
      );
    },
    goToList() {
      this.$router.push("/product-list").catch(() => {});
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
          title: "변경 내용을 저장하시겠습니까?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "저장",
          cancelButtonText: "취소",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.$swal.fire("저장되었습니다!", "", "success");
            const {
              productName,
              productPrice,
              productDescription,
              productTags,
              receivedEmail,
              productImage,
            } = this;
            this.$emit("submit", {
              productName,
              productPrice,
              productDescription,
              productTags,
              receivedEmail,
              productImage,
            });
            this.uploadAwsS3();
          }
        });
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
  created() {
    this.productName = this.productInfo.productName;
    this.productPrice = this.productInfo.productPrice;
    this.productDescription = this.productInfo.productDescription;
    this.productTags = this.productInfo.productTags;
    this.receivedEmail = this.productInfo.userEmail;
  },
};
</script>

<style scoped>
#file-selector {
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
