<template>
  <div class="circled-tabs">
    <div class="tabs-wrapper h-100 d-flex flex-column">
      <div class="tab-header d-flex">
        <a
          href="#"
          class="tab-link w-50 text-center py-3"
          :class="{ active: activeTab === 'properties' }"
          @click.prevent="activeTab = 'properties'"
          >Properties</a
        >
        <a
          href="#"
          class="tab-link w-50 text-center py-3"
          :class="{ active: activeTab === 'story' }"
          @click.prevent="activeTab = 'story'"
          >Story</a
        >
      </div>
      <div class="tab-content overflow-scroll">
        <div
          class="properties h-100 pt-3 pb-2"
          :class="{ 'd-none': activeTab === 'story' }"
        >
          <swiper
            :pagination="true"
            :modules="modules"
            :wrapper-class="'flex-md-column'"
          >
            <swiper-slide
              v-for="(level_properties, level) in props.nft.properties"
              :key="level"
            >
              <div class="row w-100 m-0 px-2">
                <h3 class="text-center level">Level {{ level + 1 }}</h3>
                <div
                  v-for="(property, index) in level_properties"
                  :key="index"
                  class="col-6 col-md-3 property mb-3 text-center d-flex flex-column justify-content-between"
                >
                  <h5 class="property-label m-0 mb-2">
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
                      v-model="property.value"
                      type="text"
                      readonly
                      class="circled-property-field-value w-100 h-100 py-2 text-center color-input position-relative"
                      :disabled="props.playRunning"
                      :style="{
                        border: 'solid 1px' + property.value,
                        color: invert(property.value, true),
                      }"
                    />
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <div
          class="story pt-3 pb-2"
          :class="{ 'd-none': activeTab === 'properties' }"
        ></div>
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
import { onMounted, ref } from "vue";
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

const activeTab = ref("properties");

const modules = ref([Pagination]);

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

onMounted(() => {
  Coloris.init();
  Coloris({
    el: ".color-input",
    themeMode: "dark",
    alpha: false,
    focusInput: false,
  });
  colorPickerInSliderFix();
});
</script>
