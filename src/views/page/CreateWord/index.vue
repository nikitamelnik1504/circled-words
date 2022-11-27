<template>
  <div class="container-fluid create-word">
    <div class="row">
      <div
        class="col-md-11 col-lg-10 col-xl-10 col-xxl-12 mx-auto d-flex align-items-center justify-content-center"
        :style="{ 'min-height': minHeightValue + 'px' }"
      >
        <div class="w-100">
          <h2
            class="block-title ps-2 my-4 mt-lg-0 mb-lg-5 text-center d-none d-sm-block"
          >
            <span class="primary-text">Circled</span>
            <span class="secondary-text">Word</span>
          </h2>
          <div
            class="create-word-wrapper mx-auto d-flex justify-content-center flex-column-reverse flex-lg-row row"
          >
            <form
              ref="generateForm"
              action=""
              class="circled-properties-form col-11 col-sm-8 col-lg-6 col-xl-6 mx-auto mb-4 d-flex justify-content-center align-items-center flex-column"
            >
              <div
                v-for="(asset, index) in nft.properties"
                :key="index"
                class="w-100"
              >
                <div
                  v-if="asset.widget === 'select'"
                  class="circled-property-field d-flex mx-auto ps-3 ps-md-4 align-items-center justify-content-between"
                >
                  <p class="circled-property-field-label m-0">
                    {{ asset.label }}
                  </p>
                  <div
                    class="dropdown circled-property-field-value text-center p-0"
                  >
                    <input
                      id="animationType"
                      v-model="asset.value"
                      class="dropdown-toggle circled-property-field-value w-100 py-2 px-2 py-sm-3 px-md-3 border-0 bg-transparent"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      name="animation_type"
                    />
                    <ul
                      class="dropdown-menu justify-content-center align-items-center w-100 text-center border-0 p-1"
                    >
                      <li>
                        <a
                          class="dropdown-item"
                          href="#"
                          @click.prevent="asset.value = 'Fill In'"
                          >Fill In</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  v-else-if="asset.widget === 'time'"
                  class="circled-property-field d-flex mt-2 mx-auto ps-3 ps-md-4 align-items-center justify-content-between"
                >
                  <p class="circled-property-field-label m-0">
                    {{ asset.label }}
                  </p>
                  <div class="number-type position-relative">
                    <button
                      type="button"
                      class="minus w-25 h-100 position-absolute start-0 d-flex justify-content-center align-items-center"
                      :class="{ disabled : asset.value < 0.1}"
                      :disabled="asset.value < 0.1"
                      @click="
                        asset.value = (Number(asset.value) - 0.1).toFixed(1)
                      "
                    ></button>
                    <input
                      ref="input${index}"
                      v-model="asset.value"
                      class="circled-property-field-value py-2 px-2 py-sm-3 px-md-3 text-center"
                      type="number"
                      :min="0"
                      :max="3600"
                      :step="0.1"
                      @input="restrictInput"
                    />
                    <button
                      type="button"
                      class="plus w-25 h-100 position-absolute top-0 end-0 d-flex justify-content-center align-items-center"
                      :class="{ disabled : asset.value >= 3600}"
                      :disabled="asset.value >= 3600"
                      @click="
                        asset.value = (Number(asset.value) + 0.1).toFixed(1)
                      "
                    ></button>
                  </div>
                </div>
                <div
                  v-else
                  class="circled-property-field d-flex mt-2 mx-auto ps-3 ps-md-4 align-items-center justify-content-between"
                >
                  <p class="circled-property-field-label m-0">
                    {{ asset.label }}
                  </p>
                  <input
                    v-model="asset.value"
                    class="circled-property-field-value py-2 px-2 py-sm-3 px-md-3 text-center"
                    type="text"
                  />
                </div>
              </div>
            </form>
            <div
              class="circled-entity-preview col-11 col-md-8 col-lg-6 col-xxl-6 mx-auto mt-4 mt-sm-0 mb-lg-4 justify-content-center d-flex align-items-center"
            >
              <div>
                <CircledWord
                  class="disabled"
                  :nft="nft"
                  :play="play"
                  locked
                  @play-finished="onPlayFinished"
                />
                <div
                  class="actions d-flex justify-content-center circled-entity-preview-actions my-4 mb-lg-0"
                >
                  <a
                    href="#"
                    class="py-3 text-center me-3 text-decoration-none w-50 play-action"
                    :class="{ disabled: play }"
                    @click.prevent="() => (play ? undefined : (play = true))"
                    >Play</a
                  >
                  <a
                    href="#"
                    class="py-3 text-center text-decoration-none w-50 mint-action disabled"
                    >Mint</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Ref, Watch } from "vue-property-decorator";
import PageBase from "@/views/page/PageBase";
import CircledWord from "@/components/CircledWord.vue";
import CircledWordService, { NFT } from "@/utils/Service/CircledWordService";

@Options({
  name: "CreateWordPage",
  components: {
    CircledWord,
  },
})
export default class CreateWord extends PageBase {
  wordProperties: NFTMetadata = {
    name: "CircledWord #1",
    attributes: [
      { trait_type: "Animation Type", value: "Fill In" },
      { trait_type: "Text Color", value: "White" },
      { trait_type: "Border Color", value: "White" },
      { trait_type: "Background Color", value: "White" },
      { trait_type: "Animation Duration", value: "1" },
      { trait_type: "Second Text Color", value: "Black" },
      { trait_type: "Second Border Color", value: "White" },
    ],
  };
  nft: NFT | null = new CircledWordService().getNft(this.wordProperties);
  play = false;

  @Ref("generateForm") readonly generateForm!: HTMLFormElement;
  @Ref("input${index}") readonly durationInput!: HTMLInputElement[];

  @Watch("wordProperties", { deep: true })
  handler(val: NFTMetadata): void {
    this.nft = new CircledWordService().getNft(val);
  }

  onPlayFinished() {
    this.play = false;
  }

  restrictInput(): void {
    const floatLength: number | null = this.isFloat(
      this.durationInput[0].valueAsNumber
    )
      ? this.durationInput[0].value.length
      : null;
    const integerLength: number | null = !this.isFloat(
      this.durationInput[0].valueAsNumber
    )
      ? this.durationInput[0].value.length
      : null;

    if (!floatLength && (integerLength as number) > 4) {
      this.durationInput[0].value = this.durationInput[0].value.slice(0, 4);
    } else if (!integerLength && (floatLength as number) > 6) {
      this.durationInput[0].value = this.durationInput[0].value.slice(0, 6);
    } else if (
      this.durationInput[0].valueAsNumber < Number(this.durationInput[0].min)
    ) {
      this.durationInput[0].value = "1";
    } else if (
      this.durationInput[0].valueAsNumber > Number(this.durationInput[0].max)
    ) {
      this.durationInput[0].value = "3600";
    }
  }

  isFloat(value: number): boolean {
    return Number(value) === value && value % 1 !== 0;
  }
}
</script>
