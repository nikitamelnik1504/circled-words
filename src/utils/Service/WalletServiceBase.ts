import type WalletServiceInterface from "./WalletServiceInterface";
import type { Store } from "vuex";

export default abstract class WalletServiceBase
  implements WalletServiceInterface
{
  public abstract connected: boolean;
  public abstract connectedToSite: boolean;

  protected constructor(
    public provider: unknown,
    public store: Store<unknown>,
    public events = {}
  ) {}

  // @TODO: Skill issue. We need to implemented static definition of create there.
  // static create() {}

  public abstract connect(): Promise<string>;

  public abstract addEvent(...args: Array<unknown>): void;

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

  public abstract disconnect(): void;
}
