import {
  Metaplex,
  walletAdapterIdentity,
  bundlrStorage,
} from "@metaplex-foundation/js";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import type { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import type { Property } from "@/utils/Service/CircledWordService";

export default class MetaplexService {
  protected metaplex: Metaplex;
  public nftStage: "JSON Upload" | "Create" | null = null;

  private collectionAddress = new PublicKey(
    "8wAXCzCiLpsbBN3WM3cba7fALnFytNRjkDGLe16YfUtb"
  );

  constructor(provider: PhantomWalletAdapter) {
    const connection = new Connection(clusterApiUrl("devnet"));
    this.metaplex = Metaplex.make(connection).use(
      walletAdapterIdentity(provider)
    );
    this.metaplex.use(
      bundlrStorage({
        address: "https://devnet.bundlr.network",
        providerUrl: "https://api.devnet.solana.com",
        timeout: 60000,
      })
    );
  }

  async createNFT(properties: Array<Property>) {
    this.nftStage = "JSON Upload";

    const attributes = (() => {
      const result: { trait_type: string; value: string }[] = [];
      for (const property of properties) {
        result.push({
          trait_type: property.label,
          value: property.value as string,
        });
      }
      return result;
    })();

    const nft_json = {
      name: "CircledWord #DEV",
      symbol: "CW",
      description: "",
      image: "",
      animation_url: "",
      external_url: "",
      attributes,
    };

    const json_link = await this.metaplex.storage().uploadJson(nft_json);

    this.nftStage = "Create";

    await this.metaplex.nfts().create({
      uri: json_link,
      name: "CircledWord #DEV",
      symbol: "CW",
      collection: this.collectionAddress,
      sellerFeeBasisPoints: 500,
      isCollection: false,
    });

    this.nftStage = null;
  }

  async loadNFTs() {
    await this.metaplex
      .nfts()
      .findAllByCreator({ creator: this.metaplex.identity().publicKey });
  }

  async createCollection() {
    await this.metaplex.nfts().create({
      uri: "",
      collection: null,
      name: "CircledWords",
      symbol: "CW",
      isMutable: false,
      sellerFeeBasisPoints: 250,
      isCollection: true,
    });
  }
}
