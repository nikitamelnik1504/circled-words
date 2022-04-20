<script>

import CircledWord from "@/components/CircledWord.vue";
import getWord from "../components/CircledWord";

export default {
  methods: {
    setSloganContainerHeight() {
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
            {trait_type: 'Border color', value: 'Amethyst'}
          ],
          link: '1',
        },
        {
          title: 'CIRCLED',
          traits: [
            {trait_type: 'Text color', value: 'Persian Pink'},
            {trait_type: 'Animation type', value: 'Fill In'},
            {trait_type: 'Border color', value: 'Persian Pink'}
          ],
          link: '2',
        },
        {
          title: 'CIRCLED',
          traits: [
            {trait_type: 'Text color', value: 'Geraldine'},
            {trait_type: 'Animation type', value: 'Fill In'},
            {trait_type: 'Border color', value: 'Geraldine'}
          ],
          link: '3',
        },
        {
          title: 'CIRCLED',
          traits: [
            {trait_type: 'Text color', value: 'Atomic Tangerine'},
            {trait_type: 'Animation type', value: 'Fill In'},
            {trait_type: 'Border color', value: 'Atomic Tangerine'}
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
  <div class="container" :style="setSloganContainerHeight()">
    <div class="row h-100 d-flex align-items-center">
      <div class="col-6">
        <h2 class="slogan">
          <span class="word-secondary">Circled</span>
          <span class="word-primary"> word</span> is already
          waiting for
          you!</h2>
      </div>
      <div class="col-6 d-flex">
        <div v-for="word in wordsData">
          <CircledWord :wordData="word" :link="word.link"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "Home.css";
</style>