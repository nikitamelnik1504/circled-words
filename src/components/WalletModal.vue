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
      class="modal-dialog position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center"
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
          <div class="row flex-column flex-sm-row">
            <div class="col-sm-6 mb-4 mb-sm-0">
              <a
                :href="
                  isMetaMaskInstalled() ? '#' : 'https://metamask.io/download/'
                "
                class="wallet-link metamask-link h-100 d-flex justify-content-between align-items-center flex-column text-center position-relative"
                @click="isMetaMaskInstalled() ? showMetaMaskModal() : undefined"
              >
                <!--            <span class="position-absolute wallet-network-error-background"-->
                <!--                 ></span>-->
                <img
                  src="../assets/images/metamask.svg"
                  class="w-100"
                  alt="metamask"
                />
                <h6>Metamask</h6>
                <!--            <p class="wallet-network-error" >Please change your network to-->
                <!--              Ethereum</p>-->
              </a>
            </div>
            <div class="col-sm-6">
              <a
                href="#"
                class="wallet-link wallet-connect-link h-100 d-flex justify-content-between align-items-center flex-column text-center position-relative"
                @click="runWalletConnect()"
              >
                <img
                  class="w-100"
                  src="../assets/images/walletconnect.svg"
                  alt="walletconnect"
                />
                <h6>WalletConnect</h6>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @TODO: Implement validation for chain network.

import { mapActions, mapGetters } from "vuex";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";

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
    async runWalletConnect() {
      const provider = new WalletConnectProvider({
        infuraId: "270dd5535d1344b2a5a507a081f3d45b",
      });
      await provider.enable();
      return new providers.Web3Provider(provider);
    },
  },
};
</script>
