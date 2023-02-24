import {
  Metaplex,
  walletAdapterIdentity,
  bundlrStorage,
  toMetaplexFile,
} from "@metaplex-foundation/js";
import nftImage from "@/assets/images/nft-default-icon.png";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import type { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import type { Property } from "@/utils/Service/CircledWordService";

export default class MetaplexService {
  protected metaplex: Metaplex;
  public nftStage: "JSON Upload" | "Create" | null = null;

  private collectionAddress = new PublicKey(
    "8wAXCzCiLpsbBN3WM3cba7fALnFytNRjkDGLe16YfUtb"
  );

  private nftImageUrl =
    "https://eccr4vp5qxmhn4nixbdah44hci7picmgjxwtnuxdp2yokh573c6a.arweave.net/IIUeVf2F2HbxqLhGA_OHEj70CYZN7TbS436w5R-_2Lw";

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

  async createNFT(properties: Array<Array<Property>>) {
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
      image: this.nftImageUrl,
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
    return this.metaplex
      .nfts()
      .findAllByOwner({ owner: this.metaplex.identity().publicKey })
      .then((result) => {
        const nfts = [];
        for (let i = 0; i < result.length; i++) {
          // @TODO Implement check for verified collection item.
          if (
            result[i].collection !== null &&
            result[i].collection!.address.toString() ===
              this.collectionAddress.toString()
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
      isMutable: false,
      sellerFeeBasisPoints: 250,
      isCollection: true,
    });
  }

  async uploadNFTImage() {
    const image = await fetch(nftImage as string).then((result) =>
      result.arrayBuffer()
    );
    const image_file = await toMetaplexFile(image, "circled.png");
    await this.metaplex.storage().upload(image_file);
  }
}
