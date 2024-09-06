
const curentincorrectdataset = []
const tobereplaced = []

// Function to replace bad translations
function updateTranslations(items, correctTranslations) {
    return items.map(item => {
        let correctTranslation = correctTranslations.find(translation => translation.id === item.id);
        if (correctTranslation) {
            return {
                ...item,
                nameKatakana: correctTranslation.nameKatakana,
                nameHiragana: correctTranslation.nameHiragana,
                nameRomaji: correctTranslation.nameRomaji
            };
        }
        return item;
    });
}

// Replace the translations
let updatedItems = updateTranslations(curentincorrectdataset, tobereplaced);

console.log(updatedItems);