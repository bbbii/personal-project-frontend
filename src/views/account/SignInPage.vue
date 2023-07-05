<template lang="">
  <div>
    <sign-in-form @submit="signIn"></sign-in-form>
  </div>
</template>

<script>
import SignInForm from "@/components/account/SignInForm.vue";
import { mapActions } from "vuex";

const accountModule = "accountModule";

export default {
  data() {
    return {
      isSignIn: false,
    };
  },
  components: {
    SignInForm,
  },
  methods: {
    ...mapActions(accountModule, ["requestSpringToSignIn"]),
    async signIn(payload) {
      const isSuccess = await this.requestSpringToSignIn(payload);
      console.log("로그인 성공");
      if (isSuccess) {
        this.$router.push("/");
      }
    },
  },
  mounted() {
    if (localStorage.getItem("signInUserInfo")) {
      this.isSignIn = true;
    } else {
      this.isSignIn = false;
    }
  },
};
</script>

<style lang=""></style>
