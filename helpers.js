// get german data:
function getGermanData(array, index1st, index2nd) {
    let indexGermanData = searchIndexOfGermanData(array, index1st);
    let germanData = array[index1st][indexGermanData][index2nd];
    return germanData;
}


function searchIndexOfGermanData(array, index) {
    for (let j = 0; j < array[index].length; j++) {
        let language = array[index][j]['language']['name'];
        if (language == 'de') {
            let indexGermanData = j;
            j = array[index].length;
            return indexGermanData;
        }
    }
}


// format #0001
function format3LeftHandZeros(value) {
    value = value.toString();
    let formatValue = value.padStart(4, '0');
    return formatValue;
}


// "easy loading"
window.onscroll = function () {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 20) {
        initNext();
    }
}


// clear search input
function clearSearchInput(index) {
    document.getElementById(index).value = '';
}


// per cent baseStats (255)
function perCent(value) {
    let valuePerCent = value / baseStats * 100;
    return valuePerCent;
}


// update progress line stats   
function renderProgressLine(i, valuePerCent, j) {
    document.getElementById('progress-about-bar-inner' + j + i).style = `width: ${valuePerCent}%`;
}


// search by
function searchBy(array, searchIndex, pushIndex, path) {
    hidePokeMinis();
    for (let i = 0; i < array.length; i++) {
        let searchElement = document.getElementById(searchIndex).value;
        searchElement = searchElement.toLowerCase();
        let compareElement = array[i][path].toLowerCase();
        let result = compareElement.startsWith(searchElement);
        if (result == true) {
            document.getElementById(pushIndex + i).classList.remove('display-none');
        }
    }
}


// toggle all pokeMinis
function togglePokeMinis() {
    for (let i = 0; i < allPokes.length; i++) {
        document.getElementById('pokeMiniButton' + i).classList.toggle('display-none');
    }
}

// show all pokeMinis
function showPokeMinis() {
    for (let i = 0; i < allPokes.length; i++) {
        document.getElementById('pokeMiniButton' + i).classList.remove('display-none');
    }
}

// hide all pokeMinis
function hidePokeMinis() {
    for (let i = 0; i < allPokes.length; i++) {
        document.getElementById('pokeMiniButton' + i).classList.add('display-none');
    }
}


function initShowNextPoke(i, direction) {
    for (let j = 0; j < allPokes.length; j++) {
        
    }
}

// show next "PokeMax"
function showNextPoke(i, direction) {
    if (direction == 'left' && i == 0) {
        console.log('endegelände');
        document.getElementById('btn-back' + i).disabled = true;
        document.getElementById('btn-back' + i).classList.add('disabled');
    }
    if (direction == 'right' && i == allPokes.length - 1) {
        console.log('endegelände');
    }
    if (direction == 'left' && i > 0) {
        document.getElementById('pokedex' + i).classList.toggle('display-none');
        document.getElementById('pokedex' + (i - 1)).classList.toggle('display-none');
        currentPokeNr = currentPokeNr - 1;
    }
    if (direction == 'right' && i < allPokes.length - 1) {
        document.getElementById('pokedex' + i).classList.toggle('display-none');
        document.getElementById('pokedex' + (i + 1)).classList.toggle('display-none');
        currentPokeNr = currentPokeNr + 1;
    }
}

// workflow
function goToPokeMinis() {
    switchContent(currentPokeNr);
}

function backToContent(i) {
    document.getElementById('myPlace').classList.remove('display-none');
    switchContent(i);
}

function switchContent(i) {
    document.getElementById('pokedex' + i).classList.toggle('display-none');
    document.getElementById('overlay').classList.toggle('display-none');
    document.getElementById('pokeCardContent').classList.toggle('display-none');
    getFav();
}