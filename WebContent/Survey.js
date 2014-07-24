/**
 * Created by lee on 7/23/14.
 */
var Survey = {


    surveyView  :   $(SetupManager.tableOpen+SetupManager.tableClose),

    getView : function(){



//ROW 1
//cell 1
        var row1 = $(SetupManager.trOpen+SetupManager.trClose);
        Survey.surveyView.append(row1);
        var cell1 = new questionCell("Did you find useful code?",null,"boolean");
        row1.append(cell1);
//cell 2

        var cell2 = new questionCell("Did you find code criticisms useful?",'http://codeexchange.ics.uci.edu/critisims.png',"boolean");
        row1.append(cell2);


//cell 3
        var cell3 = $(SetupManager.tdOpen+SetupManager.tdClose);
        cell3.append("<p><text>Did you find code properties useful?</text></p>");

        cell3.css({"border":"1px solid black"});

        var yesBox = $(SetupManager.inputOpen+SetupManager.inputClose);
        var yesLabel = $("<text >yes</text>");
        cell3.append(yesBox);
        cell3.append(yesLabel);
        yesBox.attr("type","radio");
        yesBox.attr("name","boolean");
        yesBox.attr("value","yes");
        yesBox.attr("id", "radio1");

        var falseBox = $(SetupManager.inputOpen+SetupManager.inputClose);
        var falseBoxLabel = $("<text>no</text>");
        cell3.append(falseBox);
        cell3.append(falseBoxLabel);
        falseBox.attr("type","radio");
        falseBox.attr("name","boolean");
        falseBox.attr("value","no");
        falseBox.attr("id", "radio2");
        cell3.append("<img src='http://codeexchange.ics.uci.edu/clickable_properties.png'></img>");

        row1.append(cell3);

//ROW 2
//cell 4
        var row2 = $(SetupManager.trOpen+SetupManager.trClose);
        Survey.surveyView.append(row2);
        var cell4 = $(SetupManager.tdOpen+SetupManager.tdClose);
        cell4.append("<p><text>Did you find recommendations useful?</text></p>");

        cell4.css({"border":"1px solid black"});
        row2.append(cell4);

        var yesBox = $(SetupManager.inputOpen+SetupManager.inputClose);
        var yesLabel = $("<text >yes</text>");
        cell4.append(yesBox);
        cell4.append(yesLabel);
        yesBox.attr("type","radio");
        yesBox.attr("name","boolean");
        yesBox.attr("value","yes");
        yesBox.attr("id", "radio1");

        var falseBox = $(SetupManager.inputOpen+SetupManager.inputClose);
        var falseBoxLabel = $("<text>no</text>");
        cell4.append(falseBox);
        cell4.append(falseBoxLabel);
        falseBox.attr("type","radio");
        falseBox.attr("name","boolean");
        falseBox.attr("value","no");
        falseBox.attr("id", "radio2");

        cell4.append("<img src='http://codeexchange.ics.uci.edu/recommendations.png'></img>");

//cell 5
        var cell5 = $(SetupManager.tdOpen+SetupManager.tdClose);
        cell5.append("<p><text>Did you find advanced search useful?</text></p>");

        cell5.css({"border":"1px solid black"});
        row2.append(cell5);

        var yesBox = $(SetupManager.inputOpen+SetupManager.inputClose);
        var yesLabel = $("<text >yes</text>");
        cell5.append(yesBox);
        cell5.append(yesLabel);
        yesBox.attr("type","radio");
        yesBox.attr("name","boolean");
        yesBox.attr("value","yes");
        yesBox.attr("id", "radio1");

        var falseBox = $(SetupManager.inputOpen+SetupManager.inputClose);
        var falseBoxLabel = $("<text>no</text>");
        cell5.append(falseBox);
        cell5.append(falseBoxLabel);
        falseBox.attr("type","radio");
        falseBox.attr("name","boolean");
        falseBox.attr("value","no");
        falseBox.attr("id", "radio2");

        cell5.append("<img width='200' height='200' src='http://codeexchange.ics.uci.edu/AdvancedSearch.png'></img>");

//cell 6
        var cell6 = $(SetupManager.tdOpen+SetupManager.tdClose);
        cell6.append("<p><text>Any other feedback?</text></p>");
        cell6.css({"border":"1px solid black"});
        row2.append(cell6);

        var yesBox = $(SetupManager.inputOpen+SetupManager.inputClose);
        var yesLabel = $("<text >yes</text>");
        cell6.append(yesBox);
        cell6.append(yesLabel);
        yesBox.attr("type","radio");
        yesBox.attr("name","boolean");
        yesBox.attr("value","yes");
        yesBox.attr("id", "radio1");

        var falseBox = $(SetupManager.inputOpen+SetupManager.inputClose);
        var falseBoxLabel = $("<text>no</text>");
        cell6.append(falseBox);
        cell6.append(falseBoxLabel);
        falseBox.attr("type","radio");
        falseBox.attr("name","boolean");
        falseBox.attr("value","no");
        falseBox.attr("id", "radio2");

//div
        var div = $(SetupManager.divOpen+SetupManager.divClose);
        div.attr("id","confirm");
        div.append(Survey.surveyView);


        div.css({
            "position" : "fixed",
            "background-color" : "#d3d3d3",
            "width" : "900",
            "overflow": "hidden",
            "height": "auto",
            "z-index" : "9002",
            "top" : "100px",
            "left" : (($(document).width() - 900) / 2)});

        div.addClass("Survey");

        return div;
    }


}

function questionCell(question, imageURL, type){

    if(type == "boolean"){

        this.cell = $(SetupManager.tdOpen+SetupManager.tdClose);
        this.cell.append("<p><text>"+question+"</text></p>");

        this.cell.css({"border":"1px solid black"});

        this.yesBox = $(SetupManager.inputOpen+SetupManager.inputClose);
        this.yesLabel = $("<text >yes</text>");
        this.cell.append(this.yesBox);
        this. cell.append(this.yesLabel);
        this.yesBox.attr("type","radio");
        this.yesBox.attr("name","boolean");
        this.yesBox.attr("value","yes");
        this.yesBox.attr("id", "radio1");

        this.falseBox = $(SetupManager.inputOpen+SetupManager.inputClose);
        this.falseBoxLabel = $("<text>no</text>");
        this.cell.append(this.falseBox);
        this.cell.append(this.falseBoxLabel);
        this.falseBox.attr("type","radio");
        this.falseBox.attr("name","boolean");
        this.falseBox.attr("value","no");
        this.falseBox.attr("id", "radio2");

        if(imageURL != null) {
            this.cell.append("<img src='" + imageURL + "'></img>");
        }

        return this.cell;

    }else if(type == "open"){

    }


}