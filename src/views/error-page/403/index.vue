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

<script>
import { getFreeHeight } from "@/utils/layout-space.js";

export default {
  name: "403Page",
  data() {
    return {
      freeHeight: Number,
    };
  },
  mounted() {
    this.onResize();
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  methods: {
    onResize() {
      this.freeHeight = getFreeHeight(true);
    },
  },
};
</script>
