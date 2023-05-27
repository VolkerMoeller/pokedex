window.onscroll = function () { scrollFunction() };


function topFunction() {
  document.documentElement.scrollTop = 0;
}


async function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollCounter++;
    let interval = 40;
    let tester = scrollCounter % interval;
    if (tester == 0 && onScrollLoading == true) {
      let start = myPokesAsObject.length;
      let end = start + pokeCounterStep;
    test();
  }
  }
}

