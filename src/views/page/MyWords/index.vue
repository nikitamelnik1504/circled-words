<template>
  <div class="container-fluid my-words">
    <section class="row">
      <div class="col-12" :style="{ 'min-height': minHeightValue + 'px' }">
        <div
          v-if="
            (metamaskService &&
              metamaskService.connected &&
              metamaskService.connectedToSite) ||
            (walletConnectService &&
              walletConnectService.connected &&
              walletConnectService.connectedToSite) ||
            metaplexService
          "
          class="h-100"
        >
          <div v-if="loadStatus === 'loaded'" class="h-100">
            <div
              v-if="assets.length !== 0"
              class="text-center my-4 my-lg-0 mt-lg-2"
            >
              <h3 class="my-words-title">My Words</h3>
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
                  <h3>You don't have any Circled</h3>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="row h-100">
            <div
              class="col-12 h-100 d-flex align-items-center justify-content-center"
            >
              <h3>Loading...</h3>
            </div>
          </div>
        </div>
        <div
          v-else
          class="h-100 text-center d-flex align-items-center justify-content-center"
        >
          <h3>Please connect your wallet to see this page</h3>
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
import MetaplexService from "@/utils/Service/NFT/MetaplexService";

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

  @Inject({ from: "walletConnectService" })
  walletConnectService: WalletConnectService | false = false;

  @Inject({ from: "metaplexService" })
  metaplexService: MetaplexService | false = false;

  assets: Array<object> = [];
  loadStatus = "not_loaded";

  @wallet.Getter
  public getWalletAddress!: string;

  mounted(): void {
    this.onMetamaskConnected(this.metamaskService);
    this.onWalletConnectConnected(this.walletConnectService);
    this.onMetaplexConnected(this.metaplexService);
  }

  @Watch("metaplexService", { deep: true })
  onMetaplexConnected(service: unknown) {
    if (!(service instanceof MetaplexService)) {
      return;
    }

    if (this.loadStatus === "not_loaded") {
      this.loadAssetsFromSolana();
    }
  }

  @Watch("walletConnectService", { deep: true })
  onWalletConnectConnected(service: unknown) {
    if (!(service instanceof WalletConnectService)) {
      return;
    }

    if (
      service.connected &&
      service.connectedToSite &&
      this.loadStatus === "not_loaded"
    ) {
      this.loadAssetsFromEthereum();
    }
  }

  @Watch("metamaskService", { deep: true })
  onMetamaskConnected(service: unknown) {
    if (!(service instanceof MetamaskService)) {
      return;
    }

    if (
      service.connected &&
      service.connectedToSite &&
      this.loadStatus === "not_loaded"
    ) {
      this.loadAssetsFromEthereum();
    }
  }

  loadAssetsFromEthereum(): void {
    this.loadStatus = "loading";
    this.loadAssetsFromOpenSea().then((result) => {
      result.data.assets.forEach(
        (item: { traits: Array<{ trait_type: string; value: string }> }) => {
          // Legacy implementation of Ethereum NFTs.
          const property_indexes: Record<string, number> = {};
          for (const [trait_index, trait] of item.traits.entries()) {
            property_indexes[trait.trait_type] = trait_index;
          }

          item.traits = [
            item.traits[property_indexes["Animation Type"]],
            item.traits[property_indexes["Text Color"]],
            item.traits[property_indexes["Border Color"]],
            item.traits[property_indexes["Background Color"]],
            item.traits[property_indexes["Animation Duration"]],
            item.traits[property_indexes["Second Text Color"]],
            item.traits[property_indexes["Second Border Color"]],
          ];
          this.assets.push(item);
        }
      );
      this.loadStatus = "loaded";
    });
  }

  loadAssetsFromSolana() {
    this.loadStatus = "loading";
    (this.metaplexService as MetaplexService).loadNFTs().then(() => {
      this.loadStatus = "loaded";
    });
  }

  loadAssetsFromOpenSea(): Promise<
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
