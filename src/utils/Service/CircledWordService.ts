import colors from "@/assets/libraries/colors.json";

type TraitKeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

interface Property {
  label: string;
  machine_name: string;
  value: unknown;
  getValue: () => unknown;
}

type AnimationType = "Fill In" | "Close";

export abstract class AnimationTypeProperty implements Property {
  public label = "Animation Type";
  public machine_name = "animation_type";
  public abstract value: AnimationType;

  public getValue() {
    return this.value;
  }
}

abstract class TextColorProperty implements Property {
  public label = "Text Color";
  public machine_name = "text_color";
  public abstract value: string;

  public getValue(): string {
    return "#" + colors[this.value as TraitKeysMatching<typeof colors, string>];
  }
}

abstract class BorderColorProperty implements Property {
  public label = "Border Color";
  public machine_name = "border_color";
  public abstract value: string;

  public getValue() {
    return "#" + colors[this.value as TraitKeysMatching<typeof colors, string>];
  }
}

abstract class BackgroundColorProperty implements Property {
  public label = "Background Color";
  public machine_name = "background_color";
  public abstract value: string;

  public getValue() {
    return "#" + colors[this.value as TraitKeysMatching<typeof colors, string>];
  }
}

abstract class AnimationDurationProperty implements Property {
  public label = "Animation Duration";
  public machine_name = "animation_duration";
  public abstract value: number;

  public getValue() {
    return this.value + "s";
  }
}

export abstract class NFT {
  public name!: string;
  public static readonly type: AnimationType;
  protected properties: Array<Property> = [];

  public load(metadata: NFTMetadata): NFT {
    const attributes = (
      metadata.attributes !== undefined ? metadata.attributes : metadata.traits
    ) as Array<{ trait_type: string; value: string }>;
    for (const attribute_index of attributes.keys()) {
      // @todo Check on the internet if is possible to change order of traits in json file.
      this.properties[attribute_index].value =
        attributes[attribute_index].value;
    }
    return this;
  }

  public get getProperties(): Array<Property> {
    return this.properties;
  }

  public getType(): AnimationType {
    return (this.constructor as typeof NFT).type;
  }
}

export abstract class SampleNFT extends NFT {
  public label?: string;
  public link?: string;
  public sampleData?: Record<string, Array<string> | string>;
}

class FillInNFT extends NFT {
  public static readonly type: AnimationType = "Fill In";

  protected properties: [
    AnimationTypeProperty,
    TextColorProperty,
    BorderColorProperty,
    BackgroundColorProperty,
    AnimationDurationProperty,
    TextColorProperty,
    BorderColorProperty
  ] = [
    new (class extends AnimationTypeProperty {
      value: AnimationType = "Fill In";
    })(),
    new (class extends TextColorProperty {
      value = "White";
    })(),
    new (class extends BorderColorProperty {
      value = "White";
    })(),
    new (class extends BackgroundColorProperty {
      value = "White";
    })(),
    new (class extends AnimationDurationProperty {
      value = 1;
    })(),
    new (class extends TextColorProperty {
      label = "Second Text Color";
      machine_name = "second_text_color";
      value = "Black";
    })(),
    new (class extends BorderColorProperty {
      label = "Second Border Color";
      machine_name = "second_border_color";
      value = "White";
    })(),
  ];
}

class FillInSampleNFT extends SampleNFT {
  public static readonly type = FillInNFT.type;
  protected properties = new FillInNFT().getProperties;
}

export default class CircledWordService {
  protected nftTypes: Array<typeof NFT> = [FillInNFT];
  protected sampleNftTypes: Array<typeof SampleNFT> = [FillInSampleNFT];

  getNftTypeProperties(type: string): Array<Property> | null {
    let properties = null;
    const nft_interface = class extends SampleNFT {};
    for (const nft_type of this.nftTypes) {
      if (nft_type.type !== type) {
        continue;
      }

      properties = new (nft_type as typeof nft_interface)();
    }

    return (properties as NFT).getProperties;
  }

  getSampleNft(metadata: NFTMetadata): SampleNFT | null {
    const type_attribute = (
      metadata.attributes as Array<{ trait_type: string; value: string }>
    ).filter((attribute) => {
      if (attribute.trait_type === "Animation Type") {
        return attribute;
      }
    });
    const type = type_attribute[0].value;

    let instance: SampleNFT | null = null;
    const nft_interface = class extends SampleNFT {};
    const nft_types = this.sampleNftTypes;

    for (const nft of nft_types) {
      if (nft.type !== type) {
        continue;
      }

      instance = new (nft as typeof nft_interface)();
    }

    return (instance as SampleNFT).load(metadata);
  }

  getNft(metadata: NFTMetadata): NFT | null {
    const attributes =
      metadata.attributes !== undefined ? metadata.attributes : metadata.traits;

    const type_attribute = (
      attributes as Array<{ trait_type: string; value: string }>
    ).filter((attribute) => {
      if (attribute.trait_type === "Animation Type") {
        return attribute;
      }
    });
    const type = type_attribute[0].value;

    let instance: NFT | null = null;
    const nft_interface = class extends NFT {};
    for (const nft of this.nftTypes) {
      if (nft.type !== type) {
        continue;
      }

      instance = new (nft as typeof nft_interface)();
    }

    return (instance as NFT).load(metadata);
  }
}
