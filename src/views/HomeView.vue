<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <hello-world />
      </v-col>
      <v-col>
        <h1>메인 페이지</h1>
        <nav>
          <router-link to="/product-list">상품 목록</router-link>
        </nav>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HelloWorld from "../components/HelloWorld";

export default {
  name: "Home",

  components: {
    HelloWorld,
  },
};
</script>
