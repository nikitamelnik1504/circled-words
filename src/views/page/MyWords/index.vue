<template>
  <div class="container-fluid my-words">
    <section class="row">
      <div class="col-12" :style="{ 'min-height': freeHeight + 'px' }">
        <div class="text-center">
          <h1 class="my-words-title">My Words</h1>
        </div>
        <div class="buttons-list container-fluid mt-4">
          <div class="row">
            <div class="col-12 col-sm-10 col-xxl-8 mx-auto">
              <div class="row">
                <div
                  v-for="(word, index) in apiResult.assets"
                  :key="index"
                  class="col-4"
                >
                  <MyWord :metadata="word" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import MyWord from "./components/MyWord.vue";
import api_result from "@/../opensea_test_api_result.json";
import { mapGetters } from "vuex";
import { getFreeHeight } from "@/utils/layout-space.js";

export default {
  name: "MyWordsPage",
  components: {
    MyWord,
  },
  data() {
    return {
      freeHeight: Number,
      apiResult: this.getWords(),
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
  mounted() {
    this.onResize();
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  methods: {
    onResize() {
      this.freeHeight = getFreeHeight(true);
    },
    getWords() {
      return api_result;
    },
  },
};
</script>
