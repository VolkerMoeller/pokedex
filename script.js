let initEnd = 20;
let nextPokeNr = initEnd + 1;
let stepPokeNrs = 19;
let endPokeNr = nextPokeNr + stepPokeNrs;
let maxPokeNr = 1010;
let currentPokeNr = 0
let indexOfGermanData;
let functionRunning = false;
let loadedPokeNames = [];
let loadedPokeIds = [];


function init() {
    loadedPokeNames = [];
    loadedPokeIds = [];
    document.getElementById('myPlace').innerHTML = '';
    getData(1, initEnd);
}


function initNext() {
    getData(nextPokeNr, endPokeNr);
}


async function getData(begin, end) {
    if (!functionRunning) {
        functionRunning = true;
        for (let i = begin; i <= end; i++) {
            await performServerRequests(i);
            updateAmountPokesAndProgress(i);
        }
        updateCountNrs(end);
        functionRunning = false;
    }
}


function updateCountNrs(end) {
    nextPokeNr = end + 1;
    endPokeNr = nextPokeNr + stepPokeNrs;
}


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
        await fetchArrayPokemon(i, url1);
        await fetchArrayPokemonSpecies(i, url2);
    } catch (error) {
        console.error('Fehler beim Ausführen der Serverzugriffe:', error);
    }
}


async function fetchArrayPokemon(i, url1) {
    let arrayPokemon = await fetchDataFromServer(url1);
    console.log(i + ' pokemonData:', arrayPokemon);
    useArrayPokemon(i, arrayPokemon);
}


async function useArrayPokemon(i, arrayPokemon) {
    await renderPokeMinis1stLevel(i, arrayPokemon);
    await stylePokeBgn(i, arrayPokemon);
    await getAbiltiesData(i, arrayPokemon);
    await changeMiniToBlack(i, arrayPokemon);
    await noticeDisplayedPokeId(i, arrayPokemon);
}


async function noticeDisplayedPokeId(i, arrayPokemon) {
    let pokeId = arrayPokemon['id'];
    loadedPokeIds.push(pokeId);
}


async function fetchArrayPokemonSpecies(i, url2) {
    let arrayPokemonSpecies = await fetchDataFromServer(url2);
    console.log(i + ' pokemon-speciesData:', arrayPokemonSpecies);
    await renderPokeMinis2ndLevel(i, arrayPokemonSpecies);
}


async function getAbiltiesData(i, arrayPokemon) {
    let dynamikUrl = await takeDynamikUrl(arrayPokemon);
    let arrayPokemonAbilities = await fetchAbilitiesDataFromServer(dynamikUrl);
    console.log(i + ' pokemon-abitiesData:', arrayPokemonAbilities);
}


function takeDynamikUrl(arrayPokemon) {
    let dynamicUrlIndex = arrayPokemon['abilities'].length - 1;
    let dynamicUrl = arrayPokemon['abilities'][dynamicUrlIndex]['ability']['url'];
    return dynamicUrl;
}


async function fetchAbilitiesDataFromServer(url) {
    let response = await fetch(url);
    let arrayPokemonAbilities = await response.json();
    return arrayPokemonAbilities;
}


// render PokeMinis


async function renderPokeMinis1stLevel(i, arrayPokemon) {
    let imgSrc = arrayPokemon['sprites']['other']['official-artwork']['front_shiny'];
    let pokeId = arrayPokemon['id'];
    document.getElementById('myPlace').innerHTML += generateHTMLPokeMini1st(i, imgSrc, pokeId);
}


function generateHTMLPokeMini1st(i, imgSrc, pokeId) {
    return `
    <button id="pokeButton${i}" class="pokeButton" onclick="switchContent()">
        <div id="pokeMini${i}" class="pokeMini">
            <div id="pokeMini1stLine${i}" class="pokeMini1stLine">
                <div id="pokeMiniId${i}" class="pokeMiniId">${pokeId}</div>
                <div id="pokeMiniGermanName${i}" class="pokeMiniName"></div>
            </div>
        <div id="pokeMiniImgDiv${i}" class="pokeMiniImgDiv">
            <img src=${imgSrc}>
        </div>
        </div>
    </button>
    `
}


async function renderPokeMinis2ndLevel(i, arrayPokemonSpecies) {
    searchIndexOfGermanData(arrayPokemonSpecies, 'names');
    let germanName = arrayPokemonSpecies['names'][indexOfGermanData]['name'];
    console.log(germanName);
    await noticeDisplayedPokeName(germanName);
    document.getElementById('pokeMiniGermanName' + i).innerHTML = germanName;
}


async function noticeDisplayedPokeName(germanName) {
    let pokeName = germanName;
    loadedPokeNames.push(pokeName);
}


async function changeMiniToBlack(i, arrayPokemon) {
    let slot1 = arrayPokemon['types'][0]['type']['name'];
    if (slot1 == 'electric' || slot1 == 'ice') {
        document.getElementById('pokeMiniGermanName' + i).classList.add(`color-black`);
        document.getElementById('pokeMiniId' + i).classList.add(`color-black`);
    }
}


// progressBar


function updateAmountPokesAndProgress(currentPokeNr) {
    renderAmountLoadedPokes(currentPokeNr);
    updateProgress(currentPokeNr);
}


function renderAmountLoadedPokes(currentPokeNr) {
    document.getElementById('amount-pokes-loaded').innerHTML = '';
    document.getElementById('amount-pokes-loaded').innerHTML = generateHTMLAmountLoadedPokes(currentPokeNr);
}


function generateHTMLAmountLoadedPokes(currentPokeNr) {
    return 'Es wurden ' + currentPokeNr + ' von 1010 geladen';
}


function updateProgress(currentPokeNr) {
    let progressWidth = currentPokeNr / maxPokeNr * 100;
    document.getElementById('progress').style = `width: ${progressWidth}%`;
}


// background-color


async function stylePokeBgn(currentPokeNr, arrayPokemon) {
    let pokeType = arrayPokemon['types'][0]['type']['name'];
    setBgnByType(pokeType, currentPokeNr);
}


function setBgnByType(pokeType, i) {
    document.getElementById('pokeMini' + i).classList.add('bgn-type-' + pokeType);
}


// switch PokeCard-Overlay 


function switchContent() {
    let overlay = document.getElementById('overlay');
    if (overlay.classList.contains('display-none') == true) {
        displayOn(overlay);
    } else {
        displayOff(overlay);
    }
    topFunction();
}


// display OnOff


function displayOn(element) {
    element.classList.remove('display-none');
    element.classList.add('display-flex');
}


function displayOff(element) {
    element.classList.add('display-none');
    element.classList.remove('display-flex');
}


//  onTop


function topFunction() {
    document.documentElement.scrollTop = 0;
}


//   germanData


function searchIndexOfGermanData(arrayAsJSON, index) {
    for (let j = 0; j < arrayAsJSON[index].length; j++) {
        const language = arrayAsJSON[index][j]['language']['name'];
        if (language == 'de') {
            indexOfGermanData = j;
            return indexOfGermanData;
        }
    }
}


// searchByName

// function searchIndexOfName(searchName) {
//     for (let i = 0; i < pokes.length; i++) {
//         let nameGerman = pokes[i]['pokeNameGerman'][0];
//         if (nameGerman) {
//             nameGerman = nameGerman.toLowerCase();
//         }
//         if (searchName == nameGerman) {
//             let index = i;
//             return index;
//         }
//     }
// }

function searchByName() {
    for (let i = 0; i < loadedPokeNames.length; i++) {
        let searchName = document.getElementById('searchName').value;
        searchName = searchName.toLowerCase();
        let loadedPokeName = loadedPokeNames[i].toLowerCase();
        let result = loadedPokeName.startsWith(searchName);
        if (result == true) {
            console.log(result + i);
        } else {console.log('sch')}
    }
}