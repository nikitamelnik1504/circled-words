<script>

// @TODO: Implement validation for chain network.

import detectEthereumProvider from '@metamask/detect-provider'
import {mapActions, mapGetters} from 'vuex';
import {hide} from '@popperjs/core';

// const provider = await detectEthereumProvider()
// let metaMaskData = {};
//
// metaMaskData.metaMaskExist = Boolean(provider)
//
// if (provider) {
//   const chainId = await provider.request({
//     method: 'eth_chainId'
//   })
//   metaMaskData.isEthereumChain = (chainId === '0x1');
// }

export default {
  methods: {
    ...mapGetters(["isMetaMaskConnected"]),
    ...mapActions(["connectToMetaMask"]),
    async showMetaMaskModal() {
      let connectionToMetaMask = this.connectToMetaMask()
      let walletModalCloseButton = this.$refs.CloseWalletModal
      let router = this.$router;
      connectionToMetaMask.then(function (result) {
        if (result === 'connected') {
          router.push('/my-words')
          walletModalCloseButton.click()
        }
      })
    },
    isMetaMaskInstalled() {
      return typeof window.ethereum !== 'undefined'
    }
  },
}

</script>

<template>
  <div class="modal fade"
       id="connectWalletModal"
       tabindex="-1"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
       ref="connectWalletModal"
  >
    <div class="modal-dialog position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center">
      <div class="modal-content">
        <div class="modal-header justify-content-center">
          <h5 class="modal-title" id="exampleModalLabel">Select your wallet</h5>
          <button ref="CloseWalletModal" type="button" class="btn-close d-none" data-bs-dismiss="modal"
                  aria-label="Close"></button>
        </div>
        <div class="modal-body d-flex justify-content-center">
          <a :href="isMetaMaskInstalled() ? '#' : 'https://metamask.io/download/'"
             @click="isMetaMaskInstalled() ? showMetaMaskModal() : undefined"
             class="wallet-link d-flex justify-content-center align-items-center flex-column text-center position-relative">
            <!--            <span class="position-absolute wallet-network-error-background"-->
            <!--                 ></span>-->
            <img src="../assets/images/metamask.svg" alt="f">
            <h6>Metamask</h6>
            <!--            <p class="wallet-network-error" >Please change your network to-->
            <!--              Ethereum</p>-->
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
