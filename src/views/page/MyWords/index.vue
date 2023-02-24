<template>
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
    class="page container-fluid my-words"
  >
    <section class="row h-100">
      <div class="col-12">
        <div class="h-100">
          <div v-if="loadStatus === 'loaded'" class="h-100">
            <div
              v-if="assets.length !== 0"
              class="text-center my-4 my-lg-0 mt-lg-2"
            >
              <h3 class="my-words-title animate__animated animate__fadeIn">
                My Words
              </h3>
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
                      class="col-12 col-sm-6 col-lg-4 mb-4 animate__animated animate__zoomIn animate__faster"
                      :style="{
                        '-webkit-animation-delay': index * 0.05 + 's',
                        'animation-delay': index * 0.05 + 's',
                      }"
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
              class="col-12 h-100 d-flex align-items-center justify-content-center animate__animated animate__pulse animate__infinite"
            >
              <h3 class="animate__animated animate__fadeIn">Loading...</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <ErrorPage403 v-else />
</template>

<script lang="ts">
export default {
  name: "MyWordsPage",
};
</script>

<script lang="ts" setup>
import MyWord from "./components/MyWord.vue";
import ErrorPage403 from "@/views/error-page/403/index.vue";
import { inject, onMounted, ref, watch } from "vue";
import MetamaskService from "@/utils/Service/MetamaskService";
import axios from "axios";
import { useStore } from "vuex";
import type { Ref } from "@typings";
import WalletConnectService from "@/utils/Service/WalletConnectService";
import MetaplexService from "@/utils/Service/NFT/MetaplexService";

const store = useStore();

const getWalletAddress = () => {
  return store.getters["wallet/getWalletAddress"];
};

const metamaskService = inject<Ref<MetamaskService | false>>("metamaskService");

const walletConnectService = inject<Ref<WalletConnectService | false>>(
  "walletConnectService"
);

const metaplexService = inject<Ref<MetaplexService | false>>("metaplexService");

const assets = ref<Array<NFTMetadata>>([]);

const loadStatus = ref("not_loaded");

const onMetamaskConnected = (newValue: unknown) => {
  if (!(newValue instanceof MetamaskService)) {
    return;
  }

  if (
    newValue.connected &&
    newValue.connectedToSite &&
    loadStatus.value === "not_loaded"
  ) {
    loadAssetsFromEthereum();
  }
};

const onWalletConnectConnected = (newValue: unknown) => {
  if (!(newValue instanceof WalletConnectService)) {
    return;
  }

  if (
    newValue.connected &&
    newValue.connectedToSite &&
    loadStatus.value === "not_loaded"
  ) {
    loadAssetsFromEthereum();
  }
};

const onMetaplexConnected = (newValue: unknown) => {
  if (!(newValue instanceof MetaplexService)) {
    return;
  }

  if (loadStatus.value === "not_loaded") {
    loadAssetsFromSolana();
  }
};

const loadAssetsFromSolana = async () => {
  loadStatus.value = "loading";
  (metaplexService?.value as MetaplexService)
    .loadNFTs()
    .then(async (result) => {
      for await (const nft of result) {
        const json = await fetch(nft.uri).then(
          async (result) => await result.json()
        );
        assets.value.push(json);
      }
      loadStatus.value = "loaded";
    });
};

const loadAssetsFromEthereum = () => {
  loadStatus.value = "loading";
  loadAssetsFromOpenSea()
    .then((result) => {
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
          assets.value.push(item as never);
        }
      );
      loadStatus.value = "loaded";
    })
    .catch(() => {
      loadAssetsFromOpenSea();
    });
};

const loadAssetsFromOpenSea = async () => {
  const request_params: Record<string, string | number | boolean> = {
    owner: getWalletAddress(),
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

  const request_url = "https://api.opensea.io/api/v1/assets?" + request_string;

  return axios.get(request_url, {
    headers: {
      Accept: "application/json",
      "X-API-KEY": "c53720a2d2324aca85614b30e3000a83",
    },
  });
};

onMounted(() => {
  onMetamaskConnected(metamaskService?.value);
  onWalletConnectConnected(walletConnectService?.value);
  onMetaplexConnected(metaplexService?.value);
});

watch(metamaskService as Required<Ref>, onMetamaskConnected, { deep: true });
watch(walletConnectService as Required<Ref>, onWalletConnectConnected, {
  deep: true,
});
watch(metaplexService as Required<Ref>, onMetaplexConnected, { deep: true });
</script>
