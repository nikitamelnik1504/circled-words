<template>
  <div class="my-word-preview text-center mx-sm-2">
    <div class="my-word-wrapper p-3 p-lg-0">
      <h5 class="button-title mb-3 d-sm-none">
        <span class="primary">Circled</span><span class="secondary">Word</span>
        {{ nft.name }}
      </h5>
      <CircledWord
        ref="circledWord"
        class="clickable"
        :nft="nft"
        :play="play"
        :style="{
          'font-size': styles.fontSize,
          'border-width': styles.borderWidth,
          'border-radius': styles.borderRadius,
        }"
        locked
        @click.prevent="() => (play ? undefined : (play = true))"
        @play-finished="onPlayFinished"
      />
    </div>
    <div
      class="my-word-wrapper actions p-3 p-lg-0 d-flex justify-content-between mt-lg-4"
    >
      <a href="#" class="text-center me-3 text-decoration-none w-50 disabled"
        >View</a
      >
      <a href="#" class="text-center text-decoration-none w-50 disabled"
        >Sell</a
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import CircledWord from "@/components/CircledWord.vue";
import CircledWordService from "@/utils/Service/CircledWordService";
import type { NFT } from "@/utils/Service/CircledWordService";
import { onMounted, ref } from "vue";

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

const circledWord = ref();

const styles = ref({
  fontSize: "auto",
  borderWidth: "auto",
  borderRadius: "auto",
});

const baseCircledSize = {
  width: 216,
  height: 104,
  border_width: 4,
  border_radius: 6,
  font_size: 32,
};

const scaleCircled = () => {
  const scale = circledWord.value.element.clientWidth / baseCircledSize.width;

  styles.value.fontSize = baseCircledSize.font_size * scale + "px";
  styles.value.borderWidth = baseCircledSize.border_width * scale + "px";
  styles.value.borderRadius = baseCircledSize.border_radius * scale + "px";
};

onMounted(() => {
  scaleCircled();
  window.addEventListener("resize", scaleCircled);
});
</script>
