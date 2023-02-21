<template>
  <div class="button-item text-center pt-4 pb-5">
    <h5 class="button-title mb-5">
      <span class="primary">Circled</span><span class="secondary">Word</span>
      {{ nft.name }}
    </h5>
    <CircledWord
      class="clickable"
      :nft="nft"
      :play="play"
      locked
      @click.prevent="() => (play ? undefined : (play = true))"
      @play-finished="onPlayFinished"
    />
  </div>
</template>

<script lang="ts" setup>
import CircledWord from "@/components/CircledWord.vue";
import CircledWordService from "@/utils/Service/CircledWordService";
import type { NFT } from "@/utils/Service/CircledWordService";
import { ref } from "vue";

interface Props {
  metadata: NFTMetadata;
}

const props = defineProps<Props>();

const play = ref(false);

const onPlayFinished = () => {
  play.value = false;
};

const nft: NFT = new CircledWordService().getNft(
  props.metadata as NFTMetadata
) as NFT;
</script>
