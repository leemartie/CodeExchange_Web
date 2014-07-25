/**
 * Created by lee on 7/23/14.
 */
var Survey = {

    questionCells : new Array(),


    getView : function(){

        var surveyView = $(SetupManager.tableOpen+SetupManager.tableClose);
        surveyView.css({"margin":"0", "border":"0", "border-spacing":"0", "padding":"0"});

//ROW 1
//cell 1
        var row1 = $(SetupManager.trOpen+SetupManager.trClose);
        surveyView.append(row1);
        var subCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        row1.append(subCell);
        subCell.attr("height","100%");
        subCell.attr("valign","top");

        var subTable = $(SetupManager.tableOpen+SetupManager.tableClose);
        var subRow = $(SetupManager.trOpen+SetupManager.trClose);
        subTable.append(subRow);
        subCell.append(subTable);


        var cell1 = new questionCell("Did you find useful code?",null,"boolean",1);
        subRow.append(cell1.cell);
        cell1.cell.attr("height","10%");
        Survey.questionCells.push(cell1);

        var subRow = $(SetupManager.trOpen+SetupManager.trClose);
        var cell9 = new questionCell("Did you find autocomplete useful?",
            'http://codeexchange.ics.uci.edu/autocomplete.png',"boolean",9,200);
        cell9.cell.attr("height","90%");
        Survey.questionCells.push(cell9);

        subRow.append(cell9.cell);
        subTable.append(subRow);
        subTable.attr("height","100%");
        subTable.css({"margin":"0", "border":"0", "border-spacing":"0", "padding":"0"});

//cell 2





        var subCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        row1.append(subCell);
        subCell.attr("height","100%");
        subCell.attr("valign","top");

        var subTable = $(SetupManager.tableOpen+SetupManager.tableClose);
        var subRow = $(SetupManager.trOpen+SetupManager.trClose);
        subTable.append(subRow);
        subCell.append(subTable);


        var cell2 = new questionCell("Did you find code criticisms useful?",
            'http://codeexchange.ics.uci.edu/critisims.png',"boolean",2,150);
        subRow.append(cell2.cell);
        cell2.cell.attr("height","50%");
        Survey.questionCells.push(cell2);


//cell 11
        var subRow = $(SetupManager.trOpen+SetupManager.trClose);

        var cell11 = new questionCell("Did you find keywords useful?",
            'http://codeexchange.ics.uci.edu/keywords.png',"boolean",11,250);
        cell11.cell.attr("height","143px");
        subRow.append(cell11.cell);
        subTable.append(subRow);
        subTable.attr("height","100%");
        subTable.css({"margin":"0", "border":"0", "border-spacing":"0", "padding":"0"});
        Survey.questionCells.push(cell11);
//cell 3
        var cell3 = new questionCell("Did you find code properties useful?",
            'http://codeexchange.ics.uci.edu/clickable_properties.png',"boolean",3,250);
        row1.append(cell3.cell);
        Survey.questionCells.push(cell3);

        var cell7 = new questionCell("Did you find history useful?",
            'http://codeexchange.ics.uci.edu/History.png',"boolean",6,350);
        row1.append(cell7.cell);
        Survey.questionCells.push(cell7);



//ROW 2
//cell 4
        var row2 = $(SetupManager.trOpen+SetupManager.trClose);
        surveyView.append(row2);
        var cell4 = new questionCell("Did you find recommendations useful?",
            'http://codeexchange.ics.uci.edu/Recommendations.png',"boolean",4,200);
        row2.append(cell4.cell);
        Survey.questionCells.push(cell4);

//cell 5
        var cell5 = new questionCell("Did you find advanced search useful?",
            'http://codeexchange.ics.uci.edu/AdvancedSearch.png',"boolean",5,200);
        row2.append(cell5.cell);
        Survey.questionCells.push(cell5);
//cell8
        var cell8 = new questionCell("Did you find the current query useful?",
            'http://codeexchange.ics.uci.edu/CurrentQuery.png',"boolean",8,200);
        row2.append(cell8.cell);
        Survey.questionCells.push(cell8);

//cell10
        var subTable = $(SetupManager.tableOpen+SetupManager.tableClose);
        subTable.css({"margin":"0", "border":"0", "border-spacing":"0", "padding":"0"});
        var subRow = $(SetupManager.trOpen+SetupManager.trClose);
        var subCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        subTable.append(subRow);
        subCell.append(subTable);
        row2.append(subCell);

        var cell10 = new questionCell("Did you find pages useful?",
            'http://codeexchange.ics.uci.edu/pageNumbers.png',"boolean",5,300);
        subRow.append(cell10.cell);
        subTable.append(subRow);
        Survey.questionCells.push(cell10);
//cell 6
        var subRow = $(SetupManager.trOpen+SetupManager.trClose);
        var cell6 = new questionCell("Any other feedback?",
            null,"open",6);
        subRow.append(cell6.cell);
        subTable.append(subRow);
        Survey.questionCells.push(cell6);





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
            var result = "";
            for(var i = 0; i < Survey.questionCells.length; i++){
                var question = Survey.questionCells[i].question;
                var answer = Survey.questionCells[i].answer;

                if(i == 0)
                    result = result + question +"\t"+answer;
                else
                    result = "\n"+result + question +"\t"+answer;
            }

            alert(result);
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
    this.question = question;
    this.answer = null;
    this.cell = null;

    if(type == "boolean"){

        this.cell = $(SetupManager.tdOpen+SetupManager.tdClose);
        var question = $("<p><text><b>"+question+"</b></text></p>");
        question.css({"background-color":"lightgoldenrodyellow", "border-radius":"25px"});
        this.cell.append(question);
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
        this.yesBox.attr("height", "50");
        this.yesLabel.css({"background-color":"lightblue", "border-radius":"25px", "padding":"5px"});
        var is = this;
        this.yesBox.click(function(event){
                is.yesLabel.addClass("BoxSelected");
                is.falseBoxLabel.removeClass("BoxSelected");
                is.answer = "yes";
        });

        this.falseBox = $(SetupManager.inputOpen+SetupManager.inputClose);
        this.falseBoxLabel = $("<text>no</text>");
        this.cell.append(this.falseBox);
        this.cell.append(this.falseBoxLabel);
        this.falseBox.attr("type","radio");
        this.falseBox.attr("name","boolean"+questionNumber);
        this.falseBox.attr("value","no");
        this.falseBox.attr("id", "radio2");
        this.falseBoxLabel.css({"background-color":"lightblue", "border-radius":"25px", "padding":"5px"});
        this.falseBox.click(function(event){
            is.yesLabel.removeClass("BoxSelected");
            is.falseBoxLabel.addClass("BoxSelected");
            is.answer = "no";
        });

        this.cell.append($("<p></p>"));
        if(imageURL != null) {
            this.cell.append("<img width='"+width+"' height='auto' src='" + imageURL + "'></img>");
        }



    }else if(type == "open"){
        this.cell = $(SetupManager.tdOpen+SetupManager.tdClose);
        var question = $("<p><text><b>"+question+"</b></text></p>");
        question.css({"background-color":"lightgoldenrodyellow", "border-radius":"25px"});
        this.cell.append(question);
        this.cell.attr("align","center");
        this.cell.attr("valign","top");
        this.cell.css({"border":"1px solid black", "valign": "top"});
        this.cell.addClass("Question");

        this.textBox = $('<textarea style="width: 350px; font-size:14pt;overflow-y: scroll"/>');
        this.textBox.css({"height":"200px"});
        this.cell.append(this.textBox);

        this.textBox.attr("type","textbox");
        this.textBox.attr("name","textbox"+questionNumber);

        this.textBox.attr("id", "textboxfeedback");

        var is = this;
        this.textBox.keypress(function(event){
            is.answer = is.textBox.val();
        });





    }


}