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
export default {
  name: "403Page",
  data() {
    return {
      freeHeight: Number,
      headerHeight: Number,
      footerHeight: Number,
    };
  },
  mounted() {
    this.headerHeight = document.getElementById("header").clientHeight;
    this.footerHeight = document.getElementById("footer").clientHeight + 1; // 1px top border height
    this.onResize();
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  methods: {
    getFreeHeight() {
      return (
        document.documentElement.clientHeight -
        this.headerHeight -
        this.footerHeight
      );
    },
    onResize() {
      this.freeHeight = this.getFreeHeight();
    },
  },
};
</script>
