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
                  isMetamaskInstalled() ? '#' : 'https://metamask.io/download/'
                "
                class="wallet-link metamask-link h-100 d-flex justify-content-between align-items-center flex-column text-center position-relative"
                @click="isMetamaskInstalled() ? showMetamaskModal() : undefined"
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
                @click="showWalletConnectModal()"
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
import { mapActions, mapGetters } from "vuex";
import store from "../store";

export default {
  async unmounted() {
    if (await this.isMetamaskConnected()) {
      await this.removeMetamaskEventListeners(this.getMetamaskEvents());
    }
    if (await this.isWalletConnectConnected()) {
      await this.removeWalletConnectEventListeners(
        this.getWalletConnectEvents()
      );
    }
  },
  methods: {
    ...mapGetters([
      "isMetamaskConnected",
      "isMetamaskInstalled",
      "isWalletConnectConnected",
    ]),
    ...mapActions([
      "connectToMetamask",
      "connectToWalletConnect",
      "removeMetamaskEventListeners",
      "removeWalletConnectEventListeners",
      "resetWalletState",
    ]),
    getMetamaskEvents() {
      return {
        accountsChanged: this.metamaskAccountsChangedEvent,
      };
    },
    getWalletConnectEvents() {
      return {
        disconnect: this.walletConnectAccountsChangedEvent,
      };
    },
    walletConnectAccountsChangedEvent() {
      this.resetWalletState();
      this.$router.go(this.$router.currentRoute);
    },
    metamaskAccountsChangedEvent() {
      this.resetWalletState();
      this.$router.go(this.$router.currentRoute);
    },
    async showMetamaskModal() {
      let connectionToMetaMask = this.connectToMetamask();
      let metamaskEvents = this.getMetamaskEvents();
      let walletModalCloseButton = this.$refs.CloseWalletModal;
      let router = this.$router;
      connectionToMetaMask.then(function (result) {
        if (result === "connected") {
          store.dispatch("addMetamaskEventListeners", metamaskEvents);
          router.push("/my-words");
          walletModalCloseButton.click();
        }
      });
    },
    async showWalletConnectModal() {
      let connectionToWalletConnect = this.connectToWalletConnect();
      let walletConnectEvents = this.getWalletConnectEvents();
      let walletModalCloseButton = this.$refs.CloseWalletModal;
      let router = this.$router;
      connectionToWalletConnect.then((result) => {
        if (result === "connected") {
          store.dispatch("addWalletConnectEventListeners", walletConnectEvents);
          router.push("/my-words");
          walletModalCloseButton.click();
        }
      });
    },
  },
};
</script>
