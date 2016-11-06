import Screen from './components/Screen'
const d3 = require('d3')

// http://bl.ocks.org/mbostock/1584697
class Viz {

  constructor() {
    this.margin = {top: 30, right: 0, bottom: 300, left: 0}

    this.width = 960 - this.margin.left - this.margin.right
    this.height = 800 - this.margin.top - this.margin.bottom
    // this.width = window.innerWidth - this.margin.left - this.margin.right
    // this.height = window.innerHeight - this.margin.top - this.margin.bottom

    this.svg = this.createViz()

    this.matrix = []

    d3.json('./assets/data.json', (error, json) => {
      // console.log(error);
      console.log(json["1"]);

      let row = []

      for(let i = 1; i <= 47; i++) {
        let prefectureData = json[String(i)].result.changes;

        this.matrix.push(prefectureData);
      }

      this.render()
    })

  }

  render() {

    var data = this.matrix[0].map((d,i) => {
      return d.data[0].value;
    })

    console.log(data);
    var index = d3.range(data.length)

    var x = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, this.width]);

    var y = d3.scaleBand()
    .domain(index)
    .range([0, this.height], .1);

    var bar = this.svg.selectAll(".bar")
    .data(this.matrix[0])
    .enter().append("g")
    .attr("class", "bar")
    .attr("transform", (d, i) => { return "translate(" + this.margin.left + "," + y(i) + ")"; });

    bar.append("rect")
    .attr("height", y.bandwidth())
    .attr("width", function(d) { return x(d.data[0].value); })

    bar.append("text")
    .attr("text-anchor", "end")
    .attr("x", function(d) { return -10; })
    .attr("y", y.bandwidth() / 2)
    .attr("dy", ".35em")
    .text(function(d, i) {
      return d.countryName;
    });

    this.svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(" + this.margin.left + "," + (this.height) + ")")
    .call(d3.axisBottom(x));

  }

  createViz() {
    return new Screen(this.width, this.height, this.margin).element;
  }


}

new Viz()
