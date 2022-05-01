<script>

export default {
  props: {
    value: {
      required: true,
      type: Number
    },
    title: {
      required: true,
      type: String
    },
    description: {
      required: true,
      type: String,
    }
  }
}
</script>

<template>
  <div>
    <h4 class="stat-value m-0">
      {{ value }}
    </h4>
    <p class="stat-title">
      {{ title }}
    </p>
  </div>
  <div>
    <p class="stat-description">
      {{ description }}
    </p>
  </div>
</template>