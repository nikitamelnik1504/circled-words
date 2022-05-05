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
                {{ assets }}
                <div class="row flex-column flex-sm-row">
                  <!--                  <div-->
                  <!--                    v-for="(word, index) in apiResult.assets"-->
                  <!--                    :key="index"-->
                  <!--                    class="col-12 col-sm-6 col-lg-4 mb-4 mb-lg-0"-->
                  <!--                  >-->
                  <!--                    <MyWord :metadata="word" />-->
                  <!--                  </div>-->
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
import { mapActions, mapGetters } from "vuex";
import { getFreeHeight } from "@/utils/layout-space.js";
import store from "../../../store";

export default {
  name: "MyWordsPage",
  components: {
    MyWord,
  },
  data() {
    return {
      assets: [],
      freeHeight: Number,
      loaded: false,
    };
  },
  computed: {
    ...mapGetters({
      metamaskConnected: "isMetamaskConnected",
      walletConnectConnected: "isWalletConnectConnected",
      getAssets: "getAssets",
    }),
    ...mapActions(["connectToMetamask", "setAssets"]),
  },
  created() {},
  mounted() {
    Promise.resolve(this.connectToMetamask).then(() => {
      this.setAssets;
      this.assets = this.getAssets;
    });
    this.onResize();
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  methods: {
    onResize() {
      this.freeHeight = getFreeHeight(true);
    },
  },
};
</script>
