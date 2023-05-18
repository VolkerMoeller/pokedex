function generateHTMLPokeMiniAll() {
    return /*html*/`
    <div id="miniHeader" class="miniHeader">
        <h1>PokeMöller</h1>
        <div id="miniPokesCounter" class="miniPokesCounter"></div>
        <div class="navigation">
             <div onmouseover="hoverNavigationOverStandard(10, 1)" onmouseout="hoverNavigationOutStandard(10, 1)">
                 <button onclick="showCurrentCardById('card101', 'btn-card101', cardIdsPokeMini)" id="btn-card101">Minis</button>
             </div>
             <div onmouseover="hoverNavigationOverStandard(10, 2)" onmouseout="hoverNavigationOutStandard(10, 2)">
                 <button onclick="showCurrentCardById('card102', 'btn-card102', cardIdsPokeMini)" id="btn-card102">Suche</button>
             </div>
             <div onmouseover="hoverNavigationOverStandard(10, 3)" onmouseout="hoverNavigationOutStandard(10, 3)">
                 <button onclick="showCurrentCardById('card103', 'btn-card103', cardIdsPokeMini)" id="btn-card103">Favorites</button>
             </div>
         </div>
        </div>
         <div id="card101" class="cards">
            <div id="miniPokes" class="miniPokes"></div>
        </div>
        <div id="card102" class="cards display-none">
            <div id="miniPokesSearch" class="miniPokes"></div>  
        </div>
        <div id="card103" class="cards display-none">
            <div id="miniPokesFavorites" class="miniPokes"></div> 
        </div> 
    `
}