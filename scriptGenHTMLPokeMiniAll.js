function generateHTMLPokeMiniAll() {
    return /*html*/`
    <div id="miniHeader" class="miniHeader">
        <h1>Poke<wbr>Möller</h1>
        <div class="miniPokesCounter">
            <div id="miniPokesCounter">
            </div>
            <div class="loadLine">
                <button onclick="">+4</button>
            </div>
        </div> 
        <div class="navigation">
            <div class="navigation-line">
             <div onmouseover="hoverNavigationOver(10, 1)" onmouseout="hoverNavigationOut(10, 1)">
                 <button onclick="showCurrentCardPokeMiniAllById('card101', '1', cardIdsPokeMini)" id="btn-card101">Minis</button>
             </div>
             <div onmouseover="hoverNavigationOver(20, 1)" onmouseout="hoverNavigationOut(20, 1)">
                 <button onclick="showCurrentCardPokeMiniAllById('card201', '1', cardIdsPokeMini)" id="btn-card201">Suche</button>
             </div>
             <div onmouseover="hoverNavigationOver(30, 1)" onmouseout="hoverNavigationOut(30, 1)">
                 <button onclick="showCurrentCardPokeMiniAllById('card301', '1', cardIdsPokeMini)" id="btn-card301">Favorites</button>
             </div>
            </div>
             <div class="menu-btn">
                 <button onclick="showMenu()">Menu</button>
             </div>
         </div>
        </div>
         <div id="card101" class="cards">
            <div id="miniPokes" class="miniPokes"></div>
        </div>
        <div id="card201" class="cards display-none">
            <div id="miniPokesSearch" class="miniPokes"></div>  
        </div>
        <div id="card301" class="cards display-none">
            <div id="miniPokesFavorites" class="miniPokes"></div> 
        </div> 
    `
}