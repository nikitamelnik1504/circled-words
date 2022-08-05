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
import { Vue, Options, Prop } from "vue-property-decorator";

@Options({})
export default class StatBlock extends Vue {
  @Prop({ type: Number, required: true }) readonly value!: number;
  @Prop({ type: String, required: true }) readonly title!: string;
  @Prop({ type: String, required: true }) readonly description!: string;
}
</script>
