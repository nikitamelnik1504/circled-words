<template>
  <div class="accordion-item">
    <h2 :id.attr="'heading' + uuid" class="accordion-header">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target.attr="'#collapse' + uuid"
        aria-expanded="false"
        :aria-controls.attr="'collapse' + uuid"
      >
        {{ question }}
      </button>
    </h2>
    <div
      :id.attr="'collapse' + uuid"
      class="accordion-collapse collapse"
      :aria-labelledby.attr="'heading' + uuid"
      data-bs-parent="#helpAccordion"
    >
      <div class="accordion-body">
        {{ answer }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Prop, Vue } from "vue-property-decorator";
import { uuid } from "vue-uuid";

@Options({})
export default class HelpAccordionItem extends Vue {
  @Prop({ type: String, required: true }) readonly question!: string;
  @Prop({ type: String, required: true }) readonly answer!: string;

  uuid = uuid.v4();
}
</script>
