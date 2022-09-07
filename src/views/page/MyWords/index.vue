<template>
  <div class="container-fluid my-words">
    <section class="row">
      <div class="col-12" :style="{ 'min-height': minHeightValue + 'px' }">
        <div
          v-if="
            (metamaskService && metamaskService.isConnected()) ||
            (walletConnectService && walletConnectService.isConnected())
          "
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
import PageBase from "@/views/page/PageBase";
import { Inject, Options, Watch } from "vue-property-decorator";
import { namespace } from "s-vuex-class";
import axios, { type AxiosResponse } from "axios";
import MetamaskService from "@/utils/Service/MetamaskService";
import WalletConnectService from "@/utils/Service/WalletConnectService";

const wallet = namespace("wallet");

@Options({
  name: "MyWordsPage",
  components: {
    MyWord,
  },
})
export default class MyWords extends PageBase {
  @Inject({ from: "metamaskService" }) metamaskService:
    | MetamaskService
    | false = false;

  @Inject({ from: "walletConnectService" }) walletConnectService:
    | WalletConnectService
    | false = false;

  isMetamaskInitialized = false;
  isWalletConnectInitialized = false;
  assets: Array<object> = [];
  loaded = false;

  @wallet.Getter
  public getWalletAddress!: string;

  @wallet.Getter
  public getStatus!: string;

  mounted(): void {
    this.onMetamaskConnected(MetamaskService.initialized);
    this.onWalletConnectConnected(WalletConnectService.initialized);
  }

  @Watch("isWalletConnectInitialized")
  onWalletConnectConnected(status: boolean): void {
    if (!status || this.loaded) {
      return;
    }

    if ((this.walletConnectService as WalletConnectService).isConnected()) {
      this.loadAssetsFromWalletConnect();
    }
  }

  @Watch("walletConnectService", { deep: true })
  onWalletConnectLoaded(value: unknown) {
    if (!(value instanceof WalletConnectService)) {
      return;
    }

    if (value.provider.connected) {
      this.isWalletConnectInitialized = WalletConnectService.initialized;
    }
  }

  @Watch("metamaskService", { deep: true })
  onMetamaskLoaded(value: unknown) {
    if (!(value instanceof MetamaskService)) {
      return;
    }

    this.isMetamaskInitialized = MetamaskService.initialized;
  }

  @Watch("isMetamaskInitialized")
  onMetamaskConnected(status: boolean) {
    if (!status || this.loaded) {
      return;
    }

    if ((this.metamaskService as MetamaskService).isConnected()) {
      this.loadAssetsFromMetamask();
    }
  }

  loadAssetsFromWalletConnect(): void {
    this.loadAssets().then((result) => {
      result.data.assets.forEach((item: object) => {
        this.assets.push(item);
      });
      this.loaded = true;
    });
  }

  loadAssetsFromMetamask(): void {
    this.loadAssets().then((result) => {
      result.data.assets.forEach((item: object) => {
        this.assets.push(item);
      });
      this.loaded = true;
    });
  }

  loadAssets(): Promise<
    AxiosResponse<{ assets: [] }, string | number | boolean>
  > {
    const request_params: Record<string, string | number | boolean> = {
      owner: this.getWalletAddress,
      collection: "circledwords",
      order_direction: "desc",
      limit: 50,
      include_orders: false,
    };
    let request_string = "";
    for (const param in request_params) {
      if (request_string !== "") {
        request_string += "&";
      }
      request_string += param + "=" + encodeURIComponent(request_params[param]);
    }

    const request_url =
      "https://api.opensea.io/api/v1/assets?" + request_string;

    return axios.get(request_url, {
      headers: {
        Accept: "application/json",
        "X-API-KEY": "c53720a2d2324aca85614b30e3000a83",
      },
    });
  }
}
</script>
