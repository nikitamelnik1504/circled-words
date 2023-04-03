import nftImage from "@/assets/images/circled_fill_in.svg";
import { Canvg } from "canvg";

type Widget = "select" | "text" | "time";

export interface Property {
  label: string;
  originLabel: string;
  machine_name: string;
  value: unknown;
  widget: Widget;
  getValue: () => unknown;
}

type AnimationType = "Fill In" | "Close";

export abstract class AnimationTypeProperty implements Property {
  public label = "Animation Type";
  public originLabel = this.label;
  public machine_name = "animation_type";
  public widget: Widget = "select";
  public abstract value: AnimationType;

  public getValue() {
    return this.value;
  }
}

abstract class TextColorProperty implements Property {
  public label = "Text Color";
  public originLabel = this.label;
  public machine_name = "text_color";
  public widget: Widget = "text";
  public abstract value: string;

  public getValue() {
    return this.value;
  }
}

abstract class BorderColorProperty implements Property {
  public label = "Border Color";
  public originLabel = this.label;
  public machine_name = "border_color";
  public widget: Widget = "text";
  public abstract value: string;

  public getValue() {
    return this.value;
  }
}

abstract class BackgroundColorProperty implements Property {
  public label = "Background Color";
  public originLabel = this.label;
  public machine_name = "background_color";
  public widget: Widget = "text";
  public abstract value: string;

  public getValue() {
    return this.value;
  }
}

export abstract class AnimationDurationProperty implements Property {
  public label = "Animation Duration";
  public originLabel = this.label;
  public machine_name = "animation_duration";
  public widget: Widget = "time";
  public abstract value: number;

  public getValue() {
    return this.value + "s";
  }
}

export abstract class NFT {
  public name = "";
  public description = "";

  protected abstract _properties: Array<Array<Property>>;
  public static readonly type: AnimationType;

  public load(metadata: NFTMetadata): NFT {
    this.name = metadata.name;
    this.description = metadata.description as string;

    const attributes = metadata.attributes;

    for (const [attribute_index, attribute_value] of attributes.entries()) {
      const attribute = (() => {
        for (const [, level_attributes] of this.properties.entries()) {
          for (const [, level_attribute_value] of level_attributes.entries()) {
            if (level_attribute_value.label === attribute_value.trait_type) {
              return level_attribute_value;
            }
          }
        }
      })();

      (<Property>attribute).value = attributes[attribute_index].value;
    }

    return this;
  }

  public get properties() {
    return this._properties;
  }

  public getType() {
    return (<typeof NFT>this.constructor).type;
  }
}

export abstract class SampleNFT extends NFT {
  private _label?: string;
  public link?: string;

  public load(metadata: NFTMetadata): SampleNFT {
    super.load(metadata);
    this._label = metadata.label;
    return this;
  }

  get label(): string | undefined {
    return this._label;
  }
}

class FillInNFT extends NFT {
  public static readonly type: AnimationType = "Fill In";

  protected _properties: [
    [AnimationTypeProperty],
    [TextColorProperty, BorderColorProperty],
    [
      BackgroundColorProperty,
      TextColorProperty,
      BorderColorProperty,
      AnimationDurationProperty
    ]
  ] = [
    [
      new (class extends AnimationTypeProperty {
        value: AnimationType = "Fill In";
      })(),
    ],
    [
      new (class extends TextColorProperty {
        value = "#FFFFFF";
      })(),
      new (class extends BorderColorProperty {
        value = "#FFFFFF";
      })(),
    ],
    [
      new (class extends BackgroundColorProperty {
        value = "#FFFFFF";
      })(),
      new (class extends TextColorProperty {
        label = "Second Text Color";
        machine_name = "second_text_color";
        value = "#000000";
      })(),
      new (class extends BorderColorProperty {
        label = "Second Border Color";
        machine_name = "second_border_color";
        value = "#FFFFFF";
      })(),
      new (class extends AnimationDurationProperty {
        value = 1;
      })(),
    ],
  ];
}

class FillInSampleNFT extends SampleNFT {
  public static readonly type = FillInNFT.type;
  protected _properties = new FillInNFT().properties;
}

export default class CircledWordService {
  protected nftTypes = [FillInNFT];
  protected sampleNftTypes = [FillInSampleNFT];

  getSampleNft(metadata: NFTMetadata): SampleNFT {
    const type_attribute = (<NFTMetadata["attributes"]>(
      metadata.attributes
    )).find((attribute) => {
      if (attribute.trait_type === "Animation Type") {
        return attribute;
      }
    });
    const type = type_attribute?.value;

    let instance!: SampleNFT;
    const nft_types = this.sampleNftTypes;

    for (const nft of nft_types) {
      if (nft.type !== type) {
        continue;
      }

      instance = new nft();
    }

    return instance.load(metadata);
  }

  getNft(metadata: NFTMetadata): NFT {
    const attributes = metadata.attributes;

    const type_attribute = (<NFTMetadata["attributes"]>attributes).find(
      (attribute) => {
        if (attribute.trait_type === "Animation Type") {
          return attribute;
        }
      }
    );
    const type = type_attribute?.value;

    let instance!: NFT;

    for (const nft of this.nftTypes) {
      if (nft.type !== type) {
        continue;
      }

      instance = new nft();
    }

    return instance.load(metadata);
  }

  getNftTypes(): Array<typeof NFT> {
    return this.nftTypes;
  }

  async getNftImage(properties: Array<Array<Property>>) {
    const svg_string: string = await fetch(nftImage as string).then((result) =>
      result.text()
    );
    const parser = new DOMParser();
    const circled_image = parser.parseFromString(svg_string, "image/svg+xml");
    const circled_border = circled_image.getElementById("border");
    const circled_text = circled_image.getElementById("text");

    if (properties[0][0].value === "Fill In") {
      for (const property of properties[1]) {
        if (property.originLabel === "Text Color") {
          circled_text!.setAttribute("fill", <string>property.value);
        }
        if (property.originLabel === "Border Color") {
          circled_border!.setAttribute("stroke", <string>property.value);
        }
      }
    }

    const canvas = <HTMLCanvasElement>document.getElementById("circledCanvas");
    const ctx = canvas.getContext("2d");

    const v = await Canvg.from(
      ctx!,
      new XMLSerializer().serializeToString(circled_image)
    );
    v.start();
    await v.render();

    const base_64_image = canvas.toDataURL("image/png");

    return await fetch(base_64_image).then((result) => result.blob());
  }
}
