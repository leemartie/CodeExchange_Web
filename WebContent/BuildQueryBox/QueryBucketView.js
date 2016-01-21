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

      ///  QueryBucketView.queryBucket.addClass("QueryBucket");

        var div = $('<div class="QueryBucket">'+'</div>');
        div.append(QueryBucketView.queryBucket);


        return div;

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

            var displayType  = QueryBucketModel.stackOfQueries[i].displayType;
            var value = QueryBucketModel.stackOfQueries[i].value;
            var type = QueryBucketModel.stackOfQueries[i].type;
            var valueIndex = QueryBucketModel.stackOfQueries[i].valueIndex;
            var active = QueryBucketModel.stackOfQueries[i].active;
            var displayValue = QueryBucketModel.stackOfQueries[i].displayValue;

            var queryView = new QueryView(displayType,type,value, valueIndex, i,active, displayValue);

            queryBucketCell.append(queryView.getView());

            queryBucketRow.append(queryBucketCell);

            queryBucketRow.addClass("QueryViewRow");
            queryBucketCell.addClass("QueryViewRow");



            if(!active){
                queryView.setDeactive()
            }else{
                queryView.setActive();
            }

            QueryBucketView.queryBucket.append(queryBucketRow);
        }


    }




}