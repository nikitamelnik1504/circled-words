import colors from "@/assets/libraries/colors.json";

type Widget = "select" | "text" | "time";

type TraitKeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

export interface Property {
  label: string;
  machine_name: string;
  value: unknown;
  widget: Widget;
  getValue: () => unknown;
}

type AnimationType = "Fill In" | "Close";

export abstract class AnimationTypeProperty implements Property {
  public label = "Animation Type";
  public machine_name = "animation_type";
  public widget: Widget = "select";
  public abstract value: AnimationType;

  public getValue() {
    return this.value;
  }
}

abstract class TextColorProperty implements Property {
  public label = "Text Color";
  public machine_name = "text_color";
  public widget: Widget = "text";
  public abstract value: string;

  public getValue(): { hex: string; name: string } {
    return {
      hex: "#" + colors[this.value as TraitKeysMatching<typeof colors, string>],
      name: this.value,
    };
  }
}

abstract class BorderColorProperty implements Property {
  public label = "Border Color";
  public machine_name = "border_color";
  public widget: Widget = "text";
  public abstract value: string;

  public getValue(): { hex: string; name: string } {
    return {
      hex: "#" + colors[this.value as TraitKeysMatching<typeof colors, string>],
      name: this.value,
    };
  }
}

abstract class BackgroundColorProperty implements Property {
  public label = "Background Color";
  public machine_name = "background_color";
  public widget: Widget = "text";
  public abstract value: string;

  public getValue(): { hex: string; name: string } {
    return {
      hex: "#" + colors[this.value as TraitKeysMatching<typeof colors, string>],
      name: this.value,
    };
  }
}

abstract class AnimationDurationProperty implements Property {
  public label = "Animation Duration";
  public machine_name = "animation_duration";
  public widget: Widget = "time";
  public abstract value: number;

  public getValue() {
    return this.value + "s";
  }
}

export abstract class NFT {
  private _name = "";
  protected _properties: Array<Property> = [];
  public static readonly type: AnimationType;

  get name(): string {
    const hash_position = this._name.indexOf("#");
    return this._name.substring(hash_position);
  }

  public load(metadata: NFTMetadata): NFT {
    this._name = metadata.name;
    const attributes = (
      metadata.attributes !== undefined ? metadata.attributes : metadata.traits
    ) as Array<{ trait_type: string; value: string }>;
    for (const attribute_index of attributes.keys()) {
      // @todo Check on the internet if is possible to change order of traits in json file.
      this._properties[attribute_index].value =
        attributes[attribute_index].value;
    }
    return this;
  }

  public get properties(): Array<Property> {
    return this._properties;
  }

  public getType(): AnimationType {
    return (this.constructor as typeof NFT).type;
  }
}

export abstract class SampleNFT extends NFT {
  private _label?: string;
  public link?: string;
  public _sampleData?: Record<string, Array<string> | string>;

  public load(metadata: NFTMetadata): SampleNFT {
    super.load(metadata);
    this._sampleData = metadata.sample_data;
    this._label = metadata.label;
    return this;
  }

  get label(): string | undefined {
    return this._label;
  }

  public get sampleData(): Record<string, Array<string> | string> | undefined {
    return this._sampleData;
  }
}

class FillInNFT extends NFT {
  public static readonly type: AnimationType = "Fill In";

  protected _properties: [
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
  protected _properties = new FillInNFT().properties;
}

export default class CircledWordService {
  protected nftTypes: Array<typeof NFT> = [FillInNFT];
  protected sampleNftTypes: Array<typeof SampleNFT> = [FillInSampleNFT];

  getSampleNft(metadata: NFTMetadata): SampleNFT {
    const type_attribute = (
      metadata.attributes as Array<{ trait_type: string; value: string }>
    ).filter((attribute) => {
      if (attribute.trait_type === "Animation Type") {
        return attribute;
      }
    });
    const type = type_attribute[0].value;

    let instance!: SampleNFT;
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

    let instance!: NFT;
    const nft_interface = class extends NFT {};
    for (const nft of this.nftTypes) {
      if (nft.type !== type) {
        continue;
      }

      instance = new (nft as typeof nft_interface)();
    }

    return (instance as NFT).load(metadata);
  }

  getNftTypes(): Array<typeof NFT> {
    return this.nftTypes;
  }
}
