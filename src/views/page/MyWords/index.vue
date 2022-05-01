<template>
  <div class="text-center">
    <h1 class="my-words-title">My Words</h1>
  </div>
  <div class="buttons-list container-fluid mt-4">
    <div class="row">
      <div class="col-12 col-sm-10 col-xxl-8 mx-auto">
        <div class="row">
          <div
            v-for="(word, index) in api_result.assets"
            :key="index"
            class="col-4"
          >
            <MyWord :metadata="word" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyWord from "@/components/MyWord.vue";
import api_result from "@/../opensea_test_api_result.json";
import { mapGetters } from "vuex";

export default {
  name: "MyWordsPage",
  components: {
    MyWord,
  },
  data() {
    return {
      api_result: this.getWords(),
    };
  },
  computed: {
    ...mapGetters({
      metamaskConnected: "isMetaMaskConnected",
    }),
  },
  watch: {
    metamaskConnected(newValue) {
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
};
</script>
