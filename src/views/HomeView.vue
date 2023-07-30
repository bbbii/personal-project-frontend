<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <main-form />
      </v-col>
      <v-col>
        <h1>과일 가게</h1>
        <nav>
          <router-link to="/product-list">상품 목록</router-link><br/>
        </nav>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MainForm from "../components/MainForm";

export default {
  name: "Home",

  components: {
    MainForm,
  },

  created() {
    localStorage.removeItem("productImage");
  },
};
</script>
