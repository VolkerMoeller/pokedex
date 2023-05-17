window.onscroll = function () { scrollFunction() };


async function scrollFunction() {
  let mybutton = document.getElementById('myBtn');
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    // mybutton.style.display = 'block';
    scrollCounter++;
    //  console.log(scrollCounter);
    let interval = scrollCounter / 400;
    //  console.log(interval);
    let tester = scrollCounter % interval;
    //  console.log('tester ', tester);
    if (tester == 0 && myPokesAsObject.length - 1 + pokeCounterStep == pokeCounter) {
      console.log(myPokesAsObject.length, pokeCounter);
      init();
    }
  }
}



// let myPromise = new Promise(function (myResolve, myReject) {
// "Producing Code" (May take some time)

// myResolve(); // when successful
// myReject();  // when error
// });

// "Consuming Code" (Must wait for a fulfilled Promise)
// myPromise.then(
// function (value) { /* code if successful */ },
// function (error) { /* code if some error */ }
// )





function topFunction() {
  document.documentElement.scrollTop = 0;
}