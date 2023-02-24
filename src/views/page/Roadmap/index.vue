<template>
  <div class="page container-fluid roadmap">
    <div class="row">
      <div class="col-11 mx-auto mb-4 mb-md-5">
        <h3
          class="text-center my-4 my-lg-0 mt-lg-2 animate__animated animate__fadeIn"
        >
          Roadmap
        </h3>
        <div
          v-for="(value, index) in data"
          :key="index"
          class="row mt-4 mt-md-5 justify-content-center"
          :class="{ 'mt-md-5': index === 0 }"
        >
          <div
            v-if="(index + 2) % 2 === 0"
            class="col-md-5 text-start text-md-end animate__animated animate__fadeInLeft my-auto"
            :style="animationStyle(index)"
          >
            <h4 class="mb-0">{{ value.quarter }}</h4>
            <span v-if="value.active" class="indicator d-block">Current</span>
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
          <div
            v-else
            class="col-md-5 order-2 order-md-0 text-end d-flex align-items-center my-auto image-wrapper"
          >
            <img
              ref="images"
              :src="value.image.src"
              :alt="value.image.alt"
              class="w-100 animate__animated animate__zoomIn"
              :style="animationStyle(index)"
            />
          </div>
          <div class="col-1 d-none d-md-block text-center">
            <div class="vr" style="height: 100%"></div>
          </div>
          <div
            v-if="(index + 2) % 2 !== 0"
            class="col-md-5 text-start animate__animated animate__fadeInRight my-auto"
            :style="animationStyle(index)"
          >
            <h4 class="mb-0">{{ value.quarter }}</h4>
            <span v-if="value.active" class="indicator d-block">Current</span>
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
          <div
            v-else
            class="col-md-5 d-flex align-items-center my-auto image-wrapper"
          >
            <img
              ref="images"
              :src="value.image.src"
              :alt="value.image.alt"
              class="w-100 animate__animated animate__zoomIn"
              :style="animationStyle(index)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "RoadmapPage",
};
</script>

<script lang="ts" setup>
import roadmapCreateWordImage from "@/assets/images/roadmap-create-word.png";
import { onMounted, onUnmounted, ref } from "vue";

const animationDelay = 0.1;
const animationStyle = (index: number) => {
  return {
    "-webkit-animation-delay": index * animationDelay + "s",
    "animation-delay": index * animationDelay + "s",
  };
};

const images = ref<Array<HTMLImageElement>>([]);

const data = [
  {
    quarter: "Q1 2023",
    active: true,
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
      src: roadmapCreateWordImage,
      alt: "roadmap-create-word-v2",
    },
  },
  {
    quarter: "Q2 2023",
    active: false,
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
      src: roadmapCreateWordImage,
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
    image: {
      width: 3360,
      height: 1878,
      src: roadmapCreateWordImage,
      alt: "roadmap-create-word-v2",
    },
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
    image: {
      width: 3360,
      height: 1878,
      src: roadmapCreateWordImage,
      alt: "roadmap-create-word-v2",
    },
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
    image: {
      width: 3360,
      height: 1878,
      src: roadmapCreateWordImage,
      alt: "roadmap-create-word-v2",
    },
  },
];

const setImageWrapperHeight = () => {
  for (const [key, image] of images.value.entries()) {
    const image_ratio = data[key].image.width / data[key].image.height;
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
