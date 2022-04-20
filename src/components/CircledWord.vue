<script>

export default {
  props: {
    wordData: {
      type: Object,
      required: true,
    },
    link: String
  },
}
</script>

<template>
  <a :href="link ? link : '#'" class="circled-word mt-3 text-decoration-none d-inline-block" :class="wordData.elementClass"
     :style="wordData.elementStyle">CIRCLED</a>
</template>

<style scoped>
@import "CircledWord.css";
</style>