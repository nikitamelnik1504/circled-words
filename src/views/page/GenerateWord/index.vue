<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="col-12 d-flex align-items-center justify-content-center"
        :style="{ 'min-height': freeHeight + 'px' }"
      >
        <div>
          <div class="timer text-center">
            <h1 ref="startTime" class="timer-value">{{ startTime }}</h1>
          </div>
          <div class="d-flex justify-content-between">
            <form ref="generateForm" action="" class="me-5">
              <div class="d-flex align-items-center justify-content-between">
                <p class="m-0 me-4">Animation Type:</p>
                <select
                  id="animationType"
                  v-model="wordProperties.traits[0].value"
                  name="animation_type"
                >
                  <option value="Fill In">Fill In</option>
                </select>
              </div>
              <div class="d-flex mt-2 justify-content-between">
                <p class="m-0 me-4">Text Color:</p>
                <input v-model="wordProperties.traits[1].value" type="text" />
              </div>
              <div class="d-flex mt-2 justify-content-between">
                <p class="m-0 me-4">Border Color:</p>
                <input v-model="wordProperties.traits[2].value" type="text" />
              </div>
              <div class="d-flex mt-2 justify-content-between">
                <p class="m-0 me-4">Background Color:</p>
                <input v-model="wordProperties.traits[3].value" type="text" />
              </div>
              <div class="d-flex mt-2 justify-content-between">
                <p class="m-0 me-4">Animation Duration:</p>
                <input v-model="wordProperties.traits[4].value" type="number" />
              </div>
              <div class="d-flex mt-2 justify-content-between">
                <p class="m-0 me-4">Second Text Color:</p>
                <input v-model="wordProperties.traits[5].value" type="text" />
              </div>
              <div class="d-flex mt-2 justify-content-between">
                <p class="m-0 me-4">Second Border Color:</p>
                <input v-model="wordProperties.traits[6].value" type="text" />
              </div>
              <div class="d-flex mt-2 justify-content-center">
                <input
                  type="button"
                  value="Start animation"
                  @click="startAnimation()"
                />
              </div>
            </form>
            <div class="d-flex align-items-center">
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
import { defineComponent } from "vue";
import { getFreeHeight } from "@/utils/layout-space.js";
import CircledWord from "@/components/CircledWord.vue";
import getWord from "@/components/CircledWord.js";

export default defineComponent({
  name: "GenerateWordPage",
  components: { CircledWord },
  data() {
    return {
      freeHeight: Number,
      wordProperties: {
        name: "CircledWord #1",
        traits: [
          { trait_type: "Animation Type", value: "Fill In" },
          { trait_type: "Text Color", value: "White" },
          { trait_type: "Border Color", value: "White" },
          { trait_type: "Background Color", value: "White" },
          { trait_type: "Animation Duration", value: 1 },
          { trait_type: "Second Text Color", value: "Black" },
          { trait_type: "Second Border Color", value: "White" },
        ],
      },
      startTime: 3,
      wordData: Object,
      runAnimation: false,
    };
  },
  watch: {
    wordProperties: {
      handler(val) {
        this.wordData = getWord(val);
      },
      deep: true,
    },
  },
  mounted() {
    this.wordData = getWord(this.wordProperties);
    this.onResize();
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  methods: {
    onResize() {
      this.freeHeight = getFreeHeight(true);
    },
    finishAnimation() {
      this.$refs.generateForm.style.display = "block";
      this.runAnimation = false;
      this.$refs.startTime.style.display = "block";
      this.startTime = 3;
    },
    startAnimation() {
      this.$refs.generateForm.style.display = "none";
      if (this.startTime <= 0) {
        this.$refs.startTime.style.display = "none";
      }
      if (this.startTime > -1) {
        setTimeout(() => {
          this.startTime -= 1;
          this.startAnimation();
        }, 1000);
      } else {
        this.runAnimation = true;
      }
    },
  },
});
</script>
