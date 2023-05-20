window.onscroll = function () { scrollFunction() };


function topFunction() {
  document.documentElement.scrollTop = 0;
}


async function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollCounter++;
    // console.log('scrollCoutner ', scrollCounter);
    let interval = 40;
    let tester = scrollCounter % interval;
    // console.log(tester);
    if (tester == 0 && onScrollLoading == true) {
      let start = myPokesAsObject.length;
      let end = start + pokeCounterStep;
      // showNextPokeMini(start, end);
    }
  }
}

