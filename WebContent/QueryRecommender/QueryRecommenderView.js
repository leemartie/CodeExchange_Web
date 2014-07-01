/**
 * Created by lee on 4/10/14.
 */
var QueryRecommenderView = {
    view : $(SetupManager.tableOpen + SetupManager.tableClose),

    getView :   function() {
        var row = $(SetupManager.trOpen+SetupManager.trClose);
        QueryRecommenderView.view.append(row);
        var cell = $(SetupManager.tdOpen+SetupManager.tdClose);
        row.append(cell);

        QueryRecommenderView.view.addClass("QueryRecommenderView");
        QueryRecommenderView.view.height("200px");



        return QueryRecommenderView.view;


    },

    update  :   function(){
        QueryRecommenderView.view.empty();

        for(var i = 0; i < QueryRecommenderModel.recommendedQueries.length; i++){
            var queryBucketRow = $(SetupManager.trOpen+SetupManager.trClose);

            var queryBucketCell = $(SetupManager.tdOpen+SetupManager.tdClose);

            var displayType  = QueryRecommenderModel.recommendedQueries[i].displayType;
            var value = QueryRecommenderModel.recommendedQueries[i].value;
            var type = QueryRecommenderModel.recommendedQueries[i].type;
            var displayValue = QueryRecommenderModel.recommendedQueries[i].displayValue;
            var score = QueryRecommenderModel.recommendedQueries[i].score;

            if(displayValue != null && displayValue.length > 30)
                displayValue = [displayValue.slice(0, 30), '\n', displayValue.slice(30)].join('');

            var label = $('<text><font color="#8b0000">['+displayType+'] </font><font color="black">'+displayValue+'</font></text>');

            var button = $(SetupManager.buttonOpen+SetupManager.buttonClose);
            button.addClass("QueryViewButtonRecommend");
            button.attr("value","+");
            button.append($("<text>+</text>"));
            button.width("25px");
            button.height("15px");
            (function(query){button.click(function(){
                BuildQueryBoxView.addAndSubmit(query)
//LOG IT
                UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Recommendation),query);

            })})(QueryRecommenderModel.recommendedQueries[i]);



            queryBucketCell.append(label);
            var buttonCell = $(SetupManager.tdOpen+SetupManager.tdClose);
            buttonCell.append(button);

            queryBucketCell.addClass("QueryRecommendation");
            queryBucketRow.append(queryBucketCell);
            queryBucketRow.append(buttonCell);

            QueryRecommenderView.view.append(queryBucketRow);
        }
    }

}