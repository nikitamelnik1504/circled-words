<script>

export default {
  props: {
    wordData: {
      type: Object,
      required: true,
    },
    link: String,
    autoplayAnimation: false
  },
  methods: {
    runAnimation: function () {
      let self = this
      setTimeout(function () {
        self.runAnimation()
      }, 3000);
      return this.animationRunning = !this.animationRunning;
    }
  },
  mounted() {
    if (this.autoplayAnimation === true) {
      this.runAnimation()
    }
  },
  data() {
    return {
      animationRunning: false,
    }
  }
}
</script>

<template>
  <a :href="link ? link : '#'" class="circled-word text-decoration-none d-inline-block text-center user-select-none"
     :class="[wordData.elementClass, {'hover': !animationRunning && autoplayAnimation, 'disabled': autoplayAnimation}]"
     :style="wordData.elementStyle">CIRCLED</a>
</template>
