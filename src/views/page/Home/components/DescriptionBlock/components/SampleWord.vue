<template>
  <div class="d-flex flex-column justify-content-between">
    <div>
      <h5 class="sample-word-name text-center mb-4">
        <span class="primary">Circled</span><span class="secondary">Word</span>
        {{ name }}
      </h5>
      <CircledWord :word-data="wordData" :autoplay-animation="true" />
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
import { getWord, metadata_getters } from "@/components/CircledWord.js";
import colors from "@/assets/libraries/colors.json";

@Options({
  components: {
    CircledWord,
  },
})
export default class SampleWord extends Vue {
  @Prop({ type: Object, required: true }) readonly metadata!: object;

  wordData = getWord(this.metadata);
  sampleWordData = this.getSampleWordData();
  name = metadata_getters.getTitle(this.metadata);

  getSampleWordData(): object | undefined {
    const data = {};

    if (!("sample_data" in this.metadata)) {
      return;
    }
    const sample_data = this.metadata.sample_data;

    if (!("updated" in sample_data)) {
      return;
    }
    const updated_circled_properties = sample_data.updated;

    const traits = metadata_getters.getTraits(this.metadata);

    const result = {};
    for (const property in traits) {
      result[property] = {
        value: traits[property],
        updated: updated_circled_properties.includes(property),
      };

      if (traits[property] in colors) {
        result[property].color = "#" + colors[traits[property]];
      } else {
        result[property].color = "#948561";
      }

      data["circledProperties"] = result;
    }

    data["adventureText"] =
      "adventure_text" in sample_data ? sample_data.adventure_text : false;

    return data;
  }
}
</script>
