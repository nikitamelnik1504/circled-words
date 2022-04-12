<script>

import detectEthereumProvider from '@metamask/detect-provider'

const provider = await detectEthereumProvider()

if (provider) {
  const chainId = await provider.request({
    method: 'eth_chainId'
  })
}

export default {
  data: () => {
    return {
      metaMaskExist: function () {
        if (provider) {
          return 'your-wallet'
        }
        else {
          return 'https://metamask.io/download/'
        }
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
          <a :href="metaMaskExist()" class="wallet-link d-flex justify-content-center align-items-center flex-column">
            <img src="../../assets/images/metamask.svg" alt="f">
            <h6>Metamask</h6>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "./WalletModal.css";
</style>