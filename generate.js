function generateHTMLPokeMini(i) {
  return /*html*/`
    <button id="pokeMiniButton${i}" class="pokeMiniButton" onclick="showPokeCard(${i})">
        <div id="pokeMini${i}" class="pokeMini">
            <div id="pokeMini1stLine${i}" class="pokeMini1stLine">
                <div id="pokeMiniId${i}" class="pokeMiniId">pokeId</div>
                <div id="pokeMiniName${i}" class="pokeMiniName">pokeName</div>
            </div>
            <div id="pokeMiniImgDiv${i}" class="pokeMiniImgDiv">pokeImg</div>
        </div>
    </button>
    `
}


function generateHTMLPokeCard(i, slot1) {
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
                  <div id="base-type1${i}" class="slot"></div>
                  <div id="base-type2${i}" class="slot"></div>
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
            <div onmouseover="hoverNavigationOver(1, ${i}, '${slot1}')" onmouseout="hoverNavigationOut(1, ${i}, '${slot1}')">
                <button onclick="showCurrentCardById('card1${i}', ${i}, '${slot1}')" id="btn-card1${i}">Über</button>
            </div>
            <div onmouseover="hoverNavigationOver(2, ${i}, '${slot1}')" onmouseout="hoverNavigationOut(2, ${i}, '${slot1}')">
                <button onclick="showCurrentCardById('card2${i}', ${i}, '${slot1}')" id="btn-card2${i}">Basis Werte</button>
            </div>
            <div onmouseover="hoverNavigationOver(3, ${i}, '${slot1}')" onmouseout="hoverNavigationOut(3, ${i}, '${slot1}')">
                <button onclick="showCurrentCardById('card3${i}', ${i}, '${slot1}')" id="btn-card3${i}">Evolution</button>
            </div>
            <div onmouseover="hoverNavigationOver(4, ${i}, '${slot1}')" onmouseout="hoverNavigationOut(4, ${i}, '${slot1}')">
                <button onclick="showCurrentCardById('card4${i}', ${i}, '${slot1}')" id="btn-card4${i}">5 Stile</button>
            </div>
        </div>
        <div id="card1${i}" class="cards">card1</div>
        <div id="card2${i}" class="cards display-none">card2</div>
        <div id="card3${i}" class="cards display-none">card3</div>
        <div id="card4${i}" class="cards display-none">card4</div>
    </div> 
    `
}


function generateHTMLAbout(i) {
  return /*html*/`
<table>
  <tr id="genera${i}">
    <td id="genera-name${i}">Klasse:</td>
    <td></td>
    <td id="genera-value${i}"></td>
  </tr>
  <tr id="weight${i}">
    <td id="weight-name${i}">Gewicht:</td>
    <td></td>
    <td id="weight-value${i}"></td>
  </tr>
  <tr id="height${i}">
    <td id="height-name${i}">Höhe:</td>
    <td></td>
    <td id="height-value${i}"></td>
  </tr>
  <tr id="ability1${i}">
    <td id="ability-name${i}">Fähigkeit:</td>
    <td></td>
    <td id="ability-value${i}"></td>
  </tr>
  <tr id="ability2${i}">
    <td></td>
    <td></td>
      <td id="ability-text${i}"></td>
    </tr>
  </table>
    `}


function generateHTMLStats(i) {
  return /*html*/`
  <table>
    <tr id="hp${i}">
      <td id="stat-name1${i}">Kraftpunkte:</td>
      <td id="stat-value1${i}"></td>
      <td>
        <div class="progress-about-bar">
          <div id="progress-about-bar-inner1${i}" class="progress-about-bar-inner" style="width: 0%;"></div>
        </div>
      </td>
    </tr>
    <tr id="attack${i}">
      <td id="stat-name2${i}">Angriff:</td>
      <td id="stat-value2${i}"></td>
      <td>
        <div class="progress-about-bar">
          <div id="progress-about-bar-inner2${i}" class="progress-about-bar-inner" style="width: 0%;"></div>
        </div>
      </td>
    </tr>
    <tr id="defense${i}">
      <td id="stat-name3${i}">Verteidigung:</td>
      <td id="stat-value3${i}"></td>
      <td>
        <div class="progress-about-bar">
          <div id="progress-about-bar-inner3${i}" class="progress-about-bar-inner" style="width: 0%;"></div>
        </div>
      </td>
    </tr>
    <tr id="special-attack${i}">
      <td id="stat-name4${i}">Spezialangriff:</td>
      <td id="stat-value4${i}"></td>
      <td>
        <div class="progress-about-bar">
          <div id="progress-about-bar-inner4${i}" class="progress-about-bar-inner" style="width: 0%;"></div>
        </div>
      </td>
    </tr>
    <tr id="special-defense${i}">
      <td id="stat-name5${i}">Spezialverteidigung:</td>
      <td id="stat-value5${i}"></td>
      <td>
        <div class="progress-about-bar">
          <div id="progress-about-bar-inner5${i}" class="progress-about-bar-inner" style="width: 0%;"></div>
        </div>
      </td>
    </tr>
    <tr id="speed${i}">
      <td id="stat-name6${i}">Initiative:</td>
      <td id="stat-value6${i}"></td>
      <td>
        <div class="progress-about-bar">
          <div id="progress-about-bar-inner6${i}" class="progress-about-bar-inner" style="width: 0%;"></div>
        </div>
      </td>
    </tr>
  </table>
  `}


function generateHTMLEvol(i) {
  return /*html*/`
<table>
  <tr id="genera${i}">
    <td id="genera-name${i}">Klasse:</td>
    <td></td>
    <td id="genera-value${i}"></td>
  </tr>
  <tr id="weight${i}">
    <td id="weight-name${i}">Gewicht:</td>
    <td></td>
    <td id="weight-value${i}"></td>
  </tr>
  <tr id="height${i}">
    <td id="height-name${i}">Höhe:</td>
    <td></td>
    <td id="height-value${i}"></td>
  </tr>
  <tr id="ability1${i}">
    <td id="ability-name${i}">Fähigkeit:</td>
    <td></td>
    <td id="ability-value${i}"></td>
  </tr>
  <tr id="ability2${i}">
    <td></td>
    <td></td>
      <td id="ability-text${i}"></td>
    </tr>
  </table>
    `}