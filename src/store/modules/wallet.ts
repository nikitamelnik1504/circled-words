import { VuexModule, Module, Action, Mutation } from "vuex-module-decorators";
import store from "vuex";

const getDefaultWalletState = () => {
  return {
    type: "",
    walletAddress: "",
    connected: false,
    chainId: ""
  };
};

@Module({ namespaced: true, name: "wallet", store })
class Wallet extends VuexModule {
  public wallet: object = getDefaultWalletState();

  public get isMetamaskConnected(): boolean {
    return this.wallet.type === "metamask" && this.wallet.connected === true;
  }

  public get getWalletAddress(): string {
    return this.wallet.walletAddress;
  }

  public get isWalletConnectConnected(): boolean {
    return (
      this.wallet.type === "walletConnect" && this.wallet.connected === true
    );
  }

  public get getChainId(): string {
    return this.wallet.chainId;
  }

  @Mutation
  public setDefaultWalletState(): void {
    this.wallet = getDefaultWalletState();
  }

  @Action
  public resetWalletState(closeSession: boolean = false) {
    if (closeSession && this.context.getters.isWalletConnectConnected) {
      this.context.rootGetters['walletConnect/getWalletConnectProvider'].disconnect();
    }
    this.context.commit("setDefaultWalletState");
  }

  @Mutation
  public setWalletType(type): void {
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
  public setWalletAddress(address): void {
    this.wallet.walletAddress = address;
  }

}

export default Wallet;
