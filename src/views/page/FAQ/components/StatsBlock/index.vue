<template>
  <section
    id="stats"
    ref="section"
    class="row stats-section pt-4 animate__animated animate__fadeIn"
  >
    <div class="col-11 m-auto">
      <h3 class="d-inline-block section-title my-3">Stats</h3>
      <div class="row justify-content-between mt-2 mt-md-3">
        <div
          v-for="(stat, index) in data"
          :key="index"
          class="col-md-6 col-lg-4 stat-item-wrapper mt-lg-0 mx-md-auto mx-lg-0"
          :class="{ 'mt-md-4': index !== 3, 'mt-4': index !== 0 }"
        >
          <div class="row h-100">
            <div class="col-xxl-11 mx-auto">
              <div
                class="stat-item h-100 d-flex flex-column justify-content-between"
              >
                <StatBlock
                  :value="stat.value"
                  :title="stat.title"
                  :description="stat.description"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="help-description text-center pt-4">
        Every day our team is working for you to create enjoy for your eyes.
      </p>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: "StatsBlock",
};
</script>

<script lang="ts" setup>
import StatBlock from "./components/StatBlock.vue";
import { ref } from "vue";

const section = ref();

const data = [
  {
    value: 12,
    title: "Words were minted",
    description: "Over 10 words was created and available in OpenSea",
  },
  {
    value: 12,
    title: "Words have 3-level animation",
    description: "New look for animations, new colors",
  },
  {
    value: 3,
    title: "Users received enjoy",
    description: "Match own favourite colors and transitions",
  },
];
</script>
