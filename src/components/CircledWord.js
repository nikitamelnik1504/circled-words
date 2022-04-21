import colors from "@/assets/libraries/colors.json"

const metadata_getters = {
    getTitle(metadata) {
        return metadata.name
    }, getTraits(metadata) {
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
    }, getStartTextColor(traits) {
        return '#' + colors[traits["Text color"]]
    }, getBackgroundColor(traits) {
        return '#' + colors[traits["Background color"]]
    }, getStartBorderColor(traits) {
        return '#' + colors[traits["Border color"]]
    }, getSecondTextColor(traits) {
        return '#' + colors[traits["Second Text color"]]
    }, getAnimationDuration(traits) {
        return traits["Animation duration"] + 's'
    }
}

const getWord = (metadata) => {
    let data = {
        elementClass: String, elementStyle: Object, title: metadata_getters.getTitle(metadata)
    };
    let traits = metadata_getters.getTraits(metadata);
    let animation_type = trait_getters.getAnimationType(traits);

    // @TODO: replace to IIFE.
    const animation_types = {
        'Fill In': () => {
            data.elementClass = 'fill'
            data.elementStyle = {
                '--second-text-color': trait_getters.getSecondTextColor(traits),
                '--text-color': trait_getters.getStartTextColor(traits),
                '--border-color': trait_getters.getStartBorderColor(traits),
                '--background-color': trait_getters.getBackgroundColor(traits),
                '--animation-duration': trait_getters.getAnimationDuration(traits)
            }
        },
    };
    // Add required properties related to animation type.
    animation_types[animation_type]();
    return data;
}

export default getWord;
