<template>
  <footer id="footer">
    <div class="container-fluid">
      <div class="row py-3 py-md-4 w-100 mx-auto justify-content-center">
        <div
          class="col-md-auto col-xl-4 px-lg-5 me-auto mx-lg-auto d-flex align-items-center justify-content-center justify-content-md-start order-1 order-md-0"
        >
          <h6 class="m-0 copyright">© 2023 CircledWords</h6>
        </div>
        <div
          class="col-md-auto col-xl-4 col-xxl-3 position-relative partners pt-md-1 my-3 my-md-0 order-0 order-md-2"
        >
          <p class="mb-0 position-absolute start-0 end-0 text-center">
            Developed with using technologies of
          </p>
          <div class="row justify-content-center">
            <div class="col-auto text-center partners-item">
              <a href="https://www.metaplex.com" target="_blank">
                <img
                  src="../assets/images/metaplex.svg"
                  height="14"
                  alt="metaplex-logo"
                />
              </a>
            </div>
            <div class="col-auto text-center">
              <a href="https://solana.com" target="_blank">
                <img
                  src="../assets/images/solana.png"
                  height="17"
                  alt="solana-logo"
                />
              </a>
            </div>
          </div>
        </div>
        <div
          class="col-md-auto col-xl-4 px-lg-5 ms-auto mx-lg-auto text-end d-flex align-items-center justify-content-center justify-content-md-end mt-1 mt-md-0 order-2"
        >
          <h6 class="m-0 version">Version: {{ version }}</h6>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { Vue } from "vue-property-decorator";

export default class TheFooter extends Vue {
  version = process.env.npm_package_version;
}
</script>
