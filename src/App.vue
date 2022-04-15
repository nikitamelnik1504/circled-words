<script>
import Header from '@/components/Header.vue';
import store from "./store";

export default {
  components: {
    Header
  },
  beforeCreate() {
    store.commit('initialiseStore');
  },
}

</script>

<template>
  <Header/>
  <router-view/>
</template>

<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
@import "css/fonts.css";
@import "css/global.css";
</style>
