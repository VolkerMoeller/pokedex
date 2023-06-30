function generateHTML(begin, end) {
    for (let i = begin; i < end; i++) {
        document.getElementById('myPlace').innerHTML += generateHTMLPokeMini(i, format3LeftHandZeros(allPokes[i]['pokeId']), allPokes[i]['pokeName'], allPokes[i]['pokeTypes'][0], allPokes[i]['pokeImg'],);
        document.getElementById('pokeCardPlace').innerHTML += generateHTMLPokeMax(i, allPokes[i]['pokeName'], format3LeftHandZeros(allPokes[i]['pokeId']), allPokes[i]['pokeTypes'][0], allPokes[i]['pokeTypes'][1], allPokes[i]['pokeImg'], allPokes[i]['pokeTypesEn'][0],);
        for (let j = 0; j < allPokes[i].pokeAboutValues.length; j++) {
            document.getElementById('card1' + i).innerHTML += generateHTMLAbout(allPokes[i].pokeAboutNames[j], allPokes[i].pokeAboutValues[j]);
        }
        for (let j = 0; j < allPokes[i].pokeStatValues.length; j++) {
            document.getElementById('card2' + i).innerHTML += generateHTMLStats(i, j, allPokes[i].pokeStatNames[j], allPokes[i].pokeStatValues[j], perCent(allPokes[i].pokeStatValues[j]));
        }
    }
}

function generateHTMLPokeMini(i, id, name, type, img) {
    return /*html*/`
      <button id="pokeMiniButton${i}" class="pokeMiniButton" onclick="showPokeCard(${i})">
        <div id="pokeMini${i}" class="pokeMini">
            <div id="pokeMini1stLine${i}" class="pokeMini1stLine">
                <div id="pokeMiniName${i}" class="pokeMiniName">${name}</div>
                <div id="pokeMiniId${i}" class="pokeMiniId">#${id}</div>
                <div id="pokeMiniType1${i}" class="pokeMiniType1">${type}</div>
                <div class="miniFavorite">
                <div id="miniFill0${i}"><div class="mini-btn-fav"><img src="./img/favorite_FILL0.png"></div></div>
                <div id="miniFill1${i}" class="display-none"><div class="mini-btn-fav"><img src="./img/favorite_FILL1.png"></div></div>
            </div>
            </div>
                  <div id="pokeMiniImgDiv${i}" class="pokeMiniImgDiv">
                    <img id="pokeMiniImg${i}" class="pokeMiniImg" src="${img}">
                  </div>
                </div>
            </button>
            `
}


function generateHTMLPokeMax(i, name, id, type1, type2, img, slot1) {
    return /*html*/`
        <div id="pokedex${i}" class="pokedex display-none">
    <div id="pokedex-top${i}" class="pokedex-top">
        <div>
            <button onclick="backToContent(${i})" class="btn-back">
                <img src="./img/backspace.png">
            </button>
        </div>
        <div class="pokedex-above">
            <div id="pokedex-name${i}" class="pokedex-name">${name}
            </div>
            <div id="pokedex-id${i}" class="pokedex-id">#${id}
            </div>
        </div>
        <div class="slot-line">
            <div id="pokedex-slots${i}" class="pokedex-slots">
                <div id="base-type1${i}" class="slot">${type1}</div>
                <div id="base-type2${i}" class="slot display-none">${type2}</div>
            </div>
            <div class="favorite">
                <div id="fill0${i}"><button id="btn-fill0${i}" class="btn-fav" onclick="setFavorite(${i})"><img id="pokeImgFavFill0${i}" src="./img/favorite_FILL0.png"></button></div>
                <div id="fill1${i}" class="display-none"><button id="btn-fill1${i}" class="btn-fav" onclick="setFavorite(${i})"><img id="pokeImgFavFill1${i}" src="./img/favorite_FILL1.png"></button></div>
            </div>
        </div>
   
        <div id="pokedex-image-place${i}" class="pokedex-image-place">
            <div id="pokedex-image${i}" class="pokedex-image">
                <img id="pokedex-img${i}" class="pokedex-img" src="${img}">
            </div>
            <div class="panel">
            <button class='btn-back' onclick="showNextPoke(${i}, 'left')"><img src="./img/arrow_left.png"></button>
            <button class='btn-back' onclick="showNextPoke(${i}, 'right')"><img src="./img/arrow_right.png"></button>
        </div>
        </div>
    </div>
    <div id="pokedex-bottom${i}" class="pokedex-bottom">
        <div class="navigationPoke">
            <div onmouseover="hoverNavigationOver(1, ${i}, '${slot1}')" onmouseout="hoverNavigationOut(1, ${i}, '${slot1}')">
                <button onclick="showCurrentCardById('card1${i}', ${i}, '${slot1}')" id="btn-card1${i}">Über</button>
            </div>
            <div onmouseover="hoverNavigationOver(2, ${i}, '${slot1}')" onmouseout="hoverNavigationOut(2, ${i}, '${slot1}')">
                <button onclick="showCurrentCardById('card2${i}', ${i}, '${slot1}')" id="btn-card2${i}">Basis Werte</button>
            </div>
        </div>
        <div id="card1${i}" class="cards"></div>
        <div id="card2${i}" class="cards display-none"></div>
    </div> 
      `
}


function generateHTMLAbout(name, value) {
    return /*html*/`
        <div class="aboutRow">
            <div class="aboutName">${name}</div>
            <div class="aboutValue">${value}</div>
        </div>
      `}


function generateHTMLStats(i, j, name, value, valuePerCent) {
    return /*html*/`
   <div class="statRow">
        <div class="statName">${name}</div>
        <div class="statValueAndProgress">
            <div class="statValue">${value}</div>
            <div class="progress-about-bar">
                <div id="progress-about-bar-inner${j}${i}" class="progress-about-bar-inner" style="width: ${valuePerCent}%;"></div>
            </div>
        </div>
    </div>
    `}


