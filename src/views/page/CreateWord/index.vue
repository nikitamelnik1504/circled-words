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
            class="circled-tabs col-sm-10 col-md-7 mx-auto d-flex flex-column"
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
                  class="properties"
                  :class="{ 'd-none': activeTab === 'story' }"
                >
                  <swiper
                    class="d-md-none"
                    :pagination="true"
                    :modules="modules"
                  >
                    <swiper-slide
                      v-for="(level_properties, level) in nft.properties"
                      :key="level"
                    >
                      <div class="row">
                        <h3 class="text-center">Level {{ level + 1 }}</h3>
                        <div
                          v-for="(property, index) in level_properties"
                          :key="index"
                          class="col-6"
                        >
                          <div v-if="property.widget === 'select'"></div>
                          <div v-else-if="property.widget === 'time'"></div>
                          <div v-else>
                            <div class="d-flex align-items-center">
                              <p class="circled-property-field-label m-0">
                                {{ property.label }}
                              </p>
                            </div>
                            <div
                              class="property-field-value-wrapper px-0 h-100"
                            >
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
                    </swiper-slide>
                  </swiper>
                </div>
                <div
                  class="story"
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
  </PageBase>
</template>

<script lang="ts">
export default {
  name: "CreateWordPage",
};
</script>

<script lang="ts" setup>
import CircledWord from "@/components/CircledWord.vue";
import PageBase from "@/views/page/PageBase/index.vue";
import CircledWordService from "@/utils/Service/CircledWordService";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref } from "vue";
import "swiper/css";
import "swiper/css/pagination";

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

const activeTab = ref("properties");

const modules = ref([Pagination]);

const onPlayFinished = () => {
  playRunning.value = false;
};
</script>
