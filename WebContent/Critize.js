/**
 * Created by lee on 8/3/14.
 */
var Critize = {



    getView: function(size, complexity, imports, projectName, projectURL){


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
        var label = $("<text style='padding-bottom: '>Refine by critique</text>");
        cell.append(label);

        //blank header for 100% empty cell
        var cell = $(SetupManager.tdOpen+SetupManager.tdClose);
        row.append(cell);


        var cell =$(SetupManager.tdOpen+SetupManager.tdClose);
        row.append(cell);
        var projectNameTitle = $("<text style=''>"
            +"Refine by project"+
            "</text>");
        projectNameTitle.addClass("ProjectRefinement");
        cell.append(projectNameTitle);
        cell.attr("align","center");
        cell.addClass("ProjectRefinement");
        cell.css({"padding-right":"20px"});


        var row = $(SetupManager.trOpen+SetupManager.trClose);
        table.append(row);





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
        TD_LABEL.css({"padding-left":"5px","padding-right":"5px"});


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
        TD_LABEL.css({"padding-left":"5px","padding-right":"5px"});


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
        TD_LABEL.css({"padding-left":"5px","padding-right":"5px"});


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
        cell.attr("width","100%");
        row.append(cell);
        var cell = $(SetupManager.tdOpen+SetupManager.tdClose);
        row.append(cell);
        cell.css({"padding-right":"20px"});

        var littleTable = $(SetupManager.tableOpen+SetupManager.tableClose);
//        littleTable.attr("height","100%");
//        cell.append(littleTable);
//        var littleRow = $(SetupManager.trOpen+SetupManager.trClose);
//        littleTable.append(littleRow);
//
//
//
//
//        var cell =$("<td></td>");
        cell.attr("align","center");
        cell.attr("valign","top");
     //   littleRow.append(cell);
        cell.addClass("ProjectRefinement");
        cell.attr("align","center");
        var cellName = $("<div style='font-size: 11px; text-align: center; vertical-align:top; width:100px'><font color='#8b0000'><center>"+projectName+"</center></font>"+"</div>");
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

//        var littleRow =  $(SetupManager.trOpen+SetupManager.trClose);
//        littleTable.append(littleRow);
//        var cell =$("<td></td>");
//        cell.attr("height","100%");
//        littleRow.append(cell);


        return table;
    }

}