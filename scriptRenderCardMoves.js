let currentMoveInfo = [];
let germanText = '';

async function renderPokeCardMoves(i) {
    await loadCurrentPoke(i);
    for (let j = 0; j < currentPoke['moves'].length; j++) {
        let moveURL = currentPoke['moves'][j]['move']['url'];
        // console.log('i: ', i, 'j: ', j, ' ',moveURL);
        await loadMoveInfo(moveURL);
        // console.log('i: ', i, 'j: ', j, ' ', currentMoveInfo);
        let moveNames = currentMoveInfo['names'];
        let moveText = currentMoveInfo['flavor_text_entries']
        await searchGermanMoveName(moveNames, moveText, i, j);
    }
}


async function loadMoveInfo(url) {
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    currentMoveInfo = responseAsJSON;
    return currentMoveInfo;
}


async function searchGermanMoveName(moveNames, moveText, i, j) {
    for (let k = 0; k < moveNames.length; k++) {
        let count = j + 1;
        let language = moveNames[k]['language']['name'];
        // console.log(language, i, j, k);
        await getGermanMoveName(moveNames, language, i, j, k, count);
    }
    for (let m = 0; m < moveText.length; m++) {
        let languageTxt = moveText[m]['language']['name'];
        await getGermanMoveText(moveText, languageTxt, i, j, m, count);
    }
    document.getElementById('card4' + i).innerHTML += `<div>${germanText}</div>`;
}


async function getGermanMoveName(moveNames, language, i, j, k, count) {
    if (language == 'de') {
        let germanName = moveNames[k]['name'];
        document.getElementById('card4' + i).innerHTML += `<div id="moveId${i}${j}"><b>${count} ${germanName}</b></div>`;
    }
}

async function getGermanMoveText(moveText, languageTxt, i, j, m) {
        if (languageTxt == 'de') {
            germanText = moveText[m]['flavor_text'];
            return germanText;
        }
}