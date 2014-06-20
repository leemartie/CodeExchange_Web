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
        for(var i = 0; i <5; i++){
            var row = $(SetupManager.trOpen+SetupManager.trClose);

            for(var j = 0; j<5; j++){
                var cell= $(SetupManager.tdOpen+SetupManager.tdClose);
                cell.attr("id","GridCell"+index);
                  cell.width('25%');
                   cell.height('25%');
                row.append(cell);

                cell.click(function(event){
                    if(QueryGridView.added != true) {
                        var id = this.id;
                        var number = id.substring(id.length - 1);
                        for (var i = 0; i < QueryGridModel.history[number].length; i++) {
                            BuildQueryBoxView.addAndSubmit(QueryGridModel.history[number][i]);
                        }
                    }else{
                        QueryGridView.added = false;
                    }
                });

            cell.addClass("GridCell");
                index++;
            }

            QueryGridView.grid.append(row);
        }

        return QueryGridView.grid;
    },
    update : function(){

        var lastCell = 0;
        for(var i = 0; i<QueryGridModel.history.length; i++){
            var stack = QueryGridModel.history[i];
            var cellID = i%QueryGridView.size;
            lastCell = cellID+1;

            if(lastCell == 17)
                lastCell = 0;

            $(SetupManager.pound+"GridCell"+(cellID)).empty();

            var table = $(SetupManager.tableOpen+SetupManager.tableClose);
            table.append($("<tr><th>query number: "+i+"</tr></th>"));
            table.height("100%");
            var row = $(SetupManager.trOpen+SetupManager.trClose);
            var cell = $(SetupManager.tdOpen+SetupManager.tdClose);
            cell.height("100%");
            row.append(cell);


            table.append(row);

            for(var j = 0;j< stack.length;j++){
                var row = $(SetupManager.trOpen+SetupManager.trClose);


                var cell = $(SetupManager.tdOpen+SetupManager.tdClose);

                var cellDiv = $(SetupManager.divOpen+SetupManager.divClose);



                row.append(cell);

                var query = stack[j];
                var label = $('<text><font color="darkred">['+query.displayType+']</font> <font color="black">'+query.displayValue+'</font></text>');

                cell.append(label);

                var buttonCell = $(SetupManager.tdOpen+SetupManager.tdClose);
                var button = $(SetupManager.buttonOpen+SetupManager.buttonClose);
                buttonCell.append(button);
                button.addClass("QueryViewButton");
                button.attr("value","+");
                button.append($("<text>+</text>"));
                button.width("25px");
                button.height("15px");

                (function(query){button.click(function(){
                    BuildQueryBoxView.addAndSubmit(query);
                    QueryGridView.added = true;
                })}(query));

                row.append(buttonCell);

                cell.width("100%");



                cell.attr("valign","bottom");
                cell.addClass("GridRow");
                table.append(row);

            }
            $(SetupManager.pound+"GridCell"+(cellID)).append(table);


        }
//current contents

        $(SetupManager.pound+"GridCell"+(lastCell)).empty();

        var table = $(SetupManager.tableOpen+SetupManager.tableClose);
        table.height("100%");





        table.append($("<tr><th>query number: "+lastCell+"</tr></th>"));
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
            var label = $('<text><font color="darkred">['+query.displayType+']</font> <font color="black">'+query.displayValue+'</font></text>');
            cell.append(label);

            var buttonCell = $(SetupManager.tdOpen+SetupManager.tdClose);
            var button = $(SetupManager.buttonOpen+SetupManager.buttonClose);
            buttonCell.append(button);
            button.addClass("QueryViewButton");
            button.attr("value","+");
            button.append($("<text>+</text>"));
            button.width("25px");
            button.height("15px");
            (function(query){button.click(function(){
                BuildQueryBoxView.addAndSubmit(query)
                QueryGridView.added = true;
            })}(query));

            row.append(buttonCell);

            cell.addClass("GridRow");


            table.append(row);



        }

        table.addClass("GridCellHighLight");

        $(SetupManager.pound+"GridCell"+(lastCell)).append(table);




    }


}