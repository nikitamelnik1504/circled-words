<template>
  <div class="circled-preview">
    <CircledWord
      class="disabled mt-3 mb-3"
      :nft="props.nft"
      :play="props.playRunning"
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
</script>
