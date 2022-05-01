<script>
import CircledWord from "@/components/CircledWord.vue";
import MyWord from "@/components/MyWord.vue";
import api_result from "@/../opensea_test_api_result.json";
import { mapGetters } from "vuex";

export default {
  components: {
    CircledWord,
    MyWord,
  },
  computed: {
    ...mapGetters({
      metamaskConnected: "isMetaMaskConnected",
    }),
  },
  watch: {
    metamaskConnected(newValue, oldValue) {
      if (newValue === false) {
        this.$router.push("/");
      }
    },
  },
  methods: {
    getWords() {
      return api_result;
    },
  },
  data() {
    return {
      api_result: this.getWords(),
    };
  },
};
</script>

<template>
  <div class="text-center">
    <h1 class="my-words-title">My Words</h1>
  </div>
  <div class="buttons-list container-fluid mt-4">
    <div class="row">
      <div class="col-12 col-sm-10 col-xxl-8 mx-auto">
        <div class="row">
          <div v-for="word in api_result.assets" class="col-4">
            <MyWord :metadata="word" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
