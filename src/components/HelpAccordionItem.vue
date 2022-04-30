<script>

import {uuid} from 'vue-uuid';

export default {
  data() {
    return {
      uuid: uuid.v4(),
    }
  },
  props: {
    question: {
      required: true,
      type: String,
    },
    answer: {
      required: true,
      type: String,
    }
  }
}
</script>

<template>
  <div class="accordion-item">
    <h2 class="accordion-header" :id.attr="'heading' + uuid">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target.attr="'#collapse' + uuid"
              aria-expanded="false" :aria-controls.attr="'collapse' + uuid">
        {{ question }}
      </button>
    </h2>
    <div :id.attr="'collapse' + uuid" class="accordion-collapse collapse" :aria-labelledby.attr="'heading' + uuid"
         data-bs-parent="#helpAccordion">
      <div class="accordion-body">
        {{ answer }}
      </div>
    </div>
  </div>
</template>