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
import router from "@/router";
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
    Footer,
  },
})
export default class App extends Vue {
  public async getMetamaskProviderFromDom() {
    return await detectEthereumProvider();
  }

  @wallet.Getter
  public isMetamaskConnected!: string;

  @wallet.Getter
  public getChainId!: string;

  @wallet.Getter
  public isWalletConnectConnected!: string;

  @wallet.Action
  public resetWalletState!: (closeSession: boolean) => void;

  @metamask.Action
  public updateMetamaskProvider!: (provider: object) => void;

  @metamask.Action
  public connectToMetamask!: () => Promise<string>;

  @metamask.Action
  public addMetamaskEventListeners!: (events: object) => Promise<void>;

  @metamask.Action
  public removeMetamaskEventListeners!: (events: object) => Promise<string>;

  @walletConnect.Action
  public removeWalletConnectEventListeners!: (
    events: object
  ) => Promise<string>;

  @walletConnect.Action
  public connectToWalletConnect!: () => Promise<string>;

  @walletConnect.Action
  public updateWalletConnectProvider!: (provider: object) => void;

  @walletConnect.Action
  public addWalletConnectEventListeners!: (events: object) => Promise<string>;

  @walletConnect.Action
  public updateWalletConnectInitialization!: () => void;

  beforeCreate(): void {
    store.commit("initialiseStore");
  }

  async created(): Promise<void> {
    const metamaskProvider = await this.getMetamaskProviderFromDom();
    const walletConnectProvider = await this.getWalletConnectProvider();
    Promise.resolve(walletConnectProvider).then(() => {
      this.updateWalletConnectInitialization();
    });

    if (metamaskProvider) {
      this.updateMetamaskProvider(metamaskProvider);
      if (this.isMetamaskConnected === "connected") {
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
      if (this.isWalletConnectConnected === "connected") {
        this.resetWalletState(false);
        await Promise.resolve(await this.connectToWalletConnect()).then(() => {
          this.addWalletConnectEventListeners(this.getWalletConnectEvents());
        });
      }
    }
  }

  async unmounted(): Promise<void> {
    if (await this.isMetamaskConnected) {
      await this.removeMetamaskEventListeners(this.getMetamaskEvents());
    }
    if (await this.isWalletConnectConnected) {
      await this.removeWalletConnectEventListeners(
        this.getWalletConnectEvents()
      );
    }
  }

  async getWalletConnectProvider(): Promise<WalletConnectProvider> {
    return new WalletConnectProvider({
      infuraId: "270dd5535d1344b2a5a507a081f3d45b",
    });
  }

  getMetamaskEvents(): Record<string, () => void> {
    return {
      accountsChanged: this.walletConnectAccountsChangedEvent,
    };
  }

  metamaskAccountsChangedEvent(): void {
    this.resetWalletState(false);
    router.push(router.currentRoute.value);
  }

  getWalletConnectEvents(): Record<string, () => void> {
    return {
      disconnect: this.walletConnectAccountsChangedEvent,
    };
  }

  walletConnectAccountsChangedEvent(): void {
    this.resetWalletState(false);
    router.push(router.currentRoute.value);
  }
}
</script>

<style lang="scss">
@import "main";
</style>
