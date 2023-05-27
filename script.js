async function fetchDataFromServer(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fehler beim Abrufen der Daten:', error);
      throw error;
    }
  }
  
  async function performServerRequests(i) {
    try {
      const url1 = `https://pokeapi.co/api/v2/pokemon/${i}/`;
      const url2 = `https://pokeapi.co/api/v2/pokemon-species/${i}/`;
  
      const data1 = await fetchDataFromServer(url1);
      console.log('pokemon:', data1);
  
      const data2 = await fetchDataFromServer(url2);
      console.log('pokemon-species:', data2);

    } catch (error) {
      console.error('Fehler beim Ausführen der Serverzugriffe:', error);
    }
  }  

  function test() {
    for (let i = 1; i < 1010; i++) {
        performServerRequests(i); 
    }
  }