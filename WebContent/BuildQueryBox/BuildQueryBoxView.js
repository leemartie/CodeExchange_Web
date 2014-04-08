/**
 * 
 */
var BuildQueryBoxView = {
		
		getView:	function(){
			var view = $(SetupManager.tableOpen+SetupManager.tableClose);


            //make title
            var titleRow = $(SetupManager.trOpen+SetupManager.trClose);
            var titleCell = $(SetupManager.tdOpen+SetupManager.tdClose);
            titleRow.append(titleCell);
            var label = $("<text>Build Query</text>");
            label.addClass("BuildQueryTitle");
            titleCell.append(label);
            titleCell.attr("align", "center");
            view.append(titleRow);

            //row for query box
            var queryRow = $(SetupManager.trOpen+SetupManager.trClose);
            var queryCell = $(SetupManager.tdOpen+SetupManager.tdClose);
            queryRow.append(queryCell);
            var queryBox = $(SetupManager.inputOpen+SetupManager.inputClose);

            queryBox.attr(SetupManager.ID_attr,SetupManager.queryInput_ID);
            queryBox.autocomplete({
                source: function( request, response ){
                    QueryManager.submitSpellCheck(request, response,queryBox.val());
                }
            });

            queryBox.width("98%");
            queryBox.attr(SetupManager.placeholder_attr, "add a query");
            var queryLabel = $("<text>add a query</text>");
            queryLabel.addClass("QueryTypeTitle");
            queryCell.attr("align", "center");
            queryCell.append(queryLabel);
            queryCell.append(queryBox);
            view.append(queryRow);

            //combo box for query type
            var combo = $('<select name="queryType">'+
                '<option value="'+QueryBucketModel.snippetField+'">keywords</option>'+
                '<option value="'+QueryBucketModel.extendsField+'">extends class</option>'+
                '<option value="'+QueryBucketModel.implementsField+'">implements class</option>'+
                '</select>');

            combo.width("100%");


            //row for query type
            var queryTypeRow = $(SetupManager.trOpen+SetupManager.trClose);
            var queryTypeCell = $(SetupManager.tdOpen+SetupManager.tdClose);
            queryTypeRow.append(queryTypeCell);
            var queryTypeLabel = $("<text>type</text>");
            queryTypeLabel.addClass("QueryTypeTitle");
            queryTypeCell.append(queryTypeLabel);
            queryTypeCell.append(combo);
            queryTypeCell.attr("align", "center");
            view.append(queryTypeRow);

            //title for bucket
            var titleRow = $(SetupManager.trOpen+SetupManager.trClose);
            var titleCell = $(SetupManager.tdOpen+SetupManager.tdClose);
            titleRow.append(titleCell);
            var label = $("<text>Your Current Query</text>");
            label.addClass("BuildQueryTitle");
            titleCell.append($("<hr>"));
            titleCell.append(label);
            titleCell.attr("align", "center");
            view.append(titleRow);

            //row for query bucket
            var queryBucketCellInParentTable = $(SetupManager.tdOpen+SetupManager.tdClose);
            queryBucketCellInParentTable.append(QueryBucketView.getView());
            queryBucketCellInParentTable.attr("valign","bottom");
            var queryBucketRowInParentTable = $(SetupManager.trOpen+SetupManager.trClose);
            queryBucketRowInParentTable.append(queryBucketCellInParentTable);
            view.append(queryBucketRowInParentTable);

            //add keypress  for 'enter' listener to submit query
            queryBox.keypress(function(e) {
                if (e.keyCode == '13') {
                    e.preventDefault();

                    var query = new QueryModel(combo.val(), queryBox.val());
                    QueryBucketModel.addQuery(query);
                    QueryBucketView.update();



                    Controller.setStatus("SEARCHING...");
                    var query = QueryBucketModel.constructQuery();
                    QueryManager.setQuery(query);
                    QueryManager.submitQuery();
//                    //make it lose focus so we can detect when user refocus on query it
//                    $(SetupManager.pound+SetupManager.queryInput_ID).blur();
                    var angle = 0;
                    SetupManager.rotateStatusVar = setInterval(function(){
                        angle+=3;
                        $(SetupManager.pound+SetupManager.statusIconID).rotate(angle);
                    },50);



                }
            });



			return view
			
		}
		
}