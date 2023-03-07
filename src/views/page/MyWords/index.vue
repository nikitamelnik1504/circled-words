<template>
  <div v-if="metaplexService" class="page container-fluid my-words">
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
                  <h3 class="animate__animated animate__headShake">
                    You don't have any Circled
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="row h-100">
            <div
              class="col-12 h-100 d-flex align-items-center justify-content-center"
            >
              <h3 class="animate__animated animate__pulse animate__infinite">
                Loading...
              </h3>
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
import type { Ref } from "@typings";
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
