<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="col-10 mx-auto d-flex align-items-center justify-content-center"
        :style="{ 'min-height': freeHeight + 'px' }"
      >
        <div class="w-100">
          <div class="timer text-center">
            <h1 ref="startTimeElement" class="timer-value">{{ startTime }}</h1>
          </div>
          <div
            class="create-circled d-flex justify-content-center flex-column-reverse flex-sm-row"
          >
            <form ref="generateForm" action="" class="me-sm-4 me-md-5">
              <div
                class="button-field d-flex py-1 ps-3 pe-2 align-items-center justify-content-between"
              >
                <p class="field-name m-0 me-sm-5">Animation Type</p>
                <select
                  id="animationType"
                  v-model="wordProperties.traits[0].value"
                  class="field-type select-type ms-2 ms-lg-5 text-center"
                  name="animation_type"
                >
                  <option value="Fill In">Fill In</option>
                </select>
              </div>
              <div
                class="button-field d-flex mt-2 py-1 ps-3 pe-2 align-items-center justify-content-between"
              >
                <p class="field-name m-0 me-sm-5">Text Color</p>
                <input
                  v-model="wordProperties.traits[1].value"
                  class="field-type ms-2 ms-lg-5 text-center"
                  type="text"
                />
              </div>
              <div
                class="button-field d-flex mt-2 py-1 ps-3 pe-2 align-items-center justify-content-between"
              >
                <p class="field-name m-0 me-sm-5">Border Color</p>
                <input
                  v-model="wordProperties.traits[2].value"
                  class="field-type ms-2 ms-lg-5 text-center"
                  type="text"
                />
              </div>
              <div
                class="button-field d-flex mt-2 py-1 ps-3 pe-2 align-items-center justify-content-between"
              >
                <p class="field-name m-0 me-sm-5">Background Color</p>
                <input
                  v-model="wordProperties.traits[3].value"
                  class="field-type ms-2 ms-lg-5 text-center"
                  type="text"
                />
              </div>
              <div
                class="button-field d-flex mt-2 py-1 ps-3 pe-2 align-items-center justify-content-between"
              >
                <p class="field-name m-0 me-sm-5">Animation Duration</p>
                <div class="number-input ms-2 ms-lg-5 position-relative">
                  <button
                    type="button"
                    class="minus w-25 h-100 position-absolute start-0"
                    @click="numberDecrement"
                  ></button>
                  <input
                    ref="durationInput"
                    v-model="wordProperties.traits[4].value"
                    class="field-type text-center"
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
                class="button-field d-flex mt-2 py-1 ps-3 pe-2 align-items-center justify-content-between"
              >
                <p class="field-name m-0 me-sm-5">Second Text Color</p>
                <input
                  v-model="wordProperties.traits[5].value"
                  class="field-type ms-2 ms-lg-5 text-center"
                  type="text"
                />
              </div>
              <div
                class="button-field d-flex mt-2 py-1 ps-3 pe-2 align-items-center justify-content-between"
              >
                <p class="field-name m-0 me-sm-5">Second Border Color</p>
                <input
                  v-model="wordProperties.traits[6].value"
                  class="field-type ms-2 ms-lg-5 text-center"
                  type="text"
                />
              </div>
              <div class="d-flex my-3 justify-content-center">
                <input
                  type="button"
                  value="Start animation"
                  @click="startAnimation()"
                />
              </div>
            </form>
            <div class="d-flex mb-5 justify-content-center align-items-center">
              <CircledWord
                :class="{
                  disabled: startTime <= 2,
                  'new-circled': startTime <= 2,
                }"
                :word-data="wordData"
                :create-word-animation="runAnimation"
                @animation-completed="finishAnimation"
              />
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
  startTime = 3;
  wordData: CircledWordElement = new CircledWordNFT(
    this.wordProperties
  ).getElement();
  runAnimation = false;

  @Ref("generateForm") readonly generateForm!: HTMLFormElement;
  @Ref("startTimeElement") readonly startTimeElement!: HTMLHeadingElement;
  @Ref("durationInput") readonly durationInput!: HTMLInputElement;

  @Watch("wordProperties", { deep: true })
  handler(val: NFTMetadata): void {
    this.wordData = new CircledWordNFT(val).getElement();
  }

  numberIncrement(): void {
    this.durationInput.stepUp();
  }

  numberDecrement(): void {
    this.durationInput.stepDown();
  }

  restrictInput(): void {
    console.log(this.durationInput.value.length);

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

  finishAnimation(): void {
    this.generateForm.style.display = "block";
    this.runAnimation = false;
    this.startTimeElement.style.display = "block";
    this.startTime = 3;
  }

  startAnimation(): void {
    this.generateForm.style.display = "none";
    if (this.startTime <= 0) {
      this.startTimeElement.style.display = "none";
    }
    if (this.startTime > -1) {
      setTimeout((): void => {
        this.startTime -= 1;
        this.startAnimation();
      }, 1000);
    } else {
      this.runAnimation = true;
    }
  }
}
</script>
