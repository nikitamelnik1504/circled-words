// @TODO: Implement chain validation.
import type { Store } from "vuex";
import type { EventEmitter } from "@solana/wallet-adapter-base";
import WalletServiceBase from "./WalletServiceBase";

interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

export interface MetamaskProvider {
  request(args: RequestArguments): Promise<unknown | Array<unknown>>;

  on(eventName: string | symbol, callback: () => void): EventEmitter;

  removeListener(
    eventName: string | symbol,
    callback: () => void
  ): EventEmitter;
}

export default class MetamaskService extends WalletServiceBase {
  constructor(
    public provider: MetamaskProvider,
    public store: Store<unknown>,
    public events: Record<
      string,
      Array<{ callback: () => unknown; connected: boolean }>
    > = {}
  ) {
    super(provider, store, events);
  }

  public static async create(
    provider: MetamaskProvider,
    store: Store<unknown>,
    events: Record<
      string,
      Array<{ callback: () => unknown; connected: boolean }>
    > = {}
  ): Promise<MetamaskService> {
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
      this.store.getters["wallet/getActiveType"] === "metamask" &&
      this.store.getters["wallet/getStatus"] === "connected"
    );
  }

  public async connect(): Promise<string> {
    return this.provider
      .request({ method: "eth_requestAccounts" })
      .then((walletAddress) => {
        // @TODO: Implement multiple accounts.
        this.store.commit(
          "wallet/setWalletAddress",
          (walletAddress as Array<unknown>)[0]
        );
        this.store.commit("wallet/setWalletType", "metamask");
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
    this.provider.on(name, callback);
  }

  public removeEvent(name: string, callback: () => void): void {
    this.provider.removeListener(name, callback);
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

  public removeEventsGroup(
    events: Record<string, Array<{ callback: () => unknown }>>
  ): void {
    for (const event_type in events) {
      events[event_type].forEach((item) => {
        this.removeEvent(event_type, item.callback);
      });
    }
  }

  public disconnect(): void {
    this.store.commit("wallet/setDefaultWalletState");
  }
}
