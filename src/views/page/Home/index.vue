<template>
  <div class="container-fluid homepage">
    <Slogan />
    <Description />
    <Stats />
    <Benefits />
    <Help />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-property-decorator";
import Help from "./components/HelpBlock/index.vue";
import Benefits from "./components/BenefitsBlock.vue";
import Stats from "./components/StatsBlock/index.vue";
import Description from "./components/DescriptionBlock/index.vue";
import Slogan from "./components/SloganBlock.vue";

@Options({
  name: "HomePage",
  components: {
    Slogan,
    Description,
    Stats,
    Benefits,
    Help,
  },
})
export default class Home extends Vue {}
</script>
