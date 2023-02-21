<template>
  <div class="page create-word container-fluid">
    <div class="row h-100">
      <div
        class="col-md-11 col-lg-10 col-xl-10 col-xxl-12 mx-auto d-flex align-items-center justify-content-center"
      >
        <div class="w-100">
          <h2
            class="block-title ps-2 my-4 mt-lg-0 mb-lg-5 text-center d-none d-sm-block animate__animated animate__fadeInDown"
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
                v-for="(level_properties, level) in nft.properties"
                :key="level"
                class="w-100 level-wrapper"
              >
                <div
                  v-for="(property, index) in level_properties"
                  :key="index"
                  class="animate__animated property-wrapper animate__fast"
                  :class="{
                    animate__fadeInLeft: (index + level + 1) % 2 !== 0,
                    animate__fadeInRight: (index + level + 1) % 2 === 0,
                  }"
                  :style="{
                    '-webkit-animation-delay':
                      level * ((index + level + 1) * 0.03) + 's',
                    'animation-delay':
                      level * ((index + level + 1) * 0.03) + 's',
                  }"
                >
                  <div
                    v-if="property.widget === 'select'"
                    class="circled-property-field mx-auto ps-3 align-items-center justify-content-between row"
                    :class="{ disabled: playRunning }"
                  >
                    <div
                      class="col-8 h-100 d-flex align-items-center left-side"
                    >
                      <p class="circled-property-field-label m-0">
                        {{ property.label }}
                      </p>
                    </div>
                    <div class="col-4 px-0 h-100 property-field-value-wrapper">
                      <div
                        class="dropdown circled-property-field-value text-center p-0 w-100 h-100 d-flex"
                      >
                        <input
                          id="animationType"
                          v-model="property.value"
                          class="dropdown-toggle circled-property-field-value w-100 border-0 bg-transparent p-0"
                          :disabled="playRunning"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          name="animation_type"
                        />
                        <ul
                          class="dropdown-menu justify-content-center align-items-center w-100 text-center border-0 p-1"
                        >
                          <li
                            v-for="(nftType, nftTypeIndex) in nftTypes"
                            :key="nftTypeIndex"
                          >
                            <a
                              class="dropdown-item"
                              href="#"
                              @click.prevent="property.value = nftType.type"
                            >
                              {{ nftType.type }}</a
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div
                    v-else-if="property.widget === 'time'"
                    class="circled-property-field d-flex mt-2 mx-auto ps-3 align-items-center justify-content-between row"
                    :class="{ disabled: playRunning }"
                  >
                    <div
                      class="col-8 h-100 d-flex align-items-center left-side"
                    >
                      <p class="circled-property-field-label m-0">
                        {{ property.label }}
                      </p>
                    </div>
                    <div class="col-4 px-0 h-100 property-field-value-wrapper">
                      <div class="number-type position-relative h-100 d-flex">
                        <button
                          type="button"
                          class="minus w-25 h-100 position-absolute top-0 start-0 d-flex justify-content-center align-items-center"
                          :class="{ disabled: +property.value === 0.1 }"
                          :disabled="+property.value === 0.1 || playRunning"
                          @click="
                            () => {
                              property.value = (+property.value - 0.1).toFixed(
                                1
                              );
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
                          :disabled="+property.value >= 100 || playRunning"
                          @click="
                            () => {
                              property.value = (+property.value + 0.1).toFixed(
                                1
                              );
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
                          class="circled-property-field-value text-center w-100"
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
                  </div>
                  <div
                    v-else
                    class="circled-property-field row mt-2 mx-auto ps-3 align-items-center justify-content-between"
                    :class="{ disabled: playRunning }"
                  >
                    <div class="col-8 h-100 d-flex align-items-center">
                      <p class="circled-property-field-label m-0">
                        {{ property.label }}
                      </p>
                    </div>
                    <div class="col-4 property-field-value-wrapper px-0 h-100">
                      <input
                        v-model="property.value"
                        type="text"
                        readonly
                        class="circled-property-field-value w-100 h-100 py-0 text-center color-input position-absolute opacity-0"
                        :disabled="playRunning"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div
              class="circled-entity-preview col-11 col-md-8 col-lg-6 col-xxl-6 mx-auto mt-4 mt-sm-0 mb-lg-4 justify-content-center d-flex align-items-center"
            >
              <div>
                <div class="animate__animated animate__zoomIn">
                  <CircledWord
                    class="disabled"
                    :nft="nft"
                    :play="playRunning"
                    locked
                    @play-finished="onPlayFinished"
                  />
                </div>
                <div
                  class="actions d-flex justify-content-center circled-entity-preview-actions my-4 mb-lg-0"
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
                    class="py-3 text-center text-decoration-none w-50 mint-action animate__animated animate__fadeInUp disabled pe-none"
                    :class="{ disabled: mintRunning || !metaplexService }"
                    @click.prevent="() => (mintRunning ? undefined : mint())"
                    >Mint</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MintLoaderModal :nft-stage="metaplexService.nftStage" />
  </div>
</template>

<script lang="ts">
import "@melloware/coloris/dist/coloris.css";

export default {
  name: "CreateWordPage",
};
</script>

<script lang="ts" setup>
import CircledWord from "@/components/CircledWord.vue";
import CircledWordService, { NFT } from "@/utils/Service/CircledWordService";
import type MetaplexService from "@/utils/Service/NFT/MetaplexService";
import MintLoaderModal from "./components/MintLoaderModal.vue";
import { inject, onMounted, ref, watch } from "vue";
import Coloris from "@melloware/coloris";

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
const nftTypes: Array<typeof NFT> = new CircledWordService().getNftTypes();

const playRunning = ref(false);
const mintRunning = ref(false);

const generateForm: Ref<HTMLFormElement | null> = ref(null);

const metaplexService = inject<Ref<MetaplexService | false>>("metaplexService");

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
  });
});

watch(
  wordProperties,
  (newValue: unknown) => {
    nft.value = new CircledWordService().getNft(newValue as NFTMetadata);
  },
  { deep: true }
);
</script>
