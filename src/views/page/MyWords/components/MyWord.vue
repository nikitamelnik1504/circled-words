<template>
  <div class="button-item text-center pt-3 pb-5">
    <h5 class="button-title mb-5">
      {{ wordData.title }}
    </h5>
    <CircledWord :word-data="wordData" />
  </div>
</template>

<script>
import CircledWord from "@/components/CircledWord.vue";
import getWord from "@/components/CircledWord.js";

export default {
  components: {
    CircledWord,
  },
  props: {
    metadata: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      wordData: getWord(this.metadata),
    };
  },
};
</script>