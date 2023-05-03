async function renderPokeCardBaseStats(i) {
    await loadCurrentPoke(i);
    let pokeKp = currentPoke['stats'][0]['base_stat'];
    document.getElementById('card2' + i).innerHTML += `<div>Kraftpunkte: <b>${pokeKp}</b></div>`;
    let pokeAttack = currentPoke['stats'][1]['base_stat'];
    document.getElementById('card2' + i).innerHTML += `<div>Angriff: <b>${pokeAttack}</b></div>`;
    let pokeDefense = currentPoke['stats'][2]['base_stat'];
    document.getElementById('card2' + i).innerHTML += `<div>Veteidigung: <b>${pokeDefense}</b></div>`;
    let pokeSpecAttack = currentPoke['stats'][3]['base_stat'];
    document.getElementById('card2' + i).innerHTML += `<div>Spezialangriff: <b>${pokeSpecAttack}</b></div>`;
    let pokeSpecDefense = currentPoke['stats'][4]['base_stat'];
    document.getElementById('card2' + i).innerHTML += `<div>Spezialverteidigung: <b>${pokeSpecDefense}</b></div>`;
    let pokeSpeed = currentPoke['stats'][5]['base_stat'];
    document.getElementById('card2' + i).innerHTML += `<div>Initiative: <b>${pokeSpeed}</b></div>`;
}


// async function searchGermanText(pokeFlavor, i) {
//     for (let j = 0; j < pokeFlavor.length; j++) {
//         let language = pokeFlavor[j]['language']['name'];
//         pushFlavor(language, i, j, pokeFlavor);
//     }
// }


// async function searchGermanName(pokeNamesGerman, i) {
//     for (let j = 0; j < pokeNamesGerman.length; j++) {
//         let language = pokeNamesGerman[j]['language']['name'];
//         pushGermanName(language, i, j, pokeNamesGerman);
//     }
// }


// function pushFlavor(language, i, j, pokeFlavor) {
//     if (language == 'de') {
//         let flavorText = pokeFlavor[j]['flavor_text'];
//         pokes[i]['pokeFlavors'].push(flavorText);
//     }
// }


// function pushGermanName(language, i, j, pokeNamesGerman) {
//     if (language == 'de') {
//         let germanName = pokeNamesGerman[j]['name'];
//         pokes[i]['pokeNameGerman'].push(germanName);
//     }
// }

// async function searchGermanTextAbilityFlavor(pokeAbilityFlavor, i) {
//     for (let j = 0; j < pokeAbilityFlavor.length; j++) {
//         let language = pokeAbilityFlavor[j]['language']['name'];
//         pushAbilityFlavor(language, i, j, pokeAbilityFlavor);
//     }
// }


// function pushAbilityFlavor(language, i, j, pokeAbilityFlavor) {
//     if (language == 'de') {
//         let flavorText = pokeAbilityFlavor[j]['flavor_text'];
//         pokes[i]['pokeAbilityFlavors'].push(flavorText);
//     }
// }