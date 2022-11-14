import { Metaplex } from "@metaplex-foundation/js";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";

export default class MetaplexService {
  protected metaplex?: Metaplex;

  constructor() {
    const connection = new Connection(clusterApiUrl("devnet"));
    this.metaplex = Metaplex.make(connection);
    console.log(Keypair.generate());
  }
}
