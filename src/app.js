const d3 = require('d3');

class Viz {

  constructor() {

    d3.json('./assets/data.json', (error, json) => {
      console.log(error);
      console.log(json);
      })
    }
}

  new Viz()
