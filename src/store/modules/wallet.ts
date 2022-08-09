import { VuexModule, Module, Action, Mutation } from "vuex-module-decorators";
import store from "vuex";

const getDefaultWalletState = () => {
  return {
    type: "",
    walletAddress: "",
    connected: false,
    chainId: "",
  };
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
@Module({ namespaced: true, name: "wallet", store })
class Wallet extends VuexModule {
  public wallet = getDefaultWalletState();

  public get isMetamaskConnected(): string {
    return this.wallet.type === "metamask" && this.wallet.connected
      ? "connected"
      : "not_connected";
  }

  public get getWalletAddress(): string {
    return this.wallet.walletAddress;
  }

  public get isWalletConnectConnected(): string {
    return this.wallet.type === "walletConnect" && this.wallet.connected
      ? "connected"
      : "not_connected";
  }

  public get getChainId(): string {
    return this.wallet.chainId;
  }

  @Mutation
  public setDefaultWalletState(): void {
    this.wallet = getDefaultWalletState();
  }

  @Action
  public resetWalletState(closeSession = false) {
    if (
      closeSession &&
      this.context.getters.isWalletConnectConnected === "connected"
    ) {
      this.context.rootGetters[
        "walletConnect/getWalletConnectProvider"
      ].disconnect();
    }
    this.context.commit("setDefaultWalletState");
  }

  @Mutation
  public setWalletType(type: string): void {
    this.wallet.type = type;
  }

  @Mutation
  public setConnected(): void {
    this.wallet.connected = true;
  }

  @Mutation
  public setDisconnected(): void {
    this.wallet.connected = false;
  }

  @Mutation
  public setWalletAddress(address: string): void {
    this.wallet.walletAddress = address;
  }
}

export default Wallet;
