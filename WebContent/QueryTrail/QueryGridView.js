/**
 * Created by lee on 4/15/14.
 */
var QueryGridView = {

     grid : $(SetupManager.tableOpen+SetupManager.tableClose),
     added : false,
     size: 25,
     close: false,


    setup : function(){
        QueryGridView.grid.empty();
        QueryGridView.grid.addClass("Grid");
        QueryGridView.grid.attr("id","grid");

        var index = 0;
        for(var i = 0; i <=4; i++){
            var row = $(SetupManager.trOpen+SetupManager.trClose);

            for(var j = 0; j<=4; j++){
                var cell= $(SetupManager.tdOpen+SetupManager.tdClose);
                cell.attr("id","GridCell"+index);
//                  cell.width('26%');
//                   cell.height('26%');
                row.append(cell);


                (function(cell){
                cell.click(function(event){
                    if(QueryGridView.added != true && QueryGridView.close != true) {
                        var id = cell.attr("id");
                        var number =  QueryGridModel.history.length - parseInt(id.substring(8));

                        //clear old query out
                        if(QueryBucketModel.stackOfQueries.length > 0) {
                            QueryBucketModel.removeAll();
                            QueryBucketView.update();
                            Controller.clearAllCode();
                            Controller.setStatus("Let's find some code");
                            $(SetupManager.pound + SetupManager.pageNavigationDiv_ID).empty();
                        }

                        for (var i = 0; i < QueryGridModel.history[number].length; i++) {
//only add here so we don't send in each individualy... we want to send in bulk
                            BuildQueryBoxView.addQuery(QueryGridModel.history[number][i]);
                            UsageLogger.addEvent(UsageLogger.QUERY_HISTORY_CELL_CLICK,QueryGridModel.history[number][i]);
                        }
                            BuildQueryBoxView.submitQuery();
                        $(SetupManager.pound+"gridButton").empty();
                        $(SetupManager.pound+"gridButton").append("<text>show search history</text>");
                        Controller.showGrid();

                        cell.removeClass("GridCellHover");
                        cell.addClass("GridCell");


                    }else{
                        QueryGridView.added = false;
                        QueryGridView.close = false;
                    }

                });


                })(cell);

            cell.addClass("GridCell");

                (function(cell) {
                    cell.mouseenter(function (event) {
                        cell.removeClass("GridCell");
                        cell.addClass("GridCellHover");
                    });
                })(cell);

                (function(cell) {
                cell.mouseleave( function(event){
                    cell.removeClass("GridCellHover");
                    cell.addClass("GridCell");

                });
                })(cell);

                index++;
            }

            QueryGridView.grid.append(row);
        }

        QueryGridView.restoreCookies();

        return QueryGridView.grid;
    },

   restoreCookies : function(){
       var ca = document.cookie.split(';');

       for(var i = 0; i<= 25; i++) {
           var name = "search"+i + "=";
           for (var j = 0; j < ca.length; j++) {
               var entireQuery = ca[j].trim();

               if (entireQuery.indexOf(name) == 0) {
                   var queries = entireQuery.substring(name.length, entireQuery.length).split('!!@@$$~~');
                   var cookieStack = new Array();

                   for(var g = 0; g < queries.length; g++){
                       var type = null;
                       var value = null;
                       var valueIndex = null;
                       var stackIndex = null;
                       var displayType = null;
                       var displayValue = null;
                       var active = null;
                       var score = null;
                       var rangeQuery = null;
                       var refinements = queries[g].split('!!@@$$');



                       for(var k = 0; k<refinements.length;k++) {
                           switch (k) {
                               case 0:
                                   type = refinements[k];
                                   break;
                               case 1:
                                   value = refinements[k];
                                   break;
                               case 2:
                                   valueIndex = refinements[k];
                                   break;
                               case 3:
                                   stackIndex = refinements[k];
                                   break;
                               case 4:
                                   displayType = refinements[k];
                                   break;
                               case 5:
                                   displayValue = refinements[k];
                                   break;
                               case 6:
                                   active = Boolean(refinements[k]);
                                   break;
                               case 7:
                                   score = refinements[k];
                                   break;
                               case 8:
                                   rangeQuery = Boolean(refinements[k]);
                                   break;
                               default:
                                   break;
                           }//switch


                       }//for k

                       if(value != null && refinements[0] != "deleted") {
                           var query = new QueryModel(type, value);
                           query.valueIndex = valueIndex;
                           query.stackIndex = stackIndex;
                           query.displayType = displayType;
                           query.displayValue = displayValue;
                           query.active = active;
                           query.score = score;
                           query.rangeQuery = rangeQuery;

                           cookieStack.push(query);
                       }
                   }//for g

                   if(cookieStack.length >  0)
                    QueryGridModel.history.push(cookieStack.slice(0));
               }//if
           }//for j
       }//for i


       if(QueryGridModel.history.length > 0)
        QueryGridView.update();
   },

//UPDATE
    update : function(){


        var htmlEscapes = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '/': '&#x2F;'
        };

// Regex containing the keys listed immediately above.
        var htmlEscaper = /[&<>"'\/]/g;

// Escape a string for HTML interpolation.
        var escape = function(string) {
            return ('' + string).replace(htmlEscaper, function(match) {
                return htmlEscapes[match];
            });
        };


        var lastCell = 0;

        //current contents

        $(SetupManager.pound+"GridCell"+(lastCell)).empty();

        var table = $(SetupManager.tableOpen+SetupManager.tableClose);
        table.height("100%");
        table.addClass("QueryViewTable");

        var header = $("<tr><th width='100%'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
            "search number: "+( QueryGridModel.history.length+1)+"</th></tr>");
        table.append(header);

//        var Xcell = $(SetupManager.tdOpen+SetupManager.tdClose);
//        header.append(Xcell);
//        Xcell.append("<img width='15px' height=auto src='http://codeexchange.ics.uci.edu/close.png'></img>");
//        Xcell.attr("align","right");
//        Xcell.attr("width","6%");





        var row = $(SetupManager.trOpen+SetupManager.trClose);

        var cell = $(SetupManager.tdOpen+SetupManager.tdClose);
        cell.height("100%");
        row.append(cell);
        cell.attr("colspan","2");


        table.append(row);

        for(var i = 0; i<QueryBucketModel.stackOfQueries.length; i++){
            var query = QueryBucketModel.stackOfQueries[i];
            var row = $(SetupManager.trOpen+SetupManager.trClose);
            var cell = $(SetupManager.tdOpen+SetupManager.tdClose);
            cell.attr("colspan","2");
            cell.width("100%");
            row.append(cell);
            cell.attr("valign","bottom");
            if(query.displayValue instanceof Array){
                query.displayValue = query.displayValue[0].replace(/</gi,"&lt;");
                query.displayValue = query.displayValue.replace(/</gi,"&gt;");
            }else if(!query.displayValue instanceof Boolean){
                query.displayValue = query.displayValue.replace(/</gi,"&lt;");
                query.displayValue = query.displayValue.replace(/</gi,"&gt;");
            }

            query.displayType = query.displayType.replace(/</gi,"&lt;");
            query.displayType = query.displayType.replace(/</gi,"&gt;");

            var label = $('<text><font color="darkred" size="2">['+query.displayType+']</font> ' +
                '<font color="black" size="2">'+escape(query.displayValue)+'</font></text>');
            cell.append(label);

            cell.attr("title","click to add to current query");
            (function(query,cell){cell.click(function(){
                //clear old query out
                if(QueryBucketModel.stackOfQueries.length > 0) {
                    QueryBucketModel.removeAll();
                    QueryBucketView.update();
                    Controller.clearAllCode();
                    Controller.setStatus("Let's find some code");
                    $(SetupManager.pound + SetupManager.pageNavigationDiv_ID).empty();
                }

                BuildQueryBoxView.addAndSubmit(query)
                QueryGridView.added = true;
                UsageLogger.addEvent(UsageLogger.QUERY_HISTORY_CELL_PART_CLICK,query);
                $(SetupManager.pound+"gridButton").empty();
                $(SetupManager.pound+"gridButton").append("<text>show search history</text>");
                Controller.showGrid();
            })}(query,cell));

            //
            (function(query,cell){cell.mouseenter(function(){

                cell.removeClass("GridRow");
                cell.addClass("GridRowHover");


            })})(query,cell);
//
            (function(query,cell){cell.mouseleave(function(){


                cell.removeClass("GridRowHover");
                cell.addClass("GridRow");


            })})(query,cell);

            cell.addClass("GridRow");
            table.append(row);

        }

        table.addClass("GridCellHighLight");
        $(SetupManager.pound+"GridCell"+(lastCell)).append(table);

//end current query



//the rest of the history
        if(QueryGridModel.history != null) {
            var cellCount = 1;
            for (var i = QueryGridModel.history.length-1; i >= 0 ; i--) {
                var stack = QueryGridModel.history[i];
                var cellID = (cellCount);// % QueryGridView.size;
                cellCount++;
                lastCell = cellID + 1;

                if (lastCell == 25)
                    lastCell = 0;

                $(SetupManager.pound + "GridCell" + (cellID)).empty();

                var table = $(SetupManager.tableOpen + SetupManager.tableClose);
                table.addClass("QueryViewTable");

                var header = $("<tr><th width='100%'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                    "search number: "+(i+1)+"</th></tr>");
                table.append(header);

                var Xcell = $(SetupManager.tdOpen+SetupManager.tdClose);
                header.append(Xcell);
                Xcell.append("<img width='15px' height=auto src='http://codeexchange.ics.uci.edu/close.png'></img>");
                Xcell.attr("align","right");
                Xcell.attr("width","6%");




                table.height("100%");
                var row = $(SetupManager.trOpen + SetupManager.trClose);
                var cell = $(SetupManager.tdOpen + SetupManager.tdClose);
                cell.height("100%");
                row.append(cell);
                cell.attr("colspan","2");

                table.append(row);

                (function(Xcell,i,queryCell){
                    Xcell.click(function(event){
                        console.log("number: "+i);
                        QueryGridModel.history.splice(i,1);
                        QueryGridView.close = true;
                        table.empty();
                        document.cookie = "search"+(i)+"=deleted";
                        QueryGridView.update();
                    });

                })(Xcell,i,table);

                for (var j = 0; j < stack.length; j++) {
                    var row = $(SetupManager.trOpen + SetupManager.trClose);
                    var cell = $(SetupManager.tdOpen + SetupManager.tdClose);
                    cell.attr("colspan","2");
                    var cellDiv = $(SetupManager.divOpen + SetupManager.divClose);
                    row.append(cell);
                    var query = stack[j];

                    if (query.displayValue instanceof Array) {
                        query.displayValue = query.displayValue[0].replace(/</gi, "&lt;");
                        query.displayValue = query.displayValue.replace(/</gi, "&gt;");
                    } else if (!query.displayValue instanceof Boolean) {
                        query.displayValue = query.displayValue.replace(/</gi, "&lt;");
                        query.displayValue = query.displayValue.replace(/</gi, "&gt;");
                    }

                    query.displayType = query.displayType.replace(/</gi, "&lt;");
                    query.displayType = query.displayType.replace(/</gi, "&gt;");

                    var label = $('<text><font color="darkred" size="2">[' + query.displayType + ']</font> ' +
                        '<font color="black" size="2">' + escape(query.displayValue) + '</font></text>');

                    cell.append(label);
                    cell.attr("title", "click to add to current query");

                    (function (query, cell) {
                        cell.click(function () {
                            //clear old query out
                            if(QueryBucketModel.stackOfQueries.length > 0) {
                                QueryBucketModel.removeAll();
                                QueryBucketView.update();
                                Controller.clearAllCode();
                                Controller.setStatus("Let's find some code");
                                $(SetupManager.pound + SetupManager.pageNavigationDiv_ID).empty();
                            }

                            BuildQueryBoxView.addAndSubmit(query);
                            QueryGridView.added = true;
                            UsageLogger.addEvent(UsageLogger.QUERY_HISTORY_CELL_PART_CLICK, query);
                            $(SetupManager.pound + "gridButton").empty();
                            $(SetupManager.pound + "gridButton").append("<text>show search history</text>");
                            Controller.showGrid();
                        })
                    }(query, cell));

                    //
                    (function (query, cell) {
                        cell.mouseenter(function () {

                            cell.removeClass("GridRow");
                            cell.addClass("GridRowHover");


                        })
                    })(query, cell);
//
                    (function (query, cell) {
                        cell.mouseleave(function () {


                            cell.removeClass("GridRowHover");
                            cell.addClass("GridRow");


                        })
                    })(query, cell);

                    cell.width("100%");
                    cell.attr("valign", "bottom");
                    cell.addClass("GridRow");
                    table.append(row);

                }
                $(SetupManager.pound + "GridCell" + (cellID)).append(table);


            }//for
        }

    }//update


}