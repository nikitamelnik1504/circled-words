<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script>
import Header from "./components/TheHeader.vue";
import Footer from "./components/TheFooter.vue";
import store from "@/store";
import detectEthereumProvider from "@metamask/detect-provider";
import { mapActions, mapGetters, mapMutations } from "vuex";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";

export default {
  components: {
    Header,
    Footer,
  },
  beforeCreate() {
    store.commit("initialiseStore");
  },
  async unmounted() {
    if (this.isMetamaskConnected()) {
      let provider = await this.getMetamaskProvider();
      provider.removeListener(
        "accountsChanged",
        this.metamaskAccountsChangedEvent
      );
    }
  },
  async created() {
    const metamaskProvider = await this.getMetamaskProvider();
    const walletConnectProvider = await this.getWalletConnectProvider();

    if (metamaskProvider) {
      this.setMetamaskProvider(metamaskProvider);
      if (this.isMetamaskConnected()) {
        this.resetWalletState();
        await this.connectToMetaMask();
        metamaskProvider.on(
          "accountsChanged",
          this.metamaskAccountsChangedEvent
        );
        const chainId = await metamaskProvider.request({
          method: "eth_chainId",
        });
        // if (chainId !== this.getChainId()) {
        //   this.resetWalletState();
        // }
      }
    }
    if (walletConnectProvider && this.isWalletConnectConnected()) {
      await walletConnectProvider.enable();
      const web3Provider = new providers.Web3Provider(walletConnectProvider);
    }
  },
  methods: {
    ...mapGetters([
      "isMetamaskConnected",
      "getChainId",
      "isWalletConnectConnected",
      "getMetamaskProvider",
    ]),
    ...mapActions([
      "resetWalletState",
      "setMetamaskProvider",
      "connectToMetaMask",
      "connectMetamaskEvents",
    ]),
    ...mapMutations(["setDisconnected"]),
    async getMetamaskProvider() {
      return await detectEthereumProvider();
    },
    async getWalletConnectProvider() {
      return new WalletConnectProvider({
        infuraId: "270dd5535d1344b2a5a507a081f3d45b",
      });
    },
    metamaskAccountsChangedEvent() {
      this.resetWalletState();
      this.$router.go(this.$router.currentRoute);
    },
  },
};
</script>

<style lang="scss">
@import "main";
</style>
