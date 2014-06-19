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

            //this is for queries of true false values
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


            //this is for method invocations

            var ClassNameBox = $(SetupManager.inputOpen+SetupManager.inputClose);
            ClassNameBox.width("98%");
            var ClassNameLabel = $("<text>Class Name</text><br>");
            ClassNameBox.attr(SetupManager.ID_attr,QueryBucketModel.ClassBox);

            var MethodNameBox = $(SetupManager.inputOpen+SetupManager.inputClose);
            MethodNameBox.width("98%");
            var MethodNameLabel = $("<br><text>Method Name</text><br>");
            MethodNameBox.attr(SetupManager.ID_attr,QueryBucketModel.MethodBox);

            var ParameterNameBox = $(SetupManager.inputOpen+SetupManager.inputClose);
            ParameterNameBox.width("98%");
            var ParameterNameLabel = $("<br><text>Parameter Type</text><br>");
            ParameterNameBox.attr(SetupManager.ID_attr,QueryBucketModel.ParamBox);


            queryCell.append(ClassNameLabel);
            queryCell.append(ClassNameBox);

            queryCell.append(MethodNameLabel);
            queryCell.append(MethodNameBox);

            queryCell.append(ParameterNameLabel);
            queryCell.append(ParameterNameBox);

            ClassNameBox.hide();
            ClassNameLabel.hide();

            MethodNameBox.hide();
            MethodNameLabel.hide();

            ParameterNameBox.hide();
            ParameterNameLabel.hide();




            view.append(queryRow);

            //combo box for query type
            var combo = $('<select name="queryType">'+
                '<option  style="background-color: black; color:white" disabled>problem domain query</option>'+
                '<option  value="'+QueryBucketModel.snippetField+'" selected>keywords</option>'+
                '<option  style="background-color: black; color:white" disabled>Technical query</option>'+
                '<option  value="'+QueryBucketModel.extendsField+'">extends class</option>'+
                '<option  value="'+QueryBucketModel.implementsField+'">implements interface</option>'+
                '<option  value="'+QueryBucketModel.snippetImportsFiled+'">imports library</option>'+
                '<option  value="'+QueryBucketModel.snippetMethodCall+'">has method call</option>'+
                '<option  value="'+QueryBucketModel.snippetMethodDec+'">has method declaration</option>'+
                '<option  value="'+QueryBucketModel.snippetClassGeneric+'">is generic</option>'+
                '<option  value="'+QueryBucketModel.snippetClassAbstract+'">is abstract</option>'+
                '<option  value="'+QueryBucketModel.snippetClassWildCard+'">has wildcard</option>'+
 //               '<option  value="'+QueryBucketModel.snippetInnerClass+'">is inner class</option>'+
  //              '<option  value="'+QueryBucketModel.snippetHasComments+'">has comments</option>'+

//                '<option  value="'+QueryBucketModel.methodNameField+'">method name</option>'+
//                '<option  value="'+QueryBucketModel.returnTypeField+'">return type</option>'+
//                '<option  value="'+QueryBucketModel.recursiveField+'">is recursive</option>'+
//                '<option  value="'+QueryBucketModel.varargsField+'">has variable arguments</option>'+
                '<option  style="background-color: black; color:white" disabled>Social query</option>'+
                '<option  value="'+QueryBucketModel.authorFiled+'">author</option>'+
                '<option  value="'+QueryBucketModel.projectField+'">project</option>'+
                '<option  value="'+QueryBucketModel.projectField+'">human language</option>'+
//                '<option  value="'+QueryBucketModel.lastUpdatedField+'">year</option>'+
//               '<option  value="'+QueryBucketModel.lastUpdatedField+'">month</option>'+
//                '<option  value="'+QueryBucketModel.lastUpdatedField+'">day</option>'+
                '</select>');

            combo.width("97%");


            combo.change(function(event){
                BuildQueryBoxModel.currentQueryType = combo.val();

                if(BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetClassGeneric ||
                    BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetClassAbstract ||
                    BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetClassWildCard ||
                    BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetInnerClass ||
                    BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetHasComments){
                    queryBox.hide();
                    truebox.show();
                    trueboxLabel.show();
                    falsebox.show();
                    falseboxLabel.show();


                    ClassNameBox.hide();
                    ClassNameLabel.hide();

                    MethodNameBox.hide();
                    MethodNameLabel.hide();

                    ParameterNameBox.hide();
                    ParameterNameLabel.hide();


                }else if(BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodCall
                    || BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodDec){

                    ClassNameBox.show();
                    ClassNameLabel.show();

                    MethodNameBox.show();
                    MethodNameLabel.show();

                    ParameterNameBox.show();
                    ParameterNameLabel.show();

                    queryBox.hide();
                    truebox.hide();
                    falsebox.hide();
                    trueboxLabel.hide();
                    falseboxLabel.hide();
                }
                else{
                    queryBox.show();
                    truebox.hide();
                    falsebox.hide();
                    trueboxLabel.hide();
                    falseboxLabel.hide();


                    ClassNameBox.hide();
                    ClassNameLabel.hide();

                    MethodNameBox.hide();
                    MethodNameLabel.hide();

                    ParameterNameBox.hide();
                    ParameterNameLabel.hide();


                }
                if(BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetField){
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

            //title for query recommendations
            var titleRow = $(SetupManager.trOpen+SetupManager.trClose);
            var titleCell = $(SetupManager.tdOpen+SetupManager.tdClose);
            titleRow.append(titleCell);
            var label = $("<text>Query Part Recommendations</text>");
            label.addClass("QueryTypeTitle");
            titleCell.append($("<hr>"));
            titleCell.append(label);
            titleCell.attr("align", "center");
            view.append(titleRow);

            //query Recommendations
            var recommendRow =$(SetupManager.trOpen+SetupManager.trClose);
            var recommendCell = $(SetupManager.tdOpen+SetupManager.tdClose);
            recommendRow.append(recommendCell);
            recommendCell.append(QueryRecommenderView.getView());
            view.append(recommendRow);

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
                query.displayValue = true;
                BuildQueryBoxView.addAndSubmit(query);

                truebox.prop('checked', false);

            });

            falsebox.click(function(){
                //access value of changed radio group with $(this).val()

                var query = new QueryModel(combo.val(), $(this).val());
                query.displayType = combo.find(":selected").text();
                query.displayValue = false;


                BuildQueryBoxView.addAndSubmit(query);

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

//                    if(query.displayType == "year") {
//                            var yearQuery = "["+queryBox.val()+"-01-01T00:00:00Z TO "+queryBox.val()+"-12-31T00:00:00Z]";
//                            query = new QueryModel(combo.val(), yearQuery);
//                            query.displayValue = queryBox.val();
//                            query.displayType = combo.find(":selected").text();
//                    }
                      BuildQueryBoxView.addAndSubmit(query);

                    queryBox.val("");

                }
            });

            //for method call queries
            var methodCallQueryFunction = function(){
                var query = null;
                var methodCallValue = '';
                if(ClassNameBox.val() != "") {
                    methodCallValue = methodCallValue + '%2B'
                        + QueryBucketModel.snippetMethodCallCallingClass + ':"' + ClassNameBox.val() + '"';
                }
                if(MethodNameBox.val() != "") {
                    methodCallValue = methodCallValue + '%2B' + QueryBucketModel.snippetMethodCallName
                        + ':"' +MethodNameBox.val()+ '"';
                }
                if(ParameterNameBox.val() != "") {

                    var params = String(ParameterNameBox.val()).split(/[ ,]+/);

                    var paramQuery = "";
                    for(var paramIndex = 0; paramIndex < params.length; paramIndex++){
                        if(paramQuery == ""){
                            paramQuery = '%2B' + QueryBucketModel.snippetMethodCallParameters
                                + ':'+'"'+params[paramIndex]+'"';
                        }else{
                            paramQuery = paramQuery +  '%2B' + QueryBucketModel.snippetMethodCallParameters
                                + ':'+'"'+params[paramIndex]+'"';
                        }

                    }

                    methodCallValue = methodCallValue + paramQuery+'';
                }
                query = new QueryModel(combo.val(), methodCallValue);
                query.displayType = combo.find(":selected").text();
                query.displayValue = ClassNameBox.val()+"."+MethodNameBox.val()+"("+ParameterNameBox.val()+")";
                BuildQueryBoxView.addAndSubmit(query);
                ClassNameBox.val("");
                MethodNameBox.val("");
                ParameterNameBox.val("");
            };

            //for method dec queries
            var methodDecQueryFunction = function(){
                var query = null;
                var methodCallValue = '';
                if(ClassNameBox.val() != "") {
                    methodCallValue = methodCallValue + '%2B'
                        + QueryBucketModel.snippetMethodDeclarationClass + ':"' + ClassNameBox.val() + '"';
                }
                if(MethodNameBox.val() != "") {
                    methodCallValue = methodCallValue + '%2B' + QueryBucketModel.snippetMethodDeclarationName
                        + ':"' +MethodNameBox.val()+ '"';
                }
                if(ParameterNameBox.val() != "") {

                    var params = String(ParameterNameBox.val()).split(/[ ,]+/);

                    var paramQuery = "";
                    for(var paramIndex = 0; paramIndex < params.length; paramIndex++){
                        if(paramQuery == ""){
                            paramQuery = '%2B' + QueryBucketModel.snippetMethodDeclarationParameters
                                + ':'+'"'+params[paramIndex]+'"';
                        }else{
                            paramQuery = paramQuery +  '%2B' + QueryBucketModel.snippetMethodDeclarationParameters
                                + ':'+'"'+params[paramIndex]+'"';
                        }

                    }

                    methodCallValue = methodCallValue + paramQuery+'';
                }
                query = new QueryModel(combo.val(), methodCallValue);
                query.displayType = combo.find(":selected").text();
                query.displayValue = ClassNameBox.val()+"."+MethodNameBox.val()+"("+ParameterNameBox.val()+")";
                BuildQueryBoxView.addAndSubmit(query);
                ClassNameBox.val("");
                MethodNameBox.val("");
                ParameterNameBox.val("");
            }




            //auto complete for method calls
            ClassNameBox.autocomplete({
                source: function( request, response ){
                    if(BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodCall)
                     QueryManager.submitAutoComplete(QueryBucketModel.snippetMethodCallCallingClass, request, response);
                    else
                        QueryManager.submitAutoComplete(QueryBucketModel.snippetMethodDeclarationClass, request, response);
                }
            });

            MethodNameBox.autocomplete({
                source: function( request, response ){
                    if(BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodCall)
                       QueryManager.submitAutoComplete(QueryBucketModel.snippetMethodCallName, request, response);
                    else
                        QueryManager.submitAutoComplete(QueryBucketModel.snippetMethodDeclarationName, request, response);
                }
            });

            ParameterNameBox.autocomplete({
                source: function( request, response ){
                    if(BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodCall)
                         QueryManager.submitAutoComplete(QueryBucketModel.snippetMethodCallParameters, request, response);
                    else
                        QueryManager.submitAutoComplete(QueryBucketModel.snippetMethodDeclarationParameters, request, response);
                }
            });

            //listening for enter
            ClassNameBox.keypress(function(e){
                if (e.keyCode == '13') {
                    e.preventDefault();
                    if(BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodCall)
                     methodCallQueryFunction();
                    else
                    methodDecQueryFunction();
                }
            });


            MethodNameBox.keypress(function(e){
                if (e.keyCode == '13') {
                    e.preventDefault();
                    if(BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodCall)
                        methodCallQueryFunction();
                    else
                        methodDecQueryFunction();
                }
            });

            ParameterNameBox.keypress(function(e){
                if (e.keyCode == '13') {
                    e.preventDefault();
                    if(BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodCall)
                        methodCallQueryFunction();
                    else
                        methodDecQueryFunction();
                }
            });



			return view
			
		},

        addAndSubmit: function(query){

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
//                    //make it lose focus so we can detect when user refocus on query it
//                    $(SetupManager.pound+SetupManager.queryInput_ID).blur();
//                var angle = 0;
//                SetupManager.rotateStatusVar = setInterval(function(){
//                    angle+=3;
//                    $(SetupManager.pound+SetupManager.statusIconID).rotate(angle);
//                },50);
            }

        }
		
}