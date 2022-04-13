<script>

import detectEthereumProvider from '@metamask/detect-provider'

const provider = await detectEthereumProvider()
let metaMaskData = {};

metaMaskData.metaMaskExist = Boolean(provider)

if (provider) {
  const chainId = await provider.request({
    method: 'eth_chainId'
  })
  metaMaskData.isEthereumChain = (chainId === '0x1');
}

export default {
  data: () => {
    return {
      metaMaskData: metaMaskData,
      connect: function () {
        window.ethereum
            .request({method: 'eth_requestAccounts'})
            .then(function () {
              alert('Connected')
            })
            .catch((error) => {
              if (error.code === 4001) {
                // EIP-1193 userRejectedRequest error
                console.log('Please connect to MetaMask.');
              } else {
                console.error(error);
              }
            });
      },
    }
  }
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
             v-on:click="metaMaskData.isEthereumChain ? connect() : ''"
             v-bind:class="{ disabled: !metaMaskData.isEthereumChain }"
             class="wallet-link d-flex justify-content-center align-items-center flex-column text-center position-relative">
            <span class="position-absolute wallet-network-error-background" v-show="!metaMaskData.isEthereumChain"></span>
            <img src="../../assets/images/metamask.svg" alt="f">
            <h6>Metamask</h6>
            <p class="wallet-network-error" v-show="!metaMaskData.isEthereumChain">Please change your network to Ethereum</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "./WalletModal.css";
</style>