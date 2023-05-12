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


async function getCurrentAbilitiesFromServer() {
    let url = currentPoke['abilities'][0]['ability']['url'];
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    currentPokeAbilities = responseAsJSON;
    return currentPokeAbilities;
}