<template>
  <MintLoaderModal :nft-stage="metaplexService.nftStage" />
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
                  :class="{ disabled: playRunning }"
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
                          @click.prevent="asset.value = nftType.type"
                        >
                          {{ nftType.type }}</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  v-else-if="asset.widget === 'time'"
                  class="circled-property-field d-flex mt-2 mx-auto ps-3 ps-md-4 align-items-center justify-content-between"
                  :class="{ disabled: playRunning }"
                >
                  <p class="circled-property-field-label m-0">
                    {{ asset.label }}
                  </p>
                  <div class="number-type position-relative">
                    <button
                      type="button"
                      class="minus w-25 h-100 position-absolute start-0 d-flex justify-content-center align-items-center"
                      :class="{ disabled: +asset.value === 0.1 }"
                      :disabled="((+asset.value === 0.1) | playRunning)"
                      @click="
                        () => {
                          asset.value = (+asset.value - 0.1).toFixed(1);
                          restrictInput(index, asset.value.toString());
                        }
                      "
                    ></button>
                    <button
                      type="button"
                      class="plus w-25 h-100 position-absolute top-0 end-0 d-flex justify-content-center align-items-center"
                      :class="{ disabled: asset.value >= 100 }"
                      :disabled="((+asset.value >= 100) | playRunning)"
                      @click="
                        () => {
                          asset.value = (+asset.value + 0.1).toFixed(1);
                          restrictInput(index, asset.value.toString());
                        }
                      "
                    ></button>
                    <input
                      v-model="asset.value"
                      class="circled-property-field-value py-2 px-2 py-sm-3 px-md-3 text-center"
                      :disabled="playRunning"
                      type="number"
                      :min="0.1"
                      :max="100"
                      :step="0.1"
                      @input="restrictInput(index, asset.value.toString())"
                    />
                  </div>
                </div>
                <div
                  v-else
                  class="circled-property-field d-flex mt-2 mx-auto ps-3 ps-md-4 align-items-center justify-content-between"
                  :class="{ disabled: playRunning }"
                >
                  <p class="circled-property-field-label m-0">
                    {{ asset.label }}
                  </p>
                  <input
                    v-model="asset.value"
                    class="circled-property-field-value py-2 px-2 py-sm-3 px-md-3 text-center"
                    :disabled="playRunning"
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
                  :play="playRunning"
                  locked
                  @play-finished="onPlayFinished"
                />
                <div
                  class="actions d-flex justify-content-center circled-entity-preview-actions my-4 mb-lg-0"
                >
                  <a
                    href="#"
                    class="py-3 text-center me-3 text-decoration-none w-50 play-action"
                    :class="{ disabled: playRunning }"
                    @click.prevent="
                      () => (playRunning ? undefined : (playRunning = true))
                    "
                    >Play</a
                  >
                  <a
                    href="#"
                    class="py-3 text-center text-decoration-none w-50 mint-action pe-none disabled"
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
  </div>
</template>

<script lang="ts">
import { Inject, Options, Ref, Watch } from "vue-property-decorator";
import PageBase from "@/views/page/PageBase";
import CircledWord from "@/components/CircledWord.vue";
import CircledWordService, { NFT } from "@/utils/Service/CircledWordService";
import type MetaplexService from "@/utils/Service/NFT/MetaplexService";
import MintLoaderModal from "./components/MintLoaderModal.vue";

@Options({
  name: "CreateWordPage",
  components: {
    CircledWord,
    MintLoaderModal,
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
  nftTypes: Array<typeof NFT> = new CircledWordService().getNftTypes();
  playRunning = false;
  mintRunning = false;

  @Ref("generateForm") readonly generateForm!: HTMLFormElement;

  @Watch("wordProperties", { deep: true })
  handler(val: NFTMetadata): void {
    this.nft = new CircledWordService().getNft(val);
  }

  @Inject({ from: "metaplexService" })
  metaplexService: MetaplexService | false = false;

  onPlayFinished() {
    this.playRunning = false;
  }

  async mint() {
    this.mintRunning = true;
    try {
      await (this.metaplexService as MetaplexService).createNFT(
        (this.nft as NFT).properties
      );
    } catch (e) {
      (this.metaplexService as MetaplexService).nftStage = null;
    } finally {
      this.mintRunning = false;
    }
  }

  restrictInput(property_index: number, value: string): void {
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

    (this.nft as NFT).properties[property_index].value = updated_string;
  }
}
</script>
