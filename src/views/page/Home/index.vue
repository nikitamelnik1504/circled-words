<template>
  <div class="page container-fluid homepage">
    <section
      class="row slogan-section"
      :style="{ 'min-height': minHeightValue + 'px' }"
    >
      <div
        class="col-10 col-md-7 col-lg-5 col-xl-6 col-xxl-5 m-auto px-3 px-sm-0 pb-5"
      >
        <div class="mx-auto d-inline-block text-center">
          <h1
            class="slogan animate__animated animate__shakeY animate__infinite"
            :style="{
              'animation-duration': 15 + 's',
            }"
          >
            Tell the world your story about the
            <span class="word-primary">Circled</span>
          </h1>
          <router-link
            to="/create-word"
            class="start-journey-button text-decoration-none d-inline-block mt-3 mt-lg-4 py-3 px-4 py-sm-3 px-sm-4"
            >Start your journey!
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  name: "HomePage",
};
</script>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { getFreeHeight } from "@/utils/layout-space";

const heightValues: Ref<{ [key: string]: number }> = ref(getFreeHeight());

const minHeightValue = computed(() => {
  return heightValues.value.clientHeight - heightValues.value.headerHeight;
});
</script>
