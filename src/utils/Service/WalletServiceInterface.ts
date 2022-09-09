import type { Store } from "vuex";

export default interface WalletServiceInterface {
  provider: unknown;
  store: Store<unknown>;
  events: Record<
    string,
    Array<{ callback: () => unknown; connected: boolean }>
  >;

  isConnected(): boolean;

  connect(): Promise<string>;

  disconnect(): void;
}
