<template>
  <div
id="verifyModal" ref="element" class="verify-modal modal fade" data-bs-backdrop="static" data-bs-keyboard="false"
       tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered justify-content-center">
      <div class="modal-content">
        <div class="modal-header justify-content-center pb-2">
          <h2 id="staticBackdropLabel" class="modal-title">Verify Circled</h2>
        </div>
        <div class="modal-body text-center py-0">
          <p>Newly created NFTs needs verification to be part of original collection, which means that you can
            use/share/sell it anywhere.</p>
        </div>
        <div class="modal-footer p-0 m-0">
          <a href="#" class="w-100 text-center m-0" data-bs-dismiss="modal" @click.prevent="closeVerification">Close</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { ref } from "vue";
import { useStore } from "vuex";

const element = ref();
const store = useStore();

defineExpose({ element });

interface Props {
  metadata: NFTMetadata;
}

const props = defineProps<Props>();

const closeVerification = () => {
  element.value.ontransitionend = () => {
    store.state.modal.verification.value = false;
    store.state.modal.verification.props.metadata = null;
  }
}
</script>

