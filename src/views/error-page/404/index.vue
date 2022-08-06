<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="text-center d-flex align-items-center justify-content-center"
        :style="{ 'min-height': freeHeight + 'px' }"
      >
        <h1 class="error-text">Error 404. Page not found</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { getFreeHeight } from "@/utils/layout-space";

export default {
  name: "404Page",
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
