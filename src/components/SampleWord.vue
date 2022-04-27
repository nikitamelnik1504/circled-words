<script>

import CircledWord from "@/components/CircledWord.vue"
import {getWord, metadata_getters} from "./CircledWord";
import colors from "@/assets/libraries/colors.json"

export default {
  components: {
    CircledWord
  },
  methods: {
    getSampleWordData() {
      let data = {}

      if (!('sample_data' in this.metadata)) {
        return;
      }
      let sample_data = this.metadata.sample_data;

      if (!('updated' in sample_data)) {
        return;
      }
      let updated_circled_properties = sample_data.updated

      let traits = metadata_getters.getTraits(this.metadata)

      let result = {}
      for (let property in traits) {
        result[property] = {
          value: traits[property],
          updated: updated_circled_properties.includes(property),
        }

        if (traits[property] in colors) {
          result[property].color = '#' + colors[traits[property]]
        } else {
          result[property].color = '#948561'
        }

        data['circledProperties'] = result
      }

      data['adventureText'] = ('adventure_text' in sample_data) ? sample_data.adventure_text : false

      return data;
    },
  },
  data() {
    return {
      wordData: getWord(this.metadata),
      sampleWordData: this.getSampleWordData(),
      name: metadata_getters.getTitle(this.metadata),
    }
  },
  props: {
    metadata: Object
  }
}
</script>

<template>
  <div class="d-flex flex-column justify-content-between">
    <div>
      <h5 class="sample-word-name mb-4">{{ name }}</h5>
      <CircledWord :wordData="wordData" :autoplayAnimation="true"/>
      <div class="text-start mt-3">
        <p v-for="(data, title) in sampleWordData.circledProperties" class="sample-word-property-name mb-1">
          {{ title }}: <span class="sample-word-property-value"
                             :class="data.updated ? 'text-decoration-underline': false"
                             :style="'color:' + data.color">{{ data.value }}</span>
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
