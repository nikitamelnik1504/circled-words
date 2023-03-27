<template>
  <div class="circled-actions">
    <a
      href="#"
      class="me-2 py-3 text-center text-decoration-none w-50 play-action animate__animated animate__fadeInUp"
      :class="{ disabled: props.playRunning }"
      @click.prevent="
        () => (props.playRunning ? undefined : emit('playStarted'))
      "
      >Play</a
    >
    <a
      href="#"
      class="ms-2 py-3 text-center text-decoration-none w-50 mint-action animate__animated animate__fadeInUp"
      :class="{
        disabled:
          props.mintRunning ||
          !props.metaplexService ||
          props.metaplexService.rpc === 'mainnet-beta',
      }"
      @click.prevent="
        () =>
          props.mintRunning || props.metaplexService.rpc === 'mainnet-beta'
            ? undefined
            : mint()
      "
      >Mint</a
    >
  </div>
</template>

<script lang="ts">
export default {
  name: "CreateWordActions",
};
</script>

<script lang="ts" setup>
import MetaplexService from "@/utils/Service/NFT/MetaplexService";
import { NFT } from "@/utils/Service/CircledWordService";

interface Props {
  playRunning: boolean;
  mintRunning: boolean;
  metaplexService: false | MetaplexService;
  nft: NFT;
}

const props = defineProps<Props>();

const emit = defineEmits({
  playStarted: () => true,
  mintStarted: () => true,
  mintCompleted: () => true,
});

const mint = async () => {
  emit("mintStarted");

  try {
    await (props.metaplexService as MetaplexService).createNFT(
      (props.nft as NFT).properties
    );
  } catch (e) {
    (props.metaplexService as MetaplexService).nftStage = null;
  } finally {
    emit("mintCompleted");
  }
};
</script>
