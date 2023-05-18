function generateHTMLPokeMiniSearch() {
    return /*html*/`
            <h1>Hier wird gesucht!</h1>
            <div id="miniSearchByNameLine" class="searchByName">
                <span>Suche nach </span>
                <input id="mini-search-name" placeholder="Name" onkeydown="searchMiniPokeByName()">
                <div id="search-results"></div>
            </div>
    `
}