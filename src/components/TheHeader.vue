<template>
  <header id="header" class="position-relative">
    <nav class="navbar navbar-expand-sm navbar-dark">
      <div class="container-fluid mt-1 px-4">
        <router-link
          to="/"
          class="navbar-brand d-flex align-items-center"
          @click="toggleNavbar()"
        >
          <img src="../assets/images/logo.svg" alt="" class="me-1" /><span
            class="logo-primary-text"
            >Circled</span
          ><span class="logo-secondary-text">Words</span>
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
                v-if="!isMetamaskConnected() && !isWalletConnectConnected()"
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

<script>
import WalletModal from "@/components/WalletModal.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { Collapse } from "bootstrap";

export default {
  components: {
    WalletModal,
  },
  methods: {
    ...mapGetters(["isMetamaskConnected", "isWalletConnectConnected"]),
    ...mapActions(["resetWalletState"]),
    ...mapMutations(["setWalletAddress"]),
    toggleNavbar() {
      const menuToggle = document.getElementById("navbarNav");
      if (menuToggle.classList.contains("show")) {
        const bsCollapse = new Collapse(menuToggle);
        bsCollapse.toggle();
      }
    },
  },
};
</script>
