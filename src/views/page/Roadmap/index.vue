<template>
  <div class="container-fluid roadmap">
    <div class="row">
      <div
        :style="{ 'min-height': minHeightValue + 'px' }"
        class="col-11 mx-auto"
      >
        <h3 class="text-center mt-lg-2">Roadmap</h3>
        <div class="row mt-5 justify-content-center">
          <div class="col-5 text-end">
            <h4 class="mb-0">Q1 2023</h4>
            <span class="indicator d-block">Current</span>
            <h6 class="version mt-1">2.1.0</h6>
            <ul class="changes p-0">
              <li>Minted CW token.</li>
              <li class="pt-1">Launched CW token Airdrop.</li>
              <li class="pt-1">Improved Discord community server.</li>
              <li class="pt-1">Redesigned “Homepage”.</li>
              <li class="pt-1">Added new animations across the site.</li>
            </ul>
          </div>
          <div class="col-1 text-center">
            <div class="vr" style="height: 100%"></div>
          </div>
          <div class="col-5"></div>
        </div>
        <div class="row justify-content-center">
          <div class="col-5"></div>
          <div class="col-1 text-center">
            <div class="vr" style="height: 100%"></div>
          </div>
          <div class="col-5 text-start">
            <h4 class="mb-0">Q2 2023</h4>
            <h6 class="version mt-1">3.0.0</h6>
            <ul class="changes p-0">
              <li>New UI on “Create Word” page.</li>
              <li class="pt-1">
                Unlocked Circled (NFT) craft by using items from inventory.
              </li>
              <li class="pt-1">
                Launched Marketplace with first Inventory NFTs.
              </li>
              <li class="pt-1">
                Added Circled preview functionality in “My Words” page.
              </li>
              <li class="pt-1">Enabled “Inventory” page.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options } from "vue-property-decorator";
import PageBase from "@/views/page/PageBase";

@Options({
  name: "RoadmapPage",
})
export default class Roadmap extends PageBase {}
</script>
