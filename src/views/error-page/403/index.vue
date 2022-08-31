<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="text-center d-flex align-items-center justify-content-center"
        :style="{ 'min-height': height + 'px' }"
      >
        <h1 class="error-text">Please connect your wallet to see this page</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options } from "vue-property-decorator";
import PageBase from "@/views/page/PageBase";

@Options({
  name: "403Page",
})
export default class Error403Page extends PageBase {
  height: number =
    this.freeHeight["clientHeight"] -
    this.freeHeight["headerHeight"] -
    this.freeHeight["footerHeight"];
}
</script>
