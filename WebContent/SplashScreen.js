/**
 * Created by lee on 7/14/14.
 */
var SplashScreen = {

    InputSplashID: "InputSplashID",
    showing     :        true,

    getSplash : function(){

        var tableForSite = $(SetupManager.tableOpen+SetupManager.tableClose);
        tableForSite.attr("height","40%");

        var row = $(SetupManager.trOpen+SetupManager.trClose);

        tableForSite.append(row);
        var cell = $(SetupManager.tdOpen+SetupManager.tdClose);

        row.append(cell);

        var title = $("<div><text>CodeExchange</text></div>");
        title.addClass("SplashTitle");


        var subtext = $("<div><text>Let's find some code</text></div>");
        subtext.addClass("subtext");
        title.append(subtext);

        var input = $(SetupManager.inputOpen+SetupManager.inputClose);
        input.addClass("SplashInput");
        input.attr(SetupManager.placeholder_attr, "Type keywords and hit Enter");
        input.attr(SetupManager.ID_attr,SetupManager.queryInput_ID);



        var btn = $(SetupManager.divOpen+SetupManager.divClose);

       // var icon  = $('<img width=20 height=20 src="http://codeexchange.ics.uci.edu/wizard.png"></img>');
       // btn.append(icon);
        var label = $("<div><text> Advanced Search</text></div>");
        label.addClass("AdvancedSearchText");
        btn.append(label);
        btn.addClass("AdvancedSearch");


        btn.mouseenter(function(event) {
            btn.addClass("AdvancedSearchHover");
        });

        btn.mouseleave(function(event) {
            btn.removeClass("AdvancedSearchHover");

        });

        btn.click(function(event) {

            $('<div id="blanket"></div>').
                    appendTo(SetupManager.pound+SetupManager.entireSiteDiv_ID);

            var advancedDiv = SplashScreen.setupAdvanvedSearch();



            advancedDiv.appendTo(SetupManager.pound+SetupManager.entireSiteDiv_ID);





        });





        var inputDiv = $(SetupManager.divOpen+SetupManager.divClose);

        inputDiv.append(title);
        inputDiv.append(input);
        inputDiv.append(btn);



        inputDiv.addClass("SplashInputDiv");



        cell.append(inputDiv);

        var subtext = $("<div><text>Search over 10 million Java classes in GitHUB</text></div>");
        subtext.addClass("footerText");
        cell.append(subtext);

//auto complete
        input.autocomplete({
            source: function( request, response ){
                BuildQueryBoxModel.currentQueryType = QueryBucketModel.snippetField;
                QueryManager.submitAutoComplete(BuildQueryBoxModel.currentQueryType, request, response);


            },
            focus: function() {
                // prevent value inserted on focus

                return false;
            },
            select: function( event, ui ) {
                var terms = null;

                if (BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodDec ||
                    BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodCall) {
                    terms = input.val().split(/[\s,]+/);
                } else {
                    terms = input.val().split(/[\s]+/);
                }

                // remove the current input
                terms.pop();
                // add the selected item
                terms.push(ui.item.value);

//LOG IT
                UsageLogger.addEvent(UsageLogger.AUTO_COMPLETE_SELECTED, null, BuildQueryBoxModel.currentQueryType);

                input.val(terms.join(" "));
                return false;

            },

            open: function(event, ui){
                   $(".ui-menu").addClass("AutoComplete");
            }

        }).keyup(function (e) {
            if(e.which === 13) {
                $(".ui-menu-item").hide();
            }
        })

//key press
        input.keypress(function(e) {
            if (e.keyCode == '13') {
                e.preventDefault();

                subtext.hide();

                tableForSite.animate({
                  height: '5%'
                }, 700 );

                cell.animate({

                    backgroundColor: '#000000'
                }, 700 );

//                tableForSite.fadeTo(700, 0,function(){});

                if(SplashScreen.showing){
                    inputDiv.addClass("SplashFloatLeft");

                    SetupManager.setupSite();
                    SplashScreen.showing = false;
                }

                var query = null;
                query = new QueryModel(QueryBucketModel.snippetField, input.val());
                query.displayType = "keywords";
                query.displayValue = input.val();

                BuildQueryBoxView.addAndSubmit(query);

                //LOG IT
                UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Builder),query);

                input.val("");


            }
        });




        cell.addClass("Splash");
        cell.attr("align","center");




        var screenHeight = jQuery(window).height();


        $(SetupManager.pound+SetupManager.entireSiteDiv_ID).height(screenHeight-15);
        $(SetupManager.pound+SetupManager.entireSiteDiv_ID).append(tableForSite);



    },

    setupAdvanvedSearch: function(){
       var div = $(SetupManager.divOpen+SetupManager.divClose);
        div.css({
            "position" : "fixed",
            "background-color" : "#eee",
            "width" : "600px",
            "height" : "500px",
            "z-index" : "9002",
            "top" : "150px",
            "left" : (($(document).width() - 600) / 2)});

       div.attr("id","confirm");
       div.addClass("AdvancedForm");


        var close = $('<div id="close"></div>');
        close.css({"float":"right","padding-left":"2px","padding-right":"2px", "padding-top":"4px","width":"50px"});
        close.addClass("SubmitButton");
        close.append($("<font size='2'><text>Close</text></font>"));
        close.appendTo(div);
        close.on("click",function(){
            $("#blanket").remove();
            $("#confirm").remove();

        });



       div.append("<font size='2'><b><text>Find classes with...</text></b></font>");
        div.css({"background-color": "lightblue"});




        var labelWidth = "15%";
        var labelAlign = "left";
       var table = $(SetupManager.tableOpen+SetupManager.tableClose);
        table.css({"background-color": "lightblue"});


       var tableRow = $(SetupManager.trOpen+SetupManager.trClose);
        table.append(tableRow);
        var tableCell1 = $(SetupManager.tdOpen+SetupManager.tdClose);
        tableRow.append(tableCell1);
        tableCell1.addClass("childAdvancedTable");
        var tableRow = $(SetupManager.trOpen+SetupManager.trClose);
        table.append(tableRow);
        var tableCell2 = $(SetupManager.tdOpen+SetupManager.tdClose);
        tableRow.append(tableCell2);
        tableCell2.addClass("childAdvancedTable");

        var tableRow = $(SetupManager.trOpen+SetupManager.trClose);
        table.append(tableRow);
        var tableCell3 = $(SetupManager.tdOpen+SetupManager.tdClose);
        tableCell3.addClass("childAdvancedTable");
        tableRow.append(tableCell3);

        var tableRow = $(SetupManager.trOpen+SetupManager.trClose);
        table.append(tableRow);
        var tableCell4 = $(SetupManager.tdOpen+SetupManager.tdClose);
        tableCell4.addClass("childAdvancedTable");
        tableRow.append(tableCell4);

        var tableOneInput = $(SetupManager.tableOpen+SetupManager.tableClose);
        tableOneInput.addClass("AdvancedSearchTable");
        tableCell1.append(tableOneInput);

        var header = $("<th>Properties</th>");
        header.attr("align",labelAlign);
        header.attr("width",labelWidth);
        tableOneInput.append(header);

// imports
       var importsRow = $(SetupManager.trOpen+SetupManager.trClose);
        tableOneInput.append(importsRow);
        var label = $(SetupManager.tdOpen+SetupManager.tdClose);
        label.attr("align",labelAlign);
        label.attr("width",labelWidth);
        importsRow.append(label);
        label.append($("<text>Imports</text>"));
       var importsCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        importsRow.append(importsCell);


        importsCell.attr("align","left");
       var importsInput = $(SetupManager.inputOpen+SetupManager.inputClose);
        importsCell.append(importsInput);
        importsInput.addClass("AdvancedInput");

//extends
        var extendsRow = $(SetupManager.trOpen+SetupManager.trClose);
        tableOneInput.append(extendsRow);
        var label = $(SetupManager.tdOpen+SetupManager.tdClose);
        label.attr("align",labelAlign);
        label.attr("width",labelWidth);
        extendsRow.append(label);
        label.append($("<text>Extends</text>"));
        var extendsCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        extendsRow.append(extendsCell);
        var extendsInput = $(SetupManager.inputOpen+SetupManager.inputClose);
        extendsCell.append(extendsInput);
        extendsCell.attr("align","left");
        extendsInput.addClass("AdvancedInput");


//implements
        var implementsRow = $(SetupManager.trOpen+SetupManager.trClose);
        tableOneInput.append(implementsRow);
        var label = $(SetupManager.tdOpen+SetupManager.tdClose);
        label.attr("align",labelAlign);
        label.attr("width",labelWidth);
        implementsRow.append(label);
        label.append($("<text>Implements</text>"));
        var implementsCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        implementsRow.append(implementsCell);
        var implementsInput = $(SetupManager.inputOpen+SetupManager.inputClose);
        implementsCell.append(implementsInput);
        implementsCell.attr("align","left");
        implementsInput.addClass("AdvancedInput");
//class props
        var propsRow = $(SetupManager.trOpen+SetupManager.trClose);
        tableOneInput.append(propsRow);

        var cell1 = $(SetupManager.tdOpen+SetupManager.tdClose);
        cell1.attr("align",labelAlign);
        cell1.attr("width",labelWidth);
        propsRow.append(cell1);
        var checkboxGeneric = $(SetupManager.inputOpen+SetupManager.inputClose);
        var checkboxLabelGeneric = $("<text >generic</text>");

        checkboxGeneric.attr("type","checkbox");
        checkboxGeneric.attr("value","generic");

        cell1.append(checkboxLabelGeneric);
        var cell1 = $(SetupManager.tdOpen+SetupManager.tdClose);
        cell1.attr("align",labelAlign);
        propsRow.append(cell1);
        cell1.append(checkboxGeneric);

        var propsRow = $(SetupManager.trOpen+SetupManager.trClose);
        tableOneInput.append(propsRow);

        var cell2 = $(SetupManager.tdOpen+SetupManager.tdClose);
        cell2.attr("align",labelAlign);
        cell2.attr("width",labelWidth);

        propsRow.append(cell2);
        var checkboxVarArgs = $(SetupManager.inputOpen+SetupManager.inputClose);

        var checkboxLabelVarArgs = $("<text >has wildcards</text>");

        checkboxVarArgs.attr("type","checkbox");
        checkboxVarArgs.attr("value","varArgs");
        cell2.append(checkboxLabelVarArgs);
        var cell2 = $(SetupManager.tdOpen+SetupManager.tdClose);
        cell2.attr("align",labelAlign);

        propsRow.append(cell2);
        cell2.append(checkboxVarArgs);


//=======Method Call
        var methodCallTable = $(SetupManager.tableOpen+SetupManager.tableClose);
        methodCallTable.addClass("AdvancedSearchTable");

        var header = $("<th>Method Call</th>");
        header.attr("align",labelAlign);
        header.attr("width",labelWidth);
        methodCallTable.append(header);
//class

       var methodCallClassRow = $(SetupManager.trOpen+SetupManager.trClose);
            methodCallTable.append(methodCallClassRow);
        var label = $(SetupManager.tdOpen+SetupManager.tdClose);
        label.attr("align",labelAlign);
        label.attr("width",labelWidth);
            methodCallClassRow.append(label);
            label.append($("<text>Class</text>"));
       var methodCallClassCell = $(SetupManager.tdOpen+SetupManager.tdClose);
            methodCallClassRow.append(methodCallClassCell);
       var methodCallClassInput = $(SetupManager.inputOpen+SetupManager.inputClose);
            methodCallClassCell.append(methodCallClassInput);
        methodCallClassInput.attr(SetupManager.placeholder_attr, "ex: java.util.hashmap");
        methodCallClassInput.addClass("AdvancedInput");

//name
        var methodCallNameRow = $(SetupManager.trOpen+SetupManager.trClose);
            methodCallTable.append(methodCallNameRow);
        var label = $(SetupManager.tdOpen+SetupManager.tdClose);
        label.attr("align",labelAlign);
        label.attr("width",labelWidth);
            methodCallNameRow.append(label);
            label.append($("<text>Method</text>"));
        var methodCallNameCell = $(SetupManager.tdOpen+SetupManager.tdClose);
            methodCallNameRow.append(methodCallNameCell);
        var methodCallNameInput = $(SetupManager.inputOpen+SetupManager.inputClose);
            methodCallNameCell.append(methodCallNameInput);
            methodCallNameInput.attr(SetupManager.placeholder_attr, "ex: put");
        methodCallNameInput.addClass("AdvancedInput");


//parameters
        var methodCallParametersRow = $(SetupManager.trOpen+SetupManager.trClose);
            methodCallTable.append(methodCallParametersRow);
        var label = $(SetupManager.tdOpen+SetupManager.tdClose);
        label.attr("align",labelAlign);
        label.attr("width",labelWidth);
            methodCallParametersRow.append(label);
            label.append($("<text>Parameters</text>"));
        var methodCallParametersCell = $(SetupManager.tdOpen+SetupManager.tdClose);
            methodCallParametersRow.append(methodCallParametersCell);
        var methodCallParametersInput = $(SetupManager.inputOpen+SetupManager.inputClose);
            methodCallParametersCell.append(methodCallParametersInput);
            methodCallParametersInput.attr("placeholder","param 1, param 2, ...");
        methodCallParametersInput.addClass("AdvancedInput");

        tableCell2.append(methodCallTable);



//=======Method Declaration
        var methodCallTable = $(SetupManager.tableOpen+SetupManager.tableClose);
        methodCallTable.addClass("AdvancedSearchTable");
        var header = $("<th>Method Declaration</th>");
        header.attr("align",labelAlign);
        header.attr("width",labelWidth);
        methodCallTable.append(header);
//class

        var methodCallClassRow = $(SetupManager.trOpen+SetupManager.trClose);
        methodCallTable.append(methodCallClassRow);
        var label = $(SetupManager.tdOpen+SetupManager.tdClose);
        label.attr("align",labelAlign);
        label.attr("width",labelWidth);
        methodCallClassRow.append(label);
        label.append($("<text>Class</text>"));
        var methodCallClassCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        methodCallClassRow.append(methodCallClassCell);
        var methodCallClassInput = $(SetupManager.inputOpen+SetupManager.inputClose);
        methodCallClassCell.append(methodCallClassInput);
        methodCallClassInput.attr(SetupManager.placeholder_attr, "class name");
        methodCallClassInput.addClass("AdvancedInput");

//name
        var methodCallNameRow = $(SetupManager.trOpen+SetupManager.trClose);
        methodCallTable.append(methodCallNameRow);
        var label = $(SetupManager.tdOpen+SetupManager.tdClose);
        label.attr("align",labelAlign);
        label.attr("width",labelWidth);
        methodCallNameRow.append(label);
        label.append($("<text>Method</text>"));
        var methodCallNameCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        methodCallNameRow.append(methodCallNameCell);
        var methodCallNameInput = $(SetupManager.inputOpen+SetupManager.inputClose);
        methodCallNameCell.append(methodCallNameInput);
        methodCallNameInput.attr(SetupManager.placeholder_attr, "ex: sort");
        methodCallNameInput.addClass("AdvancedInput");


//parameters
        var methodCallParametersRow = $(SetupManager.trOpen+SetupManager.trClose);
        methodCallTable.append(methodCallParametersRow);
        var label = $(SetupManager.tdOpen+SetupManager.tdClose);
        label.attr("align",labelAlign);
        label.attr("width",labelWidth);
        methodCallParametersRow.append(label);
        label.append($("<text>Parameters</text>"));
        var methodCallParametersCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        methodCallParametersRow.append(methodCallParametersCell);
        var methodCallParametersInput = $(SetupManager.inputOpen+SetupManager.inputClose);
        methodCallParametersCell.append(methodCallParametersInput);
        methodCallParametersInput.attr("placeholder","param 1, param 2, ...");
        methodCallParametersInput.addClass("AdvancedInput");


//return type
        var returnTypeRow = $(SetupManager.trOpen+SetupManager.trClose);
        methodCallTable.append(returnTypeRow);
        var label = $(SetupManager.tdOpen+SetupManager.tdClose);
        label.attr("align",labelAlign);
        label.attr("width",labelWidth);
        returnTypeRow.append(label);
        label.append($("<text>Method</text>"));
        var methodCallNameCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        returnTypeRow.append(methodCallNameCell);
        var methodCallNameInput = $(SetupManager.inputOpen+SetupManager.inputClose);
        methodCallNameCell.append(methodCallNameInput);
        methodCallNameInput.attr(SetupManager.placeholder_attr, "ex: java.lang.String");
        methodCallNameInput.addClass("AdvancedInput");


        var propsRow = $(SetupManager.trOpen+SetupManager.trClose);
        methodCallTable.append(propsRow);

        var cell1 = $(SetupManager.tdOpen+SetupManager.tdClose);
        cell1.attr("align",labelAlign);
        cell1.attr("width",labelWidth);
        propsRow.append(cell1);
        var checkboxGeneric = $(SetupManager.inputOpen+SetupManager.inputClose);
        var checkboxLabelGeneric = $("<text >generic</text>");

        checkboxGeneric.attr("type","checkbox");
        checkboxGeneric.attr("value","generic");

        cell1.append(checkboxLabelGeneric);
        var cell1 = $(SetupManager.tdOpen+SetupManager.tdClose);
        cell1.attr("align",labelAlign);
        propsRow.append(cell1);
        cell1.append(checkboxGeneric);

        var propsRow = $(SetupManager.trOpen+SetupManager.trClose);
        methodCallTable.append(propsRow);

        var cell2 = $(SetupManager.tdOpen+SetupManager.tdClose);
        cell2.attr("align",labelAlign);
        cell2.attr("width",labelWidth);

        propsRow.append(cell2);
        var checkboxVarArgs = $(SetupManager.inputOpen+SetupManager.inputClose);

        var checkboxLabelVarArgs = $("<text >variable args</text>");

        checkboxVarArgs.attr("type","checkbox");
        checkboxVarArgs.attr("value","varArgs");
        cell2.append(checkboxLabelVarArgs);
        var cell2 = $(SetupManager.tdOpen+SetupManager.tdClose);
        cell2.attr("align",labelAlign);

        propsRow.append(cell2);
        cell2.append(checkboxVarArgs);


        tableCell3.append(methodCallTable);


//go button
        var submitButton = $(SetupManager.divOpen+SetupManager.divClose);
        submitButton.append("<text>Submit</text>");
        submitButton.addClass("SubmitButton");
        tableCell4.append(submitButton);




        div.append(table);

        return div;
    }


}