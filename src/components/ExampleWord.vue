<script>

import CircledWord from "@/components/CircledWord.vue"
import getWord from "./CircledWord";

export default {
  components: {
    CircledWord
  },
  data() {
    return {
      wordData: getWord(this.metadata)
    }
  },
  props: {
    metadata: Object
  }
}
</script>

<template>
  <div>
    <h5></h5>
  </div>
</template>