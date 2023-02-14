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
              <span class="word-secondary">Circled</span>
              <span class="word-primary">Word</span> is already waiting for you!
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

<script lang="ts">
import { Vue, Options } from "vue-property-decorator";
import sloganWords from "@/assets/json/homepage_slogan_circled_word_samples.json";
import CircledWord from "@/components/CircledWord.vue";
import CircledWordService, {
  SampleNFT,
} from "@/utils/Service/CircledWordService";
import { getFreeHeight } from "@/utils/layout-space";
import type { ComputedRef } from "vue";
import { computed } from "vue";

@Options({
  components: {
    CircledWord,
  },
})
export default class SloganBlock extends Vue {
  wordsData = this.getWordsData();

  heightValues: { [key: string]: number } = getFreeHeight();

  minHeightValue: ComputedRef<number> = computed(() => {
    return this.heightValues.clientHeight - this.heightValues.headerHeight;
  });

  mounted(): void {
    this.$nextTick((): void => {
      window.addEventListener("resize", this.onResize);
    });
  }

  getSloganWords(): NFTMetadata[] {
    return sloganWords as NFTMetadata[];
  }

  getWordsData(): SampleNFT[] {
    const data: SampleNFT[] = [];
    const circled_word_service = new CircledWordService();
    this.getSloganWords().forEach((word: NFTMetadata) => {
      const current_word = circled_word_service.getSampleNft(word) as SampleNFT;
      current_word.link = word.link;
      data.push(current_word);
    });
    return data;
  }

  onResize(): void {
    this.heightValues = getFreeHeight();
  }
}
</script>
