<template>
  <PageBase
    v-if="metaplexService"
    title="My Words"
    description="Hmm... These guys looks beautiful."
    class="my-words-page"
    full-height
  >
    <div class="col-12">
      <div class="wrapper p-md-2 h-100 w-100 d-flex justify-content-center">
        <div class="row w-100 flex-column flex-md-row">
          <div class="h-100 mx-auto col-lg-8">
            <div v-if="loadStatus === 'loaded'" class="h-100">
              <div v-if="assets.length > 0" class="pt-1 pt-lg-0 mt-3">
                <div class="row">
                  <div class="col-11 col-md-12 mx-auto">
                    <div class="row flex-column flex-sm-row">
                      <div
                        v-for="(word, index) in assets"
                        :key="index"
                        class="col-12 col-sm-6 col-lg-4 mb-2 mb-md-4 mb-lg-5 animate__animated animate__zoomIn animate__faster"
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
                <div
                  class="text-center col-12 h-100 d-flex align-items-center justify-content-center"
                >
                  <h3 class="animate__animated animate__headShake">
                    You don't have any Circled
                  </h3>
                </div>
              </div>
            </div>
            <div v-else class="h-100">
              <div
                class="col-12 h-100 d-flex align-items-center justify-content-center"
              >
                <h3 class="animate__animated animate__pulse animate__infinite">
                  Loading...
                </h3>
              </div>
            </div>
          </div>
          <div class="d-none d-lg-block col-lg-4 my-3">
            <div class="create-word-block h-100">
              <h3 class="mb-3 mb-xl-5">
                <router-link
                  to="/create-word"
                  class="create-word-button d-inline-block text-center"
                >
                  CREATE
                </router-link>
              </h3>
              <div class="create-word-descriptions">
                <p class="create-word-description mb-3 mb-xl-5">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa. Cum sociis nae
                  eleifend tellus. Aenean leo ligula, porttitor eu, consequat
                  vitae, el.
                </p>
                <p class="create-word-description">
                  quis, feugiat a, tellus. Phasellus viverra nulla ut metus
                  varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
                  ultricies nisi vel augue. Curabitur ullamcorper ultricie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageBase>
  <ErrorPage403 v-else />
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
