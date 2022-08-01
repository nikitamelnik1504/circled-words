import { VuexModule, Module, Action, Mutation } from "vuex-module-decorators";
import store from "vuex";

// @TODO: Implement chain validation.

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
@Module({ namespaced: true, name: "metamask", store })
class Metamask extends VuexModule {
  public metamaskProvider = {};

  public get getMetamaskProvider(): object {
    return this.metamaskProvider;
  }

  public get isMetamaskInstalled(): boolean {
    return Object.keys(this.metamaskProvider).length !== 0;
  }

  @Mutation
  public setMetamaskProvider(provider: Promise<unknown>): void {
    this.metamaskProvider = provider;
  }

  @Action
  public updateMetamaskProvider(provider: Promise<unknown>): void {
    this.context.commit("setMetamaskProvider", provider);
  }

  @Action
  public async connectToMetamask(): Promise<string> {
    const provider = this.context.getters.getMetamaskProvider;
    return provider
      .request({ method: "eth_requestAccounts" })
      .then((walletAddress: Array<unknown>) => {
        // @TODO: Implement multiple accounts.
        this.context.commit("wallet/setWalletAddress", walletAddress[0], {
          root: true,
        });
        this.context.commit("wallet/setWalletType", "metamask", { root: true });
        this.context.commit("wallet/setConnected", true, { root: true });
        return "connected";
      })
      .catch((error: never) => {
        console.log(error);
        return "not_connected";
      });
  }

  @Action
  public async addMetamaskEventListeners(events: Array<any>): Promise<void> {
    const provider = await this.context.getters.getMetamaskProvider;
    for (const event_id in events) {
      provider.on(event_id, events[event_id]);
    }
  }

  @Action
  public async removeMetamaskEventListeners(events: Array<any>): Promise<void> {
    const provider = await this.context.getters.getMetamaskProvider;
    for (const event_id in events) {
      provider.removeListener(event_id, events[event_id]);
    }
  }
}

export default Metamask;
