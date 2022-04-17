<script>

import CircledWord from "@/components/CircledWord.vue"
import api_result from "@/../opensea_test_api_result.json"

export default {
  components: {
    CircledWord,
  },
  data() {
    return {
      api_result
      // Sample API Data, waiting for OpenSea access token.
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
          <div v-for="word in api_result.assets" class="col-3 button-item text-center py-3">
            <CircledWord :title="word.name" :textColor="word.traits" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "MyWords.css";
</style>
