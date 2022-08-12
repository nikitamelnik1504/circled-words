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
import { Vue, Options, Prop, Ref, Watch, Emit } from "vue-property-decorator";

@Options({})
export default class CircledWord extends Vue {
  public animationRunning = false;
  public createAnimation = false;

  @Prop({ required: true }) readonly wordData!: CircledWordElement;
  @Prop({ type: String, default: "#" }) readonly link!: string;
  @Prop({ type: Boolean, default: false }) readonly autoplayAnimation!: boolean;
  @Prop({ type: Boolean, default: false })
  readonly createWordAnimation!: boolean;

  @Ref("circledWord") readonly circledWord!: HTMLLinkElement;

  @Watch("createWordAnimation")
  onCreateWordAnimation(value: boolean): void {
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

  @Emit()
  animationCompleted(): void {
    return;
  }

  mounted(): void {
    if (this.autoplayAnimation) {
      this.runAnimation();
    }
  }

  createWordAnimationCompleted(): void {
    const endTransitionEvent = () => {
      setTimeout(() => {
        this.animationCompleted();
        this.circledWord.removeEventListener(
          "transitionend",
          endTransitionEvent
        );
      }, 1000);
    };
    this.circledWord.addEventListener("transitionend", endTransitionEvent);
  }

  runAnimation(): boolean {
    setTimeout(() => {
      this.runAnimation();
    }, 3000);
    return (this.animationRunning = !this.animationRunning);
  }
}
</script>
