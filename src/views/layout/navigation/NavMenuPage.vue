<template>
  <nav>
    <v-app-bar class="z-index" color="dark" app dark>
      <v-app-bar-nav-icon @click="navigation_drawer = !navigation_drawer" />
      <v-btn @click="goToHome">
        <v-img class="mx-2" src="@/assets/mainlogo.png" max-height="40" max-width="40" contain>
        </v-img>
        <v-toolbar-title class="text-uppercase text--darken-4">
          <span>과일가게</span>
        </v-toolbar-title>
      </v-btn>

      <v-spacer></v-spacer>

      <v-spacer></v-spacer>

      <div v-if="!isSignIn">
        <v-btn text @click="signUp">
          <span>회원가입</span>
          <v-icon right>mdi-account-plus-outline</v-icon>
        </v-btn>
        <v-btn text @click="signIn">
          <span>로그인</span>
          <v-icon right>mdi-login</v-icon>
        </v-btn>
      </div>

      <div v-if="isSignIn">
        <span>{{ this.userEmail }}님 안녕하세요</span>
        <v-btn text :to="{ name: 'ProductRegisterPage' }">
          <span>상품 등록</span>
          <v-icon right>mdi-storefront-plus-outline</v-icon>
        </v-btn>
        <v-btn text :to="{ name: 'CartPage' }">
          <span>장바구니</span>
          <v-icon right>mdi-cart-outline</v-icon>
        </v-btn>
        <v-btn text @click="signOut">
          <span>로그아웃</span>
          <v-icon right>mdi-logout</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer app v-model="navigation_drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">사이드바</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item v-for="(link, index) in links" :key="link.index" :to="link.route">
          <v-list-item-action>
            <v-icon>
              {{ link.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ link.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapMutations, mapState } from "vuex";
const accountModule = "accountModule";

export default {
  data() {
    return {
      navigation_drawer: false,
      links: [
        { icon: "mdi-home", text: "Home", route: "/" },
        { icon: "mdi-list-box-outline", text: "상품 목록", route: "/product-list" },
      ],
    };
  },
  computed: {
    ...mapState(accountModule, ["isSignIn"]),
  },
  methods: {
    ...mapMutations(accountModule, ["IS_SIGNIN"]),
    signUp() {
      this.$router.push("/sign-up").catch(() => {});
    },
    signIn() {
      this.$router.push("/sign-in").catch(() => {});
    },
    signOut() {
      localStorage.clear();
      this.IS_SIGNIN(false);
      this.$router.push("/").catch(() => {});
    },
    goToHome() {
      this.$router.push("/").catch(() => {});
    },
  },
  mounted() {
    const userToken = localStorage.getItem("userToken");
    this.userEmail = localStorage.getItem("userEmail");
    if (userToken) {
      this.IS_SIGNIN(true);
    }
  },
};
</script>

<style scoped>
.z-index {
  z-index: 999;
}
</style>
