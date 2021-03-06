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
var BuildQueryBoxView = {
		
		getView:	function() {
            var view = $(SetupManager.tableOpen + SetupManager.tableClose);
            view.attr("height", "100%");
            
            var recommendationsTable = $(SetupManager.tableOpen + SetupManager.tableClose);
            //var currentQueryRow = (SetupManager.trOpen+SetupManager.trClose);
            recommendationsTable.addClass("BucketView");

            //title for query recommendations
            // var titleRow = $(SetupManager.trOpen + SetupManager.trClose);
            // var titleCell = $(SetupManager.tdOpen + SetupManager.tdClose);
            // titleRow.append(titleCell);
            // var label = $("<text>Result Index</text>");
            // label.addClass("BuildQueryTitle");
            // // titleCell.append($("<hr>"));
            // titleCell.append(label);
            // titleCell.attr("align", "center");
            // recommendationsTable.append(titleRow);


            //query Recommendations
            var recommendRow = $(SetupManager.trOpen + SetupManager.trClose);
            var recommendCell = $(SetupManager.tdOpen + SetupManager.tdClose);
            recommendRow.append(recommendCell);
            recommendCell.append(QueryRecommenderView.getView());

            recommendationsTable.append(recommendRow);

            var titleRow = $(SetupManager.trOpen + SetupManager.trClose);
            var titleCell = $(SetupManager.tdOpen + SetupManager.tdClose);
            titleCell.attr("height", "60%");
            titleCell.attr("valign", "top");
            titleCell.addClass("recommendCell");
            titleRow.append(titleCell);
            titleCell.append(recommendationsTable);
            view.append(titleRow);


            //buttons
            // var viewRow = $(SetupManager.trOpen + SetupManager.trClose);
            // var viewCell = $(SetupManager.tdOpen + SetupManager.tdClose);
            // viewRow.append(viewCell);
            // viewCell.attr("height", "20%");
            // viewCell.attr("valign", "bottom");


            // var buttonTable = $(SetupManager.tableOpen + SetupManager.tableClose);
            // buttonTable.attr("height", "100%");
            // buttonTable.addClass("BucketView");
            // var buttonRow = $(SetupManager.trOpen + SetupManager.trClose);
            // buttonTable.append(buttonRow);
            // var buttonCell = $(SetupManager.tdOpen + SetupManager.tdClose);
            //
            // buttonRow.append(buttonCell);
            // buttonCell.append(QueryTrailNavView.getView());
            //
            // buttonCell.attr("valign", "bottom");
            // buttonCell.attr("height", "100%");

//            viewCell.append(buttonTable);


            // view.append(viewRow);

            return view;


        },






        addQuery: function(query){
            if(QueryBucketModel.inStack(query) == false){
                QueryBucketModel.addQuery(query);
                QueryBucketView.update();

                QueryTrailModel.pushQuery(QueryBucketModel.stackOfQueries.slice(0));//the slice is for cloning

                var query = QueryBucketModel.constructQuery();
                var childQuery = QueryBucketModel.constructChildQuery();

                QueryManager.setQuery(query);
                QueryManager.setChildQuery(childQuery);

            }
        },

        submitQuery : function(){
            Controller.setStatus("SEARCHING...");
            QueryManager.submitQuery();
        },

        addAndSubmit: function(query){

            //empty so ignore...
            if(query.value == "" || query.value == ".()" || query.value == ":.()")
                return;
            if(Controller.isExpanded) {
                Controller.collapseCell(Controller.expandedCell);
            }


            if(QueryBucketModel.inStack(query) == false){
                QueryBucketModel.addQuery(query);
                QueryBucketView.update();

                QueryTrailModel.pushQuery(QueryBucketModel.stackOfQueries.slice(0));//the slice is for cloning


                Controller.setStatus("SEARCHING...");

                var query = QueryBucketModel.constructQuery();
                var childQuery = QueryBucketModel.constructChildQuery();

                QueryManager.setQuery(query);
                QueryManager.setChildQuery(childQuery);

                QueryManager.submitQuery();

            }

        },

    appendWithCount: function(params){
        var paramsWithCount = new Array();

        var skip = new Array();

        for(var i = 0; i<params.length; i++){
                var count = 0;

            if(skip.indexOf(params[i]) > -1){
                continue;
            }

            for(var j = i; j<params.length; j++){
                if(params[i] == params[j]){
                    count++;
                }

            }

            paramsWithCount.push(params[i]+"_"+count);
            skip.push(params[i]);
        }

        return paramsWithCount;
    }
		
}