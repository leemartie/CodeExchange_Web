/**
 * Created by lee on 4/8/14.
 */

var QueryTrailNavView = {

    getView  :   function(){

        var navTable = $(SetupManager.tableOpen+SetupManager.tableClose);
        var navigationRow = $(SetupManager.trOpen+SetupManager.trClose);
        navTable.append(navigationRow);
        navTable.addClass("navView");
        navTable.attr("cellpadding","5px");


        var centerCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        centerCell.attr("align","right");
        var createNewQueryButton = $(SetupManager.divOpen+"new search" +
            SetupManager.divClose);
        createNewQueryButton.css({    "padding-top": "13px", "padding-bottom": "13px"});
        //createNewQueryButton.button();
        createNewQueryButton.addClass("BottomButtons");

        centerCell.attr("width","50%");
        createNewQueryButton.width("90%");
        createNewQueryButton.height("99%");
        createNewQueryButton.attr("disabled", false);


        createNewQueryButton.mouseenter(function(event) {
            createNewQueryButton.removeClass("BottomButtons");
            createNewQueryButton.addClass("BottomButtonsHover");

        });

        createNewQueryButton.mouseleave(function(event) {
            createNewQueryButton.removeClass("BottomButtonsHover");
            createNewQueryButton.addClass("BottomButtons");

        });
        createNewQueryButton.click(function(event) {

            $(SetupManager.pound+"cellStatus"+0).empty();
            $(SetupManager.pound+"cellStatus"+1).empty();
            $(SetupManager.pound+"cellStatus"+2).empty();
            $("#"+SetupManager.expandBtnArray_ID[0]).hide();
            $("#"+SetupManager.expandBtnArray_ID[1]).hide();
            $("#"+SetupManager.expandBtnArray_ID[2]).hide();

            //no need for a new session if the current query is empty
            if(QueryBucketModel.stackOfQueries.length != 0) {
                QueryBucketModel.removeAll();
                QueryBucketView.update();
                Controller.clearAllCode();
                Controller.setStatus("Let's find some code");
                $(SetupManager.pound + SetupManager.pageNavigationDiv_ID).empty();
//LOG IT
                UsageLogger.addEvent(UsageLogger.NEW_QUERY_BUTTON_CLICKED, null);
            }



            if(Controller.gridOn){
                Controller.showGrid();
                gridButton.empty();
                gridButton.append("<text>show code results</text>");
                //LOG IT
                UsageLogger.addEvent(UsageLogger.QUERY_HISTORY_BUTTON_ON,null);

            }

       });

        centerCell.append(createNewQueryButton);
        navigationRow.append(centerCell);

        var gridRow = $(SetupManager.trOpen+SetupManager.trClose);
        navTable.append(gridRow);
        var gridCell = $(SetupManager.tdOpen+SetupManager.tdClose);

        gridCell.attr("align","left");
        gridCell.attr("width","90%");
        var gridButton = $(SetupManager.divOpen+SetupManager.divClose);
        gridButton.attr(SetupManager.ID_attr,"gridButton");

        gridButton.append("<text>show search history</text>");

        //gridButton.button();

        gridButton.width("90%");
        gridButton.height("99%");
        gridButton.addClass("BottomButtons");

        gridButton.click(function(event) {
            Controller.showGrid();

            gridButton.empty();
            if(Controller.gridOn){

                gridButton.append("<text>show code results</text>");
                //LOG IT
                UsageLogger.addEvent(UsageLogger.QUERY_HISTORY_BUTTON_ON,null);
            }else{

                gridButton.append("<text>show search history</text>");
                //LOG IT
                UsageLogger.addEvent(UsageLogger.QUERY_HISTORY_BUTTON_OFF,null);
            }

        });

        gridCell.append(gridButton);
       // navigationRow.append(gridCell);
        navigationRow.append(gridCell);

        gridButton.mouseenter(function(event) {
            gridButton.removeClass("BottomButtons");
            gridButton.addClass("BottomButtonsHover");

        });

        gridButton.mouseleave(function(event) {
            gridButton.removeClass("BottomButtonsHover");
            gridButton.addClass("BottomButtons");

        });

        return navTable;
    }

}