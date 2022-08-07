<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="text-center d-flex align-items-center justify-content-center"
        :style="{ 'min-height': freeHeight + 'px' }"
      >
        <h1 class="error-text">Please connect your wallet to see this page</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-property-decorator";
import { getFreeHeight } from "@/utils/layout-space";

@Options({
  name: "403Page",
})
export default class Error403Page extends Vue {
  freeHeight = Number;

  mounted(): void {
    this.onResize();
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  }

  onResize(): void {
    this.freeHeight = getFreeHeight(true);
  }
}
</script>
