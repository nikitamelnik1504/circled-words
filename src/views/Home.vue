<script>

import CircledWord from "@/components/CircledWord.vue"
import SampleWord from "@/components/SampleWord.vue";
import StatBlock from "@/components/StatBlock.vue";
import getWord from "../components/CircledWord"
import sloganWords from "../components/json/homepage_slogan_circled_word_samples.json"
import sampleWords from "../components/json/homepage_circled_word_samples.json"

const stats = [
  {value: 1000, title: 'Words was created', description: 'Over 1000 words was created and available in OpenSea'},
  {value: 200, title: 'Words have 2-3 step animation', description: 'New look for animations, new colors'},
  {value: 5000, title: 'Users received enjoy', description: 'Match own favourite colors and transitions'}
]

export default {
  methods: {
    setSloganRowHeight() {
      let header_height = document.getElementById('header').clientHeight
      let window_height = window.innerHeight
      return {
        'min-height': (window_height - header_height) + 'px'
      }
    },
    getSloganWords() {
      return sloganWords
    },
    // Warning!!! Especial examples metadata differs from OpenSea.
    getSampleWords() {
      return sampleWords
    },
    getWordsData() {
      let data = [];
      this.getSloganWords().forEach((word) => {
        let current_word = getWord(word)
        current_word.link = word.link
        data.push(current_word)
      })
      return data
    },
    getStatsData() {
      return stats;
    }
  },
  data() {
    return {
      wordsData: this.getWordsData(),
      sampleWordsData: this.getSampleWords(),
      statsData: this.getStatsData(),
    }
  },
  components: {
    SampleWord,
    CircledWord,
    StatBlock
  }
}

</script>

<template>
  <div class="container-fluid homepage">
    <section class="row slogan-section" :style="setSloganRowHeight()">
      <div class="col-11 m-auto">
        <div class="row slogan-wrapper d-flex justify-content-center align-items-center pb-3 pb-md-4 pb-lg-5">
          <div class="col-lg-6 d-flex justify-content-center">
            <div class="mx-auto d-inline-block text-center text-lg-start">
              <h2 class="slogan">
                <span class="word-secondary">Circled</span>
                <span class="word-primary"> word</span> is already
                waiting for
                you!</h2>
              <a href="#" class="start-journey-button text-decoration-none d-inline-block mt-3 mt-lg-4">Start your
                journey!</a>
            </div>
          </div>
          <div class="col-12 col-sm-9 col-md-8 col-lg-6 slogan-links d-flex flex-wrap">
            <div v-for="word in wordsData" class="slogan-link d-flex justify-content-center">
              <CircledWord :wordData="word" :link="word.link"/>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="description" class="row description-section">
      <div class="col-11 col-sm-10 col-xxl-9 mx-auto">
        <h3 class="section-title text-center mb-3">What is it?</h3>
        <p class="description-text text-start">Circled word - is a label in border with unique animation. It could be
          very simple, like fade transition of
          text color, and it could be very difficult, like pulse animation with multiple colors. It’s very similar to
          button, let’s call it button. <br><br>

          Every button has own animation(transition) duration, start text color, start border color and etc. Our project
          wants to show you, how simple web animation can do something especial and beautifull.<br><br>

          We did some examples for you to show how it works:</p>
        <div class="row mt-4 mt-md-5 justify-content-xl-between justify-content-center sample-words">
          <div class="col-md-6 col-lg-5 col-xl-4 col-xxl-3 sample-word-wrapper" v-for="word in sampleWordsData">
            <div class="row h-100">
              <SampleWord :metadata="word" class="col-10 col-sm-8 col-md-10 mb-4 mb-md-0 mx-auto mx-md-0 sample-word"/>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="stats" class="row stats-section mt-5">
      <div class="col-11 col-sm-10 col-xxl-9 mx-auto">
        <h3 class="section-title my-3 text-center">Some stats?</h3>
        <div class="row justify-content-between">
          <div class="col-md-6 col-lg-4 stat-item-wrapper mt-4 mx-md-auto mx-lg-0" v-for="stat in statsData">
            <div class="row h-100">
              <div class="col-lg-12 col-xxl-11 mx-auto">
                <div class="stat-item h-100 d-flex flex-column justify-content-between">
                  <StatBlock :value="stat.value" :title="stat.title" :description="stat.description"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p class="text-center pt-4">Every day our team is working for you to create enjoy for your eyes.  </p>
      </div>
    </section>
    <section id="benefits" class="row benefits-section mt-3">
      <div class="col-11 col-sm-10 col-xxl-9 mx-auto">
        <h3 class="section-title my-3 text-center">Benefits?</h3>
      </div>
    </section>
  </div>
</template>
