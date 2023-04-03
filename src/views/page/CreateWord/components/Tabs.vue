<template>
  <div class="circled-tabs">
    <div class="tabs-wrapper h-100 d-flex flex-column">
      <div class="tab-header d-flex">
        <a
          href="#"
          class="tab-link w-50 text-center py-3 properties-tab"
          :class="{ active: activeTab === 'properties' }"
          @click.prevent="activeTab = 'properties'"
          >Properties</a
        >
        <a
          href="#"
          class="tab-link w-50 text-center py-3 story-tab"
          :class="{ active: activeTab === 'story' }"
          @click.prevent="activeTab = 'story'"
          >Story</a
        >
      </div>
      <div
        ref="tabContent"
        class="tab-content w-100 d-flex overflow-hidden position-relative"
      >
        <div
          class="properties h-100 pt-3 pb-2"
          :class="{
            'invisible order-2': activeTab === 'story',
            'order-1': activeTab === 'properties',
          }"
        >
          <swiper
            :key="swiperComponentKey"
            :pagination="true"
            :modules="modules"
            :wrapper-class="'flex-md-column'"
            :style="{ width: tabWidth }"
            :allow-touch-move="sliderEnabled"
          >
            <swiper-slide
              v-for="(level_properties, level) in props.nft.properties"
              :key="level"
            >
              <div
                class="row m-0 px-2 mb-md-3 px-md-3 px-xl-4"
                :class="{ 'pt-lg-2 pt-xl-3': level === 0 }"
              >
                <h3
                  class="text-center text-md-start level mb-md-2 animate__animated animate__fadeIn"
                >
                  Level {{ level + 1 }}
                </h3>
                <div
                  v-for="(property, index) in level_properties"
                  :key="index"
                  class="col-6 col-md-3 col-lg-4 col-xl-3 property mb-3 text-center d-flex flex-column justify-content-between animate__animated animate__fadeInRight"
                  :style="animationStyle(index, level)"
                >
                  <h5 class="property-label text-center text-md-start m-0 mb-2">
                    {{ property.label }}
                  </h5>
                  <div
                    v-if="property.widget === 'select'"
                    class="px-0 property-field-value-wrapper select"
                  >
                    <div
                      class="dropdown py-2 circled-property-field-value text-center p-0 w-100 d-flex"
                    >
                      <input
                        id="animationType"
                        :ref="setFieldRef"
                        v-model="property.value"
                        class="circled-property-field-value w-100 border-0 bg-transparent p-0"
                        :disabled="props.playRunning"
                        type="button"
                        aria-expanded="false"
                        name="animation_type"
                      />
                    </div>
                  </div>
                  <div
                    v-else-if="property.widget === 'time'"
                    class="property-field-value-wrapper time"
                  >
                    <div class="py-2 number-type position-relative d-flex">
                      <button
                        type="button"
                        class="minus w-25 h-100 position-absolute top-0 start-0 d-flex justify-content-center align-items-center"
                        :class="{ disabled: +property.value === 0.1 }"
                        :disabled="+property.value === 0.1 || props.playRunning"
                        @click="
                          () => {
                            property.value = (+property.value - 0.1).toFixed(1);
                            restrictInput(
                              level,
                              index,
                              property.value.toString()
                            );
                          }
                        "
                      ></button>
                      <button
                        type="button"
                        class="plus w-25 h-100 position-absolute top-0 end-0 d-flex justify-content-center align-items-center"
                        :class="{ disabled: property.value >= 100 }"
                        :disabled="+property.value >= 100 || props.playRunning"
                        @click="
                          () => {
                            property.value = (+property.value + 0.1).toFixed(1);
                            restrictInput(
                              level,
                              index,
                              property.value.toString()
                            );
                          }
                        "
                      ></button>
                      <input
                        :ref="setFieldRef"
                        v-model="property.value"
                        class="circled-property-field-value text-center w-100 p-0"
                        :disabled="props.playRunning"
                        type="number"
                        :min="0.1"
                        :max="100"
                        :step="0.1"
                        @input="
                          restrictInput(level, index, property.value.toString())
                        "
                      />
                    </div>
                  </div>
                  <div v-else class="property-field-value-wrapper color">
                    <input
                      :ref="setFieldRef"
                      v-model="property.value"
                      type="text"
                      readonly
                      class="circled-property-field-value w-100 h-100 py-2 text-center color-input position-relative"
                      :disabled="props.playRunning"
                      :style="{
                        border: 'solid 1px' + property.value,
                        color: invert(property.value, true),
                        background: property.value,
                      }"
                    />
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <div
          class="story py-3 pb-md-4 py-xl-4 pt-xl-3"
          :class="{
            'invisible order-2': activeTab === 'properties',
            'order-1': activeTab === 'story',
          }"
        >
          <div
            class="row m-0 px-2 overflow-scroll flex-column h-100"
            :style="{ width: tabWidth }"
          >
            <div class="col-12 story-property-wrapper">
              <label class="d-flex flex-column story-property">
                <span>Title<span style="color: #ffb229">*</span></span>
                <!-- @todo Replace props by emit. -->
                <!--  eslint-disable-next-line vue/no-mutating-props  -->
                <input :ref="setFieldRef" v-model="props.nft.name" type="text" class="mt-2 p-2 field_title" required />
              </label>
            </div>
            <div class="col-12 mt-3 story-property-wrapper" style="flex: 1">
              <label class="d-flex flex-column story-property h-100">
                Story
                <!-- @todo Replace props by emit. -->
                <!--  eslint-disable-next-line vue/no-mutating-props  -->
                <textarea :ref="setFieldRef" v-model="props.nft.description"
                          class="mt-2 p-2 h-100 field_description"></textarea>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "CreateWordTabs",
};
</script>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import Coloris from "@melloware/coloris";
import { NFT } from "@/utils/Service/CircledWordService";
import "@melloware/coloris/dist/coloris.css";
import "swiper/css";
import "swiper/css/pagination";
import invert from "invert-color";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper";

interface Props {
  playRunning: boolean;
  nft: NFT;
}

const props = defineProps<Props>();

const emit = defineEmits(['validationStatus']);

const tabContent = ref();

const swiperComponentKey = ref(0);

const tabWidth = ref("auto");
const sliderEnabled = ref(true);

const activeTab = ref("properties");

const modules = ref([Pagination]);

const fields: Ref<Array<HTMLInputElement | HTMLTextAreaElement>> = ref([]);

const setFieldRef = (el: HTMLInputElement | HTMLTextAreaElement) => {
  if (el) {
    fields.value.push(el);
  }
};

const restrictInput = (
  property_level: number,
  property_index: number,
  value: string
) => {
  let updated_string = value;

  if (value.includes(".") && value.split(".")[1].length > 1) {
    updated_string = value.slice(0, value.indexOf("."));
  }

  if (+updated_string > 100) {
    updated_string = "100";
  }

  if (+updated_string <= 0) {
    updated_string = "0.1";
  }

  (props.nft as NFT).properties[property_level][property_index].value =
    updated_string;
};

const colorPickerInSliderFix = () => {
  const slider = document.getElementsByClassName(
    "swiper-wrapper"
  )[0] as HTMLDivElement;
  const color_picker = document.getElementById("clr-picker") as HTMLDivElement;
  slider.onclick = () => {
    if (color_picker.classList.contains("clr-open")) {
      color_picker.classList.remove("clr-open");
    }
  };
};

const setTabWidth = () => {
  tabWidth.value = tabContent.value.clientWidth + "px";
};

const setSliderScrollable = () => {
  if (window.innerWidth > 767 && sliderEnabled.value === true) {
    sliderEnabled.value = false;
    swiperComponentKey.value += 1;
  } else if (window.innerWidth < 768 && sliderEnabled.value === false) {
    sliderEnabled.value = true;
    swiperComponentKey.value += 1;
  }
};

const animationDelay = 0.03;
const animationStyle = (index: number, level: number) => {
  return {
    "-webkit-animation-delay":
      level * (index + level + 1) * animationDelay + "s",
    "animation-delay": level * (index + level + 1) * animationDelay + "s",
  };
};

const validateForm = () => {
  let vStatus = true;
  for (const field of fields.value) {
    if (field.required && field.value.trim() === "") {
      vStatus = false;
    }
  }

  emit("validationStatus", vStatus);
}

onMounted(() => {
  // Color picker.
  Coloris.init();
  Coloris({
    el: ".color-input",
    themeMode: "dark",
    alpha: false,
    focusInput: false,
    wrap: false,
  });
  colorPickerInSliderFix();

  for (const field of fields.value) {
    field.onchange = validateForm;
  }
  validateForm();

  setTabWidth();
  window.addEventListener("resize", setTabWidth);

  setSliderScrollable();
  window.addEventListener("resize", setSliderScrollable);
});

onUnmounted(() => {
  window.removeEventListener("resize", setTabWidth);
  window.removeEventListener("resize", setSliderScrollable);
});
</script>
