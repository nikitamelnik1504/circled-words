<script>

import CircledWord from "@/components/CircledWord.vue"
import {getWord, metadata_getters} from "./CircledWord";

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
          updated: updated_circled_properties.includes(property)
        }
        data['circledProperties'] = result
      }

      data['adventureText'] = ('adventure_text' in sample_data) ? sample_data.adventure_text : false
      console.log(data)
      return data;
    }
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
  <div>
    <h5>{{ name }}</h5>
    <CircledWord :wordData="wordData"/>
    <div class="text-start mt-3">
      <p v-for="(data, title) in sampleWordData.circledProperties" class="mb-1">
        {{ title }}: {{ data.value }}
      </p>
    </div>
  </div>
</template>