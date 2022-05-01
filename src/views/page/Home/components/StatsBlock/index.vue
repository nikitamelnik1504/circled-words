<script>
import StatBlock from "./components/StatBlock.vue";

const stats = [
  {
    value: 1000,
    title: "Words was created",
    description: "Over 1000 words was created and available in OpenSea",
  },
  {
    value: 200,
    title: "Words have 2-3 step animation",
    description: "New look for animations, new colors",
  },
  {
    value: 5000,
    title: "Users received enjoy",
    description: "Match own favourite colors and transitions",
  },
];

export default {
  name: "StatsBlock",
  components: {
    StatBlock,
  },
  data() {
    return {
      statsData: this.getStatsData(),
    };
  },
  methods: {
    getStatsData() {
      return stats;
    },
  },
};
</script>

<template>
  <section id="stats" class="row stats-section mt-5">
    <div class="col-11 col-sm-10 col-xxl-9 mx-auto">
      <h3 class="section-title my-3 text-center">Some stats?</h3>
      <div class="row justify-content-between">
        <div
          v-for="stat in statsData"
          class="col-md-6 col-lg-4 stat-item-wrapper mt-4 mx-md-auto mx-lg-0"
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
