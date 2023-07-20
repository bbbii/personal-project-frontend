<template lang="">
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-card class="mx-auto pa-12 pb-8" elevation="8" width="auto" rounded="lg">
          <h2 class="text-center mb-3">상품 등록</h2>

          <form class="text-subtitle-1 text-medium-emphasis">
            <div class="room-deal-information-container">
              <div class="room-deal-information-title">상품 사진 등록</div>
              <div class="room-picture-notice">
                <ul class="room-write-wrapper">
                  <li>사진은 가로로 찍은 사진을 권장합니다. (가로 사이즈 최소 800px)</li>
                  <li>사진 용량은 사진 한 장당 10MB 까지 등록이 가능합니다.</li>
                </ul>
              </div>
              <div class="room-file-upload-wrapper">
                <div v-if="!mainFile" class="room-file-image-example-wrapper">
                  <b>대표 이미지</b>
                  <div class="room-file-notice-item">
                    상품 목록에 보여지는 대표 이미지에요
                    <div class="room-file-notice-item room-file-upload-button">
                      <div class="image-box">
                        <label for="mainFile">이미지 등록하기</label>
                        <input type="file" id="mainFile" ref="mainFile" @change="uploadMainImage" />
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="file-preview-content-container">
                  <div class="file-preview-container">
                    <div class="file-preview-wrapper">
                      <img :src="mainFile.preview" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="room-file-upload-wrapper">
                <div v-if="!files.length" class="room-file-upload-example-container">
                  <div class="room-file-upload-example">
                    <div class="room-file-image-example-wrapper"><b>상품 상세 이미지</b></div>
                    <div class="room-file-notice-item">상품을 예쁘게 찍어서 등록해보세요</div>
                    <div class="room-file-notice-item room-file-notice-item-red">
                      로고를 제외한 불필요한 정보(워터마크,상호,전화번호 등)가 있는 매물은
                      비공개처리됩니다
                    </div>
                    <div class="room-file-notice-item room-file-upload-button">
                      <div class="image-box">
                        <label for="file">이미지 등록하기</label>
                        <input type="file" id="file" ref="files" multiple @change="uploadImage" />
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="file-preview-content-container">
                  <div class="file-preview-container">
                    <div v-for="(file, index) in files" :key="index" class="file-preview-wrapper">
                      <div class="file-close-button" @click="fileDeleteButton" :name="file.number">
                        x
                      </div>
                      <img :src="file.preview" />
                    </div>
                    <div class="file-preview-wrapper-upload">
                      <div class="image-box">
                        <label for="file">이미지 추가 등록</label>
                        <input type="file" id="file" ref="files" multiple @change="uploadImage2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <v-row justify="center">
                <v-col cols="12" id="menu">
                  <p>상품명</p>
                  <v-text-field
                    placeholder="상품 이름을 적어주세요"
                    v-model="productName"
                    prepend-inner-icon="mdi-card-text-outline"
                    :rules="[(v) => !!v || '상품명을 입력해주세요!']"
                  />
                </v-col>
              </v-row>
            </div>

            <div>
              <v-row justify="center">
                <v-col cols="12" id="menu">
                  가격
                  <v-text-field
                    v-model="productPrice"
                    prepend-inner-icon="mdi-currency-krw"
                    :rules="[(v) => !!v || '상품가격을 입력해주세요!']"
                  />
                </v-col>
              </v-row>
            </div>

            <div>
              <v-row justify="center">
                <v-col cols="12" id="menu">
                  상품 설명
                  <v-textarea
                    auto-grow
                    outlined
                    v-model="productDescription"
                    prepend-inner-icon="mdi-comment-text-outline"
                    :rules="[(v) => !!v || '상품설명을 입력해주세요!']"
                  />
                </v-col>
              </v-row>
            </div>

            <div>
              <v-row justify="center">
                <v-col cols="12" id="menu">
                  태그
                  <v-text-field
                    v-model="productTags"
                    hide-details="auto"
                    prepend-inner-icon="mdi-label-outline"
                  />
                </v-col>
              </v-row>
            </div>

            <v-row align="center" justify="center">
              <v-col cols="auto">
                <v-btn @click="onSubmit">등록</v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn @click="clear">취소</v-btn>
              </v-col>
            </v-row>
          </form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AWS from "aws-sdk";

export default {
  data() {
    return {
      productName: "",
      productPrice: 0,
      productDescription: "",
      productTags: "",

      s3: null,
      awsBucketName: "vue-s3-3737",
      awsBucketRegion: "ap-northeast-2",
      awsIdentityPoolId: "ap-northeast-2:80a79c65-d48c-4b8e-88d8-229292796a41",

      mainFile: null,
      files: [],
      uploadImageIndex: 0,
      mainImageName: "",
      fileNames: [],
      imageNameList: [],
    };
  },
  methods: {
    uploadMainImage() {
      const mainFile = this.$refs.mainFile.files[0];
      if (mainFile) {
        this.mainFile = {
          file: mainFile,
          preview: URL.createObjectURL(mainFile),
        };
      }
      this.mainImageName = mainFile.name;
    },
    uploadImage() {
      console.log("파일 목록:" + this.$refs.files.files);
      let num = -1;
      for (let i = 0; i < this.$refs.files.files.length; i++) {
        const file = this.$refs.files.files[i];
        this.files.push({
          file: file,
          preview: URL.createObjectURL(file),
          number: i,
        });
        num = i;
      }
      this.uploadImageIndex = num + 1;
      console.log(this.files);
      this.fileNames = this.files.map((file) => file.name);
    },
    uploadImage2() {
      console.log(this.$refs.files.files);
      for (let i = 0; i < this.$refs.files.files.length; i++) {
        const file = this.$refs.files.files[i];
        this.files.push({
          file: file,
          preview: URL.createObjectURL(file),
          number: i + this.uploadImageIndex,
        });
        num = i;
      }
      this.uploadImageIndex += num + 1;
      console.log(this.files);
      this.fileNames = this.files.map((file) => file.name);
    },
    fileDeleteButton(e) {
      const name = e.target.getAttribute("name");
      this.files = this.files.filter((data) => data.number !== Number(name));
    },
    clear() {
      this.$router.push("/").catch(() => {});
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
          Key: this.mainFile.file.name,
          Body: this.mainFile.file,
          ACL: "public-read",
        },
        (err, data) => {
          if (err) {
            console.log(err);
            return alert("메인 이미지 업로드 중 문제 발생", err.message);
          }
          console.log("메인 이미지 업로드 성공!");
        }
      );
      this.files.forEach((file) => {
        this.s3.upload(
          {
            Key: file.file.name,
            Body: file.file,
            ACL: "public-read",
          },
          (err, data) => {
            if (err) {
              console.log(err);
              return alert("이미지 업로드 중 문제 발생", err.message);
            }
            console.log(`파일 ${file.file.name} 업로드 성공`);
          }
        );
      });
    },
    async onSubmit() {
      if (this.mainFile == "") {
        return this.$swal("대표 이미지를 등록해주세요!");
      }
      if (this.file == []) {
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
            // this.mainImageName = this.mainFile.name;
            console.log(this.mainImageName);

            this.imageNameList = this.fileNames;
            this.uploadAwsS3();
            const {
              productName,
              productPrice,
              productDescription,
              productTags,
              mainImageName,
              imageNameList,
            } = this;
            this.$emit("submit", {
              productName,
              productPrice,
              productDescription,
              productTags,
              mainImageName,
              imageNameList,
            });
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
};
</script>

<style scoped>
.room-deal-information-container {
  margin-top: 50px;
  color: #222222;
  border: 1px solid #dddddd;
}

.room-deal-information-title {
  text-align: center;
  font-size: 18px;
  line-height: 60px;
  border-bottom: 1px solid #dddddd;
}

.room-deal-information-content-wrapper {
  min-height: 50px;
  display: flex;
}

.room-deal-informtaion-content-title {
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  background-color: #f9f9f9;
}

.room-deal-information-content {
  width: 100%;
  font-size: 14px;
}

.room-deal-option-selector {
  display: flex;
  align-items: center;
  padding: 15px;
}

.room-deal-option-item {
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #cccccc;
  border-radius: 5px;
  cursor: pointer;
}

.room-deal-option-item:last-child {
  margin-left: 10px;
}

.room-deal-option-notice {
  margin-left: auto;
  font-size: 14px;
  color: #888888;
}

.room-deal-option-item-deposit {
  margin-left: 10px;
}

.room-deal-information-wrapper {
  display: flex;
  flex-direction: column;
}

.room-deal-information-option {
  padding: 10px;
  display: flex;
  align-items: center;
}

.room-deal-information-option:last-child {
  border-bottom: 1px solid #dddddd;
}

.room-deal-information-item-type {
  font-size: 13px;
  color: #fff;
  background-color: #61b6e5;
  min-width: 50px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
}

.room-deal-information-item-wrapper {
  display: flex;
  align-items: center;
  margin-left: 10px;
  height: 46px;
  width: 100%;
}

.room-deal-information-item-wrapper > input {
  border: 1px solid #dddddd;
  width: 140px;
  height: 100%;
  padding: 0 15px;
  font-size: 15px;
}

.room-deal-inforamtion-won {
  margin: 0 10px;
}

.room-deal-information-example {
  color: #888888;
}

.room-deal-information-option:not(:first-child) {
  margin-top: 10px;
}

.room-deal-inforamtion-divide {
  font-size: 22px;
  margin: 0 8px;
  color: #222222;
  font-weight: 100;
}

.room-deal-close-button-wrapper {
  margin-left: auto;
  cursor: pointer;
}

.room-deal-close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  background-color: #666666;
  color: rgb(220, 220, 220);
}

.room-deal-cliked {
  background-color: rgb(235, 235, 235);
  color: rgb(170, 170, 170);
}

.room-file-upload-example {
  height: 100%;
}

.room-write-content-container {
  border-top: 1px solid #dddddd;
  min-height: 260px;
}

.room-picture-notice {
  margin: 20px;
  padding: 20px 40px;
  border: 1px solid #dddddd;
}

.file-preview-content-container {
  height: 100%;
}

.room-file-upload-wrapper {
  margin: 20px;
  border: 1px solid #dddddd;
  background-color: #f4f4f4;
  min-height: 350px;
  font-size: 15px;
  color: #888888;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.room-file-upload-example-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.room-file-image-example-wrapper {
  text-align: center;
}

.room-file-notice-item {
  margin-top: 5px;
  text-align: center;
}

.room-file-notice-item-red {
  color: #ef4351;
}

.image-box {
  margin-top: 30px;
  padding-bottom: 20px;
  text-align: center;
}

.image-box input[type="file"] {
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
}

.image-box label {
  display: inline-block;
  padding: 10px 20px;
  background-color: #232d4a;
  color: #fff;
  vertical-align: middle;
  font-size: 15px;
  cursor: pointer;
  border-radius: 5px;
}

.file-preview-wrapper {
  padding: 10px;
  position: relative;
}

.file-preview-wrapper > img {
  position: relative;
  width: 190px;
  height: 130px;
  z-index: 10;
}

.file-close-button {
  position: absolute;
  line-height: 18px;
  z-index: 99;
  font-size: 18px;
  right: 5px;
  top: 10px;
  color: #fff;
  font-weight: bold;
  background-color: #666666;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
}

.file-preview-container {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}

.file-preview-wrapper-upload {
  margin: 10px;
  padding-top: 20px;
  background-color: #888888;
  width: 190px;
  height: 130px;
}

.room-write-button-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #222222;
}

.room-write-button-wrapper > div {
  width: 160px;
  height: 50px;
  border: 1px solid #dddddd;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  cursor: pointer;
}

.room-write-button {
  margin-left: 15px;
  color: #fff;
  background-color: #1564f9;
}

.room-write-button:hover {
  opacity: 0.8;
}
</style>
