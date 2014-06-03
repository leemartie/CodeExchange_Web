/**
 * Created by lee on 4/8/14.
 */

var QueryTrailNavView = {

    getView  :   function(){

        var navTable = $(SetupManager.tableOpen+SetupManager.tableClose);
        var navigationRow = $(SetupManager.trOpen+SetupManager.trClose);
        navTable.append(navigationRow);



        var centerCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        centerCell.attr("align","center");
        var createNewQueryButton = $(SetupManager.buttonOpen+"create new query"+SetupManager.buttonClose);
        createNewQueryButton.button();

        centerCell.attr("width","50%");
        createNewQueryButton.width("100%");
        createNewQueryButton.attr("disabled", false);

        createNewQueryButton.click(function(event) {

            QueryBucketModel.removeAll();
            QueryBucketView.update();
            Controller.clearAllCode();
            Controller.setStatus("Let's find some code");
            $(SetupManager.pound + SetupManager.pageNavigationDiv_ID).empty();

       });

        centerCell.append(createNewQueryButton);
        navigationRow.append(centerCell);

        var gridRow = $(SetupManager.trOpen+SetupManager.trClose);
        navTable.append(gridRow);
        var gridCell = $(SetupManager.tdOpen+SetupManager.tdClose);

        gridCell.attr("align","center");
        gridCell.attr("width","50%");
        var gridButton = $(SetupManager.buttonOpen+SetupManager.buttonClose);

        gridButton.append("<text>query grid on</text>");
        gridButton.button();

        gridButton.width("100%");

        gridButton.click(function(event) {
            Controller.showGrid();

            gridButton.empty();
            if(Controller.gridOn){
                gridButton.append("<text>query grid off</text>");
            }else{
                gridButton.append("<text>query grid on</text>");
            }

        });

        gridCell.append(gridButton);
       // navigationRow.append(gridCell);
        navigationRow.append(gridCell);

        return navTable;
    }

}