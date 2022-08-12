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
                to="/generate-word"
                class="nav-link disabled"
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
                v-if="
                  isMetamaskConnected === 'not_connected' &&
                  isWalletConnectConnected === 'not_connected'
                "
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
                @click="resetWalletState(true)"
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
import { Vue, Options } from "vue-property-decorator";
import { namespace } from "s-vuex-class";

const wallet = namespace("wallet");

@Options({
  components: {
    WalletModal,
  },
})
export default class TheHeader extends Vue {
  @wallet.Getter
  public isMetamaskConnected!: string;

  @wallet.Getter
  public isWalletConnectConnected!: string;

  @wallet.Action
  public resetWalletState!: (closeSession: boolean) => void;

  @wallet.Mutation
  public setWalletAddress!: (address: string) => void;

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
