async function performServerRequests(i) {
    try {
        let url1 = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let url2 = `https://pokeapi.co/api/v2/pokemon-species/${i}/`;
        let arrayPokemon = await fetchDataFromServer(url1);
        let arrayPokemonAbilities = await fetchDataByDynamikUrl(arrayPokemon, 'abilities', 'ability');
        let arrayPokemonSpecies = await fetchDataFromServer(url2);
        let arrayPokemonColor = await fetchDataByDynamikUrl(arrayPokemonSpecies, 'color', '');
        await useArrays(i, arrayPokemon, arrayPokemonAbilities, arrayPokemonSpecies, arrayPokemonColor);
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


function takeDynamikUrl(array, index1st, index2nd) {
    if (index1st == 'color') {
        let dynamicUrl = array[index1st]['url'];
        return dynamicUrl;
    }
    if (index1st == 'abilities') {
        let dynamicUrlIndex = array[index1st].length - 1;
        let dynamicUrl = array[index1st][dynamicUrlIndex][index2nd]['url'];
        return dynamicUrl;
    }
}


async function useArrays(i, arrayPokemon, arrayPokemonAbilities, arrayPokemonSpecies, arrayPokemonColor) {
    console.log(i + ' arrayPokemon ', arrayPokemon);
    console.log(i + ' arrayPokemonAbilities ', arrayPokemonAbilities);
    console.log(i + ' arrayPokemonSpecies ', arrayPokemonSpecies);
    console.log(i + ' arrayPokemonColor ', arrayPokemonColor);
}