function generateHTMLPokeMiniSearch() {
    return /*html*/`

    <div id="pokedexMiniAll-top" class="pokedex-top-MiniAll">
        <div id="pokedexMiniAll-control" class="pokedex-control-Mini-All">   
            <div id="searchByNameLineMiniAll" class="searchByName">
                <span>Suche nach </span>
                <input id="search-nameMiniAll" placeholder="Name" onkeydown="searchMiniPokeByName()">
            </div> 
            <div id="pokedexMiniAll-nav" class="pokedex-nav">
                <div id="searchMiniAll" class= "search">
                <input id="search-nrMiniAll" class="input-search" placeholder="Nr.">
                <button onclick="showByNrMiniAll()">Suche</button>
            </div>
        </div>


        <!-- <div class="pokedex-above">
            <div id="pokedex-nameMiniAll" class="pokedex-name">
            </div>
            <div id="pokedex-idMiniAll" class="pokedex-id">
            </div>
        </div> -->
        <div class="slot-line">
            <div id="pokedex-slotsMiniAll" class="pokedex-slots">
            </div>
        </div>
    </div>
    <div id="search-results" class="miniPokes"></div>
    `
}