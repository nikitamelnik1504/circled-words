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
  <a :href="link ? link : '#'" class="circled-word text-decoration-none d-inline-block text-center" :class="wordData.elementClass"
     :style="wordData.elementStyle">CIRCLED</a>
</template>
