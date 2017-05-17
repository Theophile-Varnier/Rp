$(function () {
    // Set the dimensions of the canvas / graph
  var margin = { top: 0, right: 0, bottom: 30, left: 50 },
    width = 600 - margin.left - margin.right,
    height = 150 - margin.top - margin.bottom,
	circleWidth = 20,
	paddingRp = 10,
	baseHeight = height / 2;

  var hashedData = new Map();    
    
  // Parse the date / time
  var parseDate = d3.timeParse("%d/%m/%Y");

    data.forEach(function (d, i) {
    d.date = parseDate(d.date);
    d.close = +d.close;
	  d.id = i;

    if(!hashedData.get(d.date)){
      hashedData[d.date] = [];
    }
    hashedData[d.date].push(d);
  });


  var locale = d3.timeFormatLocale({
  "decimal": ".",
  "thousands": ",",
  "grouping": [3],
  "currency": ["$", ""],
  "dateTime": "%a %b %e %X %Y",
  "date": "%m/%d/%Y",
  "time": "%H:%M:%S",
  "periods": ["AM", "PM"],
  "days": ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
  "shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  "months": ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
  "shortMonths": ["Jan", "Fev", "Mar", "Avr", "Mai", "Jui", "Juil", "Aou", "Sep", "Oct", "Nov", "Dec"]
});

  // Set the ranges
  var xRange = d3.scaleTime().range([0, width]);
  var yRange = d3.scaleLinear().range([height, 0]);

    // Scale the range of the data
var xdates = d3.extent(data, function (d) { return d.date; });
  var maxY = d3.max(data, function (d) { return d.close; });
  xRange.domain(xdates);
  yRange.domain([0, maxY]);

  var monthes = d3.timeMonth.range(xdates[0], xdates[1], 1);

  for(var i = 0; i < monthes.length; i++){
      var month = monthes[i];
      var nextMonth = d3.timeMonth.offset(month);
      var monthWidth = Math.min(xRange(nextMonth), xRange(xdates[1])) - xRange(month);
      var background = i % 2 == 0 ? "clair" : "fonce";
      $(".graph").append($("<div>", {"class": "stripline " + background, "style": "left:" + xRange(month) + "px;width:"+ monthWidth + "px;"}));
  }

  // Define the axes
  var xAxis = d3.axisBottom().scale(xRange).ticks(d3.timeMonth.every(1)).tickFormat(locale.format("%B %Y"));

  for(var rpDate in hashedData){
    var rps = hashedData[rpDate];
	var nbRps = rps.length;
    rps.forEach(function(e, i){
      var participants ="";
      for(var j = 0; j < e.partenaires.length; j++){
        participants += "<span class='" + e.partenaires[j].groupe + "'>" + e.partenaires[j].nom + "</span> ";
      }
	  var currentHeight = baseHeight +
                    (nbRps + 1) % 2 * (Math.pow(-1, i) * ((paddingRp + circleWidth) / 2 + i / 2 * (paddingRp + circleWidth)))
                    + nbRps % 2 * ((i + 1) / 2 * (paddingRp + circleWidth) * Math.pow(-1, i));
        var rp = $("<div>", { "class": "rp " + (e.status == "closed" ? "finished" : "progress"), "style": "left:" + (xRange(e.date)-(circleWidth/2)) + "px;top:" + currentHeight + "px;" });
        var tooltip = $("<div>", {"class" : "tooltip"});
        var tooltipTitle = $("<a>", {"href": e.url}).append($("<span>", {"class": "titreun"}).text(e.titre));
        var tooltipDescription = $("<div>", {"class": "infosgen"}).html(function() { return e.lieu + " - " + participants;});
        var rpDescription = $("<div>", {"class": "sepafiche"}).text(function(){
            return e.description;
        });
        tooltipDescription.append(rpDescription);
        tooltip.append(tooltipTitle);
        tooltip.append(tooltipDescription);
        rp.append(tooltip);
        $(".graph").attr("style", "margin-left:" + margin.left + "px;height:" + height + "px;" + "width:" + width + "px;").append(rp);
    });
  }

/*    data.forEach(function (e, i) {
      var participants ="";
      for(var j = 0; j < e.partenaires.length; j++){
        participants += "<span class='" + e.partenaires[j].groupe + "'>" + e.partenaires[j].nom + "</span> ";
      }
        var rp = $("<div>", { "class": "rp " + (e.status == "closed" ? "finished" : "progress"), "style": "left:" + (xRange(e.date)-10) + "px;top:" + (height/2 -10) + "px;" });
        var tooltip = $("<div>", {"class" : "tooltip"});
        var tooltipTitle = $("<a>", {"href": e.url}).append($("<span>", {"class": "titreun"}).text(e.titre));
        var tooltipDescription = $("<div>", {"class": "infosgen"}).html(function() { return e.lieu + " - " + participants;});
        var rpDescription = $("<div>", {"class": "sepafiche"}).text(function(){
            return e.description;
        });
        tooltipDescription.append(rpDescription);
        tooltip.append(tooltipTitle);
        tooltip.append(tooltipDescription);
        rp.append(tooltip);
        $(".graph").attr("style", "margin-left:" + margin.left + "px;height:" + height + "px;" + "width:" + width + "px;").append(rp);
    }); */

    var legend = $("<div>", {"class": "legend"});
    legend.append(
        $("<table>")
        .append($("<tr>")
        .append($("<td>").append($("<div>", {"class": "rp finished"})))
        .append($("<td>").text("Rp terminés"))
        )
        .append($("<tr>")
        .append($("<td>").append($("<div>", {"class": "rp progress"})))
        .append($("<td>").text("Rp en cours"))
        ));

  // Adds the svg canvas
  var svg = d3.select(".axe")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
   var g = svg.append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")"); 

  // Add the X Axis
  g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

    
    $(".axe").append(legend);

});