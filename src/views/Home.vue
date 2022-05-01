<script>

import Help from "@/components/Home/Help.vue"
import Benefits from "@/components/Home/Benefits.vue"
import Stats from "@/components/Home/Stats.vue"
import Description from "@/components/Home/Description.vue";
import Slogan from "@/components/Home/Slogan.vue";

export default {
  components: {
    Slogan,
    Description,
    Stats,
    Benefits,
    Help
  }
}

</script>

<template>
  <div class="container-fluid homepage">
    <Slogan />
    <Description />
    <Stats />
    <Benefits />
    <Help />
  </div>
</template>
