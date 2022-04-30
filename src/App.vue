<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import store from "./store";

export default {
  components: {
    Header,
    Footer
  },
  beforeCreate() {
    store.commit('initialiseStore');
  },
}

</script>

<template>
  <Header/>
  <router-view/>
  <Footer/>
</template>

<style lang="scss">
@import "main";
</style>
