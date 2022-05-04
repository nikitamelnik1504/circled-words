<template>
  <div class="container-fluid my-words">
    <section class="row">
      <div class="col-12" :style="{ 'min-height': freeHeight + 'px' }">
        <div v-if="metamaskConnected || walletConnectConnected">
          <div class="text-center my-4 my-lg-0 mt-lg-2">
            <h1 class="my-words-title">My Words</h1>
          </div>
          <div class="buttons-list container-fluid pt-1 pt-lg-0 mt-4">
            <div class="row">
              <div class="col-11 col-xl-9 col-xxl-8 mx-auto">
                <div class="row flex-column flex-sm-row">
                  <div
                    v-for="(word, index) in apiResult.assets"
                    :key="index"
                    class="col-12 col-sm-6 col-lg-4 mb-4 mb-lg-0"
                  >
                    <MyWord :metadata="word" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="h-100 text-center d-flex align-items-center justify-content-center"
        >
          <h1 class="error-text">
            Please connect your wallet to see this page
          </h1>
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
      metamaskConnected: "isMetamaskConnected",
      walletConnectConnected: "isWalletConnectConnected",
    }),
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
