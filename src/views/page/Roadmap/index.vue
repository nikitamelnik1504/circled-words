<template>
  <PageBase
    title="Roadmap"
    description="Welcome to the Roadmap page, here you can check what we gonna do in the future."
    class="roadmap-page"
    full-height
  >
    <div class="col-12">
      <div
        class="wrapper pt-md-2 px-md-1 h-100 w-100 d-flex justify-content-center"
      >
        <div class="row w-100 m-0 px-md-2 pt-md-3">
          <div
            v-for="(value, index) in data"
            :key="index"
            class="roadmap-item col-12 col-lg-6 mb-4 mx-auto"
          >
            <div class="roadmap-item-wrapper text-center h-100">
              <div
                class="py-5 px-4 h-100 d-flex flex-column justify-content-between animate__animated animate__fadeIn"
              >
                <div class="content-wrapper">
                  <h4 class="mb-0">{{ value.quarter }}</h4>
                  <span v-if="value.active" class="indicator d-block"
                    >Current</span
                  >
                  <h6 class="version mt-1">{{ value.version }}</h6>
                  <ul class="changes p-0">
                    <li
                      v-for="(change, key) in value.changes"
                      :key="key"
                      :class="{ 'pt-1': key !== 0 }"
                    >
                      {{ change }}
                    </li>
                  </ul>
                </div>
                <div v-if="value.image" class="image-wrapper p-1">
                  <img
                    v-if="value.image"
                    ref="images"
                    :src="value.image.src"
                    :alt="value.image.alt"
                    class="w-100 h-100 animate__animated animate__zoomIn"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageBase>
</template>

<script lang="ts">
export default {
  name: "RoadmapPage",
};
</script>

<script lang="ts" setup>
import PageBase from "@/views/page/PageBase/index.vue";
import roadmapCreateWordImageV1 from "@/assets/images/roadmap-create-word-V1.png";
import roadmapCreateWordImageV2 from "@/assets/images/roadmap-create-word-V2.png";
import { onMounted, onUnmounted, ref } from "vue";

const images = ref<Array<HTMLImageElement>>([]);

const data = [
  {
    quarter: "Q1 2023",
    active: false,
    version: "2.1.0",
    changes: [
      "Minted CW token.",
      "Launched CW token Airdrop.",
      "Improved Discord community server.",
      "Redesigned “Homepage”.",
      "Added new animations across the site.",
    ],
    image: {
      width: 3360,
      height: 1878,
      src: roadmapCreateWordImageV1,
      alt: "roadmap-create-word-v1",
    },
  },
  {
    quarter: "Q2 2023",
    active: true,
    version: "3.0.0",
    changes: [
      "New UI on “Create Word” page.",
      "Unlocked Circled (NFT) craft by using items from inventory.",
      "Launched Marketplace with first Inventory NFTs.",
      "Added Circled preview functionality in “My Words” page.",
      "Unlocked “Inventory” page.",
    ],
    image: {
      width: 3360,
      height: 1878,
      src: roadmapCreateWordImageV2,
      alt: "roadmap-create-word-v2",
    },
  },
  {
    quarter: "Q3 2023",
    active: false,
    version: "3.1.0",
    changes: [
      "Started liquidity pool of CW token on the Raydium.",
      "Promoted tokens on different price-tracking platforms and pools like CoinMarketCap etc.",
      "Enabled Search page with information about owners, mint and properties.",
      "Connected Solflare and many of Solana based wallets.",
    ],
    image: null,
  },
  {
    quarter: "Q4 2023",
    active: false,
    version: "4.0.0",
    changes: [
      "Added new Animation Types to craft Circled.",
      "Added new unique multi-level properties.",
      "Enabled Search page with information about owners, mint and properties.",
      "Created partnership premium NFTs, collaborations.",
      "Enabled rewards for NFT (crafted Circled, not inventory items) holdings.",
    ],
    image: null,
  },
  {
    quarter: "Q1 2024",
    active: false,
    version: "4.1.0",
    changes: [
      "New design.",
      "Removed WalletConnect implementation. For Metamask owners that did mint of NFTs from OpenSea - functionallity still available.",
      "Implemented possibility to place Circled you own on your site out of circledwords.io. (Something like watermark, iframe implementation)",
    ],
    image: null,
  },
];

const setImageWrapperHeight = () => {
  for (const [key, image] of images.value.entries()) {
    if (data[key].image === null) {
      continue;
    }

    const image_ratio = data[key].image!.width / data[key].image!.height;
    image.parentElement!.style.height =
      image.parentElement!.offsetWidth / image_ratio + "px";
  }
};

onMounted(() => {
  setImageWrapperHeight();
  window.addEventListener("resize", setImageWrapperHeight);
});

onUnmounted(() => {
  window.removeEventListener("resize", setImageWrapperHeight);
});
</script>
