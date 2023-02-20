<template>
  <section
    id="playground"
    ref="section"
    class="row playground-section pt-4 animate__animated animate__fadeIn"
  >
    <div class="col-11 col-sm-11 m-auto">
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
export default {
  name: "PlaygroundBlock",
};
</script>

<script lang="ts" setup>
import sampleWords from "@/assets/json/homepage_circled_word_samples.json";
import SampleWord from "./components/SampleWord/index.vue";
import { ref, watch } from "vue";

const section = ref();
const play = ref(true);
const sampleWordsData = sampleWords;
const finishedSamplePlaysCount = ref(0);

const onFinishedSamplePlaysCountChanged = (value: number) => {
  play.value = false;

  if (value === Object.keys(sampleWordsData).length) {
    new Promise((resolve) => {
      setTimeout(() => (play.value = true), 1000);
      finishedSamplePlaysCount.value = 0;
      resolve(true);
    });
  }
};

watch(finishedSamplePlaysCount, onFinishedSamplePlaysCountChanged);
</script>
