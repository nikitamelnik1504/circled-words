<template>
  <div class="d-flex flex-column justify-content-between">
    <div>
      <h5 class="sample-word-name text-center mb-4">
        <span class="primary">Circled</span><span class="secondary">Word</span>
        {{ nft.name }}
      </h5>
      <CircledWord
        :nft="nft"
        class="disabled"
        locked
        :play="play"
        @play-finished="onSamplePlayFinished"
      />
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
import { Vue, Options, Prop, Emit } from "vue-property-decorator";
import CircledWord from "@/components/CircledWord.vue";
import CircledWordService, {
  SampleNFT,
} from "@/utils/Service/CircledWordService";

@Options({
  components: {
    CircledWord,
  },
})
export default class SampleWord extends Vue {
  @Prop({ type: Object, required: true }) readonly metadata!: NFTMetadata;
  @Prop({ type: Boolean, default: false }) readonly play!: boolean;

  nft: SampleNFT = new CircledWordService().getSampleNft(
    this.metadata
  ) as SampleNFT;
  sampleWordData = this.getSampleWordData() as SampleWordData;

  @Emit("samplePlayFinished")
  onSamplePlayFinished() {
    return true;
  }

  getSampleWordData(): SampleWordData | false {
    if (this.metadata.sample_data === undefined) {
      return false;
    }
    const updated_circled_properties = (
      this.nft.sampleData as { updated: Array<string> }
    ).updated;
    const traits = this.nft.properties;

    const result: { [key: string]: Record<string, string | boolean> } = {};
    for (const [property_index, property] of traits.entries()) {
      result[property.label] = {
        value:
          typeof traits[property_index].getValue() === "object"
            ? (
                traits[property_index].getValue() as {
                  hex: string;
                  name: string;
                }
              ).name
            : (traits[property_index].getValue() as string),
        updated: updated_circled_properties.includes(property.label as never),
      };

      result[property.label].color =
        typeof traits[property_index].getValue() === "object"
          ? (
              traits[property_index].getValue() as {
                hex: string;
                name: string;
              }
            ).hex
          : "#948561";
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
