import Screen from './components/Screen'
const d3 = require('d3')

class Viz {

  constructor() {
    this.margin = {top: 0, right: 0, bottom: 0, left: 0}

    this.width = 960 - this.margin.left - this.margin.right
    this.height = 800 - this.margin.top - this.margin.bottom
    // this.width = window.innerWidth - this.margin.left - this.margin.right
    // this.height = window.innerHeight - this.margin.top - this.margin.bottom

    this.svg = this.createViz()

    this.matrix = []
    // this.matrix = [
    //   [1197,  5871, 8916, 2868],
    //   [ 1951, 10048, 2060, 6171],
    //   [ 8010, 16145, 8090, 8045],
    //   [ 1013,   990,  940, 6907]
    // ];

    var index = d3.range(24),
    data = index.map(d3.randomNormal(100, 10));

    var x = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, this.width]);

    var y = d3.scaleBand()
    .domain(index)
    .range([0, this.height], .1);
    // var y = d3.scaleOrdinal()
    // .domain(index)
    // .range([0, this.height], .1);

    var bar = this.svg.selectAll(".bar")
    .data(data)
    .enter().append("g")
    .attr("class", "bar")
    .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; });

    bar.append("rect")
    .attr("height", y.bandwidth())
    .attr("width", x);

    bar.append("text")
    .attr("text-anchor", "end")
    .attr("x", function(d) { return x(d) - 6; })
    .attr("y", y.bandwidth() / 2)
    .attr("dy", ".35em")
    .text(function(d, i) { return i; });

    this.svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + this.height + ")")
    .call(
      d3.svg.axis()
      .scale(x)
      .orient("bottom")
    );



    d3.json('./assets/data.json', (error, json) => {
      // console.log(error);
      // console.log(json["1"]);

      let row = []

      for(let i = 1; i <= 47; i++) {
        let prefectureData = json[String(i)].result.changes;
        // console.log(prefectureData);
        row = []

        prefectureData.forEach((country, i) => {
          // console.log(country.data);

          row.push(country.data[0].value);
        })

        this.matrix.push(row);
      }


      console.log(this.matrix);

      // for country in prefectureData {
      //   console.log(country);
      // }



    })
  }

  createViz() {
    return new Screen(this.width, this.height, this.margin).element;
  }


}

new Viz()
