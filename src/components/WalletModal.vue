<template>
  <div
    id="connectWalletModal"
    ref="connectWalletModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center"
    >
      <div class="modal-content">
        <div class="modal-header justify-content-center">
          <h5 id="exampleModalLabel" class="modal-title">Select your wallet</h5>
          <button
            ref="CloseWalletModal"
            type="button"
            class="btn-close d-none"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body d-flex justify-content-center">
          <a
            :href="
              isMetaMaskInstalled() ? '#' : 'https://metamask.io/download/'
            "
            class="wallet-link d-flex justify-content-center align-items-center flex-column text-center position-relative"
            @click="isMetaMaskInstalled() ? showMetaMaskModal() : undefined"
          >
            <!--            <span class="position-absolute wallet-network-error-background"-->
            <!--                 ></span>-->
            <img src="../assets/images/metamask.svg" alt="f" />
            <h6>Metamask</h6>
            <!--            <p class="wallet-network-error" >Please change your network to-->
            <!--              Ethereum</p>-->
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @TODO: Implement validation for chain network.

import { mapActions, mapGetters } from "vuex";

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
    ...mapGetters(["isMetaMaskConnected", "isMetaMaskInstalled"]),
    ...mapActions(["connectToMetaMask"]),
    async showMetaMaskModal() {
      let connectionToMetaMask = this.connectToMetaMask();
      let walletModalCloseButton = this.$refs.CloseWalletModal;
      let router = this.$router;
      connectionToMetaMask.then(function (result) {
        if (result === "connected") {
          router.push("/my-words");
          walletModalCloseButton.click();
        }
      });
    },
  },
};
</script>
