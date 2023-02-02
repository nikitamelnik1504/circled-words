<template>
  <header id="header" class="position-relative">
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid mt-1">
        <div
          class="row w-100 mx-auto navbar-wrapper align-items-center justify-content-between"
        >
          <div class="order-1 col-6 col-md-auto d-flex align-items-center">
            <router-link
              to="/"
              class="navbar-brand d-flex align-items-center position-relative"
              @click="toggleNavbar()"
            >
              <img src="../assets/images/logo.svg" alt="" class="me-1" /><span
                class="logo-primary-text"
                >Circled</span
              ><span class="logo-secondary-text">Words</span>
              <span class="logo-sub-text position-absolute">Beta</span>
            </router-link>
          </div>
          <div
            class="order-3 order-lg-2 col-12 col-lg-auto d-flex justify-content-center"
          >
            <div
              id="navbarNav"
              class="collapse navbar-collapse justify-content-center mt-3 mt-sm-0"
            >
              <ul class="navbar-nav d-flex align-items-center">
                <li class="nav-item me-lg-4">
                  <router-link to="/" class="nav-link" @click="toggleNavbar()">
                    Home
                  </router-link>
                </li>
                <li class="nav-item me-lg-4">
                  <router-link
                    to="/create-word"
                    class="nav-link"
                    @click="toggleNavbar()"
                  >
                    Create Word
                  </router-link>
                </li>
                <li class="nav-item me-lg-4">
                  <router-link
                    to="/my-words"
                    class="nav-link"
                    @click="toggleNavbar()"
                  >
                    My Words
                  </router-link>
                </li>
                <li class="nav-item me-lg-4">
                  <router-link
                    to="/inventory"
                    class="nav-link disabled"
                    @click="toggleNavbar()"
                  >
                    Inventory
                  </router-link>
                </li>
                <li class="nav-item me-lg-4">
                  <router-link
                    to="/store"
                    class="nav-link disabled"
                    @click="toggleNavbar()"
                  >
                    Store
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link
                    to="/roadmap"
                    class="nav-link"
                    @click="toggleNavbar()"
                  >
                    Roadmap
                  </router-link>
                </li>
                <li class="d-md-none mt-2 mt-md-0">
                  <ul class="nav-link social-links d-flex">
                    <li>
                      <a
                        class="social-link d-flex justify-content-center align-items-center"
                        href="https://twitter.com/Circled_Words"
                        target="_blank"
                      >
                        <img src="../assets/images/twitter.svg" alt="twitter" />
                      </a>
                    </li>
                    <li class="ms-3">
                      <a
                        class="social-link d-flex justify-content-center align-items-center"
                        href="https://opensea.io/CircledWordsCompany"
                        target="_blank"
                      >
                        <img src="../assets/images/opensea.svg" alt="opensea" />
                      </a>
                    </li>
                    <li class="ms-3">
                      <a
                        class="social-link d-flex justify-content-center align-items-center"
                        href="https://discord.com/invite/reRdPWgeh3"
                        target="_blank"
                      >
                        <img src="../assets/images/discord.svg" alt="discord" />
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="connect-wallet-link d-sm-none mt-2 mt-sm-0">
                  <button
                    v-if="getStatus === 'not_connected'"
                    type="button"
                    href="#"
                    class="nav-link px-3 me-sm-4 ms-auto"
                    data-bs-toggle="modal"
                    data-bs-target="#connectWalletModal"
                  >
                    Connect Wallet
                  </button>
                  <button
                    v-else
                    type="button"
                    href="#"
                    class="nav-link px-3 me-sm-4 ms-auto logged-in"
                    @click="logOut"
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div
            class="order-2 order-lg-3 col-6 col-md-auto col-lg-12 col-xl-auto text-end mt-lg-3 mt-xl-0 d-flex align-items-center justify-content-start flex-row-reverse"
          >
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon" />
            </button>
            <div class="connect-wallet-link d-none d-sm-block me-sm-4 me-lg-0">
              <button
                v-if="getStatus === 'not_connected'"
                type="button"
                href="#"
                class="px-3 py-2 ms-auto"
                data-bs-toggle="modal"
                data-bs-target="#connectWalletModal"
              >
                Connect Wallet
              </button>
              <button
                v-else
                type="button"
                href="#"
                class="px-3 py-2 ms-auto logged-in"
                @click="logOut"
              >
                Log out
              </button>
            </div>
            <div
              class="social-links d-none d-md-flex me-md-4 me-lg-3 me-xl-4 justify-content-center align-items-center"
            >
              <a
                href="https://twitter.com/Circled_Words"
                class="social-link d-flex justify-content-center align-items-center"
                target="_blank"
              >
                <img
                  class="w-100"
                  src="../assets/images/twitter.svg"
                  alt="Twitter"
                />
              </a>
              <a
                href="https://opensea.io/collection/circledwords"
                class="social-link d-flex justify-content-center align-items-center ms-md-3"
                target="_blank"
              >
                <img
                  class="w-100"
                  src="../assets/images/opensea.svg"
                  alt="OpenSea"
                />
              </a>
              <a
                href="https://discord.gg/8kE75RdUDh"
                class="social-link d-flex justify-content-center align-items-center ms-md-3"
                target="_blank"
              >
                <img
                  class="w-100"
                  src="../assets/images/discord.svg"
                  alt="Discord"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <WalletModal />
</template>

<script lang="ts">
import WalletModal from "@/components/WalletModal.vue";
import { Collapse } from "bootstrap";
import { Vue, Options, Inject } from "vue-property-decorator";
import { namespace } from "s-vuex-class";
import MetamaskService from "@/utils/Service/MetamaskService";
import WalletConnectService from "@/utils/Service/WalletConnectService";
import PhantomWalletService from "@/utils/Service/PhantomWalletService";

const wallet = namespace("wallet");

@Options({
  components: {
    WalletModal,
  },
})
export default class TheHeader extends Vue {
  @Inject({ from: "metamaskService" }) metamaskService:
    | MetamaskService
    | false = false;

  @Inject({ from: "walletConnectService" }) walletConnectService:
    | WalletConnectService
    | false = false;

  @Inject({ from: "phantomWalletService" }) phantomWalletService:
    | PhantomWalletService
    | false = false;

  @wallet.Getter
  public getStatus!: string;

  async logOut() {
    if (this.metamaskService instanceof MetamaskService) {
      this.metamaskService.disconnect();
    }
    if (this.walletConnectService instanceof WalletConnectService) {
      await this.walletConnectService.disconnect();
    }
    if (this.phantomWalletService instanceof PhantomWalletService) {
      await this.phantomWalletService.disconnect();
    }

    this.$router.go(0);
  }

  toggleNavbar(): void {
    const menuToggle = document.getElementById("navbarNav");
    if (!menuToggle) {
      return;
    }
    if (menuToggle.classList.contains("show")) {
      const bsCollapse = new Collapse(menuToggle);
      bsCollapse.toggle();
    }
  }
}
</script>
