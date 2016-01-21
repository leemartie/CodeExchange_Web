// This will receive the database returned reponse
// and create a dataobject for displaying

var locationID = [];

function handleResponse (resp){
    //console.log(resp);
    var imagePath = "imgs/";
    var obj = eval('(' + resp + ')');
    var imageNameArray = [];
    var linkArray = [];
    var title = [];

    var item = {};

    for (var i = 0; i < obj.length; i++) {
        /*		imageNameArray[imageNameArray.length] = [[imagePath + obj[i]["img_id"]]];
         linkArray[linkArray.length] = obj[i]["articleUrl"];
         locationID[locationID.length] = obj[i]["locationID"];
         */
        item = {
            pmid: obj[i]["pmid"],
            cluster: obj[i]["cluster"],
            imageURL: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT8cma3WvVxehAIpn7XGKQtQqz8HjuPOwFnXUs6aU9a4fPPmcb9",
            shortname: obj[i]["shortname"],
            cin: obj[i]["cin"],
            cout: obj[i]["cout"],
            title: obj[i]["title"],
            authors: obj[i]["authors"]};

        addItem(item);
    }
    //displayData(imageNameArray, linkArray, locationID, title);
}

// displayData creates a set of divs with the correct svg images and links
// divs created are class=item
function displayData (imgArray, linkArray, locationID) {
    var data = imgArray;
    var refdata = linkArray;
    var bdy = d3.select("body").select("#pageContent");

    var items = bdy.selectAll("#item")
        .data(data)
        .enter().append("div")
        .attr("class", "item");

    d3.selectAll(".item")
        .append("text")
        .data(locationID)
        .text(function(d) {return d;})
        .attr("class", "citation");

    var svgs = items.selectAll("svg") .data(function(d) {return d;})
        .enter().append("svg")
        .attr("id", "svg")
        .attr("class", "center");

    var imgs = svgs.selectAll("image") .data(function(d) {return d;})
        .enter().append("svg:image")
        .attr("xlink:href", function(d) {return d;})
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("class", "center");

    d3.selectAll(".item")
        .append("div")
        .attr("class", "itemDetail")
        .html("This is stuff...");

    d3.selectAll(".item")
        .append("text")
        .attr("class", "citation")
        .text("This is a citation")
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px");

    d3.selectAll("svg").data(locationID)
        .attr("locationID", function(d) {return "ID"+d.split(':').join('_');})
        .on("click", function(d) { makeDivFullscreen( "ID"+d.split(':').join('_') ); });

    d3.selectAll(".item")
        .data(locationID)
        .attr("id", function(d) { return "ID"+d.split(':').join('_'); } )

    adjustItemSize(itemSizeStartValue);
}

function makeDivFullscreen (divID) {
    console.log("To Fullscreen: "+divID);

    if(currentFullscreen != 0)
        removeFromFullscreen();

    d3.select("#"+divID)
        .style("height", (screen.height *.8)+"px")
        .style("width", (screen.width -40)+"px")
        .attr("class", "fullscreen")

        .select("svg")
        .attr("class", "svg_fullscreen")
        .style("width", null)
        .style("height", null)
        .on("click", function() { removeFromFullscreen(); });

    d3.select("#"+divID)
        .select(".itemDetail")
        .style("display", "block");

    var el = document.getElementById(divID);
    el.scrollIntoView(false);

    currentFullscreen = divID;
    console.log("Setting cfs to:"+currentFullscreen);
}

function removeFromFullscreen () {
    console.log("Exiting fullscreen for "+currentFullscreen);
    divID = currentFullscreen;

    d3.select(".fullscreen")
        .attr("class", "item")
        .style("height", null)
        .style("width", null)

        .select(".itemDetail")
        .style("display", "none");

    d3.select(".svg_fullscreen")
        .attr("class", "center")
        .on("click", function() { makeDivFullscreen( ""+eval(divID) ) });

    //Reset the onclick for all svgs since I can't seem to evaluate divID to text for the function call....
    /*        d3.selectAll("svg").data(locationID)
     .attr("locationID", function(d) {return "ID"+d.split(':').join('_');})
     .on("click", function(d) { makeDivFullscreen( "ID"+d.split(':').join('_') ); });*/

    currentFullscreen = 0;
    console.log("Setting cfs to:"+currentFullscreen);
    adjustItemSize(currentValue);
}

function adjustItemSize(sizeValue) {
    // console.log(sizeValue);

    if(currentFullscreen != 0)
        removeFromFullscreen();
    //Use Sizevalue as %of screen skize
    var sWidth = (screen.width -40) * (sizeValue/100) ;

    d3.selectAll("svg")
        .style("width", sWidth+"px")
        .style("height", sWidth+"px");
}

function addItem (itemObj) {

    var itemHtmlContent ='<text class="citation">'+itemObj["cluster"]+'</text>'
        +'<svg id="svg" class="center">'
        +'<image xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="'+itemObj["imageURL"]+'" width="100%" height="100%" class="center"></image>'
        +'</svg>'
        +'<div class="itemDetail"><i>'+itemObj["title"]+'</i><br><br>Authors: '+itemObj["authors"]+'<br><br>'+itemObj["shortname"]+'<br>Citations In: '+itemObj["cin"]+'<br>Citations out: '+itemObj["cout"]+'</div>';


    d3.selectAll("#pageContent")
        .append("div")
        .attr("class", "item")
        .attr("id", "ID"+itemObj["pmid"])
        .html(itemHtmlContent)
        .select("svg")
        .on("click", function() { makeDivFullscreen( "ID"+itemObj["pmid"] ) });
}