async function performServerRequests(i) {
    try {
        let url1 = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let url2 = `https://pokeapi.co/api/v2/pokemon-species/${i}/`;
        let arrayPokemon = await fetchDataFromServer(url1);
        let arrayPokemonAbilities = await fetchDataByDynamikUrl(arrayPokemon, 'abilities', 'ability');
        let arrayPokemonSpecies = await fetchDataFromServer(url2);
        await useArrays(i, arrayPokemon, arrayPokemonAbilities, arrayPokemonSpecies);
    } catch (error) {
        console.error('Fehler beim Ausführen der Serverzugriffe:', error);
    }
}


async function fetchDataFromServer(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
        throw error;
    }
}


async function fetchDataByDynamikUrl(array, indexAll, indexOne) {
    try {
        let dynamikUrl = await takeDynamikUrl(array, indexAll, indexOne);
        let data = await fetchDataFromServer(dynamikUrl);
        return data;
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten mit dynamikUrl:', error);
        throw error;
    }
}


function takeDynamikUrl(array, indexAll, indexOne) {
    let dynamicUrlIndex = array[indexAll].length - 1;
    let dynamicUrl = array[indexAll][dynamicUrlIndex][indexOne]['url'];
    return dynamicUrl;
}


async function fetchArrayPokemonSpecies(i, url2) {
    let arrayPokemonSpecies = await fetchDataFromServer(url2);
    await useArrayPokemonSpecies(i, arrayPokemonSpecies);
}


async function useArrays(i, arrayPokemon, arrayPokemonAbilities, arrayPokemonSpecies) {
    console.log(i + ' arrayPokemon ' + arrayPokemon);
    console.log(i + ' arrayPokemonAbilities ', arrayPokemonAbilities);
    console.log(i + ' arrayPokemonSpecies ', arrayPokemonSpecies);
}