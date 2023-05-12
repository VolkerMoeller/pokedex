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


async function saveDataForTopPoke() {
    generalPokeData.push(
        {
            "pokeSlot1": currentPoke['types'][0]['type']['name'],         
            "pokeId": currentPoke['id'],         
            "pokeImgSrc": currentPoke['sprites']['other']['home']['front_default'],
            "pokeGermanName": currentGermanName,
        }
        );
    }