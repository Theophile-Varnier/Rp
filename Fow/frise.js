$(function () {

    data.forEach(function (e, i) {
        var rp = $("<div>", { "class": "rp " + (e.status == "closed" ? "finished" : "progress"), "style": "left:" + 20*i + "px" });
        var tooltip = $("<div>", {"class" : "tooltip"});
        var tooltipTitle = $("<span>", {"class": "titreun"}).text(function(){ return e.titre;});
        var tooltipDescription = $("<div>", {"class": "infosgen"});
        var rpDescription = $("<div>", {"class": "sepafiche"}).text(function(e){
            return data[e].description;
        });
        tooltipDescription.append(rpDescription);
        tooltip.append(tooltipTitle);
        tooltip.append(tooltipDescription);
        rp.append(tooltip);
        $(".graph").append(rp);
    });

});