<script>

import getWord from "./CircledWord";

export default {
  methods: {
    getMetadata() {
      return this.metadata
    },
  },
  mounted() {
    this.word = getWord(this.getMetadata())
  },
  data() {
    return {
      word: Object
    }
  },
  props: {
    metadata: Object,
  },
}
</script>

<template>
  <h5 class="button-title mb-5">{{ word.title }}</h5>
  <a href="#" class="circled-word mt-3 text-decoration-none d-inline-block" :class="word.elementClass"
     :style="word.elementStyle">CIRCLED</a>
</template>

<style scoped>
@import "CircledWord.css";
</style>