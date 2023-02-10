<template>
  <div class="page container-fluid homepage">
    <Slogan />
    <Description />
    <HowItWorks />
    <Stats />
    <Help />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import Help from "./components/HelpBlock/index.vue";
import HowItWorks from "./components/HowItWorksBlock/index.vue";
import Stats from "./components/StatsBlock/index.vue";
import Description from "./components/DescriptionBlock/index.vue";
import Slogan from "./components/SloganBlock.vue";

@Options({
  name: "HomePage",
  components: {
    Slogan,
    Description,
    HowItWorks,
    Stats,
    Help,
  },
})
export default class Home extends Vue {}
</script>
