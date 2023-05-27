async function fetchDataFromServer(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
        throw error;
    }
}

async function performServerRequests(i) {
    try {
        let url1 = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let url2 = `https://pokeapi.co/api/v2/pokemon-species/${i}/`;
        let arrayPokemon = await fetchDataFromServer(url1);
        console.log(i + ' pokemonData:', arrayPokemon);
        let arrayPokemonSpecies = await fetchDataFromServer(url2);
        console.log(i + ' pokemon-speciesData:', arrayPokemonSpecies);
        getAbiltiesData(arrayPokemon, i);
    } catch (error) {
        console.error('Fehler beim Ausführen der Serverzugriffe:', error);
    }
}


async function getAbiltiesData(arrayPokemon, i) {
    let url = await takeDynamikUrl(arrayPokemon);
    let arrayPokemonAbilities = await fetchAbilitiesDataFromServer(url);
    console.log(i + ' pokemon-abitiesData:', arrayPokemonAbilities);
}


async function takeDynamikUrl(arrayPokemon) {
    let dynamicUrlIndex = arrayPokemon['abilities'].length - 1;
    let dynamicUrl = arrayPokemon['abilities'][dynamicUrlIndex]['ability']['url'];
    return dynamicUrl;
}


async function fetchAbilitiesDataFromServer(url) {
    let response = await fetch(url);
    let arrayPokemonAbilities = await response.json();
    return arrayPokemonAbilities;
}


async function performServerRequestBy(url) {
    try {
        dataByUrl = await fetchDataFromServer(url);
    } catch (error) {
        console.error('Fehler beim Ausführen des Serverzugriffs "dataByUrl":', error);
    }
}


async function getAbilityUrl() {
    let abilityUrl = arrayPokemon['abilities'][1]['ability']['url'];
    console.log('ablitityUrl: ', abilityUrl);
    await performServerRequestBy(abilityUrl);
    console.log('ablitityData: ', dataByUrl);
}


function test() {
    for (let i = 1; i < 3; i++) {
        performServerRequests(i);
    }
}