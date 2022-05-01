<template>
  <section id="benefits" class="row benefits-section mt-3">
    <div class="col-11 col-sm-10 col-xxl-9 mx-auto">
      <h3 class="section-title my-3 text-center">Benefits?</h3>
      <div id="benefitsWrapper" class="row justify-content-center">
        <div
          v-for="(benefit, index) in benefitsData"
          :key="index"
          class="col-md-6 col-lg-4"
        >
          <div class="row h-100">
            <div class="col-xxl-11 mt-4 mx-auto">
              <div
                class="benefit-item d-flex align-items-center text-center h-100"
              >
                <p class="benefit-description m-0">
                  {{ benefit.value }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="disabled help-description text-center mt-3">
        Our Roadmap is available
        <a href="#" class="disabled text-decoration-underline">here</a>.
      </p>
    </div>
  </section>
</template>

<script>
const benefits = [
  {
    value:
      "Too unique items. More and more properties in one button. You could be owner of the most animated button, step by step colors, long animation durations.",
  },
  {
    value:
      "Possibility to make resell, you can try to search the most beautiful button and make trade. ",
  },
  { value: "Possibility to play with buttons that you owned on our site." },
];

export default {
  data() {
    return {
      benefitsData: this.getBenefitsData(),
    };
  },
  methods: {
    getBenefitsData() {
      return benefits;
    },
  },
};
</script>
