import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import type { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";

export default class MetaplexService {
  protected metaplex: Metaplex;

  constructor(provider: PhantomWalletAdapter) {
    const connection = new Connection(clusterApiUrl("devnet"));
    this.metaplex = Metaplex.make(connection).use(
      walletAdapterIdentity(provider)
    );
    console.log("Metaplex is working!");
  }
}
