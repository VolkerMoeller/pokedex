async function renderPokeCardEvolution(i) {
    // console.log('Poke-ID', i);
    await loadCurrentPoke(i);
    let evolutionURL = currentPoke['species']['url'];
    // console.log(evolutionURL);
    await loadCurrentSpecie(i);
    // console.log(currentSpecie);
    let evolutionChainURL = currentSpecie['evolution_chain']['url'];
    await loadCurrentEvolution(evolutionChainURL);
    console.log(i, ' ', currentEvolution);
    let startPokeName = currentEvolution['chain']['species']['name'];
    console.log(i, ' ', startPokeName);
    document.getElementById('card3' + i).innerHTML += `<div>${startPokeName}</div>`;
    if (currentEvolution['chain']['evolves_to'][0]['species']['name']) {
        let evolut1st = currentEvolution['chain']['evolves_to'][0]['species']['name'];
        document.getElementById('card3' + i).innerHTML += `<div>${evolut1st}</div>`;
        console.log(i, ' ', evolut1st);
        if (currentEvolution['chain']['evolves_to'][0]['evolves_to'].length >= 1) {
            let evolut2nd = currentEvolution['chain']['evolves_to'][0]['evolves_to'][0]['species']['name'];
            document.getElementById('card3' + i).innerHTML += `<div>${evolut2nd}</div>`;
            console.log(i, ' ', evolut2nd);
        }
    } else {
        return;
    }
    await getNamePokeStart(currentEvolution, i);
}


async function getNamePokeStart(currentEvolution, i) {
    let startPokeNameURL = currentEvolution['chain']['species']['url'];
    // console.log(startPokeNameURL);
    await loadGermanStartPokeName(startPokeNameURL);
    // console.log(currentGermanStartPokeName);
    let startPokeNames = currentGermanStartPokeName['names'];
    // console.log('startPokeNames: ',startPokeNames);
    await searchGermanStartPokeName(startPokeNames, i);
    await getNamePokeEvolut1st(currentEvolution, i);
}

async function getNamePokeEvolut1st(currentEvolution, i) {
    // let startPokeNameURL = currentEvolution['chain']['species']['url'];
    // if (currentEvolution['chain']['evolves_to'][0]['species']['name']) {
    if (currentEvolution['chain']['evolves_to']) {
        let evolut1stNameURL = currentEvolution['chain']['evolves_to'][0]['species']['url']
        // console.log(startPokeNameURL);
        await loadGermanEvolut1stName(evolut1stNameURL);
        // console.log(currentGermanStartPokeName);
        let evolut1stNames = currentGermanEvolut1stName['names'];
        // console.log('startPokeNames: ',startPokeNames);
        await searchGermanEvolut1stName(evolut1stNames, i);
    } else {
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
        let evolut2ndNames = currentGermanEvolut2ndName['names'];
        // console.log('startPokeNames: ',startPokeNames);
        await searchGermanEvolut2ndName(evolut2ndNames, i);
    } else {
        return;
    }
}


async function searchGermanStartPokeName(startPokeNames, i) {
    for (let j = 0; j < startPokeNames.length; j++) {
        let language = startPokeNames[j]['language']['name'];
        // console.log(language);
        await getGermanStartPokeName(language, startPokeNames, j, i);
    }
}


async function searchGermanEvolut1stName(evolut1stNames, i) {
    for (let j = 0; j < evolut1stNames.length; j++) {
        let language = evolut1stNames[j]['language']['name'];
        // console.log(language);
        await getGermanEvolut1stName(language, evolut1stNames, j, i);
    }
}


async function searchGermanEvolut2ndName(evolut2ndNames, i) {
    for (let j = 0; j < evolut2ndNames.length; j++) {
        let language = evolut2ndNames[j]['language']['name'];
        // console.log(language);
        await getGermanEvolut2ndName(language, evolut2ndNames, j, i);
    }
}


async function getGermanStartPokeName(language, startPokeNames, j, i) {
    if (language == 'de') {
        let germanStartPokeName = startPokeNames[j]['name'];
        document.getElementById('card3' + i).innerHTML += `<div>Zuerst: <b>${germanStartPokeName}</b></div>`;
        // return germanStartPokeName;
        // console.log(germanStartPokeName);
    }
}


async function getGermanEvolut1stName(language, evolut1stNames, j, i) {
    if (language == 'de') {
        let germanEvolut1stName = evolut1stNames[j]['name'];
        document.getElementById('card3' + i).innerHTML += `<div>Danach: <b>${germanEvolut1stName}</b></div>`;
        // return germanStartPokeName;
        // console.log(germanStartPokeName);
    }
}


async function getGermanEvolut2ndName(language, evolut2ndNames, j, i) {
    if (language == 'de') {
        let germanEvolut2ndName = evolut2ndNames[j]['name'];
        document.getElementById('card3' + i).innerHTML += `<div>Zuletzt: <b>${germanEvolut2ndName}</b></div>`;
        // return germanStartPokeName;
        // console.log(germanStartPokeName);
    }
}



