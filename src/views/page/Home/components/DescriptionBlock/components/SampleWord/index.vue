<template>
  <div class="d-flex flex-column justify-content-between">
    <div class="text-center">
      <h4 class="sample-word-name text-center mb-3">
        <span class="primary">Circled</span><span class="secondary">Word</span>
        {{ nft.name }}
      </h4>
      <CircledWord
        :nft="nft"
        class="disabled"
        locked
        :play="play"
        @play-finished="onSamplePlayFinished"
      />
      <div class="text-center mt-4">
        <LevelBlock
          v-for="(level_properties, level) in nft.properties"
          :key="level"
          :level="level + 1"
          :properties="level_properties"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options, Prop, Emit } from "vue-property-decorator";
import CircledWord from "@/components/CircledWord.vue";
import CircledWordService, {
  SampleNFT,
} from "@/utils/Service/CircledWordService";
import LevelBlock from "./components/LevelBlock.vue";

@Options({
  components: {
    CircledWord,
    LevelBlock,
  },
})
export default class SampleWord extends Vue {
  @Prop({ type: Object, required: true }) readonly metadata!: NFTMetadata;
  @Prop({ type: Boolean, default: false }) readonly play!: boolean;

  nft: SampleNFT = new CircledWordService().getSampleNft(this.metadata);

  @Emit("samplePlayFinished")
  onSamplePlayFinished() {
    return true;
  }
}
</script>
