<template>
  <a
    ref="circledWord"
    :href="props.link"
    class="circled-word text-decoration-none d-inline-block text-center user-select-none"
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

<script lang="ts" setup>
import {
  AnimationTypeProperty,
  NFT,
  SampleNFT,
} from "@/utils/Service/CircledWordService";
import { onMounted, ref, watch } from "vue";
import colors from "@/assets/libraries/colors.json";

type TraitKeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

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

const circledWord = ref();

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

      let value = trait.getValue() as string;

      // Ethereum NFTs support.
      if (
        colors[value as TraitKeysMatching<typeof colors, string>] !== undefined
      ) {
        value = "#" + colors[value as TraitKeysMatching<typeof colors, string>];
      }

      style["--" + trait.machine_name.replaceAll(/_/g, "-")] = value;
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

  if (!circledWord.value) {
    return;
  }

  playStarted.value = true;

  circledWord.value.addEventListener(
    "transitionend",
    beforeAnimationCompletionEvent
  );
};

const afterAnimationCompletionEvent = () => {
  beforeAnimationEventTriggered.value = false;
  emit("playFinished");

  circledWord.value.removeEventListener(
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

  circledWord.value.removeEventListener(
    "transitionend",
    beforeAnimationCompletionEvent
  );

  playStarted.value = false;
  circledWord.value.addEventListener(
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
