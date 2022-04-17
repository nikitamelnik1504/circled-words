<script>

import colors from "@/assets/libraries/colors.json"

export default {
  methods: {
    getTitle() {
      return this.metadata.name;
    },
    getStartTextColor() {
      let start_text_color = "";
      this.metadata.traits.forEach(trait => {
        if (trait.trait_type === "Text color") {
          start_text_color = colors[trait.value];
        }
      })
      return '#' + start_text_color;
    },
    getStyles() {
      let styles = {};
      if (typeof this.getStartTextColor() === 'string') {
        styles.color = this.getStartTextColor()
      }
      return styles
    },
  },
  data() {
    return {
      styles: this.getStyles(),
      title: this.getTitle(),
    }
  },
  props: {
    metadata: Object,
    textColor: String,
    borderColor: String,
    animationType: String,
    animationDuration: Number
  },
}

</script>

<template>
  <h5 class="button-title mb-5">{{ title }}</h5>
  <a href="#" class="mt-3 text-decoration-none" :style="styles">CIRCLED</a>
</template>

<style></style>