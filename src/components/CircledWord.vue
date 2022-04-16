<script>

export default {
  props: {
    title: String,
    textColor: String,
    borderColor: String,
    animationType: String,
    animationDuration: Number
  }
}

</script>

<template>
  <h5 class="button-title mb-5">{{ title }}</h5>
  <a href="#" class="mt-3">CIRCLED</a>
</template>

<style>

</style>