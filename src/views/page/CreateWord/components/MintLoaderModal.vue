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
          <div v-if="nftStage !== null">
            <h4>
              Please wait for the {{ nftStage }} transaction completion...
            </h4>
            <div class="spinner-border mt-3" role="status">
              <span class="visually-hidden">Loading...</span>
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
import { Options, Prop, Ref, Vue, Watch } from "vue-property-decorator";
import { Modal } from "bootstrap";

@Options({})
export default class MintLoaderModal extends Vue {
  @Prop({ required: true }) readonly nftStage!: string;
  @Ref("mintLoaderModal") readonly mintLoaderModal!: HTMLDivElement;

  private modal!: typeof Modal;

  mounted() {
    this.modal = new Modal(this.mintLoaderModal);
  }

  @Watch("nftStage")
  onNftStageChanged(new_value: unknown, old_value: unknown): void {
    if (old_value === null && new_value === "JSON Upload") {
      this.modal.show();
    }
    if (old_value !== null && new_value === null) {
      this.modal.hide();
    }
  }
}
</script>
