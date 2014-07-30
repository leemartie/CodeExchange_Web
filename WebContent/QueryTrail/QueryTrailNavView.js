/**
 * Created by lee on 4/8/14.
 */

var QueryTrailNavView = {

    getView  :   function(){

        var navTable = $(SetupManager.tableOpen+SetupManager.tableClose);
        var navigationRow = $(SetupManager.trOpen+SetupManager.trClose);
        navTable.append(navigationRow);
        navTable.addClass("navView");
        navTable.css({"border":"0px solid black"});
        navTable.attr("width","100%");
        navTable.attr("height","1px");
        navTable.attr("cellpadding","2");
        navTable.attr("cellspacing","0");




        var centerCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        centerCell.attr("align","center");
        var createNewQueryButton = $("<div style='display: table;'>"+"<div style='height:100%; " +
            "display: table-cell; vertical-align: middle; border: 0px solid black;'>new search</div>" +
            SetupManager.divClose);
     //   createNewQueryButton.css({    "padding-top": "14px", "padding-bottom": "14px"});
        //createNewQueryButton.button();
        createNewQueryButton.addClass("BottomButtons");

        centerCell.attr("width","50%");
        centerCell.attr("height","40px");


        createNewQueryButton.width("90%");
        createNewQueryButton.height("50px");
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

            $(SetupManager.pound+"backgroundSave")
                .append($("#"+SetupManager.expandBtnArray_ID[0]));
            $(SetupManager.pound+"projectURL"+0).empty();
            $(SetupManager.pound+"backgroundSave")
                .append($("#"+SetupManager.expandBtnArray_ID[1]));
            $(SetupManager.pound+"projectURL"+1).empty();
            $(SetupManager.pound+"backgroundSave")
                .append($("#"+SetupManager.expandBtnArray_ID[2]));
            $(SetupManager.pound+"projectURL"+2).empty();


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
                var innerDiv = $("<div style='height:100%; " +
                    "display: table-cell; align: center; vertical-align: middle; border: 0px solid black;'></div>");
                innerDiv.append(text);
                var gridButton =  $("<div style='display: table;'>"+
                    SetupManager.divClose);
                gridButton.append(innerDiv);

                //LOG IT
                UsageLogger.addEvent(UsageLogger.QUERY_HISTORY_BUTTON_ON,null);

            }

       });

        centerCell.append(createNewQueryButton);
        navigationRow.append(centerCell);

//        var gridRow = $(SetupManager.trOpen+SetupManager.trClose);
//        navTable.append(gridRow);
        var gridCell = $(SetupManager.tdOpen+SetupManager.tdClose);

        gridCell.attr("align","center");
        gridCell.attr("width","50%");
        gridCell.attr("height","40px");
        var gridButton = $(SetupManager.divOpen+SetupManager.divClose);
        gridButton.attr(SetupManager.ID_attr,"gridButton");
       // gridButton.css({    "padding-top": "13px", "padding-bottom": "13px"});
        var text = $("<text>show search history</text>");

        var innerDiv = $("<div style='height:100%; " +
            "display: table-cell; align: center; vertical-align: middle; border: 0px solid black;'></div>");
        innerDiv.append(text);
        var gridButton =  $("<div style='display: table;'>"+
            SetupManager.divClose);
        gridButton.append(innerDiv);





        //gridButton.button();

        gridButton.width("90%");
        gridButton.height("50px");
        gridButton.addClass("BottomButtons");

        gridButton.click(function(event) {
            Controller.showGrid();

            innerDiv.empty();
            if(Controller.gridOn){

                var text = $("<text>show code results</text>");
                innerDiv.append(text);


                //LOG IT
                UsageLogger.addEvent(UsageLogger.QUERY_HISTORY_BUTTON_ON,null);
            }else{



                var text = $("<text>show search history</text>");
                innerDiv.append(text);

                //LOG IT
                UsageLogger.addEvent(UsageLogger.QUERY_HISTORY_BUTTON_OFF,null);
            }

        });

        gridCell.append(gridButton);

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