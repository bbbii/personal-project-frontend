<template lang="">
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-card class="mx-auto pa-12 pb-8" elevation="8" width="auto" rounded="lg">
          <h2 class="text-center mb-3">상품 등록</h2>

          <form class="text-subtitle-1 text-medium-emphasis">
            <div class="information-container">
              <div class="information-title">상품 이미지 등록</div>
              <div class="picture-notice">
                <ul class="write-wrapper">
                  <li>사진은 가로로 찍은 사진을 권장합니다. (가로 사이즈 최소 800px)</li>
                  <li>사진 용량은 사진 한 장당 10MB 까지 등록이 가능합니다.</li>
                </ul>
              </div>
              <div class="file-upload-wrapper">
                <div v-if="!mainFile" class="file-image-example-wrapper">
                  <b>대표 이미지</b>
                  <div class="file-notice-item">
                    상품 목록에 보여지는 대표 이미지에요
                    <div class="file-notice-item file-upload-button">
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
              <div class="file-upload-wrapper">
                <div v-if="!files.length" class="file-upload-example-container">
                  <div class="file-upload-example">
                    <div class="file-image-example-wrapper"><b>상품 상세 이미지</b></div>
                    <div class="file-notice-item">상품을 예쁘게 찍어서 등록해보세요</div>
                    <div class="file-notice-item file-notice-item-red">
                      로고를 제외한 불필요한 정보(워터마크,상호,전화번호 등)가 있는 매물은
                      비공개처리됩니다
                    </div>
                    <div class="file-notice-item file-upload-button">
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

            <div style="padding-top: 10px">
              <v-row justify="center">
                <v-col cols="12" id="menu">
                  <p>상품명</p>
                  <v-text-field
                    outlined
                    placeholder="상품 이름을 적어주세요"
                    v-model="productName"
                    prepend-inner-icon="mdi-card-text-outline"
                    :rules="[(v) => !!v || '상품명을 입력해주세요!']"
                  />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="4" id="menu">
                  <p>가격</p>
                  <v-text-field
                    outlined
                    placeholder="숫자만 입력"
                    v-model="productPrice"
                    prepend-inner-icon="mdi-currency-krw"
                    :rules="[(v) => !!v || '상품가격을 입력해주세요!']"
                  />
                </v-col>
                <v-col cols="4" id="menu">
                  <p>원산지</p>
                  <v-text-field
                    outlined
                    placeholder="원산지를 적어주세요"
                    v-model="productOrigin"
                    prepend-inner-icon="mdi-comment-text-outline"
                    :rules="[(v) => !!v || '원산지를 입력해주세요!']"
                  />
                </v-col>
                <v-col cols="4" id="menu">
                  <p>생산자</p>
                  <v-text-field
                    outlined
                    placeholder="생산자를 적어주세요"
                    v-model="productProducer"
                    prepend-inner-icon="mdi-comment-text-outline"
                    :rules="[(v) => !!v || '생산자를 입력해주세요!']"
                  />
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col cols="6" id="menu">
                  <p>포장단위</p>
                  <v-row>
                    <v-col>
                      <v-text-field
                        outlined
                        placeholder="0"
                        v-model="productAmount"
                        prepend-inner-icon="mdi-comment-text-outline"
                        :rules="[(v) => !!v || '단위를 입력해주세요!']"
                      />
                    </v-col>
                    <v-col>
                      <v-select
                        outlined
                        v-model="productAmountUnit"
                        :items="['상자', '개']"
                        variant="underlined"
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="6" id="menu">
                  <p>중량</p>
                  <v-row>
                    <v-col>
                      <v-text-field
                        outlined
                        placeholder="0"
                        v-model="productWeight"
                        prepend-inner-icon="mdi-comment-text-outline"
                        :rules="[(v) => !!v || '중량을 입력해주세요!']"
                      />
                    </v-col>
                    <v-col>
                      <v-select
                        outlined
                        v-model="productWeightUnit"
                        :items="['kg', 'g']"
                        variant="underlined"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <p>제조 또는 생산년월일</p>
                  <v-menu
                    ref="startMenu"
                    v-model="startMenu"
                    :close-on-content-click="false"
                    :return-value.sync="startDate"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="startDate"
                        label="제조 또는 생산년월일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      >
                      </v-text-field>
                    </template>
                    <v-date-picker v-model="startDate" no-title locale="kr" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="startMenu = false"> Cancel </v-btn>
                      <v-btn text color="primary" @click="$refs.startMenu.save(startDate)">
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>

                  <p>소비기한 또는 품질유지기한</p>
                  <v-menu
                    ref="endMenu"
                    v-model="endMenu"
                    :close-on-content-click="false"
                    :return-value.sync="endDate"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="endDate"
                        label="소비기한 또는 품질유지기한"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      >
                      </v-text-field>
                    </template>
                    <v-date-picker v-model="endDate" no-title locale="kr" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="endMenu = false"> Cancel </v-btn>
                      <v-btn text color="primary" @click="$refs.endMenu.save(endDate)"> OK </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col>
                  <p>상품 설명</p>
                  <v-textarea
                    outlined
                    placeholder="상품의 설명을 적어주세요"
                    v-model="productDescription"
                    rows="7"
                    prepend-inner-icon="mdi-comment-text-outline"
                    :rules="[(v) => !!v || '상품설명을 입력해주세요!']"
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
      productPrice: null,
      productOrigin: "",
      productProducer: "",
      productAmount: null,
      productAmountUnit: "상자",
      productWeight: null,
      productWeightUnit: "kg",
      startDate: "",
      endDate: "",
      productDescription: "",

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

      startMenu: false,
      endMenu: false,
      startDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      endDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
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
      // console.log("파일 목록:" + this.$refs.files.files);
      let num = -1;
      // console.log(this.files);길이
      // if (this.files.length > 4) {
      //   return this.$swal("상세 이미지는 최대 4장까지 등록할 수 있습니다.");
      // }
      for (let i = 0; i < this.$refs.files.files.length; i++) {
        const file = this.$refs.files.files[i];
        this.files.push({
          file: file,
          preview: URL.createObjectURL(file),
          number: i,
        });
        num = i;
        this.fileNames[i] = this.files[i].file.name;
      }
      this.uploadImageIndex = num + 1;
      // console.log(this.files); // 파일이 든 배열
      // console.log(this.files[0].file.name); // 이게 이름일거같음 -> 맞음
      // console.log(this.fileNames);
    },
    uploadImage2() {
      // console.log(this.$refs.files.files);
      for (let i = 0; i < this.$refs.files.files.length; i++) {
        const file = this.$refs.files.files[i];
        this.files.push({
          file: file,
          preview: URL.createObjectURL(file),
          number: i + this.uploadImageIndex,
        });
        num = i;
        this.fileNames[i] = this.files[i].file.name;
      }
      this.uploadImageIndex += num + 1;
      // console.log(this.files);
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
        (err) => {
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
          (err) => {
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
              productOrigin,
              productProducer,
              productAmount,
              productAmountUnit,
              productWeight,
              productWeightUnit,
              startDate,
              endDate,
              productDescription,
              mainImageName,
              imageNameList,
            } = this;
            this.$emit("submit", {
              productName,
              productPrice,
              productOrigin,
              productProducer,
              productAmount,
              productAmountUnit,
              productWeight,
              productWeightUnit,
              startDate,
              endDate,
              productDescription,
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
.information-container {
  margin-top: 50px;
  color: #222222;
  border: 1px solid #dddddd;
}
.information-title {
  text-align: center;
  font-size: 18px;
  line-height: 60px;
  border-bottom: 1px solid #dddddd;
}
.informtaion-content-title {
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  background-color: #f9f9f9;
}
.option-item {
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #cccccc;
  border-radius: 5px;
  cursor: pointer;
}
.option-item:last-child {
  margin-left: 10px;
}
.option-notice {
  margin-left: auto;
  font-size: 14px;
  color: #888888;
}
.option-item-deposit {
  margin-left: 10px;
}
.information-option {
  padding: 10px;
  display: flex;
  align-items: center;
}
.information-option:last-child {
  border-bottom: 1px solid #dddddd;
}
.information-item-type {
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
.information-item-wrapper {
  display: flex;
  align-items: center;
  margin-left: 10px;
  height: 46px;
  width: 100%;
}
.information-item-wrapper > input {
  border: 1px solid #dddddd;
  width: 140px;
  height: 100%;
  padding: 0 15px;
  font-size: 15px;
}
.inforamtion-won {
  margin: 0 10px;
}
.information-option:not(:first-child) {
  margin-top: 10px;
}
.close-button-wrapper {
  margin-left: auto;
  cursor: pointer;
}
.close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  background-color: #666666;
  color: rgb(220, 220, 220);
}
.file-upload-example {
  height: 100%;
}
.picture-notice {
  margin: 20px;
  padding: 20px 40px;
  border: 1px solid #dddddd;
}
.file-preview-content-container {
  height: 100%;
}
.file-upload-wrapper {
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
.file-upload-example-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.file-image-example-wrapper {
  text-align: center;
}
.file-notice-item {
  margin-top: 5px;
  text-align: center;
}
.file-notice-item-red {
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
  vertical-align: auto;
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
  max-width: 350px;
  max-height: 350px;
  object-fit: cover;
  z-index: 1;
}
.file-close-button {
  position: absolute;
  line-height: 18px;
  z-index: 2;
  font-size: 18px;
  right: 10px;
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
  padding-top: 10px;
  background-color: #888888;
  object-fit: contain;
}
p {
  font-weight: bold;
}
</style>
