/**
 * Created by lee on 7/14/14.
 */
var SplashScreen = {

    InputSplashID: "InputSplashID",
    showing     :        true,

    getSplash : function(){

        var tableForSite = $(SetupManager.tableOpen+SetupManager.tableClose);
        tableForSite.attr("height","40%");
        tableForSite.attr("cellpadding","0");
        tableForSite.attr("cellspacing","0");
        tableForSite.attr("border","0");
        tableForSite.attr("width","100%");

        var row = $(SetupManager.trOpen+SetupManager.trClose);

        tableForSite.append(row);
        var cellSubTable = $(SetupManager.tdOpen+SetupManager.tdClose);
        cellSubTable.attr("width","100%");


        row.append(cellSubTable);

        var subTable = $(SetupManager.tableOpen+SetupManager.tableClose);
        subTable.addClass("SplashInputDiv");
        subTable.attr("width","100%");
        subTable.attr("cellpadding","0");
        subTable.attr("cellspacing","0");
        subTable.attr("border","0");

        cellSubTable.append(subTable);

        var titleRow = $(SetupManager.trOpen+SetupManager.trClose);
        subTable.append(titleRow);
        var cell = $(SetupManager.tdOpen+SetupManager.tdClose);
        titleRow.append(cell);

        var title = $("<img src='http://codeexchange.ics.uci.edu/logo.png'></img>");

        cell.attr("width","100%");
        cell.attr("align","center");
        cell.css({"padding-bottom":"5px"});
        cell.attr("colspan","2");

        cell.append(title);

        var row = $(SetupManager.trOpen+SetupManager.trClose);
        subTable.append(row);




        var sideCellTitle= $(SetupManager.tdOpen+SetupManager.tdClose);
        var title = $("<img src='http://codeexchange.ics.uci.edu/logo.png'></img>");


        sideCellTitle.append(title);
        row.append(sideCellTitle);
        sideCellTitle.css({"padding-right":"20px", "padding-bottom":"5px"});
        sideCellTitle.attr("width","20%");
        title.hide();



        var cell = $(SetupManager.tdOpen+SetupManager.tdClose);
        row.append(cell);
        cell.attr("align","right");

//subtable to the right of logo

        var subTableInput = $(SetupManager.tableOpen+SetupManager.tableClose);
        subTableInput.attr("width","100%");
        subTableInput.attr("cellpadding","0");
        subTableInput.attr("cellspacing","0");
        subTableInput.attr("border","0");
       // subTableInput.css({"background-color":"blue"});
        cell.append(subTableInput);

        var row = $(SetupManager.trOpen+SetupManager.trClose);
        subTableInput.append(row);
        var cell = $(SetupManager.tdOpen+SetupManager.tdClose);
        row.append(cell);
        cell.attr("width","90%");
//----------------

        var inputDiv = $(SetupManager.divOpen+SetupManager.divClose);

        var input = $(SetupManager.inputOpen+SetupManager.inputClose);
        inputDiv.append(input);
        input.addClass("SplashInput");



        input.attr(SetupManager.placeholder_attr, "Type keywords and hit Enter");
        input.attr(SetupManager.ID_attr,SetupManager.queryInput_ID);

        cell.append(inputDiv);
        cell.css({"background-color":"white","border-top":"1px solid","border-bottom":"1px solid",
            "border-left":"1px solid","border-color":"gray","border-bottom-left-radius":"25px",
             "border-top-left-radius":"25px"});

        cell.attr("width","50%");
       // cell.css({"padding-right":"50px"});
        cell.attr("align","center");

//submit
        var submitInputButton = $(SetupManager.divOpen+SetupManager.divClose);
        var label = $("<div><text>Submit</text></div>");
        label.addClass("AdvancedSearchText");
        submitInputButton.append(label);
       // submitInputButton.addClass("SubmitInputButton");

        var cell = $(SetupManager.tdOpen+SetupManager.tdClose);

        row.append(cell);
        cell.attr("width","9%");
        cell.attr("height","100%");
        cell.attr("align","left");
        cell.append(submitInputButton);

        cell.addClass("SubmitInputButton");

        (function(cell) {
            cell.mouseenter(function (event) {
                cell. addClass("SubmitInputButtonHover");
            });
        })(cell);

        (function(cell) {
        cell.mouseleave(function(event) {
            cell.removeClass("SubmitInputButtonHover");

        });})(cell);


//click submit bottom - TODO: need to put clones into function
        (function(cell) {cell.click(function(event){
            if(input.val() == "")
                return;

                input.attr(SetupManager.placeholder_attr, "Type additional keywords and hit Enter");
                subtext.hide();
                footerCell2.hide();
                tableForSite.animate({
                    height: '5%'
                }, 700 );
                cellSubTable.animate({

                    backgroundColor: '#d3d3d3'
                }, 700 );
                if(SplashScreen.showing){
                  //  subTable.addClass("SplashFloatLeft");
                    paddingCell.detach();
                    titleRow.hide();
                    title.toggle();

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
        });})(cell);


//advanced button
        var btn = $(SetupManager.divOpen+SetupManager.divClose);
        var label = $("<div><text> Advanced Search</text></div>");
        label.addClass("AdvancedSearchText");
        btn.append(label);

        var cell = $(SetupManager.tdOpen+SetupManager.tdClose);

        (function(cell) {
            cell.click(function (event) {
                $('<div id="blanket"></div>').
                    appendTo(SetupManager.pound + SetupManager.entireSiteDiv_ID);
                var advancedDiv = SplashScreen.setupAdvanvedSearch(input, subtext, footerCell2, tableForSite,
                    cellSubTable, subTable, titleRow, title, btn, paddingCell);
                advancedDiv.appendTo(SetupManager.pound + SetupManager.entireSiteDiv_ID);
            });
        })(cell);




        row.append(cell);
        cell.attr("width","9%");
        cell.attr("height","100%");
        cell.attr("align","right");
        cell.append(btn);
        cell.addClass("AdvancedSearch");

        (function(cell) {
            cell.mouseenter(function (event) {
                cell. addClass("AdvancedSearchHover");
            });
        })(cell);

        (function(cell) {
            cell.mouseleave(function(event) {
                cell.removeClass("AdvancedSearchHover");

            });})(cell);

        var paddingCell = $(SetupManager.tdOpen+SetupManager.tdClose);

        row.append(paddingCell);
        paddingCell.attr("width","20%");

//subtext
        var subtext = $("<div><font color='#2c4961'><text>Search over 10 million Java classes in GitHub</text></font></div>");
        subtext.addClass("footerText");
        var row = $(SetupManager.trOpen+SetupManager.trClose);
        var cell = $(SetupManager.tdOpen+SetupManager.tdClose);
        cell.attr("colspan","2");
        row.append(cell);
        cell.append(subtext);
        subTable.append(row);

//`````````````
        var footerRow = $(SetupManager.trOpen+SetupManager.trClose);
        subTable.append(footerRow);
        var footerCell2 = $(SetupManager.tdOpen+SetupManager.tdClose);
        footerRow.append(footerCell2);
        footerCell2.attr("colspan","2");

        var divDisclaimer = $(SetupManager.divOpen+SetupManager.divClose);
//        divDisclaimer.append("<img height='20' width='auto' style='margin-right: 5px; vertical-align:text-bottom;'" +
//            " src='http://codeexchange.ics.uci.edu/letter.png'></img>" +
//            "<text>Introduction Letter</text>");
        divDisclaimer.append("<text>Introduction Letter</text>");
        divDisclaimer.addClass("LetterLabel");
        footerCell2.click(function(event) {
            $('<div id="blanket"></div>').
                appendTo(SetupManager.pound+SetupManager.entireSiteDiv_ID);
            var survey = Survey.getLetter();
            survey.appendTo(SetupManager.pound+SetupManager.entireSiteDiv_ID);
        });
        footerCell2.append(divDisclaimer);
        footerCell2.attr("width","100%");
        footerCell2.attr("align","center");
        footerCell2.attr("valign","bottom");
        footerCell2.css({"padding":"5"});

//auto complete
        input.autocomplete({
            source: function( request, response ){
                BuildQueryBoxModel.currentQueryType = QueryBucketModel.snippetField;
                QueryManager.submitAutoComplete(BuildQueryBoxModel.currentQueryType, request, response, input.val());


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

            if(input.val() == "")
                return;

            if (e.keyCode == '13') {
                e.preventDefault();
                input.attr(SetupManager.placeholder_attr, "Type additional keywords and hit Enter");
                subtext.hide();
                footerCell2.hide();
                tableForSite.animate({
                    height: '5%'


                }, 700 );

                cellSubTable.animate({

                    backgroundColor: '#d3d3d3'
                }, 700 );



//                tableForSite.fadeTo(700, 0,function(){});

                if(SplashScreen.showing){
                    subTable.addClass("SplashFloatLeft");
                    paddingCell.hide();
                    titleRow.hide();
                    title.toggle();
                    btn.height("50%");
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




        cellSubTable.addClass("Splash");
        cellSubTable.attr("align","center");




        var screenHeight = jQuery(window).height();


        $(SetupManager.pound+SetupManager.entireSiteDiv_ID).height(screenHeight-15);
        $(SetupManager.pound+SetupManager.entireSiteDiv_ID).append(tableForSite);



    },

    setupAdvanvedSearch: function(input, subtext, footerCell2, tableForSite, cellSubTable, subTable, titleRow, sideCellTitle, btn, paddingCell){
        var div = $(SetupManager.divOpen+SetupManager.divClose);


        div.attr("id","confirm");
        div.addClass("AdvancedForm");

        var fontSize = '3';


        function boxAutoComplete(inputBox) {
            var autoCompleteStruct = {
                source: function (request, response) {
                    QueryManager.submitAutoComplete(BuildQueryBoxModel.currentQueryType,
                        request, response, inputBox.val());
                },
                focus: function () {
                    // prevent value inserted on focus
                    return false;
                },
                select: function (event, ui) {
                    var terms = null;

                    if (BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodCallParameters ||
                        BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodDeclarationParameters) {
                        terms = inputBox.val().split(/[\s,]+/);
                    } else {
                        terms = inputBox.val().split(/[\s]+/);
                    }
                    // remove the current input
                    terms.pop();
                    // add the selected item
                    terms.push(ui.item.value);


//LOG IT
                    UsageLogger.addEvent(UsageLogger.AUTO_COMPLETE_SELECTED, null, BuildQueryBoxModel.currentQueryType);

                    if (BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodCallParameters ||
                        BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodDeclarationParameters) {
                        inputBox.val(terms.join(", "));
                    } else {
                        inputBox.val(terms.join(" "));
                    }


                    return false;
                },
                open: function(event, ui){
                    $(".ui-menu").addClass("AdvancedAutoComplete");
                }

            };
            return autoCompleteStruct;
        }


        var title = $("<div><font size='3'><b><text>Find classes with:</text></b></font></div>");


        div.append(title);
        div.css({"background-color": "#d3d3d3"});




        var labelWidth = "15%";
        var labelAlign = "left";
        var table = $(SetupManager.tableOpen+SetupManager.tableClose);
        table.css({"background-color": "#d3d3d3"});


        var tableRow = $(SetupManager.trOpen+SetupManager.trClose);
        table.append(tableRow);
        var tableCell1 = $(SetupManager.tdOpen+SetupManager.tdClose);
        tableRow.append(tableCell1);
        tableCell1.addClass("childAdvancedTable");
        tableCell1.attr("colspan","2");

        var tableRow = $(SetupManager.trOpen+SetupManager.trClose);
        table.append(tableRow);
        var tableCell5 = $(SetupManager.tdOpen+SetupManager.tdClose);
        tableCell5.addClass("childAdvancedTable");
        tableRow.append(tableCell5);
        tableCell5.attr("colspan","2");

        var tableRow = $(SetupManager.trOpen+SetupManager.trClose);
        table.append(tableRow);
        var tableCell2 = $(SetupManager.tdOpen+SetupManager.tdClose);
        tableRow.append(tableCell2);
        tableCell2.addClass("childAdvancedTable");
        tableCell2.attr("colspan","2");

        var tableRow = $(SetupManager.trOpen+SetupManager.trClose);
        table.append(tableRow);
        var tableCell3 = $(SetupManager.tdOpen+SetupManager.tdClose);
        tableCell3.addClass("childAdvancedTable");
        tableRow.append(tableCell3);
        tableCell3.attr("colspan","2");

        var tableRow = $(SetupManager.trOpen+SetupManager.trClose);
        table.append(tableRow);
        var tableCell6 = $(SetupManager.tdOpen+SetupManager.tdClose);
        tableCell6.addClass("childAdvancedTable");
        tableRow.append(tableCell6);

        var tableCell4 = $(SetupManager.tdOpen+SetupManager.tdClose);
        tableCell4.addClass("childAdvancedTable");
        tableRow.append(tableCell4);





        var tableOneInput = $(SetupManager.tableOpen+SetupManager.tableClose);
        tableOneInput.addClass("AdvancedSearchTable");
        tableCell1.append(tableOneInput);

        var header = $("<th><font size="+fontSize+">Properties</font></th>");
        header.attr("align","center");
        header.attr("width","100%");
        header.attr("colspan","2");
        tableOneInput.append(header);

// imports
        var importsRow = $(SetupManager.trOpen+SetupManager.trClose);
        tableOneInput.append(importsRow);
        var label = $(SetupManager.tdOpen+SetupManager.tdClose);
        label.attr("align",labelAlign);
        label.attr("width",labelWidth);
        importsRow.append(label);
        label.append($("<font size="+fontSize+"'><text>Imports</text></font>"));
        var importsCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        importsRow.append(importsCell);


        importsCell.attr("align","left");
        var importsInput = $(SetupManager.inputOpen+SetupManager.inputClose);
        importsCell.append(importsInput);
        importsInput.addClass("AdvancedInput");
        importsInput.attr("placeholder","ex: java.io.File");
        importsInput.click(function(event){
            BuildQueryBoxModel.currentQueryType = QueryBucketModel.snippetImportsFiled;
            });
        importsInput.autocomplete(boxAutoComplete(importsInput));

//extends
        var extendsRow = $(SetupManager.trOpen+SetupManager.trClose);
        tableOneInput.append(extendsRow);
        var label = $(SetupManager.tdOpen+SetupManager.tdClose);
        label.attr("align",labelAlign);
        label.attr("width",labelWidth);
        extendsRow.append(label);
        label.append($("<font size="+fontSize+"><text>Extends</text></font>"));
        var extendsCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        extendsRow.append(extendsCell);
        var extendsInput = $(SetupManager.inputOpen+SetupManager.inputClose);
        extendsCell.append(extendsInput);
        extendsCell.attr("align","left");
        extendsInput.addClass("AdvancedInput");
        extendsInput.attr("placeholder","ex: java.util.observable");
        extendsInput.click(function(event){
            BuildQueryBoxModel.currentQueryType = QueryBucketModel.extendsField;
        });
        extendsInput.autocomplete(boxAutoComplete(extendsInput));

//implements
        var implementsRow = $(SetupManager.trOpen+SetupManager.trClose);
        tableOneInput.append(implementsRow);
        var label = $(SetupManager.tdOpen+SetupManager.tdClose);
        label.attr("align",labelAlign);
        label.attr("width",labelWidth);
        implementsRow.append(label);
        label.append($("<font size="+fontSize+"><text>Implements</text></font>"));
        var implementsCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        implementsRow.append(implementsCell);
        var implementsInput = $(SetupManager.inputOpen+SetupManager.inputClose);
        implementsCell.append(implementsInput);
        implementsCell.attr("align","left");
        implementsInput.addClass("AdvancedInput");
        implementsInput.attr("placeholder","ex: java.util.observer");
        implementsInput.click(function(event){
            BuildQueryBoxModel.currentQueryType = QueryBucketModel.implementsField;
        });
        implementsInput.autocomplete(boxAutoComplete(implementsInput));

//class props
        var propsRow = $(SetupManager.trOpen+SetupManager.trClose);
        tableOneInput.append(propsRow);

        var cell1 = $(SetupManager.tdOpen+SetupManager.tdClose);
        cell1.attr("align",labelAlign);
        cell1.attr("width",labelWidth);
        propsRow.append(cell1);
        var checkboxGeneric = $(SetupManager.inputOpen+SetupManager.inputClose);
        var checkboxLabelGeneric = $("<font size="+fontSize+"><text >Generic</text></font>");

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
        var checkboxWildCards = $(SetupManager.inputOpen+SetupManager.inputClose);

        var checkboxLabelVarArgs = $("<font size="+fontSize+"><text >Has wildcards</text></font>");

        checkboxWildCards.attr("type","checkbox");
        checkboxWildCards.attr("value","varArgs");
        cell2.append(checkboxLabelVarArgs);
        var cell2 = $(SetupManager.tdOpen+SetupManager.tdClose);
        cell2.attr("align",labelAlign);

        propsRow.append(cell2);
        cell2.append(checkboxWildCards);

//package
        var tableWhereInput = $(SetupManager.tableOpen+SetupManager.tableClose);
        tableWhereInput.addClass("AdvancedSearchTable");
        tableCell5.append(tableWhereInput);


        var header = $("<th><font size="+fontSize+">Location</font></th>");
        header.attr("align","center");
        header.attr("width","100%");
        header.attr("colspan","2");
        tableWhereInput.append(header);

        var packageRow = $(SetupManager.trOpen+SetupManager.trClose);
        tableWhereInput.append(packageRow);
        var label = $(SetupManager.tdOpen+SetupManager.tdClose);
        label.attr("align",labelAlign);
        label.attr("width",labelWidth);
        packageRow.append(label);
        label.append($("<font size="+fontSize+"><text>Package</text></font>"));
        var packageCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        packageRow.append(packageCell);
        var packageInput = $(SetupManager.inputOpen+SetupManager.inputClose);
        packageCell.append(packageInput);
        packageCell.attr("align","left");
        packageInput.addClass("AdvancedInput");
        packageInput.attr("placeholder","ex: com.selimober.marsrovers");
        packageInput.click(function(event){
            BuildQueryBoxModel.currentQueryType = QueryBucketModel.snippetPackage;
        });
        packageInput.autocomplete(boxAutoComplete(packageInput));

        var projectRow = $(SetupManager.trOpen+SetupManager.trClose);
        tableWhereInput.append(projectRow);
        var label = $(SetupManager.tdOpen+SetupManager.tdClose);
        label.attr("align",labelAlign);
        label.attr("width",labelWidth);
        projectRow.append(label);
        label.append($("<font size="+fontSize+"><text>Project</text></font>"));
        var projectCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        projectRow.append(projectCell);
        var projectInput = $(SetupManager.inputOpen+SetupManager.inputClose);
        projectCell.append(projectInput);
        projectCell.attr("align","left");
        projectInput.addClass("AdvancedInput");
        projectInput.attr("placeholder","ex: calico");
        projectInput.click(function(event){
            BuildQueryBoxModel.currentQueryType = QueryBucketModel.projectField;
        });
        projectInput.autocomplete(boxAutoComplete(projectInput));

//=======Method Call
        var methodCallTable = $(SetupManager.tableOpen+SetupManager.tableClose);
        methodCallTable.addClass("AdvancedSearchTable");


        var header = $("<th><font size="+fontSize+">Method Call</font></th>");
        header.attr("align","center");
        header.attr("width","100%");
        header.attr("colspan","2");
        methodCallTable.append(header);
//class

        var methodCallClassRow = $(SetupManager.trOpen+SetupManager.trClose);
        methodCallTable.append(methodCallClassRow);
        var label = $(SetupManager.tdOpen+SetupManager.tdClose);
        label.attr("align",labelAlign);
        label.attr("width",labelWidth);
        methodCallClassRow.append(label);
        label.append($("<font size="+fontSize+"><text>Class</text></font>"));
        var methodCallClassCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        methodCallClassRow.append(methodCallClassCell);
        var methodCallClassInput = $(SetupManager.inputOpen+SetupManager.inputClose);
        methodCallClassCell.append(methodCallClassInput);
        methodCallClassInput.attr(SetupManager.placeholder_attr, "ex: java.util.hashmap");
        methodCallClassInput.addClass("AdvancedInput");
        methodCallClassInput.click(function(event){
            BuildQueryBoxModel.currentQueryType = QueryBucketModel.snippetMethodCallCallingClass;
        });
        methodCallClassInput.autocomplete(boxAutoComplete(methodCallClassInput));

//name
        var methodCallNameRow = $(SetupManager.trOpen+SetupManager.trClose);
        methodCallTable.append(methodCallNameRow);
        var label = $(SetupManager.tdOpen+SetupManager.tdClose);
        label.attr("align",labelAlign);
        label.attr("width",labelWidth);
        methodCallNameRow.append(label);
        label.append($("<font size="+fontSize+"><text>Method</text></font>"));
        var methodCallNameCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        methodCallNameRow.append(methodCallNameCell);
        var methodCallNameInput = $(SetupManager.inputOpen+SetupManager.inputClose);
        methodCallNameCell.append(methodCallNameInput);
        methodCallNameInput.attr(SetupManager.placeholder_attr, "ex: put");
        methodCallNameInput.addClass("AdvancedInput");
        methodCallNameInput.click(function(event){
            BuildQueryBoxModel.currentQueryType = QueryBucketModel.snippetMethodCallName;
        });
        methodCallNameInput.autocomplete(boxAutoComplete(methodCallNameInput));

//parameters
        var methodCallParametersRow = $(SetupManager.trOpen+SetupManager.trClose);
        methodCallTable.append(methodCallParametersRow);
        var label = $(SetupManager.tdOpen+SetupManager.tdClose);
        label.attr("align",labelAlign);
        label.attr("width",labelWidth);
        methodCallParametersRow.append(label);
        label.append($("<font size="+fontSize+"><text>Parameters</text></font>"));
        var methodCallParametersCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        methodCallParametersRow.append(methodCallParametersCell);
        var methodCallParametersInput = $(SetupManager.inputOpen+SetupManager.inputClose);
        methodCallParametersCell.append(methodCallParametersInput);
        methodCallParametersInput.attr("placeholder","ex: java.lang.String, int[], ...");
        methodCallParametersInput.addClass("AdvancedInput");
        methodCallParametersInput.click(function(event){
            BuildQueryBoxModel.currentQueryType = QueryBucketModel.snippetMethodCallParameters;
        });
        methodCallParametersInput.autocomplete(boxAutoComplete(methodCallParametersInput));

        tableCell2.append(methodCallTable);



//=======Method Declaration
        var methodCallTable = $(SetupManager.tableOpen+SetupManager.tableClose);
        methodCallTable.addClass("AdvancedSearchTable");
        var header = $("<th><font size="+fontSize+">Method Declaration</font></th>");
        header.attr("align","center");
        header.attr("width","100%");
        header.attr("colspan","2");
        methodCallTable.append(header);


//class

        var methodCallClassRow = $(SetupManager.trOpen+SetupManager.trClose);
        methodCallTable.append(methodCallClassRow);
        var label = $(SetupManager.tdOpen+SetupManager.tdClose);
        label.attr("align",labelAlign);
        label.attr("width",labelWidth);
        methodCallClassRow.append(label);
        label.append($("<font size="+fontSize+"><text>Class</text></font>"));
        var methodCallClassCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        methodCallClassRow.append(methodCallClassCell);
        var methodDecClassInput = $(SetupManager.inputOpen+SetupManager.inputClose);
        methodCallClassCell.append(methodDecClassInput);
        methodDecClassInput.attr(SetupManager.placeholder_attr, "ex: Bootstrap");
        methodDecClassInput.addClass("AdvancedInput");
        methodDecClassInput.click(function(event){
            BuildQueryBoxModel.currentQueryType = QueryBucketModel.snippetMethodDeclarationClass;
        });
        methodDecClassInput.autocomplete(boxAutoComplete(methodDecClassInput));

//name
        var methodCallNameRow = $(SetupManager.trOpen+SetupManager.trClose);
        methodCallTable.append(methodCallNameRow);
        var label = $(SetupManager.tdOpen+SetupManager.tdClose);
        label.attr("align",labelAlign);
        label.attr("width",labelWidth);
        methodCallNameRow.append(label);
        label.append($("<font size="+fontSize+"><text>Method</text></font>"));
        var methodCallNameCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        methodCallNameRow.append(methodCallNameCell);
        var methodDecNameInput = $(SetupManager.inputOpen+SetupManager.inputClose);
        methodCallNameCell.append(methodDecNameInput);
        methodDecNameInput.attr(SetupManager.placeholder_attr, "ex: sort");
        methodDecNameInput.addClass("AdvancedInput");
        methodDecNameInput.click(function(event){
            BuildQueryBoxModel.currentQueryType = QueryBucketModel.snippetMethodDeclarationName;
        });
        methodDecNameInput.autocomplete(boxAutoComplete(methodDecNameInput));

//parameters
        var methodCallParametersRow = $(SetupManager.trOpen+SetupManager.trClose);
        methodCallTable.append(methodCallParametersRow);
        var label = $(SetupManager.tdOpen+SetupManager.tdClose);
        label.attr("align",labelAlign);
        label.attr("width",labelWidth);
        methodCallParametersRow.append(label);
        label.append($("<font size="+fontSize+"><text>Parameters</text></font>"));
        var methodCallParametersCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        methodCallParametersRow.append(methodCallParametersCell);
        var methodDecParametersInput = $(SetupManager.inputOpen+SetupManager.inputClose);
        methodCallParametersCell.append(methodDecParametersInput);
        methodDecParametersInput.attr("placeholder","ex: java.lang.String, int[], ...");
        methodDecParametersInput.addClass("AdvancedInput");
        methodDecParametersInput.click(function(event){
            BuildQueryBoxModel.currentQueryType = QueryBucketModel.snippetMethodDeclarationParameters;
        });
        methodDecParametersInput.autocomplete(boxAutoComplete(methodDecParametersInput));

//return type
        var returnTypeRow = $(SetupManager.trOpen+SetupManager.trClose);
        methodCallTable.append(returnTypeRow);
        var label = $(SetupManager.tdOpen+SetupManager.tdClose);
        label.attr("align",labelAlign);
        label.attr("width",labelWidth);
        returnTypeRow.append(label);
        label.append($("<font size="+fontSize+"><text>Return</text></font>"));
        var methodCallNameCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        returnTypeRow.append(methodCallNameCell);
        var methodDecReturnInput = $(SetupManager.inputOpen+SetupManager.inputClose);
        methodCallNameCell.append(methodDecReturnInput);
        methodDecReturnInput.attr(SetupManager.placeholder_attr, "ex: java.lang.String");
        methodDecReturnInput.addClass("AdvancedInput");
        methodDecReturnInput.click(function(event){
            BuildQueryBoxModel.currentQueryType = QueryBucketModel.snippetMethodDeclarationReturn;
        });
        methodDecReturnInput.autocomplete(boxAutoComplete(methodDecReturnInput));

        var propsRow = $(SetupManager.trOpen+SetupManager.trClose);
        methodCallTable.append(propsRow);

        var cell1 = $(SetupManager.tdOpen+SetupManager.tdClose);
        cell1.attr("align",labelAlign);
        cell1.attr("width",labelWidth);
        propsRow.append(cell1);
        var checkboxDecGeneric = $(SetupManager.inputOpen+SetupManager.inputClose);
        var checkboxLabelGeneric = $("<font size="+fontSize+"><text >Generic</text></font>");

        checkboxDecGeneric.attr("type","checkbox");
        checkboxDecGeneric.attr("value","generic");

        cell1.append(checkboxLabelGeneric);
        var cell1 = $(SetupManager.tdOpen+SetupManager.tdClose);
        cell1.attr("align",labelAlign);
        propsRow.append(cell1);
        cell1.append(checkboxDecGeneric);

        var propsRow = $(SetupManager.trOpen+SetupManager.trClose);
        methodCallTable.append(propsRow);

        var cell2 = $(SetupManager.tdOpen+SetupManager.tdClose);
        cell2.attr("align",labelAlign);
        cell2.attr("width",labelWidth);

        propsRow.append(cell2);
        var checkboxDecVarArgs = $(SetupManager.inputOpen+SetupManager.inputClose);

        var checkboxLabelVarArgs = $("<font size="+fontSize+"><text >Variable args</text></font>");

        checkboxDecVarArgs.attr("type","checkbox");
        checkboxDecVarArgs.attr("value","varArgs");
        cell2.append(checkboxLabelVarArgs);
        var cell2 = $(SetupManager.tdOpen+SetupManager.tdClose);
        cell2.attr("align",labelAlign);

        propsRow.append(cell2);
        cell2.append(checkboxDecVarArgs);


        tableCell3.append(methodCallTable);

        var close = $('<div id="close"></div>');
//        close.addClass("CloseButton");
        close.addClass("SubmitButton");
        close.append($("<text>Cancel</text>"));
        tableCell6.append(close);
        tableCell6.attr("align","center");
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
        var submitButton = $(SetupManager.divOpen+SetupManager.divClose);
        submitButton.append("<text>Submit</text>");
        submitButton.addClass("SubmitButton");
        tableCell4.append(submitButton);
        tableCell4.attr("align","center");

        submitButton.mouseenter(function(event){
            submitButton.removeClass("SubmitButton");
            submitButton.addClass("SubmitButtonHover");
        });

        submitButton.mouseleave( function(event){
            submitButton.removeClass("SubmitButtonHover");
            submitButton.addClass("SubmitButton");

        });

        submitButton.click(function(event){


                SplashScreen.addAllAndSubmit(importsInput,extendsInput,implementsInput,checkboxGeneric,checkboxWildCards,
                                          packageInput,projectInput,methodCallClassInput,methodCallNameInput,
                                          methodCallParametersInput,methodDecClassInput,methodDecNameInput,methodDecParametersInput,
                                          methodDecReturnInput,checkboxDecGeneric,checkboxDecVarArgs);

            $("#blanket").remove();
            $("#confirm").remove();


            input.attr(SetupManager.placeholder_attr, "Type additional keywords and hit Enter");
            subtext.hide();
            footerCell2.hide();
            tableForSite.animate({
                height: '5%'


            }, 700 );

            cellSubTable.animate({

                backgroundColor: '#d3d3d3'
            }, 700 );



//                tableForSite.fadeTo(700, 0,function(){});

            if(SplashScreen.showing){
                subTable.addClass("SplashFloatLeft");
                titleRow.hide();
                sideCellTitle.toggle();
                btn.height("50%");
                paddingCell.hide();
                SetupManager.setupSite();
                SplashScreen.showing = false;
            }

        });




        div.append(table);

        div.css({
            "position" : "fixed",
            "background-color" : "#d3d3d3",
            "width" : "800px",
            "overflow": "hidden",
            "height": "auto",
            "z-index" : "9002",
            "top" : "150px",
            "left" : (($(document).width() - 800) / 2)});

        return div;
    }

    ,

    /***/
    addAllAndSubmit: function(importsInput,extendsInput,implementsInput,checkboxGeneric,checkboxWildCards,
                              packageInput,projectInput,methodCallClassInput,methodCallNameInput,
                              methodCallParametersInput,methodDecClassInput,methodDecNameInput,methodDecParametersInput,
                              methodDecReturnInput,checkboxDecGeneric,checkboxDecVarArgs){



        var listOfQuerires = new Array();

        if(importsInput != null || importsInput != ""){
            var query = new QueryModel(QueryBucketModel.snippetImportsFiled, importsInput.val());
            query.displayType = "imports"
            query.displayValue = importsInput.val();
            //LOG IT
            UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Builder),query);
            listOfQuerires.push(query);
        }
        if(extendsInput != null || extendsInput != ""){
            var query = new QueryModel(QueryBucketModel.extendsField, extendsInput.val());
            query.displayType = "extends"
            query.displayValue = extendsInput.val();
            //LOG IT
            UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Builder),query);
            listOfQuerires.push(query);
        }
        if(implementsInput != null || implementsInput != ""){
            var query = new QueryModel(QueryBucketModel.implementsField, implementsInput.val());
            query.displayType = "implements"
            query.displayValue = implementsInput.val();
            //LOG IT
            UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Builder),query);
            listOfQuerires.push(query);
        }
        if(checkboxGeneric[0].checked){
            var query = new QueryModel(QueryBucketModel.snippetClassGeneric, checkboxGeneric[0].checked+"");
            query.displayType = "is generic"
            query.displayValue = checkboxGeneric[0].checked;
            //LOG IT
            UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Builder),query);
            listOfQuerires.push(query);
        }

        if(checkboxWildCards[0].checked){
            var query = new QueryModel(QueryBucketModel.snippetClassWildCard, checkboxWildCards[0].checked+"");
            query.displayType = "has wildcards"
            query.displayValue = checkboxWildCards[0].checked;
            //LOG IT
            UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Builder),query);
            listOfQuerires.push(query);
        }
        if(packageInput != null || packageInput != ""){
            var query = new QueryModel(QueryBucketModel.snippetPackage, packageInput.val());
            query.displayType = "package"
            query.displayValue = packageInput.val();
            //LOG IT
            UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Builder),query);
            listOfQuerires.push(query);
        }
//projectInput
        if(projectInput != null || projectInput != ""){
            var query = new QueryModel(QueryBucketModel.projectField, projectInput.val());
            query.displayType = "project"
            query.displayValue = projectInput.val();
            //LOG IT
            UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Builder),query);
            listOfQuerires.push(query);
        }

//methodCallClassInput,methodCallNameInput,methodCallParametersInput
        //for method call queries
        var methodCallQueryFunction = function(){
            var query = null;
            var methodCallValue = '';
            if(methodCallClassInput.val() != "") {
                methodCallValue = methodCallValue + '%2B'
                    + QueryBucketModel.snippetMethodCallDecClass + ':"' + methodCallClassInput.val() + '"';

                if(!(/^[a-zA-Z0-9_.,><\[\]]+$/.test(methodCallClassInput.val()))){
                    Controller.setStatus("Please enter only alphanumeric, "+
                        "underscore, period, comma, less than, or greater than characters for class name...");
                    return;
                }
            }
            if(methodCallNameInput.val() != "") {
                methodCallValue = methodCallValue + '%2B' + QueryBucketModel.snippetMethodCallName
                    + ':"' +methodCallNameInput.val()+ '"';

                if(!(/^[a-zA-Z0-9_.,><\[\]]+$/.test(methodCallNameInput.val()))){
                    Controller.setStatus("Please enter only alphanumeric, "+
                        "underscore, period, comma, less than, or greater than characters for method name...");
                    return;
                }
            }
            if(methodCallParametersInput.val() != "") {

                var params = String(methodCallParametersInput.val()).split(/[ ,]+/);

                var paramsWithCount =  BuildQueryBoxView.appendWithCount(params);

                var paramQuery = "";
                for(var paramIndex = 0; paramIndex < paramsWithCount.length; paramIndex++){
                    if(paramQuery == ""){
                        paramQuery = '%2B' + QueryBucketModel.snippetMethodCallParameters
                            + ':'+'"'+paramsWithCount[paramIndex]+'"';
                    }else{
                        paramQuery = paramQuery +  '%2B' + QueryBucketModel.snippetMethodCallParameters
                            + ':'+'"'+paramsWithCount[paramIndex]+'"';
                    }

                    if(!(/^[a-zA-Z0-9_.,><\[\]]+$/.test(paramsWithCount[paramIndex]))){
                        Controller.setStatus("Please enter only alphanumeric, "+
                            "underscore, period, comma, less than, or greater than characters for parameter names...");
                        return;
                    }

                }

                methodCallValue = methodCallValue + paramQuery+'';
            }
            query = new QueryModel(QueryBucketModel.snippetMethodCall, methodCallValue);
            query.displayType = "has method call";
            query.displayValue = methodCallClassInput.val()+"."+methodCallNameInput.val()+"("+methodCallParametersInput.val()+")";
            //LOG IT
            UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Builder),query);
            listOfQuerires.push(query)

        };
//calling it
        methodCallQueryFunction();

//methodDecClassInput,methodDecNameInput,methodDecParametersInput,methodDecReturnInput,checkboxDecGeneric,checkboxDecVarArgs
        var methodDecQueryFunction = function(){
            var query = null;
            var methodCallValue = '';



            if(methodDecReturnInput.val() != "") {
                methodCallValue = methodCallValue + '%2B'
                    + QueryBucketModel.snippetMethodDeclarationReturn + ':"' + methodDecReturnInput.val() + '"';

                if(!(/^[a-zA-Z0-9_.,><\[\]]+$/.test(methodDecReturnInput.val()))){
                    Controller.setStatus("Please enter only alphanumeric, "+
                        "underscore, period, comma, less than, or greater than characters for return type...");
                    return;
                }
            }

            if(checkboxDecGeneric[0].checked) {
                methodCallValue = methodCallValue + '%2B'
                    + QueryBucketModel.snippetMethodDeclarationGeneric + ':"' + true + '"';
            }

            if(checkboxDecVarArgs[0].checked) {
                methodCallValue = methodCallValue + '%2B'
                    + QueryBucketModel.snippetMethodDeclarationVarArgs + ':"' + true + '"';
            }

            if(methodDecClassInput.val() != "") {
                methodCallValue = methodCallValue + '%2B'
                    + QueryBucketModel.snippetMethodDeclarationClass + ':"' + methodDecClassInput.val() + '"';

                if(!(/^[a-zA-Z0-9_.,><\[\]]+$/.test(methodDecClassInput.val()))){
                    Controller.setStatus("Please enter only alphanumeric, "+
                        "underscore, period, comma, less than, or greater than characters for class name...");
                    return;
                }
            }
            if(methodDecNameInput.val() != "") {
                methodCallValue = methodCallValue + '%2B' + QueryBucketModel.snippetMethodDeclarationName
                    + ':"' +methodDecNameInput.val()+ '"';

                if(!(/^[a-zA-Z0-9_.,><\[\]]+$/.test(methodDecNameInput.val()))){
                    Controller.setStatus("Please enter only alphanumeric, "+
                        "underscore, period, comma, less than, or greater than characters for method name...");
                    return;
                }
            }
            if(methodDecParametersInput.val() != "") {

                var params = String(methodDecParametersInput.val()).split(/[ ,]+/);

                var paramsWithCount =  BuildQueryBoxView.appendWithCount(params);

                var paramQuery = "";
                for(var paramIndex = 0; paramIndex < paramsWithCount.length; paramIndex++){
                    if(paramQuery == ""){
                        paramQuery = '%2B' + QueryBucketModel.snippetMethodDeclarationParameters
                            + ':'+'"'+paramsWithCount[paramIndex]+'"';
                    }else{
                        paramQuery = paramQuery +  '%2B' + QueryBucketModel.snippetMethodDeclarationParameters
                            + ':'+'"'+paramsWithCount[paramIndex]+'"';
                    }

                    if(!(/^[a-zA-Z0-9_.,><\[\]]+$/.test(paramsWithCount[paramIndex]))){
                        Controller.setStatus("Please enter only alphanumeric, "+
                            "underscore, period, comma, less than, or greater than characters for parameter names...");
                        return;
                    }

                }

                methodCallValue = methodCallValue + paramQuery+'';
            }
            query = new QueryModel(QueryBucketModel.snippetMethodDec, methodCallValue);
            query.displayType = "declaration";
            query.displayValue = methodDecReturnInput.val()+':'+methodDecClassInput.val()+"."+
                methodDecNameInput.val()+"("+methodDecParametersInput.val()+")";

            if(checkboxDecGeneric[0].checked){
                query.displayValue = "[generic]" + query.displayValue;
            }
            if(checkboxDecVarArgs[0].checked){
                query.displayValue = "[var args]" + query.displayValue;
            }

            //LOG IT
            UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Builder),query);
            listOfQuerires.push(query);
            //methodDecClassInput,methodDecNameInput,methodDecParametersInput,methodDecReturnInput,checkboxDecGeneric,checkboxDecVarArgs
        }

        methodDecQueryFunction();

        var queryCount = 0;

        for(var i = 0; i < listOfQuerires.length; i++){
            var query = listOfQuerires[i];
            if(query.value != "" && query.value != ".()" && query.value != ":.()"){
                BuildQueryBoxView.addQuery(query);
                queryCount++;
            }

        }



        if(queryCount> 0) {
            BuildQueryBoxView.submitQuery();
        }

        listOfQuerires.length = 0;



    }


}

