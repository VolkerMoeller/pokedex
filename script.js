async function loadPokemon() {
    let url ='https://pokeapi.co/api/v2/pokemon/ditto';
    let response = await fetch(url);
    let responseAsJSON= await response.json();
    console.log('Response: ',responseAsJSON);
} 