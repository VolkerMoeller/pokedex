async function renderPokeCardEvolution(i) {
    // console.log('Poke-ID', i);
    await loadCurrentPoke(i);
    let evolutionURL = currentPoke['species']['url'];
    // console.log(evolutionURL);
    await loadCurrentSpecie(i);
    // console.log(currentSpecie);
    let evolutionChainURL = currentSpecie['evolution_chain']['url'];
    await loadCurrentEvolution(evolutionChainURL);
    // console.log(currentEvolution);
    // let startPokeName = currentEvolution['chain']['species']['name'];
    // console.log(i, ' ', startPokeName);
    // console.log(i, ' ', currentEvolution);
    // document.getElementById('card3' + i).innerHTML += startPokeName;
    await getNamePokeStart(currentEvolution, i);  
}

async function getNamePokeStart(currentEvolution, i) {
    let startPokeNameURL = currentEvolution['chain']['species']['url'];
    // console.log(startPokeNameURL);
    await loadGermanStartPokeName(startPokeNameURL);
    // console.log(currentGermanStartPokeName);
    let startPokeNames = currentGermanStartPokeName['names'];
    // console.log('startPokeNames: ',startPokeNames);
    searchGermanStartPokeName(startPokeNames, i);
}


async function searchGermanStartPokeName(startPokeNames, i) {
    for (let j = 0; j < startPokeNames.length; j++) {
        let language = startPokeNames[j]['language']['name'];
        // console.log(language);
        await getGermanStartPokeName(language, startPokeNames, j, i);
    }
}


async function getGermanStartPokeName(language, startPokeNames, j, i) {
    if (language == 'de') {
        let germanStartPokeName = startPokeNames[j]['name'];
        // console.log(germanStartPokeName);
        document.getElementById('card3' + i).innerHTML += `<div>Zuerst: <b>${germanStartPokeName}</b></div>`;
    }
}