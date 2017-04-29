$(function () {

    data.forEach(function (e, i) {
        var rp = $("<div>", { "class": "rp " + (e.status == "closed" ? "finished" : "progress"), "style": "left:" + 20*i + "px" });
        var link = $("<a>", {"href": e.url});
        var tooltip = $("<div>", {"class" : "tooltip"});
        var tooltipTitle = $("<span>", {"class": "titreun"}).text(e.titre);
        var tooltipDescription = $("<div>", {"class": "infosgen"}).text(function() { return e.lieu + " - " + e.partenaires;});
        var rpDescription = $("<div>", {"class": "sepafiche"}).text(function(){
            return e.description;
        });
        tooltipDescription.append(rpDescription);
        tooltip.append(tooltipTitle);
        tooltip.append(tooltipDescription);
        rp.append(link);
        rp.append(tooltip);
        $(".graph").append(rp);
    });

});