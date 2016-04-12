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
        var currentQueryContainer = $(SetupManager.tdOpen + SetupManager.tdClose);
        var currentQueryTable = $(SetupManager.tableOpen + SetupManager.tableClose);
        currentQueryTable.attr("style", "border-spacing:0");
        var currentQueryTableRow = $(SetupManager.trOpen + SetupManager.trClose);
        var currentQueryTD = $(SetupManager.tdOpen + SetupManager.tdClose);
        var currentQueryLabelTD = $(SetupManager.tdOpen + SetupManager.tdClose);
        currentQueryLabelTD.addClass("CurrentQueryTitle");
        currentQueryLabelTD.text("Current Query");
        currentQueryLabelTD.attr("style", "width:15%;");
        var bucketMaxWidth = jQuery(window).width() * 0.7;
        currentQueryContainer.attr("colspan", "3");
        currentQueryContainer.attr("style", "max-width: " + bucketMaxWidth +"px; padding-bottom: 1em;");
        QueryBucketView.queryBucket.addClass("CurrentQueryBucket");
        currentQueryTD.append(QueryBucketView.queryBucket);
        currentQueryTableRow.append(currentQueryLabelTD);
        currentQueryTableRow.append(currentQueryTD);
        currentQueryTable.append(currentQueryTableRow);
        currentQueryContainer.append(currentQueryTable);
        return currentQueryContainer;
    },

    update  :   function(){
        
        QueryBucketView.queryBucket.empty();

        for(var i = QueryBucketModel.stackOfQueries.length-1; i >= 0; i--){


            var queryBucketCell = $(SetupManager.tdOpen+SetupManager.tdClose);

            var displayType  = QueryBucketModel.stackOfQueries[i].displayType;
            var value = QueryBucketModel.stackOfQueries[i].value;
            var type = QueryBucketModel.stackOfQueries[i].type;
            var valueIndex = QueryBucketModel.stackOfQueries[i].valueIndex;
            var active = QueryBucketModel.stackOfQueries[i].active;
            var displayValue = QueryBucketModel.stackOfQueries[i].displayValue;

            var queryView = new QueryView(displayType,type,value, valueIndex, i,active, displayValue);

            QueryBucketView.queryBucket.append(queryView.getView());
            
            if(!active){
                queryView.setDeactive()
            }else{
                queryView.setActive();
            }


        }
    }




}