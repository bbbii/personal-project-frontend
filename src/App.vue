<template>
  <v-app>
    <v-main>
      <NavMenuPage />
      <router-view />
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
