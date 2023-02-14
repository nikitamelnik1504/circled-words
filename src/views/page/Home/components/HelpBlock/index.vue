<template>
  <section id="help" class="row help-section pt-4">
    <div class="col-11 m-auto accordion-wrapper">
      <h3 class="d-inline-block section-title my-3">Help</h3>
      <div id="helpAccordion" class="accordion mt-2 mt-md-3">
        <HelpAccordionItem
          v-for="(item, index) in helpData"
          :key="index"
          :question="item.question"
          :answer="item.answer"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Options } from "vue-property-decorator";
import HelpAccordionItem from "./components/HelpAccordionItem.vue";

const help = [
  {
    question: "What I can do with NFTs on your site?",
    answer:
      "You can hover mouse on each button and run animation manually by yourself. That's amazing to try.",
  },
  {
    question: "What we sell for you?",
    answer:
      "We sell you many hours of our work to show you beautiful animations and transitions.",
  },
  {
    question: "What are the funds being used for?",
    answer:
      "We will use funds for development of our project. New features, new NFTs, all this take a lot of time. In future we want to create our own token and staking features.",
  },
  {
    question: "Where I can buy CircledWord?",
    answer: "You can buy it on our official OpenSea collection page.",
  },
  {
    question: "Where I can check my NFTs owned from OpenSea?",
    answer: "You can check it on My Words page.",
  },
  {
    question: "Where I should check news about the project?",
    answer:
      "Join our Discord channel. We will do there all interesting stuff like: CircledWord generation via bot, airdrops and etc. We still working with News page on our site.",
  },
];

@Options({
  name: "HelpBlock",
  components: {
    HelpAccordionItem,
  },
})
export default class HelpBlock extends Vue {
  helpData = this.getHelpData();

  getHelpData(): object {
    return help;
  }
}
</script>
