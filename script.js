let myPokesAsObject = [
    {
        "id": '',
        "name": '',
        "nameGerman": '',
        "slot1": '',
        "slot2": '',
        "imgUrl": '',
        "weight": '',
        "height": '',
        "generaGerman": '',
        "flavor": '',
        "abilities": '',
        "flavors": '',
    }
]


let resp1GeneralInfoAsJSON;
let resp2SpeciesInfoAsJSON;
let pokeCounter = 101;

let functionRunning = false;
let functionRunning2 = false;


async function init() {
    for (let i = 1; i <= pokeCounter; i++) {
        await loadPokemonData(i);
        buildMyPokeObject(i);
        fillMyPokeObject(i);
        renderPokeMini(i);
    }
}


async function loadPokemonData(i) {
    const url1 = 'https://pokeapi.co/api/v2/pokemon/' + i;
    const url2 = 'https://pokeapi.co/api/v2/pokemon-species/' + i;
    await Promise.all([defResp1(url1), defResp2(url2),]);
}


async function defResp1(url1) {
    let resp1AsSthFromServer = await fetch(url1);
    resp1GeneralInfoAsJSON = await resp1AsSthFromServer.json();
}


async function defResp2(url2) {
    let resp2AsSthFromServer = await fetch(url2);
    resp2SpeciesInfoAsJSON = await resp2AsSthFromServer.json();
}


function buildMyPokeObject() {
    myPokesAsObject.push(
        {
            "id": '',
            "name": '',
            "nameGerman": '',
            "slot1": '',
            "slot2": '',
            "imgUrl": '',
            "weight": '',
            "height": '',
            "generaGerman": '',
            "flavor": '',
            "abilities": '',
            "flavors": '',
        }
    );
}


function fillMyPokeObject(i) {
    myPokesAsObject[i]['id'] = resp1GeneralInfoAsJSON['id'];
    myPokesAsObject[i]['name'] = resp1GeneralInfoAsJSON['name'];
    myPokesAsObject[i]['nameGerman'] = resp2SpeciesInfoAsJSON['names'][searchIndexOfGerman('names')]['name'];
    myPokesAsObject[i]['slot1'] = resp1GeneralInfoAsJSON['types'][0]['type']['name'];
    myPokesAsObject[i]['slot2'] = checkIfThereIsSlot2();
    myPokesAsObject[i]['imgUrl'] =  resp1GeneralInfoAsJSON['sprites']['other']['home']['front_default'];
    myPokesAsObject[i]['weight'] = resp1GeneralInfoAsJSON['weight'];
    myPokesAsObject[i]['height'] = resp1GeneralInfoAsJSON['height'];
    myPokesAsObject[i]['generaGerman'] = resp2SpeciesInfoAsJSON['genera'][searchIndexOfGerman('genera')]['genus'];
    myPokesAsObject[i]['flavor'] = '';
    myPokesAsObject[i]['abilities'] = '';
    myPokesAsObject[i]['flavors'] = '';
}


function checkIfThereIsSlot2() {
    if (resp1GeneralInfoAsJSON['types'][1]) {
        let slot2FromServer = resp1GeneralInfoAsJSON['types'][1]['type']['name'];
        return slot2FromServer;
    } else {
        let slot2FromServer = '';
        return slot2FromServer;
    }
}


function searchIndexOfGerman(index) {
    for (let j = 0; j < resp2SpeciesInfoAsJSON[index].length; j++) {
        const language = resp2SpeciesInfoAsJSON[index][j]['language']['name'];
        if (language == 'de') {
            return j;
        }
    }
}


// function generateHTMLCounter(i) {
//     return `
//     <div>${i} von ${pokeCounter} geladen.</div>
//     `
// }


// function generateHTMLPokeName(i) {
//     return `
//     <div>${myPokesAsObject[i]['germanName']}</div>
//     `
// }