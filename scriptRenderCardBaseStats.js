async function renderPokeCardBaseStats(i) {
    for (let j = 0; j < myPokesAsObject[i]['statsValues'].length; j++) { 
        let value = myPokesAsObject[i]['statsValues'][j];
        let valuePerCent = perCent(value);
        let id = baseStatId[j] + i;

        renderStatsAndProgressLine(i, baseStatNames[j], value, valuePerCent, id);   
    }
}


function renderStatsAndProgressLine(i, name, value, valuePerCent, id) {
    renderStatsLine(i, name, value, id);
    renderProgressLine(valuePerCent, id);
}


function renderStatsLine(i, name, absoluteValue, id) {
    document.getElementById('card2' + i).innerHTML += `<div class="stats-line"><div class="stat"><div>${name}: </div><div><b>${absoluteValue}</b></div></div><div class="progess-stats-line" id="${id}"></div></div>`;
}


function perCent(value) {
    let valuePerCent = value / 255 * 100;
    return valuePerCent;
}


function renderProgressLine(value, id) {
    document.getElementById(id).innerHTML += `<div class="progress-stats" style="width: ${value}%"></div>`;
}