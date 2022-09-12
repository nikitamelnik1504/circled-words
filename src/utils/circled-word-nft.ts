import colors from "@/assets/libraries/colors.json";

interface FillInTrait {
  "Animation Type": AnimationTypeTrait;
  "Text Color": ColorTrait;
  "Background Color": ColorTrait;
  "Border Color": ColorTrait;
  "Second Border Color": ColorTrait;
  "Second Text Color": ColorTrait;
  "Animation Duration": TimeoutTrait;
}

type TraitKeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

type ColorTrait = string;

type TimeoutTrait = string;

type AnimationTypeTrait = "Fill In";

class CircledWordNft {
  private metadata: NFTMetadata;
  public properties?: FillInTrait;
  public name: string;
  public text?: string;

  constructor(metadata: NFTMetadata) {
    this.metadata = metadata;

    const hash_position = metadata.name.indexOf("#");
    this.name = metadata.name.substring(hash_position);

    this.text = metadata.text;

    const traits = this.getTraits();
    switch (traits["Animation Type"]) {
      case "Fill In":
        const result: FillInTrait = {
          "Animation Type": traits["Animation Type"] as AnimationTypeTrait,
          "Text Color": this.getColor(traits["Text Color"]),
          "Background Color": this.getColor(
            traits["Background Color"] as string
          ),
          "Border Color": this.getColor(traits["Border Color"]),
          "Second Border Color": this.getColor(traits["Second Border Color"]),
          "Second Text Color": this.getColor(traits["Second Text Color"]),
          "Animation Duration": this.getAnimationDuration(
            traits["Animation Duration"] as unknown as number
          ),
        };
        this.properties = result;
        break;
    }
  }

  public get getTitle(): string {
    return this.name;
  }

  public getColor(color: string): ColorTrait {
    if (!(color in colors)) {
      return "White";
    }
    return "#" + colors[color as TraitKeysMatching<typeof colors, string>];
  }

  protected getAnimationDuration(timeout: number): TimeoutTrait {
    return timeout + "s";
  }

  public getTraits(): Record<string, string> {
    const traits: { [key: string]: string } = {};
    this.metadata.traits.forEach((trait) => {
      traits[trait.trait_type] = trait.value;
    });
    return traits; // @todo IMPORTANT! Refactor to on-way interface.
  }

  public getElement(): CircledWordElement {
    const data = {
      elementClass: "",
      elementStyle: {},
      title: this.getTitle,
      text: this.text,
    };

    const traits = this.properties;
    if (traits && Object.keys(traits).length !== 0) {
      const animation_type = traits["Animation Type"];

      // @TODO: replace to IIFE.
      const animation_types = {
        "Fill In": () => {
          data.elementClass = "fill";
          data.elementStyle = {
            "--second-text-color": traits["Second Text Color"],
            "--second-border-color": traits["Second Border Color"],
            "--text-color": traits["Text Color"],
            "--border-color": traits["Border Color"],
            "--background-color": traits["Background Color"],
            "--animation-duration": traits["Animation Duration"],
          };
        },
      };

      animation_types[animation_type]();
    }
    return data;
  }
}

export default CircledWordNft;
