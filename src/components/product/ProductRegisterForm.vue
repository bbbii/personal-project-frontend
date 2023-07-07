<template>
  <main class="mt-3">
    <div class="container">
      <h2 class="text-center mb-3">제품 등록</h2>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품명</label>
        <div class="col-md-9">
          <input type="text" class="form-control" v-model="product.product_name" />
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품 가격</label>
        <div class="col-md-9">
          <div class="input-group">
            <input type="number" class="form-control" v-model="product.product_price" />
            <span class="input-group-text">원</span>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품 설명</label>
        <div class="col-md-9">
          <textarea class="form-control" rows="7" v-model="product.product_description"></textarea>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">태그</label>
        <div class="col-md-9">
          <input type="text" class="form-control" v-model="product.tags" />
        </div>
      </div>
      <div class="mb-3 row">
        <div class="d-flex justify-content-between align-items-center">
          <div class="col-6 d-grid p-1">
            <button type="button" class="btn btn-lg btn-outline-dark" @click="goToList">
              취소
            </button>
          </div>
          <div class="col-6 d-grid p-1">
            <button type="button" class="btn btn-lg btn-outline-dark" @click="productInsert">
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      product: {
        product_name: "",
        product_price: 0,
        product_description: "",
        tags: "",
        seller_id: 1,
      },
    };
  },
  computed: {
    ...mapState("accountModule", ["email"]),
    user() {
      // console.log(this.email);
      return this.email;
    },
  },
  mounted() {
    if (this.user == undefined) {
      alert("로그인을 해야 이용할 수 있습니다.");
      this.$router.push({ path: "/" });
    }
  },
  methods: {
    goToList() {
      this.$router.push({ path: "/" });
    },
    productInsert() {
      if (this.product.product_name == "") {
        return this.$swal("제품명을 입력해주세요.");
      }

      if (this.product.product_price == "" || this.product.product_price == 0) {
        return this.$swal("제품가격을 입력해주세요.");
      }

      if (this.product.product_description == "") {
        return this.$swal("제품설명을 입력해주세요.");
      }

      this.$swal
        .fire({
          title: "등록하시겠습니까?",
          showCancelButton: true,
          confirmButtonText: "REGISTRATION",
          cancelButtonText: "CANCEL",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            // await this.$api("/api/productInsert", { param: [this.product] });
            this.$swal.fire("Saved.", "", "success");
            this.$router.push({ path: "/" });
          }
        });
    },
  },
};
</script>
