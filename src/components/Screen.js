const d3 = require('d3')
export default class Screen {
  constructor(width, height, margin) {
    this.element = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append("g")
    .attr("class", "myGraph")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  }
}
