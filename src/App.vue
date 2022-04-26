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

<style lang="scss">
@import "main";
</style>
