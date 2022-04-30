<script>

export default {
  data() {
    return {
      freeHeight: Number,
      headerHeight: Number,
      footerHeight: Number
    }
  },
  mounted() {
    this.headerHeight = document.getElementById('header').offsetHeight
    this.footerHeight = document.getElementById('footer').offsetHeight
    this.onResize()
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  methods: {
    getFreeHeight() {
      return window.innerHeight - this.headerHeight - this.footerHeight
    },
    onResize() {
      this.freeHeight = this.getFreeHeight()
    }
  }
}
</script>

<template>
  <div class="container-fluid ">
    <div class="row">
      <div class="text-center d-flex align-items-center justify-content-center"
           :style="{'min-height': freeHeight + 'px'}">
        <h1 class="error-text">Please connect your wallet to see this page</h1>
      </div>
    </div>
  </div>
</template>
