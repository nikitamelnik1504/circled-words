import {
  Metaplex,
  bundlrStorage,
  toMetaplexFile,
} from "@metaplex-foundation/js";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import type { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import type { Property } from "@/utils/Service/CircledWordService";
import type { Store } from "vuex";
import CircledWordService from "@/utils/Service/CircledWordService";

export default class MetaplexService {
  protected store;

  protected metaplex: Metaplex;

  public nftStage:
    | "JSON Upload"
    | "Image Upload"
    | "Create"
    | "Authority Update"
    | null = null;

  public rpc: "mainnet-beta" | "devnet" = "mainnet-beta";

  private mainnetRpc =
    "https://convincing-ultra-silence.solana-mainnet.discover.quiknode.pro";

  private collectionAddress = "5yWoSj1h5k7YpJewniwoJf6X2u5xGPoGEGkoPLotWjzH";

  private provider;

  protected identity;

  constructor(provider: PhantomWalletAdapter, store: Store<unknown>) {
    this.store = store;
    this.provider = provider;
    this.identity = {
      publicKey: new PublicKey(store.getters["wallet/getWalletAddress"]),
      signMessage: this.provider.signMessage,
      signTransaction: this.provider.signTransaction,
      signAllTransactions: this.provider.signAllTransactions,
    };

    if (process.env.IS_STAGING === undefined || +process.env.IS_STAGING === 1) {
      this.rpc = "devnet";
    }

    const connection = new Connection(
      this.rpc === "devnet" ? clusterApiUrl(this.rpc) : this.mainnetRpc
    );

    const identity = this.identity;
    this.metaplex = Metaplex.make(connection)
      .use({
        install(metaplex: Metaplex) {
          metaplex.identity().setDriver(identity);
        },
      })
      .use(
        bundlrStorage({
          address:
            this.rpc === "mainnet-beta"
              ? "http://node1.bundlr.network"
              : "https://devnet.bundlr.network",
          providerUrl: connection.rpcEndpoint,
          timeout: 60000,
        })
      );
  }

  async createNFT(properties: Array<Array<Property>>) {
    this.nftStage = "Image Upload";
    const image = await new CircledWordService().getNftImage(properties);
    const file = toMetaplexFile(image, "circled.svg");
    const image_url = await this.metaplex.storage().upload(file);

    this.nftStage = "JSON Upload";
    const attributes = (() => {
      const result: { trait_type: string; value: string }[] = [];

      const isHexColor = (value: string) => {
        return /^#[0-9A-F]{6}$/i.test(value);
      };

      for (const level_properties of properties) {
        for (const property of level_properties) {
          result.push({
            trait_type: property.label,
            value: isHexColor(<string>property.value)
              ? (<string>property.value).toUpperCase()
              : <string>property.value,
          });
        }
      }
      return result;
    })();
    const nft_json = {
      name: "CircledWord #DEV",
      symbol: "CW",
      description: "",
      image: image_url,
      animation_url: "",
      external_url: "",
      attributes,
    };
    const json_link = await this.metaplex.storage().uploadJson(nft_json);

    this.nftStage = "Create";
    const nft_output = await this.metaplex.nfts().create({
      uri: json_link,
      name: "CircledWord #DEV",
      symbol: "CW",
      collection: new PublicKey(this.collectionAddress),
      sellerFeeBasisPoints: 500,
      isCollection: false,
    });

    this.nftStage = "Authority Update";
    await this.metaplex.nfts().update({
      nftOrSft: nft_output.nft,
      newUpdateAuthority: new PublicKey(
        "Cg2W5BZKRFakNBCMpFeTC3xo2f9Kv9kN7FPBzkDxj32V"
      ),
    });

    this.nftStage = null;
  }

  async verifyNFT(tokenAddress: string) {
    return this.metaplex.nfts().verifyCollection({
      mintAddress: new PublicKey(tokenAddress),
      collectionMintAddress: new PublicKey(this.collectionAddress),
      collectionAuthority: this.identity,
    });
  }

  async loadNFTs() {
    return this.metaplex
      .nfts()
      .findAllByOwner({ owner: this.metaplex.identity().publicKey })
      .then((result) => {
        const nfts = [];
        for (let i = 0; i < result.length; i++) {
          // @TODO Implement check for verified collection item.
          if (
            result[i].collection !== null &&
            result[i].collection!.address.toString() === this.collectionAddress
          ) {
            nfts.push(result[i]);
          }
        }
        return nfts;
      });
  }

  async createCollection() {
    await this.metaplex.nfts().create({
      uri: "",
      collection: null,
      name: "CircledWords",
      symbol: "CW",
      isMutable: true,
      sellerFeeBasisPoints: 250,
      isCollection: true,
    });
  }
}
