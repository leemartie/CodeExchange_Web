/**
 * Created by lee on 4/15/14.
 */
var QueryGridView = {

     grid : $(SetupManager.tableOpen+SetupManager.tableClose),
     added : false,
     size: 25,


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
                    if(QueryGridView.added != true) {
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

                    }else{
                        QueryGridView.added = false;
                    }
                    $(SetupManager.pound+"gridButton").empty();
                    $(SetupManager.pound+"gridButton").append("<text>show query history</text>");
                    Controller.showGrid();

                    cell.removeClass("GridCellHover");
                    cell.addClass("GridCell");
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

        return QueryGridView.grid;
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

        table.append($("<tr><th>session number: "+( QueryGridModel.history.length+1)+"</th></tr>"));
        var row = $(SetupManager.trOpen+SetupManager.trClose);

        var cell = $(SetupManager.tdOpen+SetupManager.tdClose);
        cell.height("100%");
        row.append(cell);

        table.append(row);

        for(var i = 0; i<QueryBucketModel.stackOfQueries.length; i++){
            var query = QueryBucketModel.stackOfQueries[i];
            var row = $(SetupManager.trOpen+SetupManager.trClose);
            var cell = $(SetupManager.tdOpen+SetupManager.tdClose);
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
                BuildQueryBoxView.addAndSubmit(query)
                QueryGridView.added = true;
                UsageLogger.addEvent(UsageLogger.QUERY_HISTORY_CELL_PART_CLICK,query);
                $(SetupManager.pound+"gridButton").empty();
                $(SetupManager.pound+"gridButton").append("<text>show query history</text>");
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
                table.append($("<tr><th>session number: " + (i+1) + "</th></tr>"));
                table.height("100%");
                var row = $(SetupManager.trOpen + SetupManager.trClose);
                var cell = $(SetupManager.tdOpen + SetupManager.tdClose);
                cell.height("100%");
                row.append(cell);


                table.append(row);

                for (var j = 0; j < stack.length; j++) {
                    var row = $(SetupManager.trOpen + SetupManager.trClose);
                    var cell = $(SetupManager.tdOpen + SetupManager.tdClose);
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
                            BuildQueryBoxView.addAndSubmit(query);
                            QueryGridView.added = true;
                            UsageLogger.addEvent(UsageLogger.QUERY_HISTORY_CELL_PART_CLICK, query);
                            $(SetupManager.pound + "gridButton").empty();
                            $(SetupManager.pound + "gridButton").append("<text>show query history</text>");
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