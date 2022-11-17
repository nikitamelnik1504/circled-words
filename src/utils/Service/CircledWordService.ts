interface Property {
  label: string;
  machine_name: string;
  value: unknown;
}

type AnimationType = "Fill In" | "Close";

abstract class AnimationTypeProperty implements Property {
  public label = "Animation Type";
  public machine_name = "animation_type";
  public abstract value: AnimationType;
}

abstract class TextColorProperty implements Property {
  public label = "Text Color";
  public machine_name = "text_color";
  public abstract value: string;
}

abstract class BorderColorProperty implements Property {
  public label = "Border Color";
  public machine_name = "border_color";
  public abstract value: string;
}

abstract class BackgroundColorProperty implements Property {
  public label = "Background Color";
  public machine_name = "background_color";
  public abstract value: string;
}

abstract class AnimationDurationProperty implements Property {
  public label = "Animation Duration";
  public machine_name = "animation_duration";
  public abstract value: number;
}

abstract class NFT {
  public name: string;
  public static readonly type: AnimationType;
  public static properties: Array<Property>;

  // @todo Implement metadata interface from https://docs.metaplex.com/programs/token-metadata/token-standard#the-non-fungible-standard .
  constructor(metadata: {
    name: string;
    attributes: Array<{ trait_type: string; value: string }>;
  }) {
    this.name = metadata.name;
    const static_instance: typeof NFT = this.constructor as typeof NFT;
    for (const attribute_index of metadata.attributes.keys()) {
      // @todo Check on the internet if is possible to change order of traits in json file.
      static_instance.properties[attribute_index].value =
        metadata.attributes[attribute_index].value;
    }
  }
}

class FillInNFT extends NFT {
  public static readonly type: AnimationType = "Fill In";

  public static properties: [
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

export default class CircledWordService {
  public nftTypes: Array<typeof NFT> = [FillInNFT];

  getNFT(metadata: {
    name: string;
    attributes: Array<{ trait_type: string; value: string }>;
  }): NFT | null {
    const type_attribute = metadata.attributes.filter((attribute) => {
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

      instance = new (nft as typeof nft_interface)(metadata);
    }

    return instance;
  }
}
