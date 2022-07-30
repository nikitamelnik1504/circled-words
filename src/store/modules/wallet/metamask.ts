import { VuexModule, Module, Action, Mutation } from "vuex-module-decorators";
import store from "vuex";

// @TODO: Implement chain validation.

@Module({ namespaced: true, name: "metamask", store })
class Metamask extends VuexModule {
  public metamaskProvider: object = {};

  public get getMetamaskProvider(): object {
    return this.metamaskProvider;
  }

  public get isMetamaskInstalled(): boolean {
    return Object.keys(this.metamaskProvider).length !== 0;
  }

  @Mutation
  public setMetamaskProvider(provider): void {
    this.metamaskProvider = provider;
  }

  @Action
  public updateMetamaskProvider(provider): void {
    this.context.commit("setMetamaskProvider", provider);
  }

  @Action
  public async connectToMetamask(): Promise<string> {
    let provider = this.context.getters.getMetamaskProvider;
    return provider
      .request({ method: "eth_requestAccounts" })
      .then((walletAddress) => {
        // @TODO: Implement multiple accounts.
        this.context.commit("wallet/setWalletAddress", walletAddress[0], { root: true });
        this.context.commit("wallet/setWalletType", "metamask", { root: true });
        this.context.commit("wallet/setConnected", true, { root: true });
        return "connected";
      })
      .catch((error) => {
        console.log(error);
        return "not_connected";
      });
  }

  @Action
  public async addMetamaskEventListeners(events): Promise<any> {
    let provider = await this.context.getters.getMetamaskProvider;
    for (let event_id in events) {
      provider.on(event_id, events[event_id]);
    }
  }

  @Action
  public async removeMetamaskEventListeners(events): Promise<any> {
    let provider = await this.context.getters.getMetamaskProvider;
    for (let event_id in events) {
      provider.removeListener(event_id, events[event_id]);
    }
  }

}

export default Metamask;
