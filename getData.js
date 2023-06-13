async function performServerRequests(i) {
    try {
        let url1 = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let url2 = `https://pokeapi.co/api/v2/pokemon-species/${i}/`;
        let arrayPoke = await fetchDataFromServer(url1);
        let arrayPokeAbi = await fetchDataByDynamikUrl(arrayPoke, 'abilities', '', 'ability');
        let arrayPokeSpec = await fetchDataFromServer(url2);
        let arrayPokeCol = await fetchDataByDynamikUrl(arrayPokeSpec, 'color', '', '');
        await useArrays(i, arrayPoke, arrayPokeAbi, arrayPokeSpec, arrayPokeCol);
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


function fetchDataByDynamikUrl(array, indexAll, position, indexOne) {
    try {
        let dynamikUrl = takeDynamikUrl(array, indexAll, position, indexOne);
        let data = fetchDataFromServer(dynamikUrl);
        return data;
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten mit dynamikUrl:', error);
        throw error;
    }
}


function takeDynamikUrl(array, index1st, position, index2nd) {
    if (index1st == 'color') {
        let dynamicUrl = array[index1st]['url'];
        return dynamicUrl;
    }
    if (index1st == 'abilities') {
        let dynamicUrlIndex = array[index1st].length - 1;
        let dynamicUrl = array[index1st][dynamicUrlIndex][index2nd]['url'];
        return dynamicUrl;
    }
    if (index1st == 'types') {
        let dynamicUrl = array[index1st][position][index2nd]['url'];
        return dynamicUrl;
    }
    if (index1st == 'evolution_chain'){
        let dynamicUrl = array[index1st]['url'];
        return dynamicUrl;
    }
}


async function useArrays(i, arrPoke, arrPokeAbi, arrPokeSpec, arrPokeCol) {
    await noticeData(i, arrPoke, arrPokeSpec, arrPokeCol);
    await render(i, arrPoke, arrPokeAbi, arrPokeSpec, arrPokeCol);
    await fill(i, arrPoke, arrPokeAbi, arrPokeSpec, arrPokeCol);
    console.log(i + ' Pokemon ', arrPoke);
    console.log(i + ' PokemonAbilities ', arrPokeAbi);
    console.log(i + ' PokemonSpecies ', arrPokeSpec);
    console.log(i + ' PokemonColor ', arrPokeCol);
    // console.log(i, loadedPokeIds, loadedPokeNames, loadedPokeColors, loadedPokeSlots1, loadedPokeSlots2);
}


function getGermanData(array, index1st, index2nd) {
    let indexGermanData = searchIndexOfGermanData(array, index1st);
    let germanData = array[index1st][indexGermanData][index2nd];
    return germanData;
}


function searchIndexOfGermanData(array, index) {
    for (let j = 0; j < array[index].length; j++) {
        const language = array[index][j]['language']['name'];
        if (language == 'de') {
            indexGermanData = j;
            j = array[index].length;
            return indexGermanData;
        }
    }
}