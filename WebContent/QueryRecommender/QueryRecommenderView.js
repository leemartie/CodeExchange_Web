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
var QueryRecommenderView = {
    view : $(SetupManager.tableOpen + SetupManager.tableClose),

    getView :   function() {
        var row = $(SetupManager.trOpen+SetupManager.trClose);
        QueryRecommenderView.view.append(row);
        var cell = $(SetupManager.tdOpen+SetupManager.tdClose);
        row.append(cell);

        QueryRecommenderView.view.addClass("QueryRecommenderView");

        QueryRecommenderView.view.addClass("QueryViewTable");


        return QueryRecommenderView.view;


    },

    update  :   function(){
        QueryRecommenderView.view.empty();

        var colCount = 0;
        var queryBucketRow = $(SetupManager.trOpen + SetupManager.trClose);
        var recommendationTitleRow = $(SetupManager.trOpen + SetupManager.trClose);
        var recommendationValueRow = $(SetupManager.trOpen + SetupManager.trClose);
        var oldType = null;
        var addedHeader = false;
        var divScroll;
        var table;
        var tableRow;

        QueryRecommenderView.view.append(recommendationTitleRow);
        QueryRecommenderView.view.append(recommendationValueRow);

        for(var i = 0; i < QueryRecommenderModel.recommendedQueries.length; i++){



            //type
            var queryBucketCell = $(SetupManager.tdOpen+SetupManager.tdClose);
            var displayType  = QueryRecommenderModel.recommendedQueries[i].displayType;
            var type = QueryRecommenderModel.recommendedQueries[i].type;
            var score = QueryRecommenderModel.recommendedQueries[i].score;

            if(oldType != type){
                var header = $(SetupManager.tdOpen+SetupManager.tdClose);
                header.attr("colspan","2");
                header.attr("align", "center");
                var label = $('<text><font color="black">'+displayType+'</font></text>');
                header.append(label);
                recommendationTitleRow.append(header);
                oldType = type;

                divScroll = $(SetupManager.divOpen+SetupManager.divClose);
                divScroll.addClass("RecommendationContainer");
                table = $(SetupManager.tableOpen+SetupManager.tableClose);
                table.addClass("RecommendationTable");
                divScroll.append(table);
                var cell = $(SetupManager.tdOpen+SetupManager.tdClose);
                cell.append(divScroll);
                cell.attr("colspan","2");
                recommendationValueRow.append(cell);
                addedHeader = true;
            }

          //  if((colCount%2==0 && !addedHeader) || addedHeader) {
                tableRow = $(SetupManager.trOpen+SetupManager.trClose);
                table.append(tableRow);
//                queryBucketRow.append("<td>"+divScroll+"</td>");
//                QueryRecommenderView.view.append(queryBucketRow);
                addedHeader = false;
                colCount = 0;
         //   }









            var value = QueryRecommenderModel.recommendedQueries[i].value;

            var displayValue = QueryRecommenderModel.recommendedQueries[i].displayValue;


//            if(displayValue != null && displayValue.length > 30)
//                displayValue = [displayValue.slice(0, 30), '\n', displayValue.slice(30)].join('');

            if(!displayValue instanceof Boolean){
                displayValue = displayValue.replace(/</gi,"&lt;");
                displayValue = displayValue.replace(/</gi,"&gt;");
            }

            displayType = displayType.replace(/</gi,"&lt;");
            displayType = displayType.replace(/</gi,"&gt;");

            var label = $('<text><font color="gray">'+score+'&nbsp;-&nbsp;</font><font color="#8b0000">'+displayValue+'</font></text>');

//            var button = $(SetupManager.buttonOpen+SetupManager.buttonClose);
//            button.addClass("QueryViewButtonRecommend");
//            button.attr("value","+");
//            button.append($("<text>+</text>"));
//            button.width("25px");
//            button.height("15px");


            queryBucketCell.attr("title","Click to add to current query");

//
            (function(query, cell){queryBucketCell.click(function(){
                cell.removeClass("RecommendationHover");
                cell.addClass("RecommendationDown");

                BuildQueryBoxView.addAndSubmit(query)

                if(Controller.gridOn)
                    Controller.showGrid();
//LOG IT
                UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Recommendation),query);


            })})(QueryRecommenderModel.recommendedQueries[i],queryBucketCell);
//
            (function(query,cell){queryBucketCell.mouseenter(function(){

                cell.removeClass("QueryRecommendation");
                cell.addClass("RecommendationHover");


            })})(QueryRecommenderModel.recommendedQueries[i],queryBucketCell);
//
            (function(query,cell){queryBucketCell.mouseleave(function(){

                if(cell.attr("class") != "RecommendationDown") {
                    cell.removeClass("RecommendationHover");
                    cell.addClass("QueryRecommendation");
                }

            })})(QueryRecommenderModel.recommendedQueries[i],queryBucketCell);


            queryBucketCell.append(label);
    //        var buttonCell = $(SetupManager.tdOpen+SetupManager.tdClose);
    //        buttonCell.append(button);

            queryBucketCell.addClass("QueryRecommendation");
            tableRow.append(queryBucketCell);
            colCount++;
           // queryBucketRow.append(buttonCell);



        }
    }

}