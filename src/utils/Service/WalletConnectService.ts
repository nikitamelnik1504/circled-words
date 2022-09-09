import WalletServiceBase from "./WalletServiceBase";
import type { Store } from "vuex";
import type WalletConnectProvider from "@walletconnect/web3-provider";

export default class WalletConnectService extends WalletServiceBase {
  constructor(
    public provider: WalletConnectProvider,
    public store: Store<unknown>,
    public events: Record<
      string,
      Array<{ callback: () => unknown; connected: boolean }>
    > = {}
  ) {
    super(provider, store, events);
  }

  public static async create(
    provider: WalletConnectProvider,
    store: Store<unknown>,
    events: Record<
      string,
      Array<{ callback: () => unknown; connected: boolean }>
    > = {}
  ): Promise<WalletConnectService> {
    const instance = new this(provider, store, events);

    // Check if metamask was connected before page reload.
    if (instance.isConnected()) {
      store.commit("wallet/setDefaultWalletState");
      await instance.connect().then(() => {
        instance.addEventsGroup(events);
      });
    }

    this.initialized = true;
    return instance;
  }

  public isConnected(): boolean {
    return (
      this.store.getters["wallet/getActiveType"] === "walletConnect" &&
      this.store.getters["wallet/getStatus"] === "connected"
    );
  }

  public async connect(): Promise<string> {
    if (this.provider.connected) {
      this.store.commit("wallet/setWalletAddress", this.provider.accounts[0]);
      this.store.commit("wallet/setWalletType", "walletConnect");
      this.store.commit("wallet/setConnected", true);
      return "connected";
    }

    return this.provider
      .enable()
      .then((address) => {
        this.store.commit("wallet/setWalletAddress", address[0]);
        this.store.commit("wallet/setWalletType", "walletConnect");
        this.store.commit("wallet/setConnected", true);
        return "connected";
      })
      .catch((error) => {
        console.log(error);
        return "not_connected";
      });
  }

  public addEvent(
    name: string,
    callback: () => void,
    onConnected = false
  ): void {
    if (onConnected && !this.isConnected()) {
      return;
    }

    this.provider.connector.on(name, callback);
  }

  public addEventsGroup(
    events: Record<
      string,
      Array<{ callback: () => unknown; connected: boolean }>
    >
  ): void {
    for (const event_type in events) {
      events[event_type].forEach((item) => {
        this.addEvent(
          event_type,
          item.callback as () => never,
          item.connected as unknown as boolean
        );
      });
    }
  }

  public async disconnect(): Promise<void> {
    this.store.commit("wallet/setDefaultWalletState");
    return this.provider.disconnect();
  }
}
