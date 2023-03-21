<template>
  <PageBase
    title="Create Word"
    description="This is a Heart of our project... What’s your next story? >:"
    full-height
    class="create-word-page"
  >
    <div class="col-12">
      <div class="wrapper p-md-4">
        <div class="row">
          <div class="col-5">
            <div class="animate__animated animate__zoomIn">
              <CircledWord
                class="disabled"
                :nft="nft"
                :play="playRunning"
                locked
                @play-finished="onPlayFinished"
              />
            </div>
            <div
              class="actions d-flex justify-content-center circled-entity-preview-actions my-4 mb-lg-0"
            >
              <a
                href="#"
                class="py-3 text-center me-3 text-decoration-none w-50 play-action animate__animated animate__fadeInUp"
                :class="{ disabled: playRunning }"
                @click.prevent="
                  () => (playRunning ? undefined : (playRunning = true))
                "
                >Play</a
              >
              <a
                href="#"
                class="py-3 text-center text-decoration-none w-50 mint-action animate__animated animate__fadeInUp"
                :class="{
                  disabled:
                    mintRunning ||
                    !metaplexService ||
                    metaplexService.rpc === 'mainnet-beta',
                }"
                @click.prevent="
                  () =>
                    mintRunning || metaplexService.rpc === 'mainnet-beta'
                      ? undefined
                      : mint()
                "
                >Mint</a
              >
            </div>
          </div>
          <div class="col-7"></div>
        </div>
      </div>
    </div>
  </PageBase>
</template>

<script lang="ts">
export default {
  name: "CreateWordPage",
};
</script>

<script lang="ts" setup>
import CircledWord from "@/components/CircledWord.vue";
import PageBase from "@/views/page/PageBase/index.vue";
import CircledWordService from "@/utils/Service/CircledWordService";
import { ref } from "vue";

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

const onPlayFinished = () => {
  playRunning.value = false;
};
</script>
