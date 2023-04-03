<template>
  <div class="circled-actions">
    <a
      href="#"
      class="me-2 py-3 text-center text-decoration-none play-action animate__animated animate__fadeInUp"
      :class="{ disabled: props.playRunning }"
      @click.prevent="
        () => (props.playRunning ? undefined : emit('playStarted'))
      "
      >Play</a
    >
    <a
      href="#"
      class="ms-2 py-3 text-center text-decoration-none mint-action animate__animated animate__fadeInUp"
      :class="{
        disabled: props.mintRunning || !props.metaplexService,
      }"
      @click.prevent="() => (props.mintRunning || !props.metaplexService ? undefined : mint())"
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
  metaplexService: Ref<boolean> | MetaplexService;
  formValidationStatus: boolean;
  nft: NFT;
}

const props = defineProps<Props>();

const emit = defineEmits({
  playStarted: () => true,
  mintStarted: () => true,
  mintCompleted: () => true,
});

const mint = async () => {
  if (!props.formValidationStatus) {
    // @todo Temporary. Please replace in future.
    (document.getElementsByClassName('tab-link story-tab')[0] as HTMLLinkElement).click();
    setTimeout(() => {
      (document.getElementsByClassName('field_title')[0] as HTMLInputElement).focus();
    }, 200);

    return;
  }

  emit("mintStarted");

  try {
    await (props.metaplexService as MetaplexService).createNFT(
      (props.nft as NFT).properties,
      (props.nft as NFT).name,
      (props.nft as NFT).description
    );
  } catch (e) {
    (props.metaplexService as MetaplexService).nftStage = "Error";
  } finally {
    emit("mintCompleted");
  }
};
</script>
