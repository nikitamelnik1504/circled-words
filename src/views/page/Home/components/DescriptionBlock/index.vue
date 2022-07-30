<template>
  <section id="description" class="row description-section">
    <div class="col-11 col-sm-10 col-xxl-9 mx-auto">
      <h3 class="section-title text-center mb-3">What is it?</h3>
      <p class="description-text mt-4 text-start">
        Circled word - is a label in border with unique animation. It could be
        very simple, like fade transition of text color, and it could be very
        difficult, like pulse animation with multiple colors. It’s very similar
        to button, let’s call it button. <br /><br />

        Every button has own animation(transition) duration, start text color,
        start border color and etc. Our project wants to show you, how simple
        web animation can do something especial and beautiful.<br /><br />

        We did some examples for you to show how it works:
      </p>
      <div
        class="row mt-4 mt-md-5 justify-content-xl-between justify-content-center sample-words"
      >
        <div
          v-for="(word, index) in sampleWordsData"
          :key="index"
          class="col-md-6 col-lg-5 col-xl-4 col-xxl-3 sample-word-wrapper"
        >
          <div class="row h-100">
            <SampleWord
              :metadata="word"
              class="col-10 col-sm-8 col-md-10 mb-4 mb-md-0 mx-auto mx-md-0 sample-word"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Options } from "vue-property-decorator";
import SampleWord from "./components/SampleWord.vue";
import sampleWords from "@/components/json/homepage_circled_word_samples.json";

@Options ({
  name: "DescriptionBlock",
  components: {
    SampleWord,
  },
})
export default class DescriptionBlock extends Vue {
  data() {
    return {
      sampleWordsData: this.getSampleWords(),
    };
  }

  // Warning!!! Especial examples metadata differs from OpenSea.
  getSampleWords() {
    return sampleWords;
  }
};
</script>
