async function renderPokeCardEvolution(i) {
    let evolutionURL = currentPoke['species']['url'];
    await loadCurrentSpecie(i);
    let evolutionChainURL = currentSpecie['evolution_chain']['url'];
    await loadCurrentEvolution(evolutionChainURL);
    await getNamePokeStart(currentEvolution, i);
}


async function getNamePokeStart(currentEvolution, i) {
    let startPokeNameURL = currentEvolution['chain']['species']['url'];
    // console.log(startPokeNameURL);
    await loadGermanStartPokeName(startPokeNameURL);
    // console.log(currentGermanStartPokeName);
    let startPokeId = currentGermanStartPokeName['id'];
    let startPokeNames = currentGermanStartPokeName['names'];
    // console.log('startPokeNames: ',startPokeNames);
    await searchGermanStartPokeName(startPokeNames, i, startPokeId);
    await getNamePokeEvolut1st(currentEvolution, i);
}

async function getNamePokeEvolut1st(currentEvolution, i) {
    // let startPokeNameURL = currentEvolution['chain']['species']['url'];
    // if (currentEvolution['chain']['evolves_to'][0]['species']['name']) {
    if (currentEvolution['chain']['evolves_to'].length >= 1) {
        let evolut1stNameURL = currentEvolution['chain']['evolves_to'][0]['species']['url']
        // console.log(startPokeNameURL);
        await loadGermanEvolut1stName(evolut1stNameURL);
        // console.log(currentGermanStartPokeName);
        let evolut1stId = currentGermanEvolut1stName['id'];
        let evolut1stNames = currentGermanEvolut1stName['names'];
        // console.log('startPokeNames: ',startPokeNames);
        await searchGermanEvolut1stName(evolut1stNames, i, evolut1stId);
    } else {
        document.getElementById('card3' + i).innerHTML += `<div>Keine Weiterentwicklung</div>`;
        return;
    }
    await getNamePokeEvolut2nd(currentEvolution, i);
}


async function getNamePokeEvolut2nd(currentEvolution, i) {
    // let startPokeNameURL = currentEvolution['chain']['species']['url'];
    if (currentEvolution['chain']['evolves_to'][0]['evolves_to'].length >= 1) {
        let evolut2ndNameURL = currentEvolution['chain']['evolves_to'][0]['evolves_to'][0]['species']['url']
        // console.log(startPokeNameURL);
        await loadGermanEvolut2ndName(evolut2ndNameURL);
        // console.log(currentGermanStartPokeName);
        let evolut2ndId = currentGermanEvolut2ndName['id'];
        let evolut2ndNames = currentGermanEvolut2ndName['names'];
        // console.log('startPokeNames: ',startPokeNames);
        await searchGermanEvolut2ndName(evolut2ndNames, i, evolut2ndId);
    } else {
        return;
    }
}


async function searchGermanStartPokeName(startPokeNames, i, startPokeId) {
    for (let j = 0; j < startPokeNames.length; j++) {
        let language = startPokeNames[j]['language']['name'];
        // console.log(language);
        await getGermanStartPokeName(language, startPokeNames, j, i, startPokeId);
    }
}


async function searchGermanEvolut1stName(evolut1stNames, i, evolut1stId) {
    for (let j = 0; j < evolut1stNames.length; j++) {
        let language = evolut1stNames[j]['language']['name'];
        // console.log(language);
        await getGermanEvolut1stName(language, evolut1stNames, j, i, evolut1stId);
    }
}


async function searchGermanEvolut2ndName(evolut2ndNames, i, evolut2ndId) {
    for (let j = 0; j < evolut2ndNames.length; j++) {
        let language = evolut2ndNames[j]['language']['name'];
        // console.log(language);
        await getGermanEvolut2ndName(language, evolut2ndNames, j, i, evolut2ndId);
    }
}


async function getGermanStartPokeName(language, startPokeNames, j, i, startPokeId) {
    if (language == 'de') {
        let germanStartPokeName = startPokeNames[j]['name'];
        let formatedId = format3LeftHandZeros(startPokeId);
        document.getElementById('card3' + i).innerHTML += `<div class="evol-name-line">Zuerst: <b><div class="evol-name">${germanStartPokeName}</b> # ${formatedId}</div></div>`;
        // return germanStartPokeName;
        // console.log(germanStartPokeName);
    }
}


async function getGermanEvolut1stName(language, evolut1stNames, j, i, evolut1stId) {
    if (language == 'de') {
        let germanEvolut1stName = evolut1stNames[j]['name'];
        let formatedId = format3LeftHandZeros(evolut1stId);
        document.getElementById('card3' + i).innerHTML += `<div class="evol-name-line">Danach: <b><div class="evol-name">${germanEvolut1stName}</b> # ${formatedId}</div></div>`;
        // return germanStartPokeName;
        // console.log(germanStartPokeName);
    }
}


async function getGermanEvolut2ndName(language, evolut2ndNames, j, i, evolut2ndId) {
    if (language == 'de') {
        let germanEvolut2ndName = evolut2ndNames[j]['name'];
        let formatedId = format3LeftHandZeros(evolut2ndId);
        document.getElementById('card3' + i).innerHTML += `<div class="evol-name-line">Zuletzt: <b><div class="evol-name">${germanEvolut2ndName}</b> # ${formatedId}</div></div>`;
        // return germanStartPokeName;
        // console.log(germanStartPokeName);
    }
}



