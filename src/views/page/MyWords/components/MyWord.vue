<template>
  <div class="button-item text-center pt-4 pb-5">
    <h5 class="button-title mb-5">
      <span class="primary">Circled</span><span class="secondary">Word</span>
      {{ nft.name }}
    </h5>
    <CircledWord :nft="nft" locked />
  </div>
</template>

<script lang="ts">
import CircledWord from "@/components/CircledWord.vue";
import CircledWordService from "@/utils/Service/CircledWordService";
import { Vue, Options, Prop } from "vue-property-decorator";
import type { NFT } from "@/utils/Service/CircledWordService";

@Options({
  components: {
    CircledWord,
  },
})
export default class MyWord extends Vue {
  @Prop({ type: Object, required: true }) readonly metadata!: NFTMetadata;

  protected nft: NFT = new CircledWordService().getNft(
    this.metadata as NFTMetadata
  ) as NFT;
}
</script>
