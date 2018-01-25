var find = function (array, cond) {
  for (var elem of array) {
    if (cond(elem)) {
      return elem;
    }
  };
  return null;
}

$(function () {
  // Set the dimensions of the canvas / graph
  var paddingRp = 10,
    circleWidth = 10,
    width = 650,
    height = 650;

  var hashedRps = [];

  // Parse the date / time
  var parseDate = d3.timeParse("%d/%m/%Y");

  data.forEach(function (d, i) {
    d.debut = parseDate(d.debut);
    if (d.fin) {
      d.fin = parseDate(d.fin);
    }
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

  var dateFormat = locale.format("%b %Y");

  
  
  var content = $("<div>", { "class": "content-wrapper", "style": "width:" + width + "px;height:" + height + "px;" }).append($("<img>", { "src": "https://i.imgur.com/9gynI7l.png" }));
  $(".full-wrapper").append(content);

  // Scale the range of the data
  var xdates = d3.extent(data, function (d) { return d.debut; });
  var maxY = d3.max(data, function (d) { return d.close; });


  var t1 = new Date(xdates[0]);
  t1.setDate(1);
  t1.setMonth(0);

  var t2 = new Date(xdates[1]);
  t2.setFullYear(t2.getFullYear() + 1);
  t2.setDate(31);
  t2.setMonth(11);

  var annees = d3.timeYear.range(t1, t2);

  for (var i = 0; i < annees.length - 1; i++) {
    var firstMonth = annees[i];
    var lastMonth = annees[i + 1];
    hashedRps.push({
      label: firstMonth.getFullYear(),
      start: firstMonth,
      end: lastMonth,
      rps: []
    });
  }

  for (var periode of data) {
    var annee = find(hashedRps, function (obj) {
      return obj.start <= periode.debut && (!periode.fin && obj.end >= periode.debut || obj.end >= periode.fin);
    });
    annee.rps.push(periode);
  };

  //for (var i = 0; i < hashedRps.length; ++i) {
    
    //var annee = hashedRps[i];
    var graph = $("<div>", { "class": "graph", "style": "width:" + width + "px;height:" + height + "px" });
    var wrapper = $("<div>", { "class": "graph-wrapper" }).append(graph);
    var svg = d3.select(graph[0]).append("svg")
    .attr("width", "650")
    .attr("height", "650");
    /*var inputAttr;
    if (i == hashedRps.length - 1) {
      inputAttr = {
        "type": "radio",
        "name": "trimestre",
        "id": annee.label,
        "checked": "checked"
      };
    } else {
      inputAttr = {
        "type": "radio",
        "name": "trimestre",
        "id": annee.label
      }
    }*/
    content/*.append($("<input>", inputAttr)).append(
      $("<label>", { "for": annee.label })
        .append($("<span>", { "class": "tri-head" }).text(annee.label))
    )*/
      .append(wrapper);

    var init = true;
    var lastPos = {
      x: 0,
      y: 0
    };
    for (var e of data) {
        var left = e.position.y - (circleWidth / 2);
        var tooltipLeft = -10;
        if (left > 350) {
          tooltipLeft = -300;
        } else if (width - left < 350) {
          tooltipLeft = -175;
        }
        var rpDiv = $("<div>", { "class": "rp " + (e.status == "closed" ? "finished" : "progress"), "style": "left:" + e.position.x + "px;top:" + e.position.y + "px;" });
        var titlePanel = $("<div>", { "class": "panel-title bottom-border" });
        var tooltip = $("<div>", { "class": "tooltip", "style": "left:" + tooltipLeft + "px" });
        var tooltipTitle = $("<span>", { "class": "lieu bottom-border" }).text(e.lieu);
        var tooltipDate = $("<i>").text(dateFormat(e.debut) + (e.fin ? " - " + dateFormat(e.fin) : ""));
        var contentPanel = $("<div>", { "class": "panel-body-wrapper" });
        for (var rp of e.rps) {
          var participants = "<i>Feat. ";
          for (var j = 0; j < rp.partenaires.length; j++) {
            participants += "<span class='" + rp.partenaires[j].groupe + "'>" + rp.partenaires[j].nom + "</span> - ";
          }
          participants += "</i>";
          var rpLink = $("<a>", { "href": rp.url, "class": "lieu bottom-border" }).append($("<span>", { "class": "titreun" }).text(rp.titre));
          var tooltipDescription = $("<div>", { "class": "infosgen" }).html(participants);

          contentPanel.append(rpLink).append(tooltipDescription);

        }
        titlePanel.append(tooltipTitle).append($("<br/>")).append(tooltipDate);
        tooltip.append(titlePanel);
        tooltip.append(contentPanel);
        rpDiv.append(tooltip);
        graph.append(rpDiv);

      if (!init) {
        svg.append("line")
        .attr("x1", lastPos.x + circleWidth/2 + 2)
        .attr("y1", lastPos.y + circleWidth/2 + 2)
        .attr("x2", e.position.x + circleWidth/2 + 2)
        .attr("y2", e.position.y + circleWidth/2 + 2)
        .attr("style", "stroke:rgb(0, 0, 0); stroke-width:2");
      }
      init = false;
      lastPos.x = e.position.x;
      lastPos.y = e.position.y;
    }
  //}

});