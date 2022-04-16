<script>

import CircledWord from "@/components/CircledWord.vue"

export default {
  components: {
    CircledWord,
  },
  data() {
    return {
      // Sample API Data, waiting for OpenSea access token.
      api_data: [
        {
          name: 'CircledWord #1',
          traits: [
            {trait_type: 'Text color', value: 'Red'},
            {trait_type: 'Border color', value: 'Blue'},
          ]
        },
        {
          name: 'CircledWord #2',
          traits: [
            {trait_type: 'Text color', value: 'Cornflower Blue'},
            {trait_type: 'Border color', value: 'White'},
          ]
        }
      ]
    }
  }
}

</script>

<template>
  <div class="text-center">
    <h1 class="my-words-title">My Words</h1>
  </div>
  <div class="buttons-list container-fluid mt-4">
    <div class="row">
      <div class="col-12 col-sm-11 col-xxl-8 mx-auto">
        <div class="row justify-content-around">
          <div v-for="word in api_data" class="col-3 button-item text-center py-3">
            <CircledWord :title="word.name" :textColor="word.traits." />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "MyWords.css";
</style>
