<template>
  <div class="page container-fluid">
    <div class="row px-2 px-md-3" :style="{ 'min-height': pageHeight }">
      <div class="col-12 content py-md-3">
        <div class="wrapper px-md-4 py-md-3 h-100 d-flex flex-column">
          <div class="row header mt-1 mt-md-2">
            <div class="col-md-3 page-title">
              <div
                class="wrapper px-3 d-flex align-items-center justify-content-center"
              >
                <h2 class="m-0">{{ props.title }}</h2>
              </div>
            </div>
            <div class="col-md-9 page-description d-none d-md-block">
              <div class="wrapper px-3 d-flex align-items-center">
                <p class="m-0">{{ props.description }}</p>
              </div>
            </div>
          </div>
          <div class="row body my-3 h-100">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PageBase",
};
</script>

<script lang="ts" setup>
import { ref } from "vue";
import { getFreeHeight } from "@/utils/layout-space";

interface Props {
  title: string;
  description: string;
  fullHeight?: boolean;
}

const props = withDefaults(defineProps<Props>(), { fullHeight: false });

const pageHeight = ref("unset");

const setFullHeightBody = () => {
  const { headerHeight, clientHeight } = getFreeHeight();
  pageHeight.value = clientHeight - headerHeight + "px";
};

if (props.fullHeight) {
  setFullHeightBody();
  window.addEventListener("resize", setFullHeightBody);
}
</script>
