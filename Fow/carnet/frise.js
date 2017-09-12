var find = function(array, cond){
  for(var elem of array){
    if(cond(elem)){
    return elem;
    }
  };
  return null;
}

$(function () {
    // Set the dimensions of the canvas / graph
  var margin = { top: 0, right: 0, bottom: 30, left: 50 },
    width = 600 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom,
	circleWidth = 20,
	paddingRp = 10,
	baseHeight = height / 2;

  var hashedData = new Map();

  var hashedRps = [];
    
  // Parse the date / time
  var parseDate = d3.timeParse("%d/%m/%Y");

    data.forEach(function (d, i) {
    if(!hashedData.get(d.date)){
      hashedData.set(d.date, []);
    }
    hashedData.get(d.date).push(d);
	
    d.date = parseDate(d.date);
    d.close = +d.close;
	  d.id = i;
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



    // Scale the range of the data
var xdates = d3.extent(data, function (d) { return d.date; });
  var maxY = d3.max(data, function (d) { return d.close; });


  var t1 = new Date(xdates[0]);
  t1.setMonth(t1.getMonth() - t1.getMonth() %3);
  
  var t2 = new Date(xdates[1]);
  t2.setMonth(t2.getMonth() + 4 - t2.getMonth() %3);
  t2.setDate(t2.getDate()-1);

  var trimestres = d3.timeMonth.range(t1, t2, 3);

  for(var i = 0; i < trimestres.length - 1; i++){
    var firstMonth = trimestres[i];
    var lastMonth = trimestres[i+1];
    hashedRps.push({
      label: "T" + Math.floor((firstMonth.getMonth() + 1) / 3 + 1) + " " + firstMonth.getFullYear(),
      start: firstMonth,
      end: lastMonth,
      rps: []
    });
  }

for(var [key, value] of hashedData){
  //hashedData.entries().forEach(function(elem){
    var trimestre = find(hashedRps, function(obj){
      return obj.start <= parseDate(key) && obj.end >= parseDate(key);
    });
    trimestre.rps.push(value);
  };

  for(var i = 0; i < hashedRps.length; ++i){
    var trimestre = hashedRps[i];
    var graph = $("<div>", {"class": "graph"});
    var axe = $("<div>", {"class": "axe"});
    var wrapper = $("<div>", {"class": "graph-wrapper"}).append(graph).append(axe);
    var inputAttr;
    if(i == hashedRps.length - 1){
      inputAttr ={
        "type": "radio",
        "name": "trimestre",
        "id": trimestre.label,
        "checked": "checked"
      };
    } else{
      inputAttr ={
        "type": "radio",
        "name": "trimestre",
        "id": trimestre.label
      }
    }
    $(".full-wrapper").append($("<input>", inputAttr)).append(
      $("<label>", {"for": trimestre.label})
      .append($("<span>", {"class": "tri-head"}).text(trimestre.label))
      )
      .append(wrapper);

        // Set the ranges
  var xRange = d3.scaleTime().range([0, width]);
  var yRange = d3.scaleLinear().range([height, 0]);
  
  xRange.domain([trimestre.start, trimestre.end]);
  yRange.domain([0, maxY]);

  var monthes = d3.timeMonth.range(trimestre.start, trimestre.end, 1);
  for(var j = 0; j < monthes.length; j++){
      var month = monthes[j];
      var nextMonth = d3.timeMonth.offset(month);
      var monthWidth = Math.min(xRange(nextMonth), xRange(trimestre.end)) - xRange(month);
      var background = j % 2 == 0 ? "clair" : "fonce";
      graph.append($("<div>", {"class": "stripline " + background, "style": "left:" +Math.floor(xRange(month)) + "px;width:"+ Math.floor(monthWidth) + "px;"}));
  }

  // Define the axes
  var xAxis = d3.axisBottom().scale(xRange).ticks(d3.timeMonth.every(1)).tickFormat(locale.format("%B %Y"));
  for (var rps of trimestre.rps){
	var nbRps = rps.length;
    rps.forEach(function(e, i){
      var participants ="";
      for(var j = 0; j < e.partenaires.length; j++){
        participants += "<span class='" + e.partenaires[j].groupe + "'>" + e.partenaires[j].nom + "</span> - ";
      }
      var left = Math.floor(xRange(e.date)-(circleWidth/2));
      var tooltipLeft = -10;
      if(left > 350){
        tooltipLeft = -300;
      } else if(width - left < 350){
        tooltipLeft = -175;
      }
	  var currentHeight = baseHeight +
                    (nbRps + 1) % 2 * (Math.pow(-1, i) * ((paddingRp + circleWidth) / 2 + Math.floor(i / 2) * (paddingRp + circleWidth)))
                    + nbRps % 2 * (Math.floor((i + 1) / 2) * (paddingRp + circleWidth) * Math.pow(-1, i));
        var rp = $("<div>", { "class": "rp " + (e.status == "closed" ? "finished" : "progress"), "style": "left:" + Math.floor(xRange(e.date)-(circleWidth/2)) + "px;bottom:" + currentHeight + "px;" });
        var tooltip = $("<div>", {"class" : "tooltip", "style" : "left:" + tooltipLeft + "px"});
        var tooltipTitle = $("<a>", {"href": e.url}).append($("<span>", {"class": "titreun"}).text(e.titre));
        var tooltipDescription = $("<div>", {"class": "infosgen"}).html(function() { return e.lieu + " - " + participants;});
        var rpDescription = $("<div>", {"class": "sepafiche"}).text(function(){
            return e.description;
        });
        //tooltipDescription.append(rpDescription);
        tooltip.append(tooltipTitle);
        tooltip.append(tooltipDescription);
        rp.append(tooltip);
        graph.attr("style", "margin-left:" + margin.left + "px;height:" + height + "px;" + "width:" + width + "px;").append(rp);
    });
  }

  // Adds the svg canvas
  var svg = d3.select(axe[0])
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", margin.bottom);
   var g = svg.append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")"); 

  // Add the X Axis
  g.append("g")
    .attr("class", "x axis")
    .call(xAxis);
  }

});