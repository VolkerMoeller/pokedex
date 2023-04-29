function generateHTMLPokedex(i) {
    return /*html*/`
    <div id="pokedex${i}" class="pokedex" style="transform: translateX(200%)">
        <div id="pokedex-top${i}" class="pokedex-top">
            <div id="pokedex-nav" class="pokedex-nav">
                <div class="left-buttons">
                    <button onclick="showFirstPoke()"><<</button>
                    <button onclick="sliderOneLeft()"><</button>
                </div>
                <div id="search" class= "search">
                    <input id="search-nr${i}" placeholder="Nr.">
                    <button onclick="showPokeByInit(${i})">Suche</button>
                </div>
                <div class="right-buttons">
                    <button onclick="sliderOneRight()">></button>
                    <button onclick="showLastPoke()">>></button>
                </div>
            </div>
            <div class="loadLine">
                <div id="amount-pokes-loaded${i}">...
                </div>
                <button onclick="showNextCountPokes()">+4</button>
            </div>
            <div id="progress-bar${i}" class="progress-bar">
                <div id="progress${i}" class="progress">
                </div>
            </div>
            <div id="searchByNameLine${i}">
                <span>Suche nach </span>
                <input id="search-name${i}" placeholder="Name" onkeydown="searchPokeByName(${i})">
            </div>   
            <div class="pokedex-above">
                <div id="pokedex-name${i}" class="pokedex-name">
                </div>
                <div id="pokedex-id${i}" class="pokedex-id">
                </div>
            </div>
            <div id="pokedex-slots${i}" class="pokedex-slots">
            </div>
        </div>
        <div id="pokedex-bottom${i}" class="pokedex-bottom">
        <div class="navigation">
            <div onmouseover="hoverNavigationOver(1, ${i})" onmouseout="hoverNavigationOut(1, ${i})">
                <button onclick="showCurrentCardById('card1${i}', 'btn-card1${i}')" id="btn-card1${i}">About</button>
            </div>
            <div onmouseover="hoverNavigationOver(2, ${i})" onmouseout="hoverNavigationOut(2, ${i})">
                <button onclick="showCurrentCardById('card2${i}', 'btn-card2${i}')" id="btn-card2${i}">Base Stats</button>
            </div>
            <div onmouseover="hoverNavigationOver(3, ${i})" onmouseout="hoverNavigationOut(3, ${i})">
                <button onclick="showCurrentCardById('card3${i}', 'btn-card3${i}')" id="btn-card3${i}">Evolution</button>
            </div>
            <div onmouseover="hoverNavigationOver(4, ${i})" onmouseout="hoverNavigationOut(4, ${i})">
                <button onclick="showCurrentCardById('card4${i}', 'btn-card4${i}')" id="btn-card4${i}">Moves</button>
            </div>
        </div>
        <div id="card1${i}" class="cards">
        </div>
        <div id="card2${i}" class="cards display-none">
            <div>ContentBaseStats</div>
        </div>
        <div id="card3${i}" class="cards display-none">
            <div>ContentEvolution</div>
        </div>
        <div id="card4${i}" class="cards display-none">
            <div>ContentMoves</div>
        </div>
        </div>  
    </div> 
    `
}