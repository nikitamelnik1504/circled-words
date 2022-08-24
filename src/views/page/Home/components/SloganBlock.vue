<template>
  <section
    class="row slogan-section"
    :style="{ 'min-height': freeHeight + 'px' }"
  >
    <div class="col-11 m-auto">
      <div
        class="row slogan-wrapper d-flex justify-content-center align-items-center pb-3 pb-md-4 pb-lg-5"
      >
        <div class="col-lg-6 d-flex justify-content-center">
          <div class="mx-auto d-inline-block text-center text-lg-start">
            <h2 class="slogan">
              <span class="word-secondary">Circled</span>
              <span class="word-primary"> word</span> is already waiting for
              you!
            </h2>
            <a
              href="https://opensea.io/collection/circledwords"
              target="_blank"
              class="start-journey-button text-decoration-none d-inline-block mt-3 mt-lg-4"
              >Start your journey!</a
            >
          </div>
        </div>
        <div
          class="col-12 col-sm-9 col-md-8 col-lg-6 slogan-links d-flex flex-wrap"
        >
          <div
            v-for="(word, index) in wordsData"
            :key="index"
            class="slogan-link d-flex justify-content-center"
          >
            <CircledWord :word-data="word" :link="word.link" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Options, Prop } from "vue-property-decorator";
import sloganWords from "@/assets/json/homepage_slogan_circled_word_samples.json";
import CircledWord from "@/components/CircledWord.vue";
import CircledWordNFT from "@/utils/circled-word-nft";

@Options({
  components: {
    CircledWord,
  },
})
export default class SloganBlock extends Vue {
  @Prop({ type: Number }) readonly freeHeight!: number;

  wordsData = this.getWordsData();

  getSloganWords(): NFTMetadata[] {
    return sloganWords as NFTMetadata[];
  }

  getWordsData(): CircledWordElement[] {
    const data: CircledWordElement[] = [];
    this.getSloganWords().forEach((word: NFTMetadata) => {
      const current_word = new CircledWordNFT(word).getElement();
      current_word.link = word.link;
      data.push(current_word);
    });
    return data;
  }
}
</script>
