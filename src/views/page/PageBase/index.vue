<template>
  <div class="page container-fluid mt-2">
    <div class="row px-2 px-md-4">
      <div class="col-12 content px-md-4 py-3">
        <div class="row header">
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
        <div class="row body mt-3">
          <slot />
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
interface Props {
  title: string;
  description: string;
}

const props = defineProps<Props>();
</script>
