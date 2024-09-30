const fs = require('node:fs');
const path = require('node:path');
const { cwd } = require('node:process');

var e = require('wanakana')
const isKatakana = e.isKatakana;
const toKatakana = e.toKatakana;

const DATA = []; // enter data here

// DATA.forEach(it => {
//     if (!isKatakana(it.nameKatakana)) {
//         console.log(`Wrong katakana:`);
//         console.log(it);

//         console.log(`Correct katakana:`);
//         const katakana = toKatakana(it.nameHiragana);
//         console.log({ ...it, nameKatakana: katakana });
//     }
// });

var correcttranslations = DATA.map(it => {
    if (!isKatakana(it.nameKatakana)) {
        console.log(`Wrong katakana:`);
        console.log(it);

        console.log(`Correct katakana:`);
        const katakana = toKatakana(it.nameHiragana);
        const corrected = { ...it, nameKatakana: katakana };
        console.log(corrected);
        return corrected;
    }
    return it;
});

const data = JSON.stringify(correcttranslations);
const pathToFile = path.join(cwd(), 'corrected-data.json')
if (fs.existsSync(pathToFile)) {
    fs.rmSync(pathToFile);
}
fs.writeFileSync(pathToFile, data);

console.log('WRTIITESN');


//////////
throw new Error("hah stop");



const curentincorrectdataset = DATA;
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