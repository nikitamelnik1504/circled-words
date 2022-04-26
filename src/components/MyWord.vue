<script>

import CircledWord from "@/components/CircledWord.vue"
import getWord from "./CircledWord";

export default {
  components: {
    CircledWord,
  },
  data() {
    return {
      wordData: getWord(this.metadata)
    }
  },
  props: {
    metadata: Object
  },
}

</script>

<template>
  <div class="button-item text-center pt-3 pb-5">
    <h5 class="button-title mb-5">{{ wordData.title }}</h5>
    <CircledWord :wordData="wordData"/>
  </div>
</template>
