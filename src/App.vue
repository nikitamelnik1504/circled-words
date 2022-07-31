<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script lang="ts">
import { Vue, Options } from "vue-property-decorator";
import Header from "./components/TheHeader.vue";
import Footer from "./components/TheFooter.vue";
import store from "@/store";
import detectEthereumProvider from "@metamask/detect-provider";
import { namespace } from "s-vuex-class";

const wallet = namespace("wallet");
const metamask = namespace("metamask");
const walletConnect = namespace("walletConnect");
import WalletConnectProvider from "@walletconnect/web3-provider";

@Options({
  name: "App",
  components: {
    Header,
    Footer
  }
})
export default class App extends Vue {

  public $router;

  public async getMetamaskProviderFromDom() {
    return await detectEthereumProvider();
  }

  @wallet.Getter
  public isMetamaskConnected!: () => boolean;

  @wallet.Getter
  public getChainId!: () => string;

  @wallet.Getter
  public isWalletConnectConnected!: () => boolean;

  @wallet.Action
  public resetWalletState!: (closeSession: boolean) => void;

  @metamask.Action
  public updateMetamaskProvider!: (provider) => void;

  @metamask.Action
  public connectToMetamask!: () => Promise<string>;

  @metamask.Action
  public addMetamaskEventListeners!: (events) => Promise<any>;

  @metamask.Action
  public removeMetamaskEventListeners!: (events) => Promise<any>;

  @walletConnect.Action
  public removeWalletConnectEventListeners!: (events) => Promise<any>;

  @walletConnect.Action
  public connectToWalletConnect!: () => Promise<string>;

  @walletConnect.Action
  public updateWalletConnectProvider!: (provider) => void;

  @walletConnect.Action
  public addWalletConnectEventListeners!: (events) => Promise<any>;

  @walletConnect.Action
  public updateWalletConnectInitialization!: () => void;

  beforeCreate() {
    store.commit("initialiseStore");
  }

  async created() {
    const metamaskProvider = await this.getMetamaskProviderFromDom();
    const walletConnectProvider = await this.getWalletConnectProvider();
    const globalObject = this;
    Promise.resolve(walletConnectProvider).then(function() {
      globalObject.updateWalletConnectInitialization();
    });

    if (metamaskProvider) {
      this.updateMetamaskProvider(metamaskProvider);
      if (this.isMetamaskConnected) {
        this.resetWalletState(false);
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
      this.updateWalletConnectProvider(walletConnectProvider);
      if (this.isWalletConnectConnected) {
        this.resetWalletState(false);
        await Promise.resolve(await this.connectToWalletConnect()).then(() => {
          this.addWalletConnectEventListeners(this.getWalletConnectEvents());
        });
      }
    }
  }

  async unmounted() {
    if (await this.isMetamaskConnected) {
      await this.removeMetamaskEventListeners(this.getMetamaskEvents());
    }
    if (await this.isWalletConnectConnected) {
      await this.removeWalletConnectEventListeners(
        this.getWalletConnectEvents()
      );
    }
  }

  async getWalletConnectProvider() {
    return new WalletConnectProvider({
      infuraId: "270dd5535d1344b2a5a507a081f3d45b"
    });
  }

  getMetamaskEvents() {
    return {
      accountsChanged: this.walletConnectAccountsChangedEvent
    };
  }

  metamaskAccountsChangedEvent() {
    this.resetWalletState(false);
    this.$router.go(this.$router.currentRoute);
  }

  getWalletConnectEvents() {
    return {
      disconnect: this.walletConnectAccountsChangedEvent
    };
  }

  walletConnectAccountsChangedEvent() {
    this.resetWalletState(false);
    this.$router.go(this.$router.currentRoute);
  }
}
</script>

<style lang="scss">
@import "main";
</style>
