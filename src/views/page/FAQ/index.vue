<template>
  <div class="page container-fluid faq">
    <Slogan />
    <Description ref="descriptionComponent" />
    <Playground ref="playgroundComponent" />
    <!--  <Stats ref="statsComponent" />  -->
    <Help ref="helpComponent" />
  </div>
</template>

<script lang="ts">
export default {
  name: "FAQPage",
};
</script>

<script lang="ts" setup>
import Help from "./components/HelpBlock/index.vue";
import Playground from "./components/PlaygroundBlock/index.vue";
import Description from "./components/DescriptionBlock/index.vue";
import Slogan from "./components/SloganBlock.vue";
import { onMounted, onUnmounted, ref } from "vue";

const descriptionComponent = ref();
const playgroundComponent = ref();
const helpComponent = ref();

const animatedElements = ref<Array<HTMLElement>>([]);

const handleScroll = () => {
  for (let i = 0; i < animatedElements.value.length; i++) {
    const elem = animatedElements.value[i];
    elem.style.animation = "none";
    elem.style.opacity = "0";

    if (isElemVisible(elem) || document.documentElement.clientWidth < 992) {
      elem.style.opacity = "1";
      // @ts-ignore
      elem.style.animation = null;
      animatedElements.value.splice(i, 1);
    }
  }
};

const isElemVisible = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  const elemTop = rect.top + window.innerHeight * 0.7;
  const elemBottom = rect.bottom;
  return elemTop < window.innerHeight && elemBottom >= 0;
};

onMounted(() => {
  animatedElements.value = [
    descriptionComponent.value.$refs.section,
    playgroundComponent.value.$refs.section,
    helpComponent.value.$refs.section,
  ];

  document.addEventListener("scroll", handleScroll);
  handleScroll();
});

onUnmounted(() => {
  document.removeEventListener("scroll", handleScroll);
});
</script>
