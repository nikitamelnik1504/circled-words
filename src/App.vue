<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/TheHeader.vue";
import Footer from "./components/TheFooter.vue";
import store from "@/store";
import detectEthereumProvider from "@metamask/detect-provider";
import { mapActions, mapGetters, mapMutations } from "vuex";
import WalletConnectProvider from "@walletconnect/web3-provider";

export default defineComponent({
  components: {
    Header,
    Footer
  },
  beforeCreate() {
    store.commit("initialiseStore");
  },
  async created() {
    const metamaskProvider = await this.getMetamaskProviderFromDom();
    const walletConnectProvider = await this.getWalletConnectProvider();
    Promise.resolve(walletConnectProvider).then(function() {
      store.dispatch("setWalletConnectInitialized");
    });

    if (metamaskProvider) {
      this.setMetamaskProvider(metamaskProvider);
      if (this.isMetamaskConnected()) {
        this.resetWalletState();
        // @TODO: Implement promise wait.
        await Promise.resolve(await this.connectToMetamask()).then(() => {
          this.addMetamaskEventListeners(this.getMetamaskEvents());
        });
        // const chainId = await metamaskProvider.request({
        //   method: "eth_chainId",
        // });
        // if (chainId !== this.getChainId()) {
        //   this.resetWalletState();
        // }
      }
    }
    if (walletConnectProvider) {
      this.setWalletConnectProvider(walletConnectProvider);
      if (this.isWalletConnectConnected()) {
        this.resetWalletState();
        await Promise.resolve(await this.connectToWalletConnect()).then(() => {
          this.addWalletConnectEventListeners(this.getWalletConnectEvents());
        });
      }
    }
  },
  async unmounted() {
    if (await this.isMetamaskConnected()) {
      await this.removeMetamaskEventListeners(this.getMetamaskEvents());
    }
    if (await this.isWalletConnectConnected) {
      await this.removeWalletConnectEventListeners(
        this.getWalletConnectEvents()
      );
    }
  },
  methods: {
    ...mapGetters([
      "isMetamaskConnected",
      "getChainId",
      "isWalletConnectConnected",
      "getMetamaskProvider"
    ]),
    ...mapActions([
      "resetWalletState",
      "setMetamaskProvider",
      "connectToMetamask",
      "addMetamaskEventListeners",
      "removeMetamaskEventListeners",
      "removeWalletConnectEventListeners",
      "connectToWalletConnect",
      "setWalletConnectProvider",
      "addWalletConnectEventListeners"
    ]),
    ...mapMutations(["setDisconnected"]),
    async getMetamaskProviderFromDom() {
      return await detectEthereumProvider();
    },
    async getWalletConnectProvider() {
      return new WalletConnectProvider({
        infuraId: "270dd5535d1344b2a5a507a081f3d45b"
      });
    },
    getMetamaskEvents() {
      return {
        accountsChanged: this.walletConnectAccountsChangedEvent
      };
    },
    metamaskAccountsChangedEvent() {
      this.resetWalletState();
      this.$router.go(this.$router.currentRoute);
    },
    getWalletConnectEvents() {
      return {
        disconnect: this.walletConnectAccountsChangedEvent
      };
    },
    walletConnectAccountsChangedEvent() {
      this.resetWalletState();
      this.$router.go(this.$router.currentRoute);
    }
  }
});
</script>

<style lang="scss">
@import "main";
</style>
