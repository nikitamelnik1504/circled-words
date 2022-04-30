<script>
import WalletModal from '@/components/WalletModal.vue';
import {mapGetters, mapActions} from 'vuex';

export default {
  methods: {
    ...mapGetters(["isMetaMaskConnected"]),
    ...mapActions(["resetWalletState"]),
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
        <router-link to="/" class="navbar-brand d-flex align-items-center"><img src="../assets/images/logo.svg"
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
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item me-md-4">
              <router-link to="/my-words" class="nav-link">My Words</router-link>
            </li>
            <li class="nav-item me-md-4">
              <router-link to="/roadmap" class="nav-link disabled">Roadmap</router-link>
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
