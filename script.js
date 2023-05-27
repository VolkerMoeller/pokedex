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

        let dynamicUrlIndex = arrayPokemon['abilities'].length - 1;
        // nimm immer die letzte Url. Hier ist die ability nicht hidden
        let dynamicUrl = arrayPokemon['abilities'][dynamicUrlIndex]['ability']['url'];

        let url3 = dynamicUrl; // Verwende die dynamische URL für die zweite Abfrage
        let response = await fetch(url3);
        let arrayPokemonAbilities = await response.json();
        console.log(i + ' pokemon-abitiesData:', arrayPokemonAbilities);

    } catch (error) {
        console.error('Fehler beim Ausführen der Serverzugriffe:', error);
    }
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
    // [1] hidden = false
    console.log('ablitityUrl: ', abilityUrl);
    await performServerRequestBy(abilityUrl);
    console.log('ablitityData: ', dataByUrl);
}


function test() {
    for (let i = 1; i < 30; i++) {
        performServerRequests(i);
    }
}