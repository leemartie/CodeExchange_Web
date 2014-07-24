/**
 * Created by lee on 7/23/14.
 */
var Survey = {




    getView : function(){

        var surveyView = $(SetupManager.tableOpen+SetupManager.tableClose);

//ROW 1
//cell 1
        var row1 = $(SetupManager.trOpen+SetupManager.trClose);
        surveyView.append(row1);
        var cell1 = new questionCell("Did you find useful code?",null,"boolean",1);
        row1.append(cell1);
//cell 2

        var cell2 = new questionCell("Did you find code criticisms useful?",
            'http://codeexchange.ics.uci.edu/critisims.png',"boolean",2,150);
        row1.append(cell2);


//cell 3
        var cell3 = new questionCell("Did you find code properties useful?",
            'http://codeexchange.ics.uci.edu/clickable_properties.png',"boolean",3,250);
        row1.append(cell3);

        surveyView.append(row1);
        var cell7 = new questionCell("Did you find history useful?",
            'http://codeexchange.ics.uci.edu/History.png',"boolean",6,350);
        row1.append(cell7);

//ROW 2
//cell 4
        var row2 = $(SetupManager.trOpen+SetupManager.trClose);
        surveyView.append(row2);
        var cell4 = new questionCell("Did you find recommendations useful?",
            'http://codeexchange.ics.uci.edu/Recommendations.png',"boolean",4,250);
        row2.append(cell4);


//cell 5
        var cell5 = new questionCell("Did you find advanced search useful?",
            'http://codeexchange.ics.uci.edu/AdvancedSearch.png',"boolean",5,200);
        row2.append(cell5);
//cell8
        var cell8 = new questionCell("Did you find the current query useful?",
            'http://codeexchange.ics.uci.edu/CurrentQuery.png',"boolean",8,200);
        row2.append(cell8);

//cell 6
        var cell6 = new questionCell("Any other feedback?",
            null,"open",6);
        row2.append(cell6);






//cancel



        var row3 = $(SetupManager.trOpen+SetupManager.trClose);
        surveyView.append(row3);
        var buttonCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        buttonCell.attr("colspan","4");
        row3.append(buttonCell);

        var tempTable = $(SetupManager.tableOpen+SetupManager.tableClose);
        buttonCell.append(tempTable);

        var row3 = $(SetupManager.trOpen+SetupManager.trClose);
        tempTable.append(row3);

        var cellCancel = $(SetupManager.tdOpen+SetupManager.tdClose);
        cellCancel.attr("width","50%");
        cellCancel.attr("align","center");

        row3.append(cellCancel);

        var close = $('<div id="close"></div>');
        cellCancel.append(close);
        close.addClass("SubmitButton");
        close.append($("<text>Cancel</text>"));

        surveyView.attr("align","center");
        close.on("click",function(){
            $("#blanket").remove();
            $("#confirm").remove();

        });

        close.mouseenter(function(event){
            close.removeClass("SubmitButton");
            close.addClass("SubmitButtonHover");
        });

        close.mouseleave( function(event){
            close.removeClass("SubmitButtonHover");
            close.addClass("SubmitButton");

        });


//go button
        var cellGo = $(SetupManager.tdOpen+SetupManager.tdClose);
        cellGo.attr("width","50%");
        cellGo.attr("align","center");
        row3.append(cellGo);

        var submitButton = $(SetupManager.divOpen+SetupManager.divClose);
        submitButton.append("<text>Submit</text>");
        cellGo.append(submitButton);
        submitButton.addClass("SubmitButton");

        surveyView.attr("align","center");

        submitButton.mouseenter(function(event){
            submitButton.removeClass("SubmitButton");
            submitButton.addClass("SubmitButtonHover");
        });

        submitButton.mouseleave( function(event){
            submitButton.removeClass("SubmitButtonHover");
            submitButton.addClass("SubmitButton");

        });

        submitButton.click(function(event){

        });

//div
        var div = $(SetupManager.divOpen+SetupManager.divClose);
        div.attr("id","confirm");
        div.append(surveyView);

        div.css({
            "position" : "fixed",
            "background-color" : "#d3d3d3",
            "width" : "1200",
            "overflow": "hidden",
            "height": "auto",
            "z-index" : "9002",
            "top" : "50px",
            "left" : (($(document).width() - 1200) / 2)});

        div.addClass("Survey");

        return div;
    }


}

function questionCell(question, imageURL, type, questionNumber, width){

    if(type == "boolean"){

        this.cell = $(SetupManager.tdOpen+SetupManager.tdClose);
        this.cell.append("<p><text>"+question+"</text></p>");
        this.cell.attr("align","center");
        this.cell.attr("valign","top");
        this.cell.css({"border":"1px solid black", "valign": "top"});
        this.cell.addClass("Question");

        this.yesBox = $(SetupManager.inputOpen+SetupManager.inputClose);
        this.yesLabel = $("<text >yes</text>");
        this.cell.append(this.yesBox);
        this.cell.append(this.yesLabel);
        this.yesBox.attr("type","radio");
        this.yesBox.attr("name","boolean"+questionNumber);
        this.yesBox.attr("value","yes");
        this.yesBox.attr("id", "radio1");

        this.falseBox = $(SetupManager.inputOpen+SetupManager.inputClose);
        this.falseBoxLabel = $("<text>no</text>");
        this.cell.append(this.falseBox);
        this.cell.append(this.falseBoxLabel);
        this.falseBox.attr("type","radio");
        this.falseBox.attr("name","boolean"+questionNumber);
        this.falseBox.attr("value","no");
        this.falseBox.attr("id", "radio2");

        this.cell.append($("<p></p>"));
        if(imageURL != null) {
            this.cell.append("<img width='"+width+"' height='auto' src='" + imageURL + "'></img>");
        }

        return this.cell;

    }else if(type == "open"){
        this.cell = $(SetupManager.tdOpen+SetupManager.tdClose);
        this.cell.append("<p><text>"+question+"</text></p>");
        this.cell.attr("align","center");
        this.cell.attr("valign","top");
        this.cell.css({"border":"1px solid black", "valign": "top"});
        this.cell.addClass("Question");

        this.textBox = $('<textarea style="width: 350px; font-size:14pt;overflow-y: scroll"/>');
        this.textBox.css({"height":"330px"});
        this.cell.append(this.textBox);

        this.textBox.attr("type","textbox");
        this.textBox.attr("name","textbox"+questionNumber);

        this.textBox.attr("id", "textboxfeedback");

        return this.cell;
    }


}