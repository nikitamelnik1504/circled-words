<template>
  <PageBase
    title="Create Word"
    description="This is a Heart of our project... What’s your next story? >:"
    full-height
    class="create-word-page"
  >
    <div class="col-12">
      <div class="wrapper p-md-4 h-100 w-100 d-flex justify-content-center">
        <div class="row w-100 flex-column flex-md-row">
          <div
            class="circled-preview col-sm-10 col-md-5 my-md-auto mx-auto text-center"
          >
            <CircledWord
              class="disabled mt-3 mb-3"
              :nft="nft"
              :play="playRunning"
              locked
              @play-finished="onPlayFinished"
            />
            <div
              class="actions d-flex justify-content-center circled-entity-preview-actions my-4 mb-lg-0 d-none d-md-block"
            >
              <a
                href="#"
                class="py-3 text-center me-3 text-decoration-none w-50 play-action animate__animated animate__fadeInUp"
                :class="{ disabled: playRunning }"
                @click.prevent="
                  () => (playRunning ? undefined : (playRunning = true))
                "
                >Play</a
              >
              <a
                href="#"
                class="py-3 text-center text-decoration-none w-50 mint-action animate__animated animate__fadeInUp"
                :class="{
                  disabled:
                    mintRunning ||
                    !metaplexService ||
                    metaplexService.rpc === 'mainnet-beta',
                }"
                @click.prevent="
                  () =>
                    mintRunning || metaplexService.rpc === 'mainnet-beta'
                      ? undefined
                      : mint()
                "
                >Mint</a
              >
            </div>
          </div>
          <div
            class="circled-tabs col-sm-10 col-md-6 mx-auto d-flex flex-column"
          >
            <div class="tabs-wrapper">
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
              <div class="tab-content h-100">
                <div
                  class="properties pt-3 pb-2"
                  :class="{ 'd-none': activeTab === 'story' }"
                >
                  <swiper
                    :pagination="true"
                    :modules="modules"
                    :wrapper-class="'flex-md-column'"
                  >
                    <swiper-slide
                      v-for="(level_properties, level) in nft.properties"
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
                                :disabled="playRunning"
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
                            <div
                              class="py-2 number-type position-relative d-flex"
                            >
                              <button
                                type="button"
                                class="minus w-25 h-100 position-absolute top-0 start-0 d-flex justify-content-center align-items-center"
                                :class="{ disabled: +property.value === 0.1 }"
                                :disabled="
                                  +property.value === 0.1 || playRunning
                                "
                                @click="
                                  () => {
                                    property.value = (
                                      +property.value - 0.1
                                    ).toFixed(1);
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
                                :disabled="
                                  +property.value >= 100 || playRunning
                                "
                                @click="
                                  () => {
                                    property.value = (
                                      +property.value + 0.1
                                    ).toFixed(1);
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
                                :disabled="playRunning"
                                type="number"
                                :min="0.1"
                                :max="100"
                                :step="0.1"
                                @input="
                                  restrictInput(
                                    level,
                                    index,
                                    property.value.toString()
                                  )
                                "
                              />
                            </div>
                          </div>
                          <div
                            v-else
                            class="property-field-value-wrapper color"
                          >
                            <input
                              v-model="property.value"
                              type="text"
                              readonly
                              class="circled-property-field-value w-100 h-100 py-2 text-center color-input position-relative"
                              :disabled="playRunning"
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
          <div
            class="circled-actions col-sm-10 mx-auto d-flex flex-column d-md-none"
          ></div>
        </div>
      </div>
    </div>
    <MintLoaderModal
      v-if="metaplexService"
      :nft-stage="metaplexService.nftStage"
    />
  </PageBase>
</template>

<script lang="ts">
export default {
  name: "CreateWordPage",
};
</script>

<script lang="ts" setup>
import "@melloware/coloris/dist/coloris.css";
import CircledWord from "@/components/CircledWord.vue";
import PageBase from "@/views/page/PageBase/index.vue";
import CircledWordService, { NFT } from "@/utils/Service/CircledWordService";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { inject, onMounted, ref } from "vue";
import "swiper/css";
import "swiper/css/pagination";
import Coloris from "@melloware/coloris";
import MintLoaderModal from "./components/MintLoaderModal.vue";
import MetaplexService from "@/utils/Service/NFT/MetaplexService";
import invert from "invert-color";

const wordProperties: Ref<NFTMetadata> = ref({
  name: "CircledWord #1",
  attributes: [
    { trait_type: "Animation Type", value: "Fill In" },
    { trait_type: "Text Color", value: "#ffffff" },
    { trait_type: "Border Color", value: "#ffffff" },
    { trait_type: "Background Color", value: "#ffffff" },
    { trait_type: "Animation Duration", value: "1" },
    { trait_type: "Second Text Color", value: "#000000" },
    { trait_type: "Second Border Color", value: "#000000" },
  ],
});

const nft = ref(new CircledWordService().getNft(wordProperties.value));

const playRunning = ref(false);
const mintRunning = ref(false);

const metaplexService = inject<Ref<MetaplexService | false>>("metaplexService");

const activeTab = ref("properties");

const modules = ref([Pagination]);

const onPlayFinished = () => {
  playRunning.value = false;
};

const mint = async () => {
  mintRunning.value = true;
  try {
    await (metaplexService?.value as MetaplexService).createNFT(
      (nft.value as NFT).properties
    );
  } catch (e) {
    (metaplexService?.value as MetaplexService).nftStage = null;
  } finally {
    mintRunning.value = false;
  }
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

  (nft.value as NFT).properties[property_level][property_index].value =
    updated_string;
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
