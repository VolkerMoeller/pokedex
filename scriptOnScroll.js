window.onscroll = function () { scrollFunction() };


function topFunction() {
  document.documentElement.scrollTop = 0;
}


async function scrollFunction() {
  // document.getElementById('pokedex-all').innerHTML ='';
  // await pokeAll();
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollCounter++;
    console.log('scrollCoutner ', scrollCounter);
    let interval = 40;
    let tester = scrollCounter % interval;
    console.log(tester);
    if (tester == 0 && onScrollLoading == true) {
      let xstart = myPokesAsObject.length;
      let xend = xstart + pokeCounterStep;
      showNextPokeMini(xstart, xend);
      // document.getElementById('pokedex-all').innerHTML ='';
      // await pokeAll();
    }
  }
}

