<template>
  <div class="container-fluid">
    <div class="row h-100">
      <div class="text-center d-flex align-items-center justify-content-center">
        <h3 class="error-text">Please connect your wallet to see this page</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-property-decorator";

@Options({
  name: "403Page",
})
export default class Error403Page extends Vue {}
</script>
