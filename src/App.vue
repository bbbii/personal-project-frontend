<template>
  <v-app>
    <v-main>
      <NavMenuPage />
      <router-view class="router-view-background" />
    </v-main>
    <v-footer>
      <FooterPage />
    </v-footer>
  </v-app>
</template>

<script>
import NavMenuPage from "./views/layout/navigation/NavMenuPage.vue";
import FooterPage from "./views/footer/FooterPage.vue";

export default {
  name: "App",
  components: { NavMenuPage, FooterPage },
  data: () => ({
    //
  }),
};
</script>

<style>
.v-main__wrap {
  padding: 16px;
  background-color: rgb(251, 255, 246);
}
</style>
