<script>
import getWord from "@/components/CircledWord";
import sloganWords from "@/components/json/homepage_slogan_circled_word_samples.json";
import CircledWord from "@/components/CircledWord.vue";

export default {
  components: {
    CircledWord,
  },
  data() {
    return {
      freeHeight: Number,
      wordsData: this.getWordsData(),
    };
  },
  mounted() {
    this.headerHeight = this.getHeaderHeight();
    this.onResize();
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  methods: {
    getFreeHeight() {
      return document.documentElement.clientHeight - this.getHeaderHeight();
    },
    getHeaderHeight() {
      let header = document.getElementById("header");
      let navbar = document.getElementById("navbarNav");
      if (
        navbar.classList.contains("collapsing") ||
        navbar.classList.contains("show")
      ) {
        return header.clientHeight - navbar.clientHeight;
      } else {
        return header.clientHeight;
      }
    },
    onResize() {
      this.freeHeight = this.getFreeHeight();
    },
    getSloganWords() {
      return sloganWords;
    },
    getWordsData() {
      let data = [];
      this.getSloganWords().forEach((word) => {
        let current_word = getWord(word);
        current_word.link = word.link;
        data.push(current_word);
      });
      return data;
    },
  },
};
</script>

<template>
  <section class="row slogan-section" :style="{ height: freeHeight + 'px' }">
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
              href="#"
              class="start-journey-button text-decoration-none d-inline-block mt-3 mt-lg-4"
              >Start your journey!</a
            >
          </div>
        </div>
        <div
          class="col-12 col-sm-9 col-md-8 col-lg-6 slogan-links d-flex flex-wrap"
        >
          <div
            v-for="word in wordsData"
            class="slogan-link d-flex justify-content-center"
          >
            <CircledWord :word-data="word" :link="word.link" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
