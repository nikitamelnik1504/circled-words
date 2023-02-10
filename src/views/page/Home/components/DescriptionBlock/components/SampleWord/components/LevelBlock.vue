<script setup lang="ts">
import type { Property } from "@utils/Service/CircledWordService";

interface Props {
  level: number;
  properties: Array<Property>;
}

const props = defineProps<Props>();
</script>

<template>
  <div
    class="row level-wrapper pt-3 pb-3 mb-3 px-3 justify-content-center align-items-end"
  >
    <div class="col-12 level">
      <h5 class="d-inline-block pb-2">Level {{ props.level }}</h5>
    </div>
    <div
      v-for="(property, index) in props.properties"
      :key="index"
      class="col-8 col-md-6 property mb-2"
    >
      <span class="label">{{ property.label }}</span>
      <div class="value py-2 mt-2">{{ property.value }}</div>
    </div>
  </div>
</template>
