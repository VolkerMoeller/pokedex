let currentMoveInfo = [];

async function renderPokeCardMoves(i) {
    await loadCurrentPoke(i);
    for (let j = 0; j < currentPoke['moves'].length; j++) {
        let moveURL = currentPoke['moves'][j]['move']['url'];
        // console.log('i: ', i, 'j: ', j, ' ',moveURL);
        await loadMoveInfo(moveURL);
        // console.log('i: ', i, 'j: ', j, ' ', currentMoveInfo);
        let moveNames = currentMoveInfo['names'];
        await searchGermanMoveName(moveNames, i, j);
    }
}


async function loadMoveInfo(url) {
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    currentMoveInfo = responseAsJSON;
    return currentMoveInfo;
}


async function searchGermanMoveName(moveNames, i, j) {
    for (let k = 0; k < moveNames.length; k++) {
        let language = moveNames[k]['language']['name'];
        // console.log(language, i, j, k);
        await getGermanMoveName(moveNames, language, i, k);

    }
}


async function getGermanMoveName(moveNames, language, i, k){
    if (language == 'de') {
        let germanName = moveNames[k]['name'];
        // console.log(language, i, j, k, germanName);
        // return germanName;
        document.getElementById('card4' + i).innerHTML += `<div>${germanName}</div>`;

    }

}