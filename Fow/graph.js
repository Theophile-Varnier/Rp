// Set the dimensions of the canvas / graph
  var margin = { top: 30, right: 20, bottom: 30, left: 50 },
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

  // Parse the date / time
  var parseDate = d3.timeParse("%d/%m/%Y");

  // Set the ranges
  var xRange = d3.scaleTime().range([0, width]);
  var yRange = d3.scaleLinear().range([height, 0]);
  var rayon = 10;

  // Define the axes
  var xAxis = d3.axisBottom().scale(xRange).ticks(5);

  var yAxis = d3.axisLeft().scale(yRange).ticks(5);

  // Define the line
  var valueline = d3.line()
    .x(function (d) { return xRange(d.date); })
    .y(function (d) { return yRange(d.close); });

  // Adds the svg canvas
  var svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
   var g = svg.append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");   


  data.forEach(function (d, i) {
    d.date = parseDate(d.date);
    d.close = +d.close;
	d.id = i;
  });

  // Scale the range of the data
  var maxY = d3.max(data, function (d) { return d.close; });
  xRange.domain(d3.extent(data, function (d) { return d.date; }));
  yRange.domain([0, maxY]);

  // Add the scatterplot
  var tooltip = g.selectAll("dot")
    .data(data)
    .enter().append("circle")
    .attr("r", rayon)
    .attr("cx", function (d) { return xRange(d.date); })
    .attr("cy", function (d) { return yRange(maxY / 2); })
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .attr("class", "rp-circle")
	.attr("data-id", function(d, i) {return i;})
    .attr("fill", function (d) {
      if (d.status == "closed") return "green";
      if (d.status == "progress") return "orange";
    }).append("title").text(function(d) {return d.titre;});
    /*.append("div").attr("class", "tooltip");
    tooltip.append("div").attr("class", "toolitp-header").text(function(d) {return d.titre;});*/

  var panels = d3.select("div.avatars")
    .selectAll("div")
    .data(relations)
    .enter()
    .append("div")
    .attr("class", "false-panel")
    .attr("style", "width: 200px;");

  panels.append("div")
    .attr("class", "panel-header")
    .append("img")
    .attr("class", "img-circle thumbnail")
    .attr("style", "width:150px;height:150px;")
    .attr("src", function (d) { return d.avatar; });

  panels.select("div.panel-header")
    .append("div")
    .attr("class", "text-center")
    .text(function (d) { return d.name; });

  panels.append("div")
    .attr("class", "panel-body")
    .text(function (d) { return d.description; });

  // Add the X Axis
  g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);