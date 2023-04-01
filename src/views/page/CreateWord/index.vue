<template>
  <PageBase
    title="Create Word"
    description="This is a Heart of our project... What’s your next story? >:"
    class="create-word-page"
    full-height
  >
    <div class="col-12 h-100">
      <div
        class="wrapper py-md-4 px-md-2 px-lg-3 px-xl-0 h-100 w-100 d-flex justify-content-center"
      >
        <div class="row w-100 flex-column flex-md-row">
          <Preview
            :class="'col-sm-10 col-lg-6 col-xl-5 my-md-auto mx-auto text-center'"
            :nft="nft"
            :play-running="playRunning"
            :mint-running="mintRunning"
            :metaplex-service="metaplexService"
            @play-started="playRunning = true"
            @play-completed="playRunning = false"
            @mint-started="mintRunning = true"
            @mint-completed="mintRunning = false"
          />
          <Tabs
            :class="'col-sm-10 col-md-12 col-lg-6 mx-auto d-flex flex-column'"
            :nft="nft"
            :play-running="playRunning"
          />
          <Actions
            :class="'col-sm-10 col-md-12 mx-auto d-flex d-lg-none py-3'"
            :metaplex-service="metaplexService"
            :nft="nft"
            :play-running="playRunning"
            :mint-running="mintRunning"
            @play-started="playRunning = true"
            @mint-started="mintRunning = true"
            @mint-completed="mintRunning = false"
          />
        </div>
      </div>
    </div>
    <MintLoaderModal
      v-if="metaplexService"
      :nft-stage="metaplexService.nftStage"
    />
  </PageBase>
</template>

<script lang="ts">
export default {
  name: "CreateWordPage",
};
</script>

<script lang="ts" setup>
import PageBase from "@/views/page/PageBase/index.vue";
import CircledWordService from "@/utils/Service/CircledWordService";
import { inject, ref } from "vue";
import MintLoaderModal from "./components/MintLoaderModal.vue";
import MetaplexService from "@/utils/Service/NFT/MetaplexService";
import Preview from "./components/Preview.vue";
import Actions from "./components/Actions.vue";
import Tabs from "./components/Tabs.vue";

const wordProperties: Ref<NFTMetadata> = ref({
  name: "CircledWord #1",
  attributes: [
    { trait_type: "Animation Type", value: "Fill In" },
    { trait_type: "Text Color", value: "#ffffff" },
    { trait_type: "Border Color", value: "#ffffff" },
    { trait_type: "Background Color", value: "#ffffff" },
    { trait_type: "Animation Duration", value: "1" },
    { trait_type: "Second Text Color", value: "#000000" },
    { trait_type: "Second Border Color", value: "#000000" },
  ],
});

const nft = ref(new CircledWordService().getNft(wordProperties.value));

const playRunning = ref(false);
const mintRunning = ref(false);

const metaplexService = inject<Ref<MetaplexService | false>>("metaplexService");
</script>
