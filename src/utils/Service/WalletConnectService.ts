import WalletServiceBase from "./WalletServiceBase";
import type { Store } from "vuex";
import type WalletConnectProvider from "@walletconnect/web3-provider";

export default class WalletConnectService extends WalletServiceBase {
  public connected = false;
  public connectedToSite = false;
  public initializer?: () => WalletConnectProvider;

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
    > = {},
    initializer: () => WalletConnectProvider
  ): Promise<WalletConnectService> {
    const instance = new this(provider, store, events);

    instance.connected = true;

    // Check if metamask was connected before page reload.
    if (store.getters["wallet/isWalletConnectConnected"]) {
      store.commit("wallet/setDefaultWalletState");
      await instance.connect().then(() => {
        instance.addEventsGroup(events);
        instance.connectedToSite = true;
      });
    }

    instance.initializer = initializer;
    return instance;
  }

  public async connect(): Promise<string> {
    if (this.provider.connected) {
      this.store.commit("wallet/setWalletAddress", this.provider.accounts[0]);
      this.store.commit("wallet/setWalletType", "walletConnect");
      this.store.commit("wallet/setConnected", true);
      this.connected = true;
      this.connectedToSite = true;
      return "connected";
    }

    return this.provider
      .enable()
      .then((address) => {
        this.store.commit("wallet/setWalletAddress", address[0]);
        this.store.commit("wallet/setWalletType", "walletConnect");
        this.store.commit("wallet/setConnected", true);
        this.connected = true;
        this.connectedToSite = true;
        return "connected";
      })
      .catch((error) => {
        console.log(error);
        this.provider = (this.initializer as () => WalletConnectProvider)();
        return "not_connected";
      });
  }

  public addEvent(
    name: string,
    callback: () => void,
    onConnected = false
  ): void {
    if (onConnected && !this.connectedToSite) {
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
    this.connectedToSite = false;
    this.connected = false;
    return this.provider.disconnect();
  }
}
