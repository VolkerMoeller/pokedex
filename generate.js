function generateHTMLPokeMini1st(i, imgSrc, pokeId) {
    return /*html*/`
    <button id="pokeButton${i}" class="pokeButton" onclick="showPokeCard(${i})">
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


function generateHTMLPokeCard(i) {
    return /*html*/`
    <div id="pokedex${i}" class="pokedex display-none">
        <div id="pokedex-top${i}" class="pokedex-top">
            <div>
                <button onclick="switchContent()" class="btn-back">
                    <img src="./img/backspace.png">
                </button>
            </div>
            <div class="pokedex-above">
                <div id="pokedex-name${i}" class="pokedex-name">
                </div>
                <div id="pokedex-id${i}" class="pokedex-id">
                </div>
            </div>
            <div class="slot-line">
                <div id="pokedex-slots${i}" class="pokedex-slots">
                </div>
                <div class="favorite">
                    <div id="fill0${i}"><button id="btn-fill0${i}" class="btn-fav" onclick="setFavorite(${i})"><img id="pokeImgFavFill0${i}" src="./img/favorite_FILL0.png"></button></div>
                    <div id="fill1${i}" class="display-none"><button id="btn-fill1${i}"class="btn-fav" onclick="setFavorite(${i})"><img id="pokeImgFavFill1${i}" src="./img/favorite_FILL1.png"></button></div>
                </div>
            </div>
            <div id="pokedex-image-place${i}" class="pokedex-image-place">
                <div id="pokedex-image${i}" class="pokedex-image"></div>
            </div>
        </div>
        <div id="pokedex-bottom${i}" class="pokedex-bottom">
        <div class="navigationPoke">
            <div onmouseover="hoverNavigationOver(1, ${i})" onmouseout="hoverNavigationOut(1, ${i})">
                <button onclick="showCurrentCardById('card1${i}', ${i})" id="btn-card1${i}">About</button>
            </div>
            <div onmouseover="hoverNavigationOver(2, ${i})" onmouseout="hoverNavigationOut(2, ${i})">
                <button onclick="showCurrentCardById('card2${i}', ${i})" id="btn-card2${i}">Base Stats</button>
            </div>
            <div onmouseover="hoverNavigationOver(3, ${i})" onmouseout="hoverNavigationOut(3, ${i})">
                <button onclick="showCurrentCardById('card3${i}', ${i})" id="btn-card3${i}">Evolution</button>
            </div>
            <div onmouseover="hoverNavigationOver(4, ${i})" onmouseout="hoverNavigationOut(4, ${i})">
                <button onclick="showCurrentCardById('card4${i}', ${i})" id="btn-card4${i}">5 Moves</button>
            </div>
        </div>
        <div id="card1${i}" class="cards"></div>
        <div id="card2${i}" class="cards display-none"></div>
        <div id="card3${i}" class="cards display-none">card3</div>
        <div id="card4${i}" class="cards display-none">card4</div>
    </div> 
    `
}

function generateHTMLStats(i) {
    return /*html*/`
<table>
    <tr id="hp${i}">
      <td id="stat-name${i}">HP</td>
      <td id="stat-value${i}">150</td>
      <td>
        <div class="progress-about-bar">
          <div id="progress-about-bar-inner${i}" class="progress-about-bar-inner" style="width: 75%;"></div>
        </div>
      </td>
    </tr>
    <tr id="attack${i}">
      <td id="stat-name${i}">Attack</td>
      <td id="stat-value${i}">100</td>
      <td>
        <div class="progress-about-bar">
          <div id="progress-about-bar-inner${i}" class="progress-about-bar-inner" style="width: 50%;"></div>
        </div>
      </td>
    </tr>
    <tr id="defense${i}">
      <td id="stat-name${i}">Defense</td>
      <td id="stat-value${i}">80</td>
      <td>
        <div class="progress-about-bar">
          <div id="progress-about-bar-inner${i}" class="progress-about-bar-inner" style="width: 40%;"></div>
        </div>
      </td>
    </tr>
    <tr id="special-attack${i}">
      <td id="stat-name${i}">Special Attack</td>
      <td id="stat-value${i}">120</td>
      <td>
        <div class="progress-about-bar">
          <div id="progress-about-bar-inner${i}" class="progress-about-bar-inner" style="width: 60%;"></div>
        </div>
      </td>
    </tr>
    <tr id="special-defense${i}">
      <td id="stat-name${i}">Special Defense</td>
      <td id="stat-value${i}">100</td>
      <td>
        <div class="progress-about-bar">
          <div id="progress-about-bar-inner${i}" class="progress-about-bar-inner" style="width: 50%;"></div>
        </div>
      </td>
    </tr>
    <tr id="speed${i}">
      <td id="stat-name${i}">Speed</td>
      <td id="stat-value${i}">90</td>
      <td>
        <div class="progress-about-bar">
          <div id="progress-about-bar-inner${i}" class="progress-about-bar-inner" style="width: 45%;"></div>
        </div>
      </td>
    </tr>
  </table>
    `}