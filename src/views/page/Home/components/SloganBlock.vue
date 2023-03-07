<template>
  <section
    class="row slogan-section"
    :style="{ 'min-height': minHeightValue + 'px' }"
  >
    <div class="col-12 col-sm-11 m-auto">
      <div
        class="row slogan-wrapper d-flex justify-content-center align-items-center pb-3 pb-md-4 pb-lg-5"
      >
        <div class="col-11 col-sm-12 col-lg-6 d-flex justify-content-center">
          <div
            class="mx-auto d-inline-block text-center text-lg-start animate__animated animate__pulse"
          >
            <h1 class="slogan">
              Tell the world your story about the
              <span class="word-primary">Circled</span>
            </h1>
            <router-link
              to="/create-word"
              class="start-journey-button text-decoration-none d-inline-block mt-3 mt-lg-4"
              >Start your journey!
            </router-link>
          </div>
        </div>
        <div
          class="col-12 col-sm-11 col-md-9 col-lg-6 slogan-links d-flex flex-wrap mt-4 mt-lg-0"
        >
          <div
            v-for="(word, index) in wordsData"
            :key="index"
            class="slogan-link d-flex justify-content-center animate__animated animate__zoomIn animate__fast"
            :style="{
              '-webkit-animation-delay': index * 0.05 + 's',
              'animation-delay': index * 0.05 + 's',
            }"
          >
            <CircledWord :nft="word" :link="word.link" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import CircledWordService, {
  SampleNFT,
} from "@/utils/Service/CircledWordService";
import sloganWords from "@/assets/json/homepage_slogan_circled_word_samples.json";
import { getFreeHeight } from "@/utils/layout-space";
import { computed, nextTick, onMounted, ref } from "vue";
import CircledWord from "@/components/CircledWord.vue";

const heightValues: Ref<{ [key: string]: number }> = ref(getFreeHeight());

const minHeightValue = computed(() => {
  return heightValues.value.clientHeight - heightValues.value.headerHeight;
});

const getSloganWords = () => {
  return sloganWords as NFTMetadata[];
};

const wordsData = (() => {
  const data: SampleNFT[] = [];
  const circled_word_service = new CircledWordService();
  getSloganWords().forEach((word: NFTMetadata) => {
    const current_word = circled_word_service.getSampleNft(word) as SampleNFT;
    current_word.link = word.link;
    data.push(current_word);
  });
  return data;
})();

const onResize = () => {
  heightValues.value = getFreeHeight();
};

onMounted(() => {
  nextTick((): void => {
    window.addEventListener("resize", onResize);
  });
});
</script>
