<template>
  <div class="circled-preview">
    <CircledWord
      ref="circledWord"
      class="disabled mt-3 mb-3 animate__animated animate__zoomIn"
      :nft="props.nft"
      :play="props.playRunning"
      :style="{
        'font-size': styles.fontSize,
        'border-width': styles.borderWidth,
        'border-radius': styles.borderRadius,
      }"
      locked
      @play-finished="emit('playCompleted')"
    />
    <Actions
      :class="'mt-lg-1 mx-0 d-none d-lg-flex w-100'"
      :metaplex-service="metaplexService"
      :nft="nft"
      :play-running="props.playRunning"
      :mint-running="props.mintRunning"
      :form-validation-status="props.formValidationStatus"
      @play-started="emit('playStarted')"
      @mint-started="emit('mintStarted')"
      @mint-completed="emit('mintCompleted')"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: "CreateWordPreview",
};
</script>

<script lang="ts" setup>
import CircledWord from "@/components/CircledWord.vue";
import Actions from "./Actions.vue";
import { NFT } from "@/utils/Service/CircledWordService";
import MetaplexService from "@/utils/Service/NFT/MetaplexService";
import { onMounted, onUnmounted, ref } from "vue";

interface Props {
  nft: NFT;
  playRunning: boolean;
  mintRunning: boolean;
  formValidationStatus: boolean;
  metaplexService: Ref<boolean> | MetaplexService;
}

const props = defineProps<Props>();

const emit = defineEmits({
  playStarted: () => true,
  mintStarted: () => true,
  mintCompleted: () => true,
  playCompleted: () => true,
});

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
  // @todo Replace with ref element.
  const scale =
    document.getElementsByClassName("circled-word")[0].clientWidth /
    baseCircledSize.width;
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
