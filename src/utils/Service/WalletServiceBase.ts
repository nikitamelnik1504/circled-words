import type WalletServiceInterface from "./WalletServiceInterface";
import type { Store } from "vuex";

export default abstract class WalletServiceBase
  implements WalletServiceInterface
{
  static initialized = false;

  protected constructor(
    public provider: unknown,
    public store: Store<unknown>,
    public events = {}
  ) {}

  // @TODO: Skill issue. We need to implemented static definition of create there.
  // static create() {}

  public abstract isConnected(): boolean;

  public abstract connect(): Promise<string>;

  public abstract disconnect(): void;
}
