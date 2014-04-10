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
            queryBox.attr(SetupManager.placeholder_attr, "type query for selected type");








            var queryLabel = $("<text>add a query part</text><br/>");
            queryLabel.addClass("QueryTypeTitle");
            queryCell.attr("align", "center");
            queryCell.append(queryLabel);
            queryCell.append(queryBox);

            var truebox = $(SetupManager.inputOpen+SetupManager.inputClose);
            var trueboxLabel = $("<text >true</text>");
            truebox.attr("type","radio");
            truebox.attr("name","boolean");
            truebox.attr("value","true");
            truebox.attr("id", "radio1");
            var falsebox = $(SetupManager.inputOpen+SetupManager.inputClose);
            var falseboxLabel = $("<text>false</text>");
            falsebox.attr("type","radio");
            falsebox.attr("name","boolean");
            falsebox.attr("value","false");
            falsebox.attr("id", "radio2");

            queryCell.append(truebox);
            queryCell.append(trueboxLabel);
            queryCell.append(falsebox);
            queryCell.append(falseboxLabel);

            queryCell.width("100%");

            truebox.hide();
            trueboxLabel.hide();
            falsebox.hide();
            falseboxLabel.hide();


            view.append(queryRow);

            //combo box for query type
            var combo = $('<select name="queryType">'+
                '<option  style="background-color: black; color:white" disabled>Fuzzy query</option>'+
                '<option  value="'+QueryBucketModel.snippetField+'" selected>keywords</option>'+
                '<option  style="background-color: black; color:white" disabled>Technical query</option>'+
                '<option  value="'+QueryBucketModel.extendsField+'">extends class</option>'+
                '<option  value="'+QueryBucketModel.implementsField+'">implements class</option>'+
                '<option  value="'+QueryBucketModel.returnTypeField+'">return type</option>'+
                '<option  value="'+QueryBucketModel.recursiveField+'">is recursive</option>'+
                '<option  value="'+QueryBucketModel.varargsField+'">has variable arguments</option>'+
                '<option  style="background-color: black; color:white" disabled>Social query</option>'+
                '<option  value="'+QueryBucketModel.authorFiled+'">author</option>'+
                '<option  value="'+QueryBucketModel.projectField+'">project</option>'+
                '<option  value="'+QueryBucketModel.lastUpdatedField+'">year</option>'+
//                '<option  value="'+QueryBucketModel.lastUpdatedField+'">month</option>'+
//                '<option  value="'+QueryBucketModel.lastUpdatedField+'">day</option>'+
                '</select>');

            combo.width("98%");


            combo.change(function(event){
                BuildQueryBoxModel.currentQueryType = combo.val();

                if(BuildQueryBoxModel.currentQueryType == QueryBucketModel.recursiveField
                    || BuildQueryBoxModel.currentQueryType == QueryBucketModel.varargsField){
                    queryBox.hide();
                    truebox.show();
                    trueboxLabel.show();
                    falsebox.show();
                    falseboxLabel.show();


                }else{
                    queryBox.show();
                    truebox.hide();
                    falsebox.hide();
                    trueboxLabel.hide();
                    falseboxLabel.hide();


                }
                if(BuildQueryBoxModel.currentQueryType== QueryBucketModel.snippetField){
                    queryBox.autocomplete({
                        source: function( request, response ){
                            QueryManager.submitSpellCheck(request, response,queryBox.val());
                        }
                    });
                }else{
                    queryBox.autocomplete({
                        source: function( request, response ){
                            QueryManager.submitAutoComplete(BuildQueryBoxModel.currentQueryType, request, response);
                        }
                    });
                }
            });


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

            truebox.click(function(){
                //access value of changed radio group with $(this).val()

                var query = new QueryModel(combo.val(), $(this).val());
                query.displayType = combo.find(":selected").text();
                QueryBucketModel.addQuery(query);
                QueryBucketView.update();

                QueryTrailModel.pushQuery(QueryBucketModel.stackOfQueries.slice(0));//the slice is for cloning


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


                truebox.prop('checked', false);

            });

            falsebox.click(function(){
                //access value of changed radio group with $(this).val()

                var query = new QueryModel(combo.val(), $(this).val());
                query.displayType = combo.find(":selected").text();
                QueryBucketModel.addQuery(query);
                QueryBucketView.update();

                QueryTrailModel.pushQuery(QueryBucketModel.stackOfQueries.slice(0));//the slice is for cloning


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

                falsebox.prop('checked', false);

            });


            //add keypress  for 'enter' listener to submit query
            queryBox.keypress(function(e) {
                if (e.keyCode == '13') {
                    e.preventDefault();

                    var query = null;
                    query = new QueryModel(combo.val(), queryBox.val());
                    query.displayType = combo.find(":selected").text();
                    query.displayValue = queryBox.val();

                    if(query.displayType == "year") {
                            var yearQuery = "["+queryBox.val()+"-01-01T00:00:00Z TO "+queryBox.val()+"-12-31T00:00:00Z]";
                            query = new QueryModel(combo.val(), yearQuery);
                            query.displayValue = queryBox.val();
                            query.displayType = combo.find(":selected").text();
                    }



                    QueryBucketModel.addQuery(query);
                    QueryBucketView.update();

                    QueryTrailModel.pushQuery(QueryBucketModel.stackOfQueries.slice(0));//the slice is for cloning


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

                    queryBox.val("");

                }
            });



			return view
			
		}
		
}