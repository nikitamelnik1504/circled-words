<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script>
import Header from "./components/TheHeader.vue";
import Footer from "./components/TheFooter.vue";
import store from "@/store";

export default {
  components: {
    Header,
    Footer,
  },
  beforeCreate() {
    store.commit("initialiseStore");
  },
  created() {
    store.dispatch("checkMetaMaskInstalled");
  },
};
</script>

<style lang="scss">
@import "main";
</style>
