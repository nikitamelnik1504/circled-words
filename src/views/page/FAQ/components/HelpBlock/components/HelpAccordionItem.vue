<template>
  <div class="accordion-item">
    <h2 :id.attr="'heading' + UUID" class="accordion-header">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target.attr="'#collapse' + UUID"
        aria-expanded="false"
        :aria-controls.attr="'collapse' + UUID"
      >
        {{ props.question }}
      </button>
    </h2>
    <div
      :id.attr="'collapse' + UUID"
      class="accordion-collapse collapse"
      :aria-labelledby.attr="'heading' + UUID"
      data-bs-parent="#helpAccordion"
    >
      <div class="accordion-body">
        {{ props.answer }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "HelpAccordionItem",
};
</script>

<script lang="ts" setup>
import { uuid } from "vue-uuid";

interface Props {
  question: string;
  answer: string;
}

const props = defineProps<Props>();

const UUID = uuid.v4();
</script>
