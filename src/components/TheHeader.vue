<template>
  <header id="header" class="position-relative">
    <nav class="navbar navbar-expand-sm navbar-dark">
      <div class="container-fluid mt-1 px-4">
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
        <div
          id="navbarNav"
          class="collapse navbar-collapse justify-content-end"
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
            <li class="nav-item me-md-4">
              <router-link
                to="/roadmap"
                class="nav-link disabled"
                @click="toggleNavbar()"
              >
                Roadmap
              </router-link>
            </li>
            <li class="nav-item connect-wallet-link">
              <button
                v-if="getStatus === 'not_connected'"
                type="button"
                href="#"
                class="nav-link px-3"
                data-bs-toggle="modal"
                data-bs-target="#connectWalletModal"
              >
                Connect Wallet
              </button>
              <button
                v-else
                type="button"
                href="#"
                class="nav-link px-3 logged-in"
                @click="logOut"
              >
                Log out
              </button>
            </li>
          </ul>
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
