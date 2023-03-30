<template>
  <a
    ref="element"
    :href="props.link"
    class="circled-word text-decoration-none text-center user-select-none"
    :class="[
      getClass(),
      {
        hover: playStarted,
      },
    ]"
    :style="getStyle()"
    @click="(event) => (props.locked ? event.preventDefault() : undefined)"
    >{{ nft.label ? nft.label : "CIRCLED" }}</a
  >
</template>

<script lang="ts">
export default {
  expose: ["element"],
};
</script>

<script lang="ts" setup>
import {
  AnimationTypeProperty,
  NFT,
  SampleNFT,
} from "@/utils/Service/CircledWordService";
import { onMounted, ref, watch } from "vue";

interface Props {
  nft: NFT | SampleNFT;
  link?: string;
  locked?: string | false;
  play?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  link: "#",
  locked: false,
  play: false,
});

const element = ref();

const playStarted = ref(false);
const beforeAnimationEventTriggered = ref(false);

const getClass = () => {
  const nft_type = props.nft.getType();
  return nft_type.toLowerCase().replaceAll(/ /g, "-");
};

const getStyle = () => {
  const style: Record<string, string> = {};
  const traits = props.nft.properties;
  for (const level_traits of traits) {
    for (const [, trait] of level_traits.entries()) {
      if (trait instanceof AnimationTypeProperty) {
        continue;
      }

      style["--" + trait.machine_name.replaceAll(/_/g, "-")] =
        trait.getValue() as string;
    }
  }

  return style;
};

const emit = defineEmits({
  playFinished: () => true,
});

const onPlayStarted = (value: boolean) => {
  if (!value) {
    return;
  }

  if (!element.value) {
    return;
  }

  playStarted.value = true;

  element.value.addEventListener(
    "transitionend",
    beforeAnimationCompletionEvent
  );
};

const afterAnimationCompletionEvent = () => {
  beforeAnimationEventTriggered.value = false;
  emit("playFinished");

  element.value.removeEventListener(
    "transitionend",
    afterAnimationCompletionEvent
  );
};

const beforeAnimationCompletionEvent = async () => {
  if (beforeAnimationEventTriggered.value) {
    return;
  }
  beforeAnimationEventTriggered.value = true;

  // Timeout when hover event has been completed.
  await new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000); // @TODO: Move timeout value to separate var.
  });

  element.value.removeEventListener(
    "transitionend",
    beforeAnimationCompletionEvent
  );

  playStarted.value = false;
  element.value.addEventListener(
    "transitionend",
    afterAnimationCompletionEvent
  );
};

onMounted(() => {
  if (props.play) {
    new Promise((resolve) => setTimeout(() => resolve(true), 1000)).then(() =>
      onPlayStarted(true)
    );
  }
});

watch(() => props.play, onPlayStarted);
</script>
