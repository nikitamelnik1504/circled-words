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

<script lang="ts">
import { Vue, Options } from "vue-property-decorator";

@Options({
  props: {
    value: {
      required: true,
      type: Number,
    },
    title: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
  },
})
export default class StatBlock extends Vue {}
</script>
