<template>
  <div class="page container-fluid roadmap">
    <div class="row">
      <div class="col-11 mx-auto mb-4 mb-md-5">
        <h3
          class="text-center my-4 my-lg-0 mt-lg-2 animate__animated animate__fadeIn"
        >
          Roadmap
        </h3>
        <div
          class="row mt-md-5 justify-content-center animate__animated animate__fadeInLeft"
        >
          <div class="col-md-5 text-start text-md-end">
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
          <div class="col-1 d-none d-md-block text-center">
            <div class="vr" style="height: 100%"></div>
          </div>
          <div class="col-5"></div>
        </div>
        <div
          class="row mt-2 mt-md-0 justify-content-center animate__animated animate__fadeInRight"
        >
          <div class="col-5"></div>
          <div class="col-1 d-none d-md-block text-center">
            <div class="vr" style="height: 100%"></div>
          </div>
          <div class="col-md-5 text-start">
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
        <div
          class="row mt-2 mt-md-0 justify-content-center animate__animated animate__fadeInLeft"
        >
          <div class="col-md-5 text-start text-md-end">
            <h4 class="mb-0">Q3 2023</h4>
            <h6 class="version mt-1">3.1.0</h6>
            <ul class="changes p-0">
              <li>Started liquidity pool of CW token on the Raydium.</li>
              <li class="pt-1">
                Promoted tokens on different price-tracking platforms and pools
                like CoinMarketCap etc.
              </li>
              <li class="pt-1">
                Enabled Search page with information about owners, mint and
                properties.
              </li>
              <li class="pt-1">
                Connected Solflare and many of Solana based wallets.
              </li>
            </ul>
          </div>
          <div class="col-1 d-none d-md-block text-center">
            <div class="vr" style="height: 100%"></div>
          </div>
          <div class="col-5"></div>
        </div>
        <div
          class="row mt-2 mt-md-0 justify-content-center animate__animated animate__fadeInRight"
        >
          <div class="col-5"></div>
          <div class="col-1 d-none d-md-block text-center">
            <div class="vr" style="height: 100%"></div>
          </div>
          <div class="col-md-5 text-start">
            <h4 class="mb-0">Q4 2023</h4>
            <h6 class="version mt-1">4.0.0</h6>
            <ul class="changes p-0">
              <li>Added new Animation Types to craft Circled.</li>
              <li class="pt-1">Added new unique multi-level properties.</li>
              <li class="pt-1">
                Enabled Search page with information about owners, mint and
                properties.
              </li>
              <li class="pt-1">
                Created partnership premium NFTs, collaborations.
              </li>
              <li class="pt-1">
                Enabled rewards for NFT (crafted Circled, not inventory items)
                holdings.
              </li>
            </ul>
          </div>
        </div>
        <div
          class="row mt-2 mt-md-0 justify-content-center animate__animated animate__fadeInLeft"
        >
          <div class="col-md-5 text-start text-md-end">
            <h4 class="mb-0">Q1 2024</h4>
            <h6 class="version mt-1">4.1.0</h6>
            <ul class="changes p-0">
              <li>New design.</li>
              <li class="pt-1">
                Removed WalletConnect implementation. For Metamask owners that
                did mint of NFTs from OpenSea - functionallity still available.
              </li>
              <li class="pt-1">
                Implemented possibility to place Circled you own on your site
                out of circledwords.io. (Something like watermark, iframe
                implementation)
              </li>
            </ul>
          </div>
          <div class="col-1 d-none d-md-block text-center">
            <div class="vr" style="height: 100%"></div>
          </div>
          <div class="col-5"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "RoadmapPage",
};
</script>
