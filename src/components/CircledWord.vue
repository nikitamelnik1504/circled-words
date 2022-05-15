<template>
  <a
    ref="circledWord"
    :href="link"
    class="circled-word text-decoration-none d-inline-block text-center user-select-none"
    :class="[
      wordData.elementClass,
      {
        hover:
          (!animationRunning && autoplayAnimation) ||
          (!animationRunning && createAnimation),
        disabled: autoplayAnimation,
      },
    ]"
    :style="wordData.elementStyle"
    >CIRCLED</a
  >
</template>

<script>
export default {
  props: {
    wordData: {
      type: Object,
      required: true,
    },
    link: {
      type: String,
      default: "#",
      required: false,
    },
    autoplayAnimation: {
      type: Boolean,
      required: false,
      default: false,
    },
    createWordAnimation: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["animationCompleted"],
  data() {
    return {
      animationRunning: false,
      createAnimation: false,
    };
  },
  watch: {
    createWordAnimation(value) {
      if (value === false) {
        return;
      }
      this.createAnimation = true;
      const startTransitionEvent = () => {
        setTimeout(() => {
          this.createAnimation = false;
          this.createWordAnimationCompleted();
          this.$refs.circledWord.removeEventListener(
            "transitionend",
            startTransitionEvent
          );
        }, 2000);
      };
      this.$refs.circledWord.addEventListener(
        "transitionend",
        startTransitionEvent
      );
    },
  },
  mounted() {
    if (this.autoplayAnimation === true) {
      this.runAnimation();
    }
  },
  methods: {
    createWordAnimationCompleted() {
      const endTransitionEvent = () => {
        setTimeout(() => {
          this.$emit("animationCompleted");
          this.$refs.circledWord.removeEventListener(
            "transitionend",
            endTransitionEvent
          );
        }, 1000);
      };
      this.$refs.circledWord.addEventListener(
        "transitionend",
        endTransitionEvent
      );
    },
    runAnimation: function () {
      let self = this;
      setTimeout(function () {
        self.runAnimation();
      }, 3000);
      return (this.animationRunning = !this.animationRunning);
    },
  },
};
</script>
