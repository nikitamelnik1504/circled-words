<script>

import detectEthereumProvider from '@metamask/detect-provider'
import {mapActions} from 'vuex';

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
  methods: mapActions(["connectToMetaMask"]),
}

</script>

<template>
  <div class="modal fade" id="connectWalletModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header justify-content-center">
          <h5 class="modal-title" id="exampleModalLabel">Select your wallet</h5>
          <!--            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>-->
        </div>
        <div class="modal-body d-flex justify-content-center">
          <a href="#"
             @click="connectToMetaMask"

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

<style>
@import "WalletModal.css";
</style>