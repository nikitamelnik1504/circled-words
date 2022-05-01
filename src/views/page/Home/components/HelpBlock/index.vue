<template>
  <section id="help" class="row help-section mt-3">
    <div class="col-12">
      <h3 class="section-title my-3 text-center">Need help?</h3>
    </div>
    <div class="col-11 col-sm-10 col-xxl-8 mx-auto mt-4 accordion-wrapper">
      <div id="helpAccordion" class="accordion">
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

<script>
import HelpAccordionItem from "./components/HelpAccordionItem.vue";

const help = [
  { question: "What we sell for you?", answer: "Test data 1" },
  { question: "What are the funds being used for?", answer: "Test data 2" },
  { question: "Where I can buy circled words?", answer: "Test data 3" },
  {
    question: "How I can check my NFTs here owned in OpenSea?",
    answer: "Test data 4",
  },
  {
    question: "Where I can create my own circled word?",
    answer: "You can buy it in our official OpenSea profile page.",
  },
];

export default {
  name: "HelpBlock",
  components: {
    HelpAccordionItem,
  },
  data() {
    return {
      helpData: this.getHelpData(),
    };
  },
  methods: {
    getHelpData() {
      return help;
    },
  },
};
</script>
