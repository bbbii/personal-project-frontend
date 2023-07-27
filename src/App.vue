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
.router-view-background {
  background-color: rgb(240, 252, 222);
}
</style>
