<template>
  <section id="playground" class="row playground-section pt-4">
    <div class="col-11 col-sm-11 mx-auto">
      <h3 class="section-title d-inline-block mb-3 text-start">
        How it works?
      </h3>
      <div
        class="row mt-2 mt-md-3 justify-content-xl-between justify-content-center sample-words"
      >
        <div
          v-for="(word, index) in sampleWordsData"
          :key="index"
          class="col-md-12 sample-word-wrapper"
        >
          <div
            class="row h-100 justify-content-center justify-content-md-start"
          >
            <div class="col-12 p-4 sample-word-item">
              <div class="row justify-content-center">
                <SampleWord
                  :metadata="word"
                  :play="play"
                  @sample-play-finished="finishedSamplePlaysCount += 1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Options, Watch } from "vue-property-decorator";
import sampleWords from "@/assets/json/homepage_circled_word_samples.json";
import SampleWord from "./components/SampleWord/index.vue";

@Options({
  components: {
    SampleWord,
  },
})
export default class PlaygroundBlock extends Vue {
  play = true;
  sampleWordsData = this.getSampleWords();
  protected finishedSamplePlaysCount = 0;

  @Watch("finishedSamplePlaysCount")
  onFinishedSamplePlaysCountChanged(value: number) {
    this.play = false;

    if (value === Object.keys(sampleWords).length) {
      new Promise((resolve) => {
        setTimeout(() => (this.play = true), 1000);
        this.finishedSamplePlaysCount = 0;
        resolve(true);
      });
    }
  }

  // Warning!!! Especial examples metadata differs from OpenSea.
  getSampleWords(): object {
    return sampleWords;
  }
}
</script>
