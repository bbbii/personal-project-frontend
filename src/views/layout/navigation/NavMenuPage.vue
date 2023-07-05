<template lang="">
  <nav>
    <v-app-bar color="blue darken-1">
      <v-app-bar-nav-icon @click="navigation_drawer = !navigation_drawer" />
      <button @click="goToHome">
        <v-toolbar-title>
          <span style="color: white">
            <b> Personal Project </b>
          </span>
        </v-toolbar-title>
      </button>
      <v-spacer></v-spacer>
      <div v-if="isSignIn">
        <v-btn @click="signOut">
          <v-icon>mdi-logout</v-icon>
          로그아웃
        </v-btn>
      </div>
      <div v-else>
        <v-btn @click="signUp">
          <v-icon>mdi-account-circle</v-icon>
          회원가입
        </v-btn>
        <v-btn @click="signIn">
          <v-icon>mdi-login</v-icon>
          로그인
        </v-btn>
      </div>
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
            <v-icon>mdi-vuetify</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <router-link :to="{ name: 'home' }"> 메뉴1 </router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-vuetify</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <router-link :to="{ name: 'home' }"> 메뉴2 </router-link>
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
      isSignIn: false,
      accountId: 0,
    };
  },
  methods: {
    signUp() {
      this.$router.push("/sign-up").catch(() => {});
    },
    signIn() {
      this.$router.push("/sign-in").catch(() => {});
    },
    async signOut() {
      this.isSignIn = false;
      localStorage.clear();
      await this.$router.push("/").catch(() => {});
    },
    goToHome() {
      this.$router.push("/").catch(() => {});
    },
  },
  mounted() {
    this.accountId = localStorage.getItem("signInUserInfo");
    if (this.accountId) {
      console.log("도착");
      this.isSignIn = true;
    }
  },
};
</script>

<style scoped>
.v-btn {
  margin: 4px;
}
.v-icon {
  margin: 4px;
}
</style>
