import colors from "@/assets/libraries/colors.json";

export const metadata_getters = {
  getTitle(metadata) {
    let hash_position = metadata.name.indexOf("#");
    return metadata.name.substring(hash_position);
  },
  getTraits(metadata) {
    let traits = {};
    metadata.traits.forEach((trait) => {
      traits[trait.trait_type] = trait.value;
    });

    return traits;
  },
};

export const trait_getters = {
  getAnimationType: (traits) => {
    return traits["Animation type"];
  },
  getStartTextColor(traits) {
    return "#" + colors[traits["Text color"]];
  },
  getBackgroundColor(traits) {
    return "#" + colors[traits["Background color"]];
  },
  getStartBorderColor(traits) {
    return "#" + colors[traits["Border color"]];
  },
  getSecondBorderColor(traits) {
    return "#" + colors[traits["Second Border color"]];
  },
  getSecondTextColor(traits) {
    return "#" + colors[traits["Second Text color"]];
  },
  getAnimationDuration(traits) {
    return traits["Animation duration"] + "s";
  },
};

export const getWord = (metadata) => {
  let data = {
    elementClass: String,
    elementStyle: Object,
    title: metadata_getters.getTitle(metadata),
  };
  let traits = metadata_getters.getTraits(metadata);

  if (traits && Object.keys(traits).length !== 0) {
    let animation_type = trait_getters.getAnimationType(traits);

    // @TODO: replace to IIFE.
    const animation_types = {
      "Fill In": () => {
        data.elementClass = "fill";
        data.elementStyle = {
          "--second-text-color": trait_getters.getSecondTextColor(traits),
          "--second-border-color": trait_getters.getSecondBorderColor(traits),
          "--text-color": trait_getters.getStartTextColor(traits),
          "--border-color": trait_getters.getStartBorderColor(traits),
          "--background-color": trait_getters.getBackgroundColor(traits),
          "--animation-duration": trait_getters.getAnimationDuration(traits),
        };
      },
    };
    // Add required properties related to animation type.
    animation_types[animation_type]();
  }
  return data;
};

export default getWord;
