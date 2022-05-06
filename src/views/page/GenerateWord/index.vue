<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="col-12 d-flex align-items-center justify-content-center"
        :style="{ 'min-height': freeHeight + 'px' }"
      >
        <div>
          <CircledWord :word-data="wordData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFreeHeight } from "@/utils/layout-space.js";
import CircledWord from "@/components/CircledWord.vue";
import getWord from "@/components/CircledWord.js";
import circled_word_data from "./circled_word_properties.json";

export default {
  name: "GenerateWordPage",
  components: { CircledWord },
  data() {
    return {
      freeHeight: Number,
      wordData: getWord(circled_word_data),
    };
  },
  mounted() {
    this.onResize();
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  methods: {
    onResize() {
      this.freeHeight = getFreeHeight(true);
    },
  },
};
</script>
