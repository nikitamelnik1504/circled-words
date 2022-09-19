<template>
  <div class="container-fluid create-word">
    <div class="row">
      <div
        class="col-md-11 col-lg-10 col-xl-10 col-xxl-12 mx-auto d-flex align-items-center justify-content-center"
        :style="{ 'min-height': minHeightValue + 'px' }"
      >
        <div class="w-100">
          <h2 class="block-title ps-2 mb-5 text-center">
            <span class="primary-text">Circled</span>
            <span class="secondary-text">Word</span>
          </h2>
          <div
            class="create-word-wrapper mx-auto d-flex justify-content-center flex-column-reverse flex-lg-row row"
          >
            <form
              ref="generateForm"
              action=""
              class="circled-properties-form col-11 col-sm-8 col-lg-6 col-xl-6 mx-auto d-flex justify-content-center align-items-center flex-column"
            >
              <div
                class="circled-property-field d-flex ps-3 ps-md-4 align-items-center justify-content-between w-100"
              >
                <p class="circled-property-field-label m-0 me-md-3">
                  Animation Type
                </p>
                <select
                  id="animationType"
                  v-model="wordProperties.traits[0].value"
                  class="circled-property-field-value select-type py-2 px-2 py-sm-3 px-md-3 text-center"
                  name="animation_type"
                >
                  <option value="Fill In">Fill In</option>
                </select>
              </div>
              <div
                class="circled-property-field d-flex mt-2 ps-3 ps-md-4 align-items-center justify-content-between w-100"
              >
                <p class="circled-property-field-label m-0 me-md-3">
                  Text Color
                </p>
                <input
                  v-model="wordProperties.traits[1].value"
                  class="circled-property-field-value py-2 px-2 py-sm-3 px-md-3 text-center"
                  type="text"
                />
              </div>
              <div
                class="circled-property-field d-flex mt-2 ps-3 ps-md-4 align-items-center justify-content-between w-100"
              >
                <p class="circled-property-field-label m-0 me-md-3">
                  Border Color
                </p>
                <input
                  v-model="wordProperties.traits[2].value"
                  class="circled-property-field-value py-2 px-2 py-sm-3 px-md-3 text-center"
                  type="text"
                />
              </div>
              <div
                class="circled-property-field d-flex mt-2 ps-3 ps-md-4 align-items-center justify-content-between w-100"
              >
                <p class="circled-property-field-label m-0 me-md-3">
                  Background Color
                </p>
                <input
                  v-model="wordProperties.traits[3].value"
                  class="circled-property-field-value py-2 px-2 py-sm-3 px-md-3 text-center"
                  type="text"
                />
              </div>
              <div
                class="circled-property-field d-flex mt-2 ps-3 ps-md-4 align-items-center justify-content-between w-100"
              >
                <p class="circled-property-field-label m-0 me-md-3">
                  Animation Duration
                </p>
                <div class="number-type ms-2 ms-lg-5 position-relative">
                  <button
                    type="button"
                    class="minus w-25 h-100 position-absolute start-0"
                    @click="numberDecrement"
                  ></button>
                  <input
                    ref="durationInput"
                    v-model="wordProperties.traits[4].value"
                    class="circled-property-field-value py-2 px-2 py-sm-3 px-md-3 text-center"
                    type="number"
                    min="0"
                    max="3600"
                    step="0.1"
                    @input="restrictInput"
                  />
                  <button
                    type="button"
                    class="plus w-25 h-100 position-absolute end-0"
                    @click="numberIncrement"
                  ></button>
                </div>
              </div>
              <div
                class="circled-property-field d-flex mt-2 ps-3 ps-md-4 align-items-center justify-content-between w-100"
              >
                <p class="circled-property-field-label m-0 me-md-3">
                  Second Text Color
                </p>
                <input
                  v-model="wordProperties.traits[5].value"
                  class="circled-property-field-value py-2 px-2 py-sm-3 px-md-3 text-center"
                  type="text"
                />
              </div>
              <div
                class="circled-property-field d-flex mt-2 ps-3 ps-md-4 align-items-center justify-content-between w-100"
              >
                <p class="circled-property-field-label m-0 me-md-3">
                  Second Border Color
                </p>
                <input
                  v-model="wordProperties.traits[6].value"
                  class="circled-property-field-value py-2 px-2 py-sm-3 px-md-3 text-center"
                  type="text"
                />
              </div>
            </form>
            <div
              class="circled-entity-preview col-11 col-md-8 col-lg-6 col-xxl-6 mx-auto justify-content-center d-flex align-items-center"
            >
              <div>
                <CircledWord
                  class="disabled"
                  :word-data="wordData"
                  :play="play"
                  @play-finished="onPlayFinished"
                />
                <div
                  class="actions mt-4 d-flex justify-content-center circled-entity-preview-actions mb-4 mb-lg-0"
                >
                  <a
                    href="#"
                    class="py-3 text-center me-3 text-decoration-none w-50 play-action"
                    :class="{ disabled: play }"
                    @click="
                      (event) => (play ? event.preventDefault() : (play = true))
                    "
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
import CircledWordNFT from "@/utils/circled-word-nft";

@Options({
  name: "CreateWordPage",
  components: {
    CircledWord,
  },
})
export default class CreateWord extends PageBase {
  wordProperties: NFTMetadata = {
    name: "CircledWord #1",
    traits: [
      { trait_type: "Animation Type", value: "Fill In" },
      { trait_type: "Text Color", value: "White" },
      { trait_type: "Border Color", value: "White" },
      { trait_type: "Background Color", value: "White" },
      { trait_type: "Animation Duration", value: "1" },
      { trait_type: "Second Text Color", value: "Black" },
      { trait_type: "Second Border Color", value: "White" },
    ],
  };
  wordData: CircledWordElement = new CircledWordNFT(
    this.wordProperties
  ).getElement();
  play = false;

  @Ref("generateForm") readonly generateForm!: HTMLFormElement;
  @Ref("durationInput") readonly durationInput!: HTMLInputElement;

  @Watch("wordProperties", { deep: true })
  handler(val: NFTMetadata): void {
    this.wordData = new CircledWordNFT(val).getElement();
  }

  onPlayFinished() {
    this.play = false;
  }

  numberIncrement(): void {
    this.durationInput.stepUp();
  }

  numberDecrement(): void {
    this.durationInput.stepDown();
  }

  restrictInput(): void {
    const floatLength: number | null = this.isFloat(
      Number(this.durationInput.value)
    )
      ? this.durationInput.value.length
      : null;
    const integerLength: number | null = !this.isFloat(
      Number(this.durationInput.value)
    )
      ? this.durationInput.value.length
      : null;

    if (!floatLength && (integerLength as number) > 4) {
      this.durationInput.value = this.durationInput.value.slice(0, 4);
    } else if (!integerLength && (floatLength as number) > 5) {
      this.durationInput.value = this.durationInput.value.slice(0, 5);
    } else if (
      Number(this.durationInput.value) < Number(this.durationInput.min)
    ) {
      this.durationInput.value = "1";
    } else if (
      Number(this.durationInput.value) > Number(this.durationInput.max)
    ) {
      this.durationInput.value = "3600";
    }
  }

  isFloat(value: number): boolean {
    return Number(value) === value && value % 1 !== 0;
  }
}
</script>
