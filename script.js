let dataByUrl = [];

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
        const url1 = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        const url2 = `https://pokeapi.co/api/v2/pokemon-species/${i}/`;
        
        const data1 = await fetchDataFromServer(url1);
        console.log(i + ' pokemonData:', data1);
        await getAbilityUrl(data1);
        
        const data2 = await fetchDataFromServer(url2);
        console.log(i + ' pokemon-speciesData:', data2);
        
    } catch (error) {
        console.error('Fehler beim Ausführen der Serverzugriffe:', error);
    }
}


async function performServerRequestBy(url) {
    try {
        dataByUrl = await fetchDataFromServer(url);
        // console.log('dataByUrl', dataByUrl);
    } catch (error) {
        console.error('Fehler beim Ausführen des Serverzugriffs "dataByUrl":', error);
    }
}

async function getAbilityUrl(data1) {
    let abilityUrl = data1['abilities'][1]['ability']['url'];
    // [1] hidden = false
    // console.log('ablitityUrl: ', abilityUrl);
    await performServerRequestBy(abilityUrl);
    console.log('ablitityData: ', dataByUrl);
}


function test() {
    for (let i = 1; i < 30; i++) {
        performServerRequests(i);
    }
}