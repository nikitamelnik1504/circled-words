<template>
  <PageBase
    title="My Words"
    description="Hmm... These guys looks beautiful."
    class="my-words-page"
    full-height
  >
    <div class="col-12">
      <div class="wrapper p-md-2 h-100 w-100 d-flex justify-content-center">
        <div v-if="metaplexService" class="row w-100 flex-column flex-md-row">
          <div
            v-if="loadStatus === 'loaded' && assets.length > 0"
            class="col-12 p-3"
          >
            <div class="row flex-column flex-sm-row">
              <div
                v-for="(word, index) in assets"
                :key="index"
                class="col-12 col-sm-6 col-lg-4 col-xxl-3 mb-3 mb-md-4 mb-xl-5 animate__animated animate__zoomIn animate__faster"
              >
                <MyWord :metadata="word" />
              </div>
            </div>
          </div>
          <div
            v-else-if="loadStatus === 'loaded' && assets.length === 0"
            class="text-center col-12 h-100 d-flex align-items-center justify-content-center"
          >
            <h3 class="animate__animated animate__headShake">
              You don't have any Circled
            </h3>
          </div>
          <div
            v-else
            class="col-12 h-100 d-flex align-items-center justify-content-center"
          >
            <h3 class="animate__animated animate__pulse animate__infinite">
              Loading...
            </h3>
          </div>
        </div>
        <ErrorPage403 v-else />
      </div>
    </div>
  </PageBase>
</template>

<script lang="ts">
export default {
  name: "MyWordsPage",
};
</script>

<script lang="ts" setup>
import MyWord from "./components/MyWord.vue";
import PageBase from "@/views/page/PageBase/index.vue";
import ErrorPage403 from "@/views/error-page/403/index.vue";
import { inject, onMounted, ref, watch } from "vue";
import MetaplexService from "@/utils/Service/NFT/MetaplexService";

const metaplexService = inject<Ref<MetaplexService | false>>("metaplexService");

const assets = ref<Array<NFTMetadata>>([]);

const loadStatus = ref("not_loaded");

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
        json.verified = nft.collection!.verified;
        json.tokenAddress = nft.mintAddress.toString();
        assets.value.push(json);
      }

      loadStatus.value = "loaded";
    });
};

onMounted(() => {
  onMetaplexConnected(metaplexService?.value);
});

watch(metaplexService as Required<Ref>, onMetaplexConnected, { deep: true });
</script>
