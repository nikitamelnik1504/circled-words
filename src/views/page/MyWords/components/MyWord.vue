<template>
  <div class="button-item text-center pt-4 pb-5">
    <h5 class="button-title mb-5">
      <span class="primary">Circled</span><span class="secondary">Word</span>
      {{ wordData.title }}
    </h5>
    <CircledWord :word-data="wordData" locked />
  </div>
</template>

<script lang="ts">
import CircledWord from "@/components/CircledWord.vue";
import CircledWordNFT from "@/utils/circled-word-nft";
import { Vue, Options, Prop } from "vue-property-decorator";

@Options({
  components: {
    CircledWord,
  },
})
export default class MyWord extends Vue {
  @Prop({ type: Object, required: true }) readonly metadata!: NFTMetadata;

  wordData: CircledWordElement = new CircledWordNFT(this.metadata).getElement();
}
</script>
