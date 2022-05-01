<script>
import WalletModal from '@/components/WalletModal.vue';
import {mapGetters, mapActions} from 'vuex';
import {Collapse} from 'bootstrap';

export default {
  methods: {
    ...mapGetters(["isMetaMaskConnected"]),
    ...mapActions(["resetWalletState"]),
    toggleNavbar() {
      const menuToggle = document.getElementById('navbarNav')
      if (menuToggle.classList.contains('show')) {
        const bsCollapse = new Collapse(menuToggle)
        bsCollapse.toggle()
      }
    },
  },
  components: {
    WalletModal
  },
}
</script>

<template>
  <header class="position-relative" id="header">
    <nav class="navbar navbar-expand-sm navbar-dark">
      <div class="container-fluid mt-1 px-4">
        <router-link to="/" class="navbar-brand d-flex align-items-center" @click="toggleNavbar()"><img
            src="../assets/images/logo.svg"
            alt=""
            class="me-1"><span
            class="logo-primary-text">Circled</span><span class="logo-secondary-text">Words</span></router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav d-flex align-items-center">
            <li class="nav-item me-md-4">
              <router-link to="/" class="nav-link" @click="toggleNavbar()">Home</router-link>
            </li>
            <li class="nav-item me-md-4">
              <router-link to="/my-words" class="nav-link" @click="toggleNavbar()">My Words</router-link>
            </li>
            <li class="nav-item me-md-4">
              <router-link to="/roadmap" class="nav-link disabled" @click="toggleNavbar()">Roadmap</router-link>
            </li>
            <li class="nav-item connect-wallet-link">
              <button v-if="!isMetaMaskConnected()" type="button" href="#" class="nav-link px-3"
                      data-bs-toggle="modal"
                      data-bs-target="#connectWalletModal">
                Connect Wallet
              </button>
              <button v-else @click="resetWalletState()" type="button" href="#" class="nav-link px-3 logged-in">
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <WalletModal/>
</template>
