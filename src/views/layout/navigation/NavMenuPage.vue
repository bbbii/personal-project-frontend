<template lang="">
  <nav>
    <v-app-bar color="blue darken-1">
      <v-app-bar-nav-icon @click="navigation_drawer = !navigation_drawer" />
      <button @click="goToList">
        <v-toolbar-title>
          <span style="color: white">
            <b> Personal Project </b>
          </span>
        </v-toolbar-title>
      </button>
      <v-spacer></v-spacer>
      <v-btn v-if="isSignin" @click="logout">
        <span>로그아웃</span>
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
      <v-btn v-else @click="signIn">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="navigation_drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">사이드 바</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-cart-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <router-link :to="{ name: 'home' }"> 상품 조회하기 </router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      navigation_drawer: false,
      isSignin: false,
      accountId: 0,
    };
  },
  methods: {
    logout() {
      this.isSignin = false;
      localStorage.clear();
      this.$router.push({
        name: "home",
      });
      location.reload().catch(() => {
        location.reload();
      });
    },
    goToList() {
      this.$router.push({
        name: "ProductListPage",
      });
    },
  },
  mounted() {
    this.accountId = localStorage.getItem("signinUserId");
    if (this.accountId > 0) {
      this.isSignin = true;
    }
  },
};
</script>
<style lang=""></style>
