<template>
  <div class="col-12 mx-auto mx-md-0 sample-word align-items-center">
    <div class="row justify-content-center">
      <div class="text-center col-md-5 col-lg-4 col-xl-3 my-auto">
        <h4 class="sample-word-name text-center mb-3">
          <span class="primary">Circled</span
          ><span class="secondary">Word</span>
          {{ nft.name }}
        </h4>
        <CircledWord
          :nft="nft"
          class="disabled mb-3"
          locked
          :play="play"
          @play-finished="emit('samplePlayFinished')"
        />
      </div>
      <div class="col-sm-8 col-md-7 col-lg-8 col-xl-9 mt-2 mt-md-0">
        <div id="carouselExampleControls" class="carousel">
          <div
            ref="carouselInner"
            class="carousel-inner m-0 row flex-nowrap flex-xl-wrap"
          >
            <div
              v-for="(level_properties, level) in nft.properties"
              :key="level"
              ref="carouselItems"
              class="carousel-item col-12 col-lg-6 col-xl-4 px-4 d-block me-0"
              :class="{ active: level === 0 }"
              style=""
            >
              <LevelBlock :level="level + 1" :properties="level_properties" />
            </div>
          </div>
          <button
            class="carousel-control-prev d-xl-none"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
            @click="carouselControlPrev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            ref="controlNext"
            class="carousel-control-next d-xl-none"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
            @click="carouselControlNext"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "SampleWord",
};
</script>

<script lang="ts" setup>
import CircledWord from "@/components/CircledWord.vue";
import CircledWordService from "@/utils/Service/CircledWordService";
import LevelBlock from "./components/LevelBlock.vue";
import { onMounted, ref } from "vue";

interface Props {
  metadata: NFTMetadata;
  play: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  play: false,
});

const emit = defineEmits({
  samplePlayFinished: () => {
    return true;
  },
});

const carouselInner = ref();
const carouselItems = ref([]);

let scrollPosition = 0;
let cardWidth = 0;

onMounted(() => {
  cardWidth = (carouselItems.value[0] as HTMLElement).scrollWidth;
});

const carouselControlNext = () => {
  if (scrollPosition < cardWidth * (carouselItems.value.length - 1)) {
    scrollPosition += cardWidth;
    carouselInner.value.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  }
};

const carouselControlPrev = () => {
  if (scrollPosition > 0) {
    scrollPosition -= cardWidth;
    carouselInner.value.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  }
};

const nft = ref(new CircledWordService().getSampleNft(props.metadata));
</script>
