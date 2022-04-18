import colors from "@/assets/libraries/colors.json"

const metadata_getters = {
    getTitle(metadata) {
        return metadata.name
    },
    getTraits(metadata) {
        let traits = {};
        metadata.traits.forEach(trait => {
            traits[trait.trait_type] = trait.value;
        })
        return traits;
    },
}

const trait_getters = {
    getAnimationType: (traits) => {
        return traits["Animation type"]
    },
    getStartTextColor(traits) {
        return '#' + colors[traits["Text color"]];
    },
}

const getWord = (metadata) => {
    let data = {
        elementClass: String,
        elementStyle: Object,
        title: metadata_getters.getTitle(metadata)
    };
    let traits = metadata_getters.getTraits(metadata);
    let animation_type = trait_getters.getAnimationType(traits);

    // @TODO: replace to IIFE.
    const animation_types = {
        'Fill In': () => {
            data.elementClass = 'fill'
            data.elementStyle = {
                '--text-color': trait_getters.getStartTextColor(traits),
            }
        },
    };
    // Add required properties related to animation type.
    animation_types[animation_type]();
    return data;
}

export default getWord;
