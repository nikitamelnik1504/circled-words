import type { Store } from "vuex";

export default interface WalletServiceInterface {
  connected: boolean;
  connectedToSite: boolean;

  provider: unknown;
  store: Store<unknown>;
  events: Record<
    string,
    Array<{ callback: () => unknown; connected: boolean }>
  >;

  connect(): Promise<string>;

  addEvent(...args: Array<unknown>): void;

  addEventsGroup(
    events: Record<
      string,
      Array<{ callback: () => unknown; connected: boolean }>
    >
  ): void;

  disconnect(): void;
}
