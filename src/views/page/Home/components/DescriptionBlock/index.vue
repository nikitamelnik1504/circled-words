<template>
  <section
    id="description"
    ref="section"
    class="row description-section animate__animated animate__fadeIn"
  >
    <div class="col-11 col-sm-11 m-auto">
      <h3 class="section-title mb-3 d-inline-block">What is it?</h3>
      <p class="description-text mt-2">
        CircledWord - is a bordered label with unique animation. It can be very
        simple and difficult at the same time. <br /><br />
        For example:
      </p>
      <ul>
        <li>Text color fade transition with background impulse animation.</li>
        <li>Transition of background color without changing text color.</li>
        <li>
          Infinity looped color change of all elements (border, text,
          background, shadow).
        </li>
      </ul>
      <p class="description-text">
        Each button has own animation(transition) duration, start text color,
        start border color and much more...<br /><br />
        Our project wants to show you, how simple web animation can do something
        special and beautiful.<br /><br />
      </p>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: "DescriptionBlock",
};
</script>

<script lang="ts" setup>
import { ref } from "vue";

const section = ref();
</script>
