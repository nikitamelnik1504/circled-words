import { providers } from "ethers";
import { VuexModule, Module, Action, Mutation } from "vuex-module-decorators";
import store from "vuex";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
@Module({ namespaced: true, name: "walletConnect", store })
class WalletConnect extends VuexModule {
  public walletConnectProvider = {
    web3Provider: {},
    provider: {},
  };

  public walletConnectInitialized = false;

  public get getWalletConnectProvider(): object {
    return this.walletConnectProvider.provider;
  }

  public get getWeb3WalletConnectProvider(): object {
    return this.walletConnectProvider.web3Provider;
  }

  public get isWalletConnectInitialized(): boolean {
    return this.walletConnectInitialized;
  }

  @Mutation
  public setWeb3WalletConnectProvider(provider: Promise<unknown>): void {
    this.walletConnectProvider.web3Provider = provider;
  }

  @Mutation
  public setWalletConnectProvider(provider: Promise<unknown>): void {
    this.walletConnectProvider.provider = provider;
  }

  @Mutation
  public setWalletConnectInitialized(): void {
    this.walletConnectInitialized = true;
  }

  @Action
  public updateWeb3WalletConnectProvider(provider: Promise<unknown>): void {
    this.context.commit("setWeb3WalletConnectProvider", provider);
  }

  @Action
  public updateWalletConnectProvider(provider: Promise<unknown>): void {
    this.context.commit("setWalletConnectProvider", provider);
  }

  @Action
  public async addWalletConnectEventListeners(
    events: Array<any>
  ): Promise<void> {
    const provider = await this.context.getters.getWalletConnectProvider;
    for (const event_id in events) {
      provider.on(event_id, events[event_id]);
    }
  }

  @Action
  public async removeWalletConnectEventListeners(
    events: Array<any>
  ): Promise<void> {
    const provider = await this.context.getters.getWalletConnectProvider;
    for (const event_id in events) {
      provider.removeListener(event_id, events[event_id]);
    }
  }

  @Action
  public async connectToWalletConnect(): Promise<string> {
    const provider = this.context.getters.getWalletConnectProvider;
    return await provider
      .enable()
      .then((address: Array<unknown>) => {
        const web3Provider = new providers.Web3Provider(provider);
        this.context.commit("setWeb3WalletConnectProvider", web3Provider);
        this.context.commit("wallet/setWalletAddress", address[0], {
          root: true,
        });
        this.context.commit("wallet/setWalletType", "walletConnect", {
          root: true,
        });
        this.context.commit("wallet/setConnected", true, { root: true });
        return "connected";
      })
      .catch((error: never) => {
        console.log(error);
        return "not_connected";
      });
  }

  @Action
  public updateWalletConnectInitialization() {
    this.context.commit("setWalletConnectInitialized");
  }
}

export default WalletConnect;
