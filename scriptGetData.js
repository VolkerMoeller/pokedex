async function getCurrentPokemonFromServer() {
    let url = `https://pokeapi.co/api/v2/pokemon/${nextPoke}`
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    currentPoke = responseAsJSON;
    return currentPoke;
}


async function getCurrentPokemonSpeciesFromServer() {
    let url = currentPoke['species']['url'];
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    currentPokeSpecies = responseAsJSON;
    return currentPokeSpecies;
}