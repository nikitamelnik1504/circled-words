<template>
  <div class="my-word-preview text-center">
    <div class="my-word-wrapper p-3 pb-xl-3 p-xl-4" :class="{'not-verified': !props.metadata.verified}">
      <h5 class="button-title mb-3">
        {{ props.metadata.verified ? nft.name : 'Not Verified' }}
      </h5>
      <div class="circled-wrapper">
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
          @click.prevent="() => (play || !props.metadata.verified ? undefined : (play = true))"
          @play-finished="onPlayFinished"
        />
      </div>
    </div>
    <div class="my-word-wrapper actions d-flex p-3 pt-sm-0 px-xl-4 pb-xl-4">
      <a v-if="props.metadata.verified" href="#" class="text-center me-1 text-decoration-none disabled w-100">
        View
      </a>
      <a v-else href="#" class="text-center me-1 text-decoration-none w-100 d-flex justify-content-center align-items-center" @click.prevent="startVerification">
        <img src="@/assets/images/checked-mark.svg" alt="checked mark">
        Verify
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CircledWord from "@/components/CircledWord.vue";
import CircledWordService from "@/utils/Service/CircledWordService";
import type { NFT } from "@/utils/Service/CircledWordService";
import { onMounted, onUnmounted, ref } from "vue";
import { useStore } from "vuex";

interface Props {
  metadata: NFTMetadata;
}

const props = defineProps<Props>();

const store = useStore();

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
  const scale = document.getElementsByClassName("circled-word")[0].clientWidth / baseCircledSize.width;
  styles.value.fontSize = baseCircledSize.font_size * scale + "px";
  styles.value.borderWidth = baseCircledSize.border_width * scale + "px";
  styles.value.borderRadius = baseCircledSize.border_radius * scale + "px";
};

const startVerification = () => {
  store.state.modal.verification.props.metadata = props.metadata;
  store.state.modal.verification.value = true;
}

onMounted(() => {
  scaleCircled();
  window.addEventListener("resize", scaleCircled);
});

onUnmounted(() => {
  window.removeEventListener("resize", scaleCircled);
});
</script>
