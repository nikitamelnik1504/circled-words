<template>
  <div class="row h-100">
    <div class="col-12 py-3 px-4 level-wrapper">
      <div class="row w-100 m-0">
        <div class="col-12 level text-center">
          <h5 class="d-inline-block pb-2">Level {{ props.level }}</h5>
        </div>
        <div
          v-for="(property, index) in props.properties"
          :key="index"
          class="col-12 property mb-2"
        >
          <div class="row align-items-center mt-2">
            <span class="label ps-0 col-6">{{ property.originLabel }}</span>
            <div
              class="value col-6 py-2 text-center"
              :style="{
                'background-color': isHexColor(property.getValue())
                  ? property.getValue()
                  : undefined,
                'border-color': isHexColor(property.getValue())
                  ? property.getValue()
                  : undefined,
                color: isHexColor(property.getValue())
                  ? invert(property.getValue(), true)
                  : undefined,
              }"
            >
              {{ property.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Property } from "@/utils/Service/CircledWordService";
import invert from "invert-color";

interface Props {
  level: number;
  properties: Array<Property>;
}

const props = defineProps<Props>();

const isHexColor = (value: string) => {
  return /^#[0-9A-F]{6}$/i.test(value);
};
</script>
