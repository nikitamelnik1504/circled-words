<template>
  <a
    ref="circledWord"
    :href="link"
    class="circled-word text-decoration-none d-inline-block text-center user-select-none"
    :class="[
      getClass(),
      {
        hover: playStarted,
      },
    ]"
    :style="getStyle()"
    @click="(event) => (locked ? event.preventDefault() : undefined)"
    >{{ nft.label ? nft.label : "CIRCLED" }}</a
  >
</template>

<script lang="ts">
import { Vue, Options, Prop, Ref, Watch, Emit } from "vue-property-decorator";
import type { NFT, SampleNFT } from "@/utils/Service/CircledWordService";
import { AnimationTypeProperty } from "@/utils/Service/CircledWordService";

@Options({})
export default class CircledWord extends Vue {
  protected playStarted = false;
  private beforeAnimationEventTriggered = false;
  private afterAnimationEventTriggered = false;

  @Prop({ required: true }) readonly nft!: NFT | SampleNFT;
  @Prop({ type: String, default: "#" }) readonly link!: string;
  @Prop({ type: Boolean, default: false }) readonly locked!: string;
  @Prop({ type: Boolean, default: false }) play!: boolean;

  @Ref("circledWord") readonly circledWord!: HTMLLinkElement;

  mounted() {
    if (this.play) {
      new Promise((resolve) => setTimeout(() => resolve(true), 1000)).then(() =>
        this.onPlayStarted(true)
      );
    }
  }

  getClass(): string {
    const nft_type = this.nft.getType();
    return nft_type.toLowerCase().replaceAll(/ /g, "-");
  }

  getStyle() {
    const style: Record<string, string> = {};
    const traits = this.nft.properties;
    for (const level_traits of traits) {
      for (const [, trait] of level_traits.entries()) {
        if (trait instanceof AnimationTypeProperty) {
          continue;
        }

        style["--" + trait.machine_name.replaceAll(/_/g, "-")] =
          typeof trait.getValue() === "object"
            ? (trait.getValue() as { hex: string; name: string }).hex
            : (trait.getValue() as string);
      }
    }

    return style;
  }

  @Watch("play")
  onPlayStarted(value: boolean): void {
    if (!value) {
      return;
    }

    if (!this.circledWord) {
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
}
</script>
