<template>
  <div class="container-fluid my-words">
    <section class="row">
      <div class="col-12" :style="{ 'min-height': freeHeight + 'px' }">
        <div
          v-if="isMetamaskConnected || isWalletConnectConnected"
          class="h-100"
        >
          <div v-if="loaded === true" class="h-100">
            <div
              v-if="assets.length !== 0"
              class="text-center my-4 my-lg-0 mt-lg-2"
            >
              <h1 class="my-words-title">My Words</h1>
            </div>
            <div
              v-if="assets.length !== 0"
              class="buttons-list pt-1 pt-lg-0 mt-4"
            >
              <div class="row">
                <div class="col-11 col-xl-9 col-xxl-8 mx-auto">
                  <div class="row flex-column flex-sm-row">
                    <div
                      v-for="(word, index) in assets"
                      :key="index"
                      class="col-12 col-sm-6 col-lg-4 mb-4"
                    >
                      <MyWord :metadata="word" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="h-100">
              <div class="row h-100">
                <div
                  class="text-center col-12 h-100 d-flex align-items-center justify-content-center"
                >
                  <h1>You don't have any CircledWords</h1>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="row h-100">
            <div
              class="col-12 h-100 d-flex align-items-center justify-content-center"
            >
              <h1>Loading...</h1>
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

<script lang="ts">
import "vue";
import MyWord from "./components/MyWord.vue";
import { getFreeHeight } from "@/utils/layout-space.js";
import { Vue, Options, Watch } from "vue-property-decorator";
import { namespace } from "s-vuex-class";

const wallet = namespace("wallet");
const metamask = namespace("metamask");
const walletConnect = namespace("walletConnect");

import axios from "axios";

@Options({
  name: "MyWordsPage",
  components: {
    MyWord
  }
})
export default class MyWords extends Vue {
  assets = [];
  freeHeight = Number;
  loaded = false;

  @wallet.Getter
  public isMetamaskConnected!: () => boolean;

  @wallet.Getter
  public isWalletConnectConnected!: () => boolean;

  @wallet.Getter
  public getWalletAddress!: () => string;

  @metamask.Action
  public connectToMetamask!: () => Promise<string>;

  @walletConnect.Action
  public connectToWalletConnect!: () => Promise<string>;

  mounted() {
    if (this.isMetamaskConnected === true) {
      this.loadAssetsFromMetamask();
    }
    if (this.isWalletConnectConnected === true) {
      this.loadAssetsFromWalletConnect();
    }
    this.onResize();
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  }

  @Watch("isWalletConnectConnected")
  onWalletConnectConnected(newValue) {
    if (newValue === true) {
      this.loadAssetsFromWalletConnect();
    }
    if (newValue === false) {
      this.assets = [];
    }
  }

  @Watch("isMetamaskConnected")
  onMetamaskConnected(newValue) {
    if (newValue === true) {
      this.loadAssetsFromMetamask();
    }
    if (newValue === false) {
      this.assets = [];
    }
  }

  loadAssetsFromWalletConnect() {
    this.connectToWalletConnect().then(() => {
      this.loadAssets().then((result) => {
        result.data.assets.forEach((item, key) => {
          this.assets[key] = item;
        });
        this.loaded = true;
      });
    });
  }

  loadAssetsFromMetamask() {
    this.connectToMetamask().then(() => {
      this.loadAssets().then((result) => {
        result.data.assets.forEach((item, key) => {
          this.assets[key] = item;
        });
        this.loaded = true;
      });
    });
  }

  loadAssets() {
    const request_params = {
      owner: this.getWalletAddress,
      collection: "circledwords",
      order_direction: "desc",
      limit: 50,
      include_orders: false
    };
    let request_string = "";
    for (let param in request_params) {
      if (request_string !== "") {
        request_string += "&";
      }
      request_string +=
        param + "=" + encodeURIComponent(request_params[param]);
    }

    let request_url =
      "https://api.opensea.io/api/v1/assets?" + request_string;

    return axios.get(request_url, {
      headers: {
        Accept: "application/json",
        "X-API-KEY": "c53720a2d2324aca85614b30e3000a83"
      }
    });
  }

  onResize() {
    this.freeHeight = getFreeHeight(true);
  }

}
</script>
