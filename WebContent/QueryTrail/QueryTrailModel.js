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
var QueryTrailModel = {

    /*each index holds the contents of the stack*/
    queryTrail : new Array(),
    nextIndex: 0,

    pushQuery   : function(queryStack){

        //remove head if back tracked and resubmited new query
        if(QueryTrailModel.nextIndex < QueryTrailModel.queryTrail.length-1){
            QueryTrailModel.queryTrail.length = QueryTrailModel.nextIndex+1;
        }

        QueryTrailModel.queryTrail.push(queryStack);
        QueryTrailModel.nextIndex = QueryTrailModel.queryTrail.length-1;


    },

    goBackOne :  function(){


        if( QueryTrailModel.nextIndex > 0) {
            QueryTrailModel.nextIndex = QueryTrailModel.nextIndex - 1;

            QueryBucketModel.repopulateQuery(QueryTrailModel.queryTrail[QueryTrailModel.nextIndex]);
            QueryBucketView.update();

            Controller.setStatus("SEARCHING...");
            var query = QueryBucketModel.constructQuery();
            QueryManager.setQuery(query);

            var childQuery = QueryBucketModel.constructChildQuery();
            QueryManager.setChildQuery(childQuery);

            QueryManager.submitQuery();
        }

    },
    goForwardOne :  function(){
        if(QueryTrailModel.nextIndex < QueryTrailModel.queryTrail.length-1) {
            QueryTrailModel.nextIndex = QueryTrailModel.nextIndex + 1;

            QueryBucketModel.repopulateQuery(QueryTrailModel.queryTrail[QueryTrailModel.nextIndex]);
            QueryBucketView.update();


            Controller.setStatus("SEARCHING...");
            var query = QueryBucketModel.constructQuery();
            QueryManager.setQuery(query);

            var childQuery = QueryBucketModel.constructChildQuery();
            QueryManager.setChildQuery(childQuery);

            QueryManager.submitQuery();
        }
    }


}