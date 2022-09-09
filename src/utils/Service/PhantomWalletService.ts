import WalletServiceBase from "./WalletServiceBase";
import type { Store } from "vuex";
import type { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";

export default class PhantomWalletService extends WalletServiceBase {
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

    // Check if metamask was connected before page reload.
    if (instance.isConnected()) {
      store.commit("wallet/setDefaultWalletState");
      await instance.connect().then(() => {
        // instance.addEventsGroup(events);
      });
    }

    this.initialized = true;
    return instance;
  }

  async connect(): Promise<string> {
    return this.provider
      .connect()
      .then(() => {
        this.store.commit(
          "wallet/setWalletAddress",
          this.provider.publicKey?.toString()
        );
        this.store.commit("wallet/setWalletType", "phantomWallet");
        this.store.commit("wallet/setConnected", true);
        return "connected";
      })
      .catch((error) => {
        console.log(error);
        return "not_connected";
      });
  }

  public async disconnect(): Promise<void> {
    this.store.commit("wallet/setDefaultWalletState");
    return this.provider.disconnect();
  }

  isConnected(): boolean {
    return (
      this.store.getters["wallet/getActiveType"] === "phantomWallet" &&
      this.store.getters["wallet/getStatus"] === "connected"
    );
  }
}
