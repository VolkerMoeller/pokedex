window.onscroll = function () { scrollFunction() };


function topFunction() {
  document.documentElement.scrollTop = 0;
}


async function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollCounter++;
    let interval = scrollCounter / 400;
    let tester = scrollCounter % interval;
    if (tester == 0) {
      let xstart = myPokesAsObject.length;
      let xend = xstart + pokeCounterStep;
      // showNextPokeMini(xstart, xend);
      console.log('tester');
    }
  }
}

