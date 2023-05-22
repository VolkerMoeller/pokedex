async function renderPokeCardEvolution(i) {
    let formatedId1st = format3LeftHandZeros(myPokesAsObject[i]['evolutionChainIds'][0]);
    document.getElementById('card3' + i).innerHTML += `<div class="evol-name-line">Zuerst: <b><div class="evol-name">${myPokesAsObject[i]['evolutionChainNames'][0]}</b> # ${formatedId1st}</div></div>`;
    if (myPokesAsObject[i]['evolutionChainIds'].length > 1) {
        let formatedId2nd = format3LeftHandZeros(myPokesAsObject[i]['evolutionChainIds'][1]);
        document.getElementById('card3' + i).innerHTML += `<div class="evol-name-line">Danach: <b><div class="evol-name">${myPokesAsObject[i]['evolutionChainNames'][1]}</b> # ${formatedId2nd}</div></div>`;
    };
    if (myPokesAsObject[i]['evolutionChainIds'].length > 2) {
        let formatedId3rd = format3LeftHandZeros(myPokesAsObject[i]['evolutionChainIds'][2]);
        document.getElementById('card3' + i).innerHTML += `<div class="evol-name-line">Zuletzt: <b><div class="evol-name">${myPokesAsObject[i]['evolutionChainNames'][2]}</b> # ${formatedId3rd}</div></div>`;
    };
}


// async function getNamePokeStart(resp6EvolutionInfoAsJSON, i) {
//     let startPokeNameURL = resp6EvolutionInfoAsJSON['chain']['species']['url'];
//     await loadGermanStartPokeName(startPokeNameURL);
//     let startPokeId = currentGermanStartPokeName['id'];
//     let startPokeNames = currentGermanStartPokeName['names'];
//     await searchGermanStartPokeName(startPokeNames, i, startPokeId);
//     await getNamePokeEvolut1st(resp6EvolutionInfoAsJSON, i);
// }


// async function getNamePokeEvolut1st(resp6EvolutionInfoAsJSON, i) {
//     if (resp6EvolutionInfoAsJSON['chain']['evolves_to'].length >= 1) {
//         let evolut1stNameURL = resp6EvolutionInfoAsJSON['chain']['evolves_to'][0]['species']['url']
//         await loadGermanEvolut1stName(evolut1stNameURL);
//         let evolut1stId = currentGermanEvolut1stName['id'];
//         let evolut1stNames = currentGermanEvolut1stName['names'];
//         await searchGermanEvolut1stName(evolut1stNames, i, evolut1stId);
//     } else {
//         document.getElementById('card3' + i).innerHTML += `<div>Keine Weiterentwicklung</div>`;
//         return;
//     }
//     await getNamePokeEvolut2nd(resp6EvolutionInfoAsJSON, i);
// }


// async function getNamePokeEvolut2nd(resp6EvolutionInfoAsJSON, i) {
//     if (resp6EvolutionInfoAsJSON['chain']['evolves_to'][0]['evolves_to'].length >= 1) {
//         let evolut2ndNameURL = resp6EvolutionInfoAsJSON['chain']['evolves_to'][0]['evolves_to'][0]['species']['url']
//         await loadGermanEvolut2ndName(evolut2ndNameURL);
//         let evolut2ndId = currentGermanEvolut2ndName['id'];
//         let evolut2ndNames = currentGermanEvolut2ndName['names'];
//         await searchGermanEvolut2ndName(evolut2ndNames, i, evolut2ndId);
//     } else {
//         return;
//     }
// }


// async function searchGermanStartPokeName(startPokeNames, i, startPokeId) {
//     for (let j = 0; j < startPokeNames.length; j++) {
//         let language = startPokeNames[j]['language']['name'];
//         await getGermanStartPokeName(language, startPokeNames, j, i, startPokeId);
//     }
// }


// async function searchGermanEvolut1stName(evolut1stNames, i, evolut1stId) {
//     for (let j = 0; j < evolut1stNames.length; j++) {
//         let language = evolut1stNames[j]['language']['name'];
//         await getGermanEvolut1stName(language, evolut1stNames, j, i, evolut1stId);
//     }
// }


// async function searchGermanEvolut2ndName(evolut2ndNames, i, evolut2ndId) {
//     for (let j = 0; j < evolut2ndNames.length; j++) {
//         let language = evolut2ndNames[j]['language']['name'];
//         await getGermanEvolut2ndName(language, evolut2ndNames, j, i, evolut2ndId);
//     }
// }


// async function getGermanStartPokeName(language, startPokeNames, j, i, startPokeId) {
//     if (language == 'de') {
//         let germanStartPokeName = startPokeNames[j]['name'];
//         let formatedId = format3LeftHandZeros(startPokeId);
//         document.getElementById('card3' + i).innerHTML += `<div class="evol-name-line">Zuerst: <b><div class="evol-name">${germanStartPokeName}</b> # ${formatedId}</div></div>`;
//     }
// }


// async function getGermanEvolut1stName(language, evolut1stNames, j, i, evolut1stId) {
//     if (language == 'de') {
//         let germanEvolut1stName = evolut1stNames[j]['name'];
//         let formatedId = format3LeftHandZeros(evolut1stId);
//         document.getElementById('card3' + i).innerHTML += `<div class="evol-name-line">Danach: <b><div class="evol-name">${germanEvolut1stName}</b> # ${formatedId}</div></div>`;
//     }
// }


// async function getGermanEvolut2ndName(language, evolut2ndNames, j, i, evolut2ndId) {
//     if (language == 'de') {
//         let germanEvolut2ndName = evolut2ndNames[j]['name'];
//         let formatedId = format3LeftHandZeros(evolut2ndId);
//         document.getElementById('card3' + i).innerHTML += `<div class="evol-name-line">Zuletzt: <b><div class="evol-name">${germanEvolut2ndName}</b> # ${formatedId}</div></div>`;
//     }
// }