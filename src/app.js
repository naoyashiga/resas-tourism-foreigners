const d3 = require('d3');

class Viz {

  constructor() {

    this.matrix = []
    // this.matrix = [
    //   [1197,  5871, 8916, 2868],
    //   [ 1951, 10048, 2060, 6171],
    //   [ 8010, 16145, 8090, 8045],
    //   [ 1013,   990,  940, 6907]
    // ];



    d3.json('./assets/data.json', (error, json) => {
      // console.log(error);
      // console.log(json["1"]);

      let row = []

      for(let i = 1; i <= 10; i++) {
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



      this.render();
    })
  }

  render() {

    var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    outerRadius = Math.min(width, height) * 0.5 - 40,
    innerRadius = outerRadius - 30;

    var formatValue = d3.formatPrefix(",.0", 1e3);

    var chord = d3.chord()
    .padAngle(0.01)
    .sortSubgroups(d3.descending);

    var arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

    var ribbon = d3.ribbon()
    .radius(innerRadius);

    var color = d3.scaleOrdinal()
    .domain(d3.range(10))
    .range(["#000000", "#F26223"]);
    // .range(["#000000", "#FFDD89", "#957244", "#F26223"]);

    var g = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    .datum(chord(this.matrix));

    var group = g.append("g")
    .attr("class", "groups")
    .selectAll("g")
    .data(function(chords) {
      console.log("chords.groups" + chords.groups);
      return chords.groups; })
    .enter().append("g");

    group.append("path")
    .style("fill", function(d) {
      console.log(d.index);
      return color(d.index); })
    .style("stroke", function(d) { return d3.rgb(color(d.index)).darker(); })
    .attr("d", arc);

    // var groupTick = group.selectAll(".group-tick")
    // .data((d) => { return this.groupTicks(d, 1e3); })
    // .enter().append("g")
    // .attr("class", "group-tick")
    // .attr("transform", function(d) { return "rotate(" + (d.angle * 180 / Math.PI - 90) + ") translate(" + outerRadius + ",0)"; });
    //
    // groupTick.append("line")
    // .attr("x2", 6);
    //
    // groupTick
    // .filter(function(d) { return d.value % 5e3 === 0; })
    // .append("text")
    // .attr("x", 8)
    // .attr("dy", ".35em")
    // .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180) translate(-16)" : null; })
    // .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
    // .text(function(d) { return formatValue(d.value); });

    g.append("g")
    .attr("class", "ribbons")
    .selectAll("path")
    .data(function(chords) { return chords; })
    .enter().append("path")
    .attr("d", ribbon)
    .style("fill", function(d) { return color(d.target.index); })
    .style("stroke", function(d) { return d3.rgb(color(d.target.index)).darker(); });
  }
  // Returns an array of tick angles and values for a given group and step.
  groupTicks(d, step) {
    var k = (d.endAngle - d.startAngle) / d.value;
    return d3.range(0, d.value, step).map(function(value) {
      return {value: value, angle: value * k + d.startAngle};
    });
  }
}

new Viz()
