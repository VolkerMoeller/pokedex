let myPokesAsObject = [
    {
        'id': '',
        'name': '',
        'germanName': '',
        'objArray': [],
    }
]
let resp1GeneralInfoAsJSON;
let resp2SpeciesInfoAsJSON;



async function init() {
    for (let i = 1; i < 101; i++) {
        await loadPokemon(i);
        buildMyPokeObject(i);
        fillMyPokeObject(i);
    }
    console.log(myPokesAsObject);
}


function buildMyPokeObject() {
    myPokesAsObject.push(
        {
            'id': '',
            'name': '',
            'germanName': '',
            'objArray': [],
        }
    );
}


function fillMyPokeObject(i) {
    let idFromServer = resp1GeneralInfoAsJSON['id'];
    let nameFromServer = resp1GeneralInfoAsJSON['name'];
    searchIndexOfGermanName();
    let germanNameFromServer = resp2SpeciesInfoAsJSON['names'][searchIndexOfGermanName()]['name'];
    myPokesAsObject[i]['id'] = idFromServer;
    myPokesAsObject[i]['name'] = nameFromServer;
    myPokesAsObject[i]['germanName'] = germanNameFromServer;
}


function searchIndexOfGermanName() {
    for (let j = 0; j < resp2SpeciesInfoAsJSON['names'].length; j++) {
        const language = resp2SpeciesInfoAsJSON['names'][j]['language']['name'];
        if (language == 'de') {
            return j;
        }
    }
};


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