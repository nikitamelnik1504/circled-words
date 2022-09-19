<template>
  <div class="d-flex flex-column justify-content-between">
    <div>
      <h5 class="sample-word-name text-center mb-4">
        <span class="primary">Circled</span><span class="secondary">Word</span>
        {{ name }}
      </h5>
      <CircledWord :word-data="wordData" class="disabled" locked />
      <div class="text-start mt-3">
        <p
          v-for="(data, title) in sampleWordData.circledProperties"
          :key="title"
          class="sample-word-property-name mb-1"
        >
          {{ title }}:
          <span
            class="sample-word-property-value"
            :class="data.updated ? 'text-decoration-underline' : false"
            :style="'color:' + data.color"
            >{{ data.value }}</span
          >
        </p>
      </div>
    </div>
    <div class="text-start sample-word-adventure-text">
      <p class="mt-5">
        {{ sampleWordData.adventureText }}
      </p>
      <p>HERE IS A MAGIC</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options, Prop } from "vue-property-decorator";
import CircledWord from "@/components/CircledWord.vue";
import CircledWordNFT from "@/utils/circled-word-nft";
import colors from "@/assets/libraries/colors.json";

@Options({
  components: {
    CircledWord,
  },
})
export default class SampleWord extends Vue {
  @Prop({ type: Object, required: true }) readonly metadata!: NFTMetadata;

  circledWordNFT: CircledWordNFT = new CircledWordNFT(this.metadata);
  wordData: CircledWordElement = this.circledWordNFT.getElement();
  sampleWordData = this.getSampleWordData() as SampleWordData;
  name = this.circledWordNFT.name;

  getSampleWordData(): SampleWordData | false {
    if (this.metadata.sample_data === undefined) {
      return false;
    }
    const updated_circled_properties = this.metadata.sample_data.updated;

    const traits = this.circledWordNFT.getTraits();

    const result: { [key: string]: Record<string, string | boolean> } = {};
    for (const property in traits) {
      result[property] = {
        value: traits[property],
        updated: updated_circled_properties.includes(property as never),
      };

      if (traits[property] in colors) {
        result[property].color = this.circledWordNFT.getColor(traits[property]);
      } else {
        result[property].color = "#948561";
      }
    }

    return {
      circledProperties: result,
      adventureText:
        "adventure_text" in this.metadata.sample_data
          ? this.metadata.sample_data.adventure_text
          : false,
    };
  }
}
</script>
