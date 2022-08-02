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

<script lang="ts">
import { Vue, Options, Prop, Ref, Watch } from "vue-property-decorator";

@Options({})
export default class CircledWord extends Vue {
  public animationRunning = false;
  public createAnimation = false;

  @Prop({ required: true }) readonly wordData!: unknown; // @todo Add type.
  @Prop({ type: String, default: "#" }) readonly link!: string;
  @Prop({ type: Boolean, default: false }) readonly autoplayAnimation!: boolean;
  @Prop({ type: Boolean, default: false })
  readonly createWordAnimation!: boolean;

  @Ref("circledWord") readonly circledWord!: HTMLLinkElement;

  @Watch("createWordAnimation")
  onCreateWordAnimation(value: boolean) {
    if (!value) {
      return;
    }
    this.createAnimation = true;
    const startTransitionEvent = () => {
      setTimeout(() => {
        this.createAnimation = false;
        this.createWordAnimationCompleted();
        this.circledWord.removeEventListener(
          "transitionend",
          startTransitionEvent
        );
      }, 2000);
    };
    this.circledWord.addEventListener("transitionend", startTransitionEvent);
  }

  emits: ["animationCompleted"]; // @todo Move emit to decorator.

  mounted() {
    if (this.autoplayAnimation) {
      this.runAnimation();
    }
  }

  createWordAnimationCompleted() {
    const endTransitionEvent = () => {
      setTimeout(() => {
        this.$emit("animationCompleted");
        this.circledWord.removeEventListener(
          "transitionend",
          endTransitionEvent
        );
      }, 1000);
    };
    this.circledWord.addEventListener("transitionend", endTransitionEvent);
  }

  runAnimation() {
    setTimeout(() => {
      this.runAnimation();
    }, 3000);
    return (this.animationRunning = !this.animationRunning);
  }
}
</script>
