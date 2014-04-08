/**
 * Created by lee on 4/7/14.
 */

var QueryBucketView = {

    queryViews  : new Array() /*QueryView*/,
    queryBucket :  $(SetupManager.tableOpen+SetupManager.tableClose),

    /**
     * returns a table
     * @returns {*|jQuery|HTMLElement}
     */
    getView :   function(){

        var queryBucketRow = $(SetupManager.trOpen+SetupManager.trClose);
        var queryBucketCell = $(SetupManager.tdOpen+SetupManager.tdClose);
       // queryBucketCell.append($("<text>totalQuery</text>"));
        queryBucketCell.attr("height","100%");
        queryBucketRow.append(queryBucketCell);
        QueryBucketView.queryBucket.append(queryBucketRow);

        QueryBucketView.queryBucket.addClass("QueryBucket");

        return QueryBucketView.queryBucket;

    },

    update  :   function(){

        QueryBucketView.queryBucket.empty();

        var queryBucketRow = $(SetupManager.trOpen+SetupManager.trClose);
        var queryBucketCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        queryBucketCell.attr("height","100%");
        queryBucketRow.append(queryBucketCell);

        QueryBucketView.queryBucket.append(queryBucketRow);

        for(var i = QueryBucketModel.stackOfQueries.length-1; i >= 0; i--){
            var queryBucketRow = $(SetupManager.trOpen+SetupManager.trClose);
            var queryBucketCell = $(SetupManager.tdOpen+SetupManager.tdClose);

            var type  = QueryBucketModel.stackOfQueries[i].type;
            var value = QueryBucketModel.stackOfQueries[i].value;

            var queryView = new QueryView(type,value, i);

            queryBucketCell.append(queryView.getView());
            queryBucketCell.addClass("QueryView");
            queryBucketRow.append(queryBucketCell);
            QueryBucketView.queryBucket.append(queryBucketRow);
        }
    }


}