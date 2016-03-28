/*******************************************************************************
 * Copyright (c) {2014} {Software Design and Collaboration Laboratory (SDCL)
 *				, University of California, Irvine}.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    {Software Design and Collaboration Laboratory (SDCL)
 *	, University of California, Irvine}
 *			- initial API and implementation and/or initial documentation
 *******************************************************************************/
var Critize = {



    getView: function(size, complexity, imports, projectName,
                      projectURL, author, listOfImports, listOfNames, avatar, codeChurn, className, owner, resultNumber){


        var width = 15;
        var height = 15;

        var table = $(SetupManager.tableOpen+SetupManager.tableClose);
        table.attr("cellpadding","0");
        table.attr("cellspacing","1");
        table.attr("border","0px solid black");
        table.attr("width","100%");


        var row = $(SetupManager.trOpen+SetupManager.trClose);
        var cell = $(SetupManager.tdOpen+SetupManager.tdClose);
        row.append(cell);
        table.append(row);
        cell.attr("align","center");
        cell.attr("colspan","3");
        var label = $("<text style='padding-bottom: '>critique</text>");
        cell.append(label);

//project label
        var cell =$(SetupManager.tdOpen+SetupManager.tdClose);
        row.append(cell);
        var projectNameTitle = $("<text style=''>"
            +"project"+
            "</text>");
        projectNameTitle.addClass("ProjectRefinement");
        cell.append(projectNameTitle);

        cell.attr("align","center");
        cell.addClass("ProjectRefinement");
        //cell.css({"padding-right":"20px"});


//author label
        var cell =$(SetupManager.tdOpen+SetupManager.tdClose);
        row.append(cell);
        var projectNameTitle = $("<text style=''>"
            +"author"+
            "</text>");
        projectNameTitle.addClass("ProjectRefinement");
        cell.append(projectNameTitle);
        cell.attr("align","center");
        //cell.attr("width","100%");
        cell.addClass("ProjectRefinement");
        //cell.css({"padding-right":"20px"});

///

        var cell =$(SetupManager.tdOpen+SetupManager.tdClose);
        row.append(cell);
        var projectNameTitle = $("<text style=''>"
            +"owner"+
            "</text>");
        projectNameTitle.addClass("ProjectRefinement");
        cell.append(projectNameTitle);
        cell.attr("align","center");
        //cell.attr("width","100%");
        cell.addClass("ProjectRefinement");
        cell.css({"padding-right":"10px"});
//========== 2nd row

//row for all critics
        var row = $(SetupManager.trOpen+SetupManager.trClose);
        table.append(row);

//size

        var littleTable = $(SetupManager.tableOpen+SetupManager.tableClose);
        var cell = $(SetupManager.tdOpen+SetupManager.tdClose);
        cell.append(littleTable);
        row.append(cell);

        var littleRow = $(SetupManager.trOpen+SetupManager.trClose);
        littleTable.append(littleRow);
        var sizeCellLess = $(SetupManager.tdOpen+SetupManager.tdClose);
        littleRow.append(sizeCellLess);

        var label = $('<img  width = '+width+' height='+height+' src="http://codeexchange.ics.uci.edu/upArrow.png"></img>');
        sizeCellLess.addClass("Arrow");
        sizeCellLess.append(label);
        sizeCellLess.attr("align","center");
        sizeCellLess.attr("width","100%");
        sizeCellLess.attr("colspan","1");

        (function(icon){
            icon.mouseenter(function(e){
                icon.removeClass("Arrow");
                icon.addClass("ArrowHover");

            });
            icon.mouseleave(function(e){
                icon.removeClass("ArrowHover");
                icon.addClass("Arrow");
            });
            icon.click(function(event){
                var query = new QueryModel(QueryBucketModel.sizeField,"["+(size+1)+" TO *]");
                query.displayType = "size";
                query.displayValue = String("more than "+(size)+" characters");
                query.rangeQuery = true;
                BuildQueryBoxView.addAndSubmit(query);

//LOG IT
                UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Criticisms),query);

            });

            icon.mouseover(function(event){
                icon.attr("title","Refine current query for code larger than this code (size is number of characters)");
            });
        })(label);


        var littleRow = $(SetupManager.trOpen+SetupManager.trClose);
        littleTable.append(littleRow);
        var TD_LABEL = $(SetupManager.tdOpen+SetupManager.tdClose);
        littleRow.append(TD_LABEL);
        TD_LABEL.append($("<text>size"+"<br><text style='color:#8b0000'>"+size+"</text>"+"</text>"));
        TD_LABEL.attr("align","center");
        TD_LABEL.attr("width","100%");


        var littleRow = $(SetupManager.trOpen+SetupManager.trClose);
        littleTable.append(littleRow);
        var sizeCellMore = $(SetupManager.tdOpen+SetupManager.tdClose);
        littleRow.append(sizeCellMore);
        var label = $('<img  width = '+width+' height='+height+' src="http://codeexchange.ics.uci.edu/downArrow.png"></img>');
        sizeCellMore.addClass("Arrow");
        sizeCellMore.append(label);
        sizeCellMore.attr("align","center");
        sizeCellMore.attr("width","100%");
        sizeCellMore.attr("colspan","1");

        (function(icon){
            icon.mouseenter(function(e){
                icon.removeClass("Arrow");
                icon.addClass("ArrowHover");

            });
            icon.mouseleave(function(e){
                icon.removeClass("ArrowHover");
                icon.addClass("Arrow");
            });
            icon.click(function(event){
                var query = new QueryModel(QueryBucketModel.sizeField,"[* TO "+(size-1)+"]");
                query.displayType = "size";
                query.displayValue = String("less than "+(size)+" characters");
                query.rangeQuery = true;
                BuildQueryBoxView.addAndSubmit(query);
//LOG IT
                UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Criticisms),query);


            });

            icon.mouseover(function(event){
                icon.attr("title","Refine current query for code smaller than this code (size is number of characters)");
            });
        })(label);


//complexity

        var littleTable = $(SetupManager.tableOpen+SetupManager.tableClose);
        var cell = $(SetupManager.tdOpen+SetupManager.tdClose);
        cell.append(littleTable);
        row.append(cell);

        var littleRow = $(SetupManager.trOpen+SetupManager.trClose);
        littleTable.append(littleRow);
        var sizeCellLess = $(SetupManager.tdOpen+SetupManager.tdClose);
        littleRow.append(sizeCellLess);

        var label = $('<img  width = '+width+' height='+height+' src="http://codeexchange.ics.uci.edu/upArrow.png"></img>');
        sizeCellLess.addClass("Arrow");
        sizeCellLess.append(label);
        sizeCellLess.attr("align","center");
        sizeCellLess.attr("width","100%");
        sizeCellLess.attr("colspan","1");

        (function(icon){
            icon.mouseenter(function(e){
                icon.removeClass("Arrow");
                icon.addClass("ArrowHover");

            });
            icon.mouseleave(function(e){
                icon.removeClass("ArrowHover");
                icon.addClass("Arrow");
            });

            icon.click(function(event){
                var query = new QueryModel(QueryBucketModel.complexityField,"["+(complexity+1)+" TO *]");
                query.displayType = "complexity";
                query.displayValue = String("more than "+(complexity));
                query.rangeQuery = true;
                BuildQueryBoxView.addAndSubmit(query);

//LOG IT
                UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Criticisms),query);

            });

            icon.mouseover(function(event){
                icon.attr("title","Refine current query for code with more branch complexity than this code" +
                    " (branch complexity is for loops, if statements, try/catch, etc...)");
            });

        })(label);

        var littleRow = $(SetupManager.trOpen+SetupManager.trClose);
        littleTable.append(littleRow);
        var TD_LABEL = $(SetupManager.tdOpen+SetupManager.tdClose);
        littleRow.append(TD_LABEL);
        TD_LABEL.append($("<text>complexity"+"<br><text style='color:#8b0000'>"+complexity+"</text>"+"</text>"));
        TD_LABEL.attr("align","center");
        TD_LABEL.attr("width","100%");


        var littleRow = $(SetupManager.trOpen+SetupManager.trClose);
        littleTable.append(littleRow);
        var sizeCellMore = $(SetupManager.tdOpen+SetupManager.tdClose);
        littleRow.append(sizeCellMore);
        var label = $('<img  width = '+width+' height='+height+' src="http://codeexchange.ics.uci.edu/downArrow.png"></img>');
        sizeCellMore.addClass("Arrow");
        sizeCellMore.append(label);
        sizeCellMore.attr("align","center");
        sizeCellMore.attr("width","100%");
        sizeCellMore.attr("colspan","1");

        (function(icon){
            icon.mouseenter(function(e){
                icon.removeClass("Arrow");
                icon.addClass("ArrowHover");

            });
            icon.mouseleave(function(e){
                icon.removeClass("ArrowHover");
                icon.addClass("Arrow");
            });
            icon.click(function(event){
                var query = new QueryModel(QueryBucketModel.complexityField,"[* TO "+(complexity-1)+"]");
                query.displayType = "complexity";
                query.displayValue = String("less than "+(complexity));
                query.rangeQuery = true;
                BuildQueryBoxView.addAndSubmit(query);
//LOG IT
                UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Criticisms),query);
            });

            icon.mouseover(function(event){
                icon.attr("title","Refine current query for code with less branch complexity than this code" +
                    " (branch complexity is for loops, if statements, try/catch, etc...)");
            });
        })(label);


//--------------------------

//imports

        var littleTable = $(SetupManager.tableOpen+SetupManager.tableClose);
        var cell = $(SetupManager.tdOpen+SetupManager.tdClose);
        cell.append(littleTable);
        row.append(cell);

        var littleRow = $(SetupManager.trOpen+SetupManager.trClose);
        littleTable.append(littleRow);
        var sizeCellLess = $(SetupManager.tdOpen+SetupManager.tdClose);
        littleRow.append(sizeCellLess);

        var label = $('<img  width = '+width+' height='+height+' src="http://codeexchange.ics.uci.edu/upArrow.png"></img>');
        sizeCellLess.addClass("Arrow");
        sizeCellLess.append(label);
        sizeCellLess.attr("align","center");
        sizeCellLess.attr("width","100%");
        sizeCellLess.attr("colspan","1");

        (function(icon){
            icon.mouseenter(function(e){
                icon.removeClass("Arrow");
                icon.addClass("ArrowHover");

            });
            icon.mouseleave(function(e){
                icon.removeClass("ArrowHover");
                icon.addClass("Arrow");
            });

            icon.click(function(event){
                var query = new QueryModel(QueryBucketModel.importCountField,"["+(imports+1)+" TO *]");
                query.displayType = "import count";
                query.displayValue = String("more than "+(imports));
                query.rangeQuery = true;
                BuildQueryBoxView.addAndSubmit(query);

//LOG IT
                UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Criticisms),query);

            });


            icon.addClass("MetaQuery");

            icon.mouseover(function(event){
                icon.attr("title","Refine current query for code with more imports than this code");
            });

        })(label);

        var littleRow = $(SetupManager.trOpen+SetupManager.trClose);
        littleTable.append(littleRow);
        var TD_LABEL = $(SetupManager.tdOpen+SetupManager.tdClose);
        littleRow.append(TD_LABEL);
        TD_LABEL.append($("<text>imports"+"<br><text style='color:#8b0000'>"+imports+"</text>"+"</text>"));
        TD_LABEL.attr("align","center");
        TD_LABEL.attr("width","100%");


        var littleRow = $(SetupManager.trOpen+SetupManager.trClose);
        littleTable.append(littleRow);
        var sizeCellMore = $(SetupManager.tdOpen+SetupManager.tdClose);
        littleRow.append(sizeCellMore);
        var label = $('<img  width = '+width+' height='+height+' src="http://codeexchange.ics.uci.edu/downArrow.png"></img>');
        sizeCellMore.addClass("Arrow");
        sizeCellMore.append(label);
        sizeCellMore.attr("align","center");
        sizeCellMore.attr("width","100%");
        sizeCellMore.attr("colspan","1");

        (function(icon){
            icon.mouseenter(function(e){
                icon.removeClass("Arrow");
                icon.addClass("ArrowHover");

            });
            icon.mouseleave(function(e){
                icon.removeClass("ArrowHover");
                icon.addClass("Arrow");
            });

            icon.click(function(event){
                var query = new QueryModel(QueryBucketModel.importCountField,"[* TO "+(imports-1)+"]");
                query.displayType = "import count";
                query.displayValue = String("less than "+(imports));
                query.rangeQuery = true;
                BuildQueryBoxView.addAndSubmit(query);
//LOG IT
                UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Criticisms),query);
            });

            icon.mouseover(function(event){
                icon.attr("title","Refine current query for code with less imports than this code");
            });

        })(label);
        
//PROJECT


        var cell = $(SetupManager.tdOpen+SetupManager.tdClose);
        row.append(cell);
        //cell.css({"padding-right":"20px"});
        //cell.attr("width","100%");

        cell.attr("align","center");
        cell.attr("valign","top");

        cell.addClass("ProjectRefinement");

        var cellName = $("<div style='font-size: 11px; text-align: center; vertical-align:top; width:75px'>" +
            "<font color='#8b0000'><center>"+projectName+"</center></font>"+"</div>");
        cell.append(cellName);

        cell.attr("title","Refine current query by this code's project.");



        (function(littleTable){

            littleTable.click(function(event){
                var query = new QueryModel(QueryBucketModel.projectField,projectName);
                query.displayType = "project";
                query.displayValue = projectName;
                BuildQueryBoxView.addAndSubmit(query);
//LOG IT
                UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Code_Prop),query);
            });

            littleTable.mouseenter(function(){
                littleTable.addClass("RefineButtonHover");
            })

            littleTable.mouseleave(function(){
                littleTable.removeClass("RefineButtonHover");

            })

        })(cellName);


// AUTHOR

        var cell = $(SetupManager.tdOpen+SetupManager.tdClose);
        row.append(cell);
       // cell.css({"padding-right":"20px"});


        cell.attr("align","center");
        cell.attr("valign","top");
        cell.addClass("Refinement");
        var cellName = $("<div style='font-size: 11px; text-align: center; " +
            "vertical-align:top; width:64px'><img width='35px' height='auto' src="+avatar+"/><font color='#8b0000'><center>"+author+"</center></font>"+"</div>");
        cell.append(cellName);

        cell.attr("title","Refine current query by this code's author.");

    (function(littleTable){

            littleTable.click(function(event){
                var query = new QueryModel(QueryBucketModel.authorFiled, '"'+author+'"');
                query.displayType = "author";
                query.displayValue = author;
                BuildQueryBoxView.addAndSubmit(query);
//LOG IT
                UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Code_Prop),query);
            });

            littleTable.mouseenter(function(){
                littleTable.addClass("RefineButtonHover");
            })

            littleTable.mouseleave(function(){
                littleTable.removeClass("RefineButtonHover");

            })

        })(cellName);


// PROJECT OWNER
        get_owner_avatar(owner, row, littleTable,function(username, url,row, littleTable, type) {




            var cell = $(SetupManager.tdOpen+SetupManager.tdClose);
            row.append(cell);
            cell.css({"padding-right":"10px"});


            cell.attr("align","center");
            cell.attr("valign","top");
            cell.addClass("Refinement");

            var pic = url;
            var cellName = $("<div style='font-size: 11px; text-align: center; " +
                "vertical-align:top; width:64px'><img width='35px' height='auto' src="+pic+"></img>" +
                "<font color='#8b0000'><center>"+username+"</center></font>"+
                "<font color='black'><center>"+type+"</center></font>"+"</div>");
            cell.append(cellName);
            cell.css({"word-wrap":"break-word"});

            cell.attr("title","Refine current query by this code's project owner.");

            (function(littleTable){

                littleTable.click(function(event){
                    var query = new QueryModel(QueryBucketModel.projectOwnerField, '"'+username+'"');
                    query.displayType = "project owner";
                    query.displayValue = username;
                    BuildQueryBoxView.addAndSubmit(query);
//LOG IT
                    UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Code_Prop),query);
                });

                littleTable.mouseenter(function(){
                    littleTable.addClass("RefineButtonHover");
                })

                littleTable.mouseleave(function(){
                    littleTable.removeClass("RefineButtonHover");

                })



            })(cellName);




        });
        return table;
    },

    createNotValuesForCall: function(methodCallModel) {

    var methodCallValue = '';
//    if(methodCallModel.callingClass != null) {
//        methodCallValue = methodCallValue + '%2B'
//            + QueryBucketModel.snippetMethodCallDecClass + ':"' + methodCallModel.callingClass + '"';
//    }else{
//        //callingClass = "";
//    }
//    if(methodCallModel.name != null) {
//        methodCallValue = methodCallValue + '%2B' + QueryBucketModel.snippetMethodCallName
//            + ':"' +methodCallModel.name+ '"';
//       // + ':"' +name+ '"';
//    }else{
//     //   name = "";
//    }

    var formatedValues = "";
    var valueQuery = "";

    if(methodCallModel.argumentValues != null) {



        for(var valueIndex = 0; valueIndex < methodCallModel.argumentValues.length; valueIndex++){
            var valueString = methodCallModel.argumentValues[valueIndex];//.substring(0,methodCallModel.argumentValues[paramIndex].length-2);

            if(valueIndex == 0)
                formatedValues = valueString;
            else{
                formatedValues = formatedValues+","+valueString
            }

            if(valueQuery == ""){
                valueQuery = '%2B' + QueryBucketModel.snippetMethodCallValues
                    + ':'+'"'+SmartQueryCreator.makeSmartQuery(methodCallModel.argumentValues[valueIndex])+'"';
            }else{
                valueQuery = valueQuery +  '%2B' + QueryBucketModel.snippetMethodCallValues
                    + ':'+'"'+SmartQueryCreator.makeSmartQuery(methodCallModel.argumentValues[valueIndex])+'"';
            }

        }

        methodCallValue = methodCallValue + valueQuery+'';
    }else{
        params = "";
    }
        //methodCallValue = "!"+methodCallValue;

    query = new QueryModel(QueryBucketModel.snippetMethodCall, methodCallValue);
    query.displayType = "DOES NOT has methodCall values";
    query.displayValue = methodCallModel.callingClass+"."+methodCallModel.name+"("+formatedValues+")";


    return query;
//LOG IT
    //UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Code_Prop),query);
}



}

function get_owner_avatar (username, row, littleTable,callback) {

    $.getJSON('http://codeexchange.ics.uci.edu/getAvatar.php?owner='+username+"&callback=?", {},
        function(json){
            var url = json["url"];
            var type = json["type"];
            if (url) {
                callback(username, url ,row, littleTable, type)
            }
            return false
        });
}