<template>
  <header id="header" class="position-relative">
    <nav class="navbar navbar-expand-md navbar-dark">
      <div class="container-fluid mt-1">
        <div
          class="row w-100 mx-auto d-md-grid navbar-wrapper align-items-center"
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
            class="order-3 order-md-2 col-12 col-md-auto d-flex justify-content-center"
          >
            <div
              id="navbarNav"
              class="collapse navbar-collapse justify-content-center mt-3 mt-sm-0"
            >
              <ul class="navbar-nav d-flex align-items-center">
                <li class="nav-item me-md-4">
                  <router-link to="/" class="nav-link" @click="toggleNavbar()">
                    Home
                  </router-link>
                </li>
                <li class="nav-item me-md-4">
                  <router-link
                    to="/my-words"
                    class="nav-link"
                    @click="toggleNavbar()"
                  >
                    My Words
                  </router-link>
                </li>
                <li class="nav-item me-md-4">
                  <router-link
                    to="/create-word"
                    class="nav-link"
                    @click="toggleNavbar()"
                  >
                    Create Word
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link
                    to="/roadmap"
                    class="nav-link disabled"
                    @click="toggleNavbar()"
                  >
                    Roadmap
                  </router-link>
                </li>
                <li class="connect-wallet-link d-sm-none">
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
            class="order-2 order-md-3 col-6 col-md-auto text-end d-flex d-md-block align-items-center justify-content-start flex-row-reverse"
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
            <div class="connect-wallet-link d-none d-sm-block me-sm-4 me-md-0">
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
