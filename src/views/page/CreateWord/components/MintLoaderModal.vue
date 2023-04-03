<template>
  <div
    ref="mintLoaderModal"
    class="mint-loader-modal modal fade"
    tabindex="-1"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-dialog-centered justify-content-center">
      <div class="modal-content py-2">
        <div class="modal-body text-center">
          <div v-if="props.nftStage !== null">
            <h4>
              Please wait for the {{ props.nftStage }} transaction completion...
            </h4>
            <div class="spinner-border mt-3" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div class="step-bullets mt-4 d-flex justify-content-center">
              <div
                v-for="(value, key) in mintStagesCount"
                :key="key"
                class="bullet mx-1"
                :class="{ active: key < mintStagesCompleted }"
              />
            </div>
          </div>
          <div v-else>
            <h4>Done</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "MintLoaderModal",
};
</script>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { Modal } from "bootstrap";

interface Props {
  nftStage: string | null;
}

const props = defineProps<Props>();

const mintLoaderModal = ref<Ref<HTMLDivElement>>();
const mintStagesCount = 4;
const mintStagesCompleted = ref(0);

let modal: typeof Modal;

onMounted(() => {
  modal = new Modal(mintLoaderModal.value);
});

watch(
  () => props.nftStage,
  (newValue: string | null, oldValue) => {
    if (oldValue === null && newValue) {
      modal.show();
    }
    if (oldValue !== null && newValue !== null) {
      mintStagesCompleted.value++;
    }
    if (oldValue !== null && newValue === null) {
      modal.hide();
      mintStagesCompleted.value = 0;
    }
  }
);
</script>
