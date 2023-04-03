<template>
  <div class="my-word-preview text-center">
    <div class="my-word-wrapper p-3 pb-xl-3 p-xl-4">
      <h5 class="button-title mb-3 d-sm-none">
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
    <div class="my-word-wrapper actions d-flex p-3 pt-sm-0 px-xl-4 pb-xl-4">
      <a href="#" class="text-center me-1 text-decoration-none w-50 disabled"
        >View</a
      >
      <a href="#" class="text-center ms-1 text-decoration-none w-50 disabled"
        >Sell</a
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import CircledWord from "@/components/CircledWord.vue";
import CircledWordService from "@/utils/Service/CircledWordService";
import type { NFT } from "@/utils/Service/CircledWordService";
import { onMounted, onUnmounted, ref } from "vue";

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

onUnmounted(() => {
  window.removeEventListener("resize", scaleCircled);
});
</script>
