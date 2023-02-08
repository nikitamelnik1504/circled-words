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
        <div class="row level-wrapper pt-3 pb-3 mb-3 justify-content-center">
          <div class="col-12 level">
            <h5 class="d-inline-block pb-2">Level 1</h5>
          </div>
          <div class="col-8 col-md-6 property">
            <span class="label"> Animation Type </span>
            <div class="value py-2 mt-2">Fill In</div>
          </div>
        </div>
        <div class="row level-wrapper pt-3 pb-3 mb-3 justify-content-center">
          <div class="col-12 level">
            <h5 class="d-inline-block pb-2">Level 2</h5>
          </div>
          <div class="col-8 col-md-6 property">
            <span class="label"> Text Color </span>
            <div class="value py-2 mt-2">#ffffff</div>
          </div>
        </div>
        <div class="row level-wrapper pt-3 pb-3 mb-3 justify-content-center">
          <div class="col-12 level">
            <h5 class="d-inline-block pb-2">Level 3</h5>
          </div>
          <div class="col-8 col-md-6 property">
            <span class="label"> Text Color </span>
            <div class="value py-2 mt-2">Red</div>
          </div>
          <div class="col-6 property">
            <span class="label"> Background Color </span>
            <div class="value py-2 mt-2">Blue</div>
          </div>
        </div>
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
