<template>
  <div>
    <h4 class="stat-value m-0">
      {{ props.value }}
    </h4>
    <p class="stat-title">
      {{ props.title }}
    </p>
  </div>
  <div>
    <p class="stat-description">
      {{ props.description }}
    </p>
  </div>
</template>

<script lang="ts">
export default {
  name: "StatBlock",
};
</script>

<script lang="ts" setup>
interface Props {
  value: number;
  title: string;
  description: string;
}

const props = defineProps<Props>();
</script>
