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
                <button onclick="switchContent(${i})" class="btn-back">
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
                  <div id="base-type2${i}" class="slot display-none"></div>
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
                <button onclick="showCurrentCardById('card4${i}', ${i}, '${slot1}')" id="btn-card4${i}">5 Moves</button>
            </div>
        </div>
        <div id="card1${i}" class="cards"></div>
        <div id="card2${i}" class="cards display-none"></div>
        <div id="card3${i}" class="cards display-none"></div>
        <div id="card4${i}" class="cards display-none"></div>
    </div> 
    `
}


async function generateHTMLAbout(i, aboutRowId, aboutNameId, aboutValueId, aboutTitle) {
  return /*html*/`
  <div id="${aboutRowId}${i}" class="aboutRow">
    <div id="${aboutNameId}${i}"class="aboutName">${aboutTitle}</div>
    <div id="${aboutValueId}${i}"class="aboutValue"></div>
  </div>
    `}


// function generateHTMLAbout(i) {
//   return /*html*/`
// <table>
//   <tr id="genera${i}">
//     <td id="genera-name${i}">Klasse:</td>
//     <td></td>
//     <td id="genera-value${i}"></td>
//   </tr>
//   <tr id="weight${i}">
//     <td id="weight-name${i}">Gewicht:</td>
//     <td></td>
//     <td id="weight-value${i}"></td>
//   </tr>
//   <tr id="height${i}">
//     <td id="height-name${i}">Höhe:</td>
//     <td></td>
//     <td id="height-value${i}"></td>
//   </tr>
//   <tr id="ability1${i}">
//     <td id="ability-name${i}">Fähigkeit:</td>
//     <td></td>
//     <td id="ability-value${i}"></td>
//   </tr>
//   <tr id="ability2${i}">
//     <td></td>
//     <td></td>
//       <td id="ability-text${i}"></td>
//     </tr>
//   </table>
//     `}


async function generateHTMLStats(i, id1st, id2nd, id3rd, id4th, title) {
  return /*html*/`
      <div id="${id1st}${i}" class="statRow">
        <div id="${id2nd}${i}" class="statName">${title}</div>
        <div class="statValueAndProgress">
          <div id="${id3rd}${i}" class="statValue"></div>
          <div class="progress-about-bar">
            <div id="${id4th}${i}" class="progress-about-bar-inner" style="width: 0%;"></div>
          </div>
        </div>
      </div>
  `}


function generateHTMLEvol(i) {
  return /*html*/`
<table>
  <tr id="firstStage${i}">
    <td id="firstStage-name${i}">Zuerst:</td>
    <td></td>
    <td id="firstStage-value${i}"></td>
  </tr>
  <tr id="secondStage${i}">
    <td id="secondStage-name${i}">Dann:</td>
    <td></td>
    <td id="secondStage-value${i}"></td>
  </tr>
  <tr id="thirdStage${i}">
    <td id="thirdStage-name${i}">Zuletzt:</td>
    <td></td>
    <td id="thirdStage-value${i}"></td>
  </tr>
</table>
`}


function generateHTMLEvol2nd(i, j) {
  return /*html*/`
  <table id="stages${i}">
  </table>
  `}


async function generateHTMLMoves(i, moveRowId, moveNameId, moveValueId, moveTextId) {
  return /*html*/`
      <div id="${moveRowId}${i}" class="moveRow">
        <div class="moveNameAndValue">
          <div id="${moveNameId}${i}" class="moveName"></div>
          <div id="${moveValueId}${i}" class="moveValue"></div>
        </div>
        <div id="${moveTextId}${i}" class="moveText"></div>
      </div>
  `}