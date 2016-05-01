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

var QueryBucketView = {

    queryViews  : new Array() /*QueryView*/,
    queryBucket: $(SetupManager.divOpen+SetupManager.divClose),
    
    getView : function() {
        var currentQueryTD = $(SetupManager.tdOpen + SetupManager.tdClose);
        var bucketMaxWidth = jQuery(window).width() * 0.37;
        QueryBucketView.queryBucket.attr("id", "CurrentQueryBucket");
        QueryBucketView.queryBucket.attr("style", "max-width: " + bucketMaxWidth +"px;");
        currentQueryTD.append(QueryBucketView.queryBucket);
        return currentQueryTD;
    },

    getClearButton: function() {
        var newSearchTD = $(SetupManager.tdOpen + SetupManager.tdClose);
        newSearchTD.attr("style", "width:6%");
        var newSearchButton = $(SetupManager.divOpen+SetupManager.divClose);
        newSearchTD.addClass("ResetButton");
        newSearchButton.text("Clear");
        newSearchTD.mouseenter(function(event) {
            newSearchTD.removeClass("ResetButton");
            newSearchTD.addClass("ResetButtonHover");

        });

        newSearchTD.mouseleave(function(event) {
            newSearchTD.removeClass("ResetButtonHover");
            newSearchTD.addClass("ResetButton");

        });
        newSearchTD.click(function(event) {

            for( var i=0; i < SetupManager.currentCell; i++) {
                $(SetupManager.pound+"cellStatus"+i).empty();
                $(SetupManager.pound+"backgroundSave")
                    .append($("#"+SetupManager.expandBtnArray_ID[i]));
                $(SetupManager.pound+"projectURL" +i) .empty();
            }
            
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
            
            QueryManager.currentQuery = "";



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
        newSearchTD.append(newSearchButton);
        return newSearchTD;
    },

    update  :   function(){

        $("#CurrentQueryBucket .mCSB_container").empty();

        for(var i = QueryBucketModel.stackOfQueries.length-1; i >= 0; i--){


            var queryBucketCell = $(SetupManager.tdOpen+SetupManager.tdClose);

            var displayType  = QueryBucketModel.stackOfQueries[i].displayType;
            var value = QueryBucketModel.stackOfQueries[i].value;
            var type = QueryBucketModel.stackOfQueries[i].type;
            var valueIndex = QueryBucketModel.stackOfQueries[i].valueIndex;
            var active = QueryBucketModel.stackOfQueries[i].active;
            var displayValue = QueryBucketModel.stackOfQueries[i].displayValue;

            var queryView = new QueryView(displayType,type,value, valueIndex, i,active, displayValue);

            $("#CurrentQueryBucket .mCSB_container").append(queryView.getView());
            $("#CurrentQueryBucket").mCustomScrollbar("update");
            
            if(!active){
                queryView.setDeactive()
            }else{
                queryView.setActive();
            }
        }
    }




}