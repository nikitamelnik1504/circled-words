import WalletServiceBase from "./WalletServiceBase";
import type { Store } from "vuex";
import type { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import type { WalletAdapterEvents } from "@solana/wallet-adapter-base";

export default class PhantomWalletService extends WalletServiceBase {
  public connected = false;
  public connectedToSite = false;

  constructor(
    public provider: PhantomWalletAdapter,
    public store: Store<unknown>,
    public events: Record<
      string,
      Array<{ callback: () => unknown; connected: boolean }>
    >
  ) {
    super(provider, store, events);
  }

  public static async create(
    provider: PhantomWalletAdapter,
    store: Store<unknown>,
    events: Record<
      string,
      Array<{ callback: () => unknown; connected: boolean }>
    >
  ): Promise<PhantomWalletService> {
    const instance = new this(provider, store, events);

    // const enc = new TextEncoder();
    // const signature_text = 'Please approve your login to the CircledWords site.';
    // await provider.signMessage(enc.encode(signature_text));

    // @ts-ignore
    instance.connected = false; // @TODO Implement Eagerly Connecting.

    // Check if phantomWallet was connected before page reload.
    if (instance.store.getters["wallet/isPhantomWalletConnected"]) {
      store.commit("wallet/setDefaultWalletState");
      await instance.connect().then((status) => {
        if (status === "connected") {
          instance.addEventsGroup(events);
          instance.connected = true;
          instance.connectedToSite = true;
        }
      });
    }

    return instance;
  }

  async connect(): Promise<string> {
    return (
      this.provider
        .connect()
        // @ts-ignore Not typed in provider.
        .then((value: { publicKey: unknown }) => {
          this.store.commit("wallet/setWalletAddress", {
            address: value.publicKey?.toString(),
          });
          this.store.commit("wallet/setWalletType", { type: "phantomWallet" });
          this.store.commit("wallet/setConnected");
          this.connected = true;
          this.connectedToSite = true;
          return "connected";
        })
        .catch((error) => {
          console.log(error);
          return "not_connected";
        })
    );
  }

  public addEvent(
    name: string,
    callback: () => void,
    onConnected = false
  ): void {
    if (onConnected && !this.connectedToSite) {
      return;
    }
    this.provider.on(name as keyof WalletAdapterEvents, callback);
  }

  public removeEvent(name: string, callback: () => void): void {
    this.provider.removeListener(name as keyof WalletAdapterEvents, callback);
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

  public async disconnect(): Promise<void> {
    this.store.commit("wallet/setDefaultWalletState");
    this.connected = false;
    this.connectedToSite = false;
    return this.provider.disconnect();
  }
}
