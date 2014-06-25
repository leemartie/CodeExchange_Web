/**
 * Created by lee on 4/8/14.
 */

var QueryTrailNavView = {

    getView  :   function(){

        var navTable = $(SetupManager.tableOpen+SetupManager.tableClose);
        var navigationRow = $(SetupManager.trOpen+SetupManager.trClose);
        navTable.append(navigationRow);



        var centerCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        centerCell.attr("align","right");
        var createNewQueryButton = $(SetupManager.buttonOpen+"create new query"+SetupManager.buttonClose);
        createNewQueryButton.button();

        centerCell.attr("width","50%");
        createNewQueryButton.width("90%");
        createNewQueryButton.height("99%");
        createNewQueryButton.attr("disabled", false);

        createNewQueryButton.click(function(event) {

            QueryBucketModel.removeAll();
            QueryBucketView.update();
            Controller.clearAllCode();
            Controller.setStatus("Let's find some code");
            $(SetupManager.pound + SetupManager.pageNavigationDiv_ID).empty();
//LOG IT
        UsageLogger.addEvent(UsageLogger.NEW_QUERY_BUTTON_CLICKED,null);

       });

        centerCell.append(createNewQueryButton);
        navigationRow.append(centerCell);

        var gridRow = $(SetupManager.trOpen+SetupManager.trClose);
        navTable.append(gridRow);
        var gridCell = $(SetupManager.tdOpen+SetupManager.tdClose);

        gridCell.attr("align","left");
        gridCell.attr("width","90%");
        var gridButton = $(SetupManager.buttonOpen+SetupManager.buttonClose);

        gridButton.append("<text>query history on</text>");
        gridButton.button();

        gridButton.width("90%");
        gridButton.height("99%");

        gridButton.click(function(event) {
            Controller.showGrid();

            gridButton.empty();
            if(Controller.gridOn){
                gridButton.append("<text>query history off</text>");
                //LOG IT
                UsageLogger.addEvent(UsageLogger.QUERY_HISTORY_BUTTON_ON,null);
            }else{
                gridButton.append("<text>query history on</text>");
                //LOG IT
                UsageLogger.addEvent(UsageLogger.QUERY_HISTORY_BUTTON_OFF,null);
            }

        });

        gridCell.append(gridButton);
       // navigationRow.append(gridCell);
        navigationRow.append(gridCell);

        return navTable;
    }

}