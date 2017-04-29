// Set the dimensions of the canvas / graph
  var margin = { top: 0, right: 20, bottom: 0, left: 50 },
    width = 600 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

  // Parse the date / time
  var parseDate = d3.timeParse("%d/%m/%Y");

  // Set the ranges
  var xRange = d3.scaleTime().range([0, width]);
  var yRange = d3.scaleLinear().range([height, 0]);
  var rayon = 10;

  // Define the axes
  var xAxis = d3.axisBottom().scale(xRange).ticks(5);

  // Adds the svg canvas
  var svg = d3.select(".axe")
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