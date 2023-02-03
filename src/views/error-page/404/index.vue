<template>
  <div class="page container-fluid">
    <div class="row h-100">
      <div class="text-center d-flex align-items-center justify-content-center">
        <h3 class="error-text">Error 404. Page not found</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options } from "vue-property-decorator";
import PageBase from "@/views/page/PageBase";

@Options({
  name: "404Page",
})
export default class Error404Page extends PageBase {}
</script>
