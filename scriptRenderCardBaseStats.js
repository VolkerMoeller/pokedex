let baseStatName = ['Kraftpunkte', 'Angriff', 'Verteidigung', 'Sezialangriff', 'Spezialverteidigung', 'Initiative'];
let baseStatId = ['pokeKpId','pokeAttackId','pokeDefenceId', 'pokeSpecAttackId', 'pokeSpecDefenceId', 'pokeSpeedId'];


async function renderPokeCardBaseStats(i) {
    await loadCurrentPoke(i);
    for (let j = 0; j < baseStatName.length; j++) {
        let value = currentPoke['stats'][j]['base_stat'];
        let valuePerCent = perCent(value);
        let id = baseStatId[j] + i;
        renderStatsAndProgressLine(i, baseStatName[j], value, valuePerCent, id);   
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