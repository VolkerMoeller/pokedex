function savePokesToPokesSaved() {
        let pokesText = JSON.stringify(pokes);
        localStorage.setItem('pokesSaved', pokesText);   
    }


function savePokesSavedToPokes() {
        let pokesText = JSON.stringify(pokesSaved);
        localStorage.setItem('pokes', pokesText);   
    }

    
function save() {
        let pokesText = JSON.stringify(pokes);
        localStorage.setItem('pokes', pokesText);   
    }


function load() {
    let pokesAsText = localStorage.getItem('pokes');
    if (pokesAsText) {
        pokes = JSON.parse(pokesAsText);
    }
}