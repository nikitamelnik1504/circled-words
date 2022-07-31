import { providers } from "ethers";
import { VuexModule, Module, Action, Mutation } from "vuex-module-decorators";
import store from "vuex";

@Module({ namespaced: true, name: "walletConnect", store })
class WalletConnect extends VuexModule {
  public walletConnectProvider: object = {
    web3Provider: {},
    provider: {}
  };

  public walletConnectInitialized: boolean = false;

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
  public setWeb3WalletConnectProvider(provider): void {
    this.walletConnectProvider.web3Provider = provider;
  }

  @Mutation
  public setWalletConnectProvider(provider): void {
    this.walletConnectProvider.provider = provider;
  }

  @Mutation
  public setWalletConnectInitialized(): void {
    this.walletConnectInitialized = true;
  }

  @Action
  public updateWeb3WalletConnectProvider(provider): void {
    this.context.commit("setWeb3WalletConnectProvider", provider);
  }

  @Action
  public updateWalletConnectProvider(provider): void {
    this.context.commit("setWalletConnectProvider", provider);
  }

  @Action
  public async addWalletConnectEventListeners(events): Promise<any> {
    let provider = await this.context.getters.getWalletConnectProvider;
    for (let event_id in events) {
      provider.on(event_id, events[event_id]);
    }
  }

  @Action
  public async removeWalletConnectEventListeners(events): Promise<any> {
    let provider = await this.context.getters.getWalletConnectProvider;
    for (let event_id in events) {
      provider.removeListener(event_id, events[event_id]);
    }
  }

  @Action
  public async connectToWalletConnect(): Promise<string> {
    let provider = this.context.getters.getWalletConnectProvider;
    return await provider
      .enable()
      .then((address) => {
        const web3Provider = new providers.Web3Provider(provider);
        this.context.commit("setWeb3WalletConnectProvider", web3Provider);
        this.context.commit("wallet/setWalletAddress", address[0], { root: true });
        this.context.commit("wallet/setWalletType", "walletConnect", { root: true });
        this.context.commit("wallet/setConnected", true, { root: true });
        return "connected";
      })
      .catch((error) => {
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
