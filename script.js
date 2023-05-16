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
        await loadPokemon(i);
        buildMyPokeObject(i);
        fillMyPokeObject(i);
        renderPokeMini(i);
    }
}

function generateHTMLCounter(i) {
    return `
    <div>${i} von ${pokeCounter} geladen.</div>
    `
}


function generateHTMLPokeName(i) {
    return `
    <div>${myPokesAsObject[i]['germanName']}</div>
    `
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
    let idFromServer = resp1GeneralInfoAsJSON['id'];
    let nameFromServer = resp1GeneralInfoAsJSON['name'];
    let nameGermanFromServer = resp2SpeciesInfoAsJSON['names'][searchIndexOfGerman('names')]['name'];
    let slot1FromServer = resp1GeneralInfoAsJSON['types'][0]['type']['name'];
    let slot2FromServer = checkIfThereIsSlot2();
    let imgUrlFromServer = resp1GeneralInfoAsJSON['sprites']['other']['home']['front_default'];
    let weightFromServer = resp1GeneralInfoAsJSON['weight'];
    let heightFromServer = resp1GeneralInfoAsJSON['height'];
    let generaGermanFromServer = resp2SpeciesInfoAsJSON['genera'][searchIndexOfGerman('genera')]['genus'];
    let flavorFromServer = '';
    let abilitiesFromServer = '';
    let flavorsFromServer = '';
    myPokesAsObject[i]['id'] = idFromServer;
    myPokesAsObject[i]['name'] = nameFromServer;
    myPokesAsObject[i]['nameGerman'] = nameGermanFromServer;
    myPokesAsObject[i]['slot1'] = slot1FromServer;
    myPokesAsObject[i]['slot2'] = slot2FromServer;
    myPokesAsObject[i]['imgUrl'] = imgUrlFromServer;
    myPokesAsObject[i]['weight'] = weightFromServer;
    myPokesAsObject[i]['height'] = heightFromServer;
    myPokesAsObject[i]['specie'] = generaGermanFromServer;
    myPokesAsObject[i]['flavor'] = flavorFromServer;
    myPokesAsObject[i]['abilities'] = abilitiesFromServer;
    myPokesAsObject[i]['flavors'] = flavorsFromServer;
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
        const language = resp2SpeciesInfoAsJSON['names'][j]['language']['name'];
        if (language == 'de') {
            return j;
        }
    }
};



// function searchIndexOfGerman() {
//     for (let j = 0; j < resp1GeneralInfoAsJSON['names'].length; j++) {
//         const language = resp2SpeciesInfoAsJSON['names'][j]['language']['name'];
//         if (language == 'de') {
//             return j;
//         }
//     }
// };


async function loadPokemon(id) {
    const url1 = 'https://pokeapi.co/api/v2/pokemon/' + id;
    const url2 = 'https://pokeapi.co/api/v2/pokemon-species/' + id;

    let results = await Promise.all([defResp1(), defResp2(),]);

    async function defResp1() {
        let resp1AsSthFromServer = await fetch(url1);
        resp1GeneralInfoAsJSON = await resp1AsSthFromServer.json();
    }
    async function defResp2() {
        let resp2AsSthFromServer = await fetch(url2);
        resp2SpeciesInfoAsJSON = await resp2AsSthFromServer.json();
    }
}