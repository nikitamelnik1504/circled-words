<script>

import CircledWord from "@/components/CircledWord.vue";
import getWord from "../components/CircledWord";

export default {
  methods: {
    setSloganRowHeight() {
      let header_height = document.getElementById('header').clientHeight;
      let window_height = window.innerHeight;
      return {
        'height': (window_height - header_height) + 'px'
      }
    },
    // @TODO: Move to separate json file.
    getSloganWords() {
      return [
        {
          title: 'CIRCLED',
          traits: [
            {trait_type: 'Text color', value: 'Amethyst'},
            {trait_type: 'Animation type', value: 'Fill In'},
            {trait_type: 'Background color', value: 'Amethyst'},
            {trait_type: 'Second Text color', value: 'White'},
            {trait_type: 'Animation duration', value: 0.5},
            {trait_type: 'Border color', value: 'Amethyst'}
          ],
          link: '1',
        },
        {
          title: 'CIRCLED',
          traits: [
            {trait_type: 'Text color', value: 'Persian Pink'},
            {trait_type: 'Animation type', value: 'Fill In'},
            {trait_type: 'Background color', value: 'Persian Pink'},
            {trait_type: 'Animation duration', value: 0.5},
            {trait_type: 'Border color', value: 'Persian Pink'},
            {trait_type: 'Second Text color', value: 'White'},
          ],
          link: '2',
        },
        {
          title: 'CIRCLED',
          traits: [
            {trait_type: 'Text color', value: 'Geraldine'},
            {trait_type: 'Animation type', value: 'Fill In'},
            {trait_type: 'Background color', value: 'Geraldine'},
            {trait_type: 'Border color', value: 'Geraldine'},
            {trait_type: 'Animation duration', value: 0.5},
            {trait_type: 'Second Text color', value: 'White'},
          ],
          link: '3',
        },
        {
          title: 'CIRCLED',
          traits: [
            {trait_type: 'Text color', value: 'Atomic Tangerine'},
            {trait_type: 'Animation type', value: 'Fill In'},
            {trait_type: 'Border color', value: 'Atomic Tangerine'},
            {trait_type: 'Animation duration', value: 0.5},
            {trait_type: 'Background color', value: 'Atomic Tangerine'},
            {trait_type: 'Second Text color', value: 'White'},
          ],
          link: '4',
        }
      ]
    },
    getWordsData() {
      let data = [];
      this.getSloganWords().forEach((word) => {
        let current_word = getWord(word)
        current_word.link = word.link
        data.push(current_word)
      })
      return data
    }
  },
  data() {
    return {
      wordsData: this.getWordsData()
    }
  },
  components: {
    CircledWord,
  }
}

</script>

<template>
  <div class="container-fluid homepage">
    <section class="row slogan-section" :style="setSloganRowHeight()">
      <div class="col-11 m-auto">
        <div class="row d-flex justify-content-center align-items-center">
          <div class="col-lg-6">
            <h2 class="slogan mx-auto text-center text-lg-start">
              <span class="word-secondary">Circled</span>
              <span class="word-primary"> word</span> is already
              waiting for
              you!</h2>
          </div>
          <div class="col-8 col-lg-6 slogan-links d-flex flex-wrap">
            <div v-for="word in wordsData" class="slogan-link d-flex justify-content-center">
              <CircledWord :wordData="word" :link="word.link"/>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="row">

    </section>
  </div>
</template>

<style>
@import "Home.css";
</style>