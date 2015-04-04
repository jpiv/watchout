
var npoints = 100;
var ptdata = [];

var svg = d3.select("svg");

var line = d3.svg.line().interpolate("basis")
              .x(function(d, i) { return d.x; })
              .y(function(d, i) { return d.y; });


var svgagain = d3.select("body").select("svg")
    .on("mousemove", function() { var pt = d3.mouse(this); tick(pt); });


var path = svg.append("g")
  .append("path")
    .data([ptdata])
    .attr("class", "line")
    .attr("d", line);

var tick =function (pt) {

  // push a new data point onto the back
  ptdata.push(pt);

  // Redraw the path:
  path.attr("d", function(d) { return line(d);});
  console.log("log");

  // If more than 100 points, drop the old data pt off the front
  if (ptdata.length > npoints) {
    ptdata.shift();
  }
}
