<template>
  <div class="circled-preview">
    <CircledWord
      ref="circledWord"
      class="disabled mt-3 mb-3"
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
      :class="'d-flex justify-content-center my-4 mb-lg-0 d-none d-md-block'"
      :metaplex-service="metaplexService"
      :nft="nft"
      :play-running="props.playRunning"
      :mint-running="props.mintRunning"
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
