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

var QueryTrailView = {

    queryTrail : $(SetupManager.tableOpen+SetupManager.tableClose),
    queryRow : $(SetupManager.trOpen + SetupManager.trClose),

    getView :   function(){
        var queryCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        QueryTrailView.queryRow.append(queryCell);

        QueryTrailView.queryTrail.append(QueryTrailView.queryRow);

        QueryTrailView.queryTrail.addClass("QueryTrail");

        return QueryTrailView.queryTrail;

    },

    update : function(){

        QueryTrailView.queryRow.empty();



        for(var i = 0; i <QueryTrailModel.queryTrail.length; i++) {
            var stack = QueryTrailModel.queryTrail[i];
            var queryBucketCell = $(SetupManager.tdOpen + SetupManager.tdClose);
            var tempTable = $(SetupManager.tableOpen+SetupManager.tableClose);
            queryBucketCell.append(tempTable);
            var tempRow = $(SetupManager.trOpen+SetupManager.trClose);
            tempTable.append(tempRow);
            var tempCell = $(SetupManager.tdOpen+SetupManager.tdClose);
            tempRow.append(tempCell);
            tempCell.addClass("TrailQueryView");

            var stackStr = "";
            for (var j = stack.length-1; j >= 0; j--) {


                var displayType = stack[j].displayType;
                var value = stack[j].value;


                stackStr = stackStr +"["+value+"] ";



        }
            var queryView =
                $('<text><font color="yellow">'+stackStr+'</font></text>');

            tempCell.append(queryView);
            tempCell.attr("width","100%");
            tempCell.attr("width","50%");
            QueryTrailView.queryRow.append(queryBucketCell);
        }

        var queryBucketCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        queryBucketCell.attr("width","100%");
        queryBucketCell.attr("align","right");
        QueryTrailView.queryRow.append(queryBucketCell);

    }


}