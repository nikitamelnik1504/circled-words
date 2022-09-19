<template>
  <a
    ref="circledWord"
    :href="link"
    class="circled-word text-decoration-none d-inline-block text-center user-select-none"
    :class="[
      wordData.elementClass,
      {
        hover: playStarted,
      },
    ]"
    :style="wordData.elementStyle"
    >{{ wordData.text ? wordData.text : "CIRCLED" }}</a
  >
</template>

<script lang="ts">
import { Vue, Options, Prop, Ref, Watch, Emit } from "vue-property-decorator";

@Options({})
export default class CircledWord extends Vue {
  protected playStarted = false;
  private beforeAnimationEventTriggered = false;
  private afterAnimationEventTriggered = false;

  @Prop({ required: true }) readonly wordData!: CircledWordElement;
  @Prop({ type: String, default: "#" }) readonly link!: string;
  @Prop({ type: Boolean, default: false }) readonly autoplayAnimation!: boolean;
  @Prop({ type: Boolean, default: false }) play!: boolean;

  @Ref("circledWord") readonly circledWord!: HTMLLinkElement;

  @Watch("play")
  onPlayStarted(value: boolean): void {
    if (!value) {
      return;
    }
    this.playStarted = true;

    this.circledWord.addEventListener(
      "transitionend",
      this.beforeAnimationCompletionEvent
    );
  }

  private async beforeAnimationCompletionEvent() {
    if (this.beforeAnimationEventTriggered) {
      return;
    }
    this.beforeAnimationEventTriggered = true;

    // Timeout when hover event has been completed.
    await new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000); // @TODO: Move timeout value to separate var.
    });

    this.circledWord.removeEventListener(
      "transitionend",
      this.beforeAnimationCompletionEvent
    );
    this.playStarted = false;
    this.circledWord.addEventListener(
      "transitionend",
      this.afterAnimationCompletionEvent
    );
  }

  private async afterAnimationCompletionEvent() {
    if (this.afterAnimationEventTriggered) {
      return;
    }
    this.afterAnimationEventTriggered = true;

    this.onPlayFinished();
    this.circledWord.removeEventListener(
      "transitionend",
      this.afterAnimationCompletionEvent
    );
  }

  @Emit("playFinished")
  onPlayFinished() {
    this.afterAnimationEventTriggered = false;
    this.beforeAnimationEventTriggered = false;
    return true;
  }

  mounted(): void {
    if (this.autoplayAnimation) {
      // this.runAnimation();
    }
  }
}
</script>
