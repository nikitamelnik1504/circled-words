<script setup lang="ts">
import type { Property } from "@utils/Service/CircledWordService";

interface Props {
  level: number;
  properties: Array<Property>;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="col-3 px-4 justify-content-center">
    <div class="row h-100">
      <div class="col-12 py-3 px-4 level-wrapper">
        <div class="row w-100 m-0">
          <div class="col-12 level text-center">
            <h5 class="d-inline-block pb-2">Level {{ props.level }}</h5>
          </div>
          <div
            v-for="(property, index) in props.properties"
            :key="index"
            class="col-8 col-md-12 property mb-2"
          >
            <div class="row align-items-center mt-2">
              <span class="label ps-0 col-6">{{ property.label }}</span>
              <div class="value col-6 py-2 text-center">
                {{ property.value }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
