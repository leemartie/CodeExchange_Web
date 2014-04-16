/**
 * Created by lee on 4/15/14.
 */
var QueryGridView = {

     grid : $(SetupManager.tableOpen+SetupManager.tableClose),

    setup : function(){
        QueryGridView.grid.empty();
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

            cell.addClass("Grid");
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
            var cellID = i%16;
            lastCell = cellID+1;

            if(lastCell == 17)
                lastCell = 0;

            $(SetupManager.pound+"GridCell"+(cellID)).empty();

            var table = $(SetupManager.tableOpen+SetupManager.tableClose);
            table.height("100%");
            var row = $(SetupManager.trOpen+SetupManager.trClose);
            var cell = $(SetupManager.tdOpen+SetupManager.tdClose);
            cell.height("100%");
            row.append(cell);
            table.append(row);

            for(var j = 0;j< stack.length;j++){
                var row = $(SetupManager.trOpen+SetupManager.trClose);


                var cell = $(SetupManager.tdOpen+SetupManager.tdClose);
                row.append(cell);
                var query = stack[j];
                var label = $('<text>['+query.displayType+'] <font color="yellow">'+query.displayValue+'</font></text>');

                cell.append(label);
                cell.attr("valign","bottom");
                row.addClass("GridRow");
                table.append(row);

            }
            $(SetupManager.pound+"GridCell"+(cellID)).append(table);


        }
//current contents

        $(SetupManager.pound+"GridCell"+(lastCell)).empty();

        var table = $(SetupManager.tableOpen+SetupManager.tableClose);
        table.height("100%");
        var row = $(SetupManager.trOpen+SetupManager.trClose);

        var cell = $(SetupManager.tdOpen+SetupManager.tdClose);
        cell.height("100%");
        row.append(cell);
        table.append(row);

        for(var i = 0; i<QueryBucketModel.stackOfQueries.length; i++){

                var query = QueryBucketModel.stackOfQueries[i];


            var row = $(SetupManager.trOpen+SetupManager.trClose);
            var cell = $(SetupManager.tdOpen+SetupManager.tdClose);
            row.append(cell);

            cell.attr("valign","bottom");
            var label = $('<text>['+query.displayType+'] <font color="yellow">'+query.displayValue+'</font></text>');
            cell.append(label);

            row.addClass("GridRow");

            table.append(row);



        }

        $(SetupManager.pound+"GridCell"+(lastCell)).append(table);

    }


}