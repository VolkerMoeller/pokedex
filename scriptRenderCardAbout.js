async function renderPokeCardAbout(i) {
    renderPokeGenera(i);
    renderPokeFlavor(i);
    renderPokeWeightAndHeight(i);
    renderPokeAbility(i);
}


function renderPokeGenera(i) {
    let pokeGenera = myPokesAsObject['generaGerman'];
    document.getElementById('card1' + i).innerHTML += `<div><b>Kategorie: </b>${pokeGenera}</div>`;
}


async function renderPokeAbility(i) {
    let pokeAbility = myPokesAsObject['abilityGerman'];
    document.getElementById('card1' + i).innerHTML += `<div><b>Fähigkeit: </b>${pokeAbility}:</div>`;
    let pokeFlavor2nd = myPokesAsObject['abilityFlavor'];
    document.getElementById('card1' + i).innerHTML += `<div>${pokeFlavor2nd}</div>`;
};


function renderPokeWeightAndHeight(i) {
    let pokeWeight = myPokesAsObject['weight'];
    document.getElementById('card1' + i).innerHTML += `<div><b>Gewicht: </b>${pokeWeight} Poke-Einheiten</div>`;
    let pokeHeight = myPokesAsObject['height'];
    document.getElementById('card1' + i).innerHTML += `<div><b>Höhe: </b>${pokeHeight} Poke-Einheiten</div>`;
};


async function renderPokeFlavor(i) {
    let pokeFlavor1st = myPokesAsObject['generaFlavor'];
    document.getElementById('card1' + i).innerHTML += `<div>${pokeFlavor1st}</div>`;
};

