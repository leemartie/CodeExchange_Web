/**
 * 
 */
var BuildQueryBoxView = {
		
		getView:	function(){
			var view = $(SetupManager.tableOpen+SetupManager.tableClose);
            //view.attr("cellpadding","5");

            //make title
            var titleRow = $(SetupManager.trOpen+SetupManager.trClose);
            var titleCell = $(SetupManager.tdOpen+SetupManager.tdClose);



            titleRow.append(titleCell);

            var addCell = $(SetupManager.tdOpen+SetupManager.tdClose);
            titleRow.append(addCell);

            var label = $("<div></div><text>Enter Query</text></div>");

            label.addClass("BuildQueryTitle");
            titleCell.append(label);
            titleCell.attr("align", "center");
          //  view.append(titleRow);

//flash for enter query
//            // set timeout
//            var tid = setTimeout(mycode(label), 500);
//
//            function mycode(label) {
//
//                label.animate({
//                    opacity: 0.3
//                }, 1500 );
//                label.animate({
//                    opacity: 1
//
//
//                }, 1500 );
//
//
//
//            }


            //row for query box
            var queryRow = $(SetupManager.trOpen+SetupManager.trClose);
            var queryCell = $(SetupManager.tdOpen+SetupManager.tdClose);
            queryRow.append(queryCell);
            var queryBox = $(SetupManager.inputOpen+SetupManager.inputClose);

            queryBox.attr(SetupManager.ID_attr,SetupManager.queryInput_ID);
            queryBox.autocomplete({
                source: function( request, response ){
                    QueryManager.submitAutoComplete(QueryBucketModel.snippetField, request, response);
//                    QueryManager.submitSpellCheck(request, response,queryBox.val());
                },
                focus: function() {
                    // prevent value inserted on focus
                    return false;
                },
                select: function( event, ui ) {
                    var terms = null;

                    if(BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodDec ||
                        BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodCall ) {
                        terms = queryBox.val().split(/[\s,]+/);
                    }else{
                        terms = queryBox.val().split(/[\s]+/);
                    }



                    // remove the current input
                    terms.pop();
                    // add the selected item
                    terms.push( ui.item.value );

//LOG IT
                    UsageLogger.addEvent(UsageLogger.AUTO_COMPLETE_SELECTED, null,  BuildQueryBoxModel.currentQueryType);

                    queryBox.val( terms.join( " " ) );
                    return false;
                }

            }).keyup(function (e) {
                if(e.which === 13) {
                    $(".ui-menu-item").hide();
                }
            });



            queryBox.width("98%");
            queryBox.attr(SetupManager.placeholder_attr, "type query and hit enter");



            queryBox.mouseover(function(event){
                queryBox.attr("title","hit enter in text box to submit query");
            });




            var queryLabel = $("<text>value</text><br/>");
            queryLabel.addClass("QueryTypeTitle");
            queryCell.attr("align", "center");
           // queryCell.append(queryLabel);
           // queryCell.append(queryBox);





            //this is for method invocations

            var ClassNameBox = $(SetupManager.inputOpen+SetupManager.inputClose);
            ClassNameBox.width("98%");
            var ClassNameLabel = $("<text>Class Name</text><br>");
            ClassNameBox.attr(SetupManager.ID_attr,QueryBucketModel.ClassBox);


            var MethodNameBox = $(SetupManager.inputOpen+SetupManager.inputClose);
            MethodNameBox.width("98%");
            var MethodNameLabel = $("<br><text>Method Name</text><br>");
            MethodNameBox.attr(SetupManager.ID_attr,QueryBucketModel.MethodBox);
            MethodNameBox.attr(SetupManager.placeholder_attr, "type method name");

            var ParameterNameBox = $(SetupManager.inputOpen+SetupManager.inputClose);
            ParameterNameBox.width("98%");
            ParameterNameBox.attr("placeholder","param 1, param 2, ...");
            var ParameterNameLabel = $("<br><text>Parameter Type</text><br>");
            ParameterNameBox.attr(SetupManager.ID_attr,QueryBucketModel.ParamBox);


            var ReturnTypeBox = $(SetupManager.inputOpen+SetupManager.inputClose);
            ReturnTypeBox.width("98%");
            var ReturnTypeLabel = $("<br><text>Return Type</text><br>");
            ReturnTypeBox.attr(SetupManager.ID_attr,QueryBucketModel.ReturnBox);


            queryCell.append(ClassNameLabel);
            queryCell.append(ClassNameBox);

            queryCell.append(MethodNameLabel);
            queryCell.append(MethodNameBox);

            queryCell.append(ParameterNameLabel);
            queryCell.append(ParameterNameBox);

            queryCell.append(ReturnTypeLabel);
            queryCell.append(ReturnTypeBox);

            ClassNameBox.hide();
            ClassNameLabel.hide();

            MethodNameBox.hide();
            MethodNameLabel.hide();

            ParameterNameBox.hide();
            ParameterNameLabel.hide();

            ReturnTypeBox.hide();
            ReturnTypeLabel.hide();

            ClassNameBox.mouseover(function(event){
                ClassNameBox.attr("title","hit enter in text box to submit query");
            });
            MethodNameBox.mouseover(function(event){
                MethodNameBox.attr("title","hit enter in text box to submit query");
            });
            ParameterNameBox.mouseover(function(event){
                ParameterNameBox.attr("title","hit enter in text box to submit query");
            });
            ReturnTypeBox.mouseover(function(event){
                ReturnTypeBox.attr("title","hit enter in text box to submit query");
            });

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

            queryCell.addClass("QueryInput");



            queryCell.width("100%");

            truebox.hide();
            trueboxLabel.hide();
            falsebox.hide();
            falseboxLabel.hide();

            //............Generic check box
            var checkboxGeneric = $(SetupManager.inputOpen+SetupManager.inputClose);
            var checkboxLabelGeneric = $("<text >generic</text>");
            checkboxGeneric.attr("type","checkbox");
            checkboxGeneric.attr("value","generic");



            queryCell.append(checkboxGeneric);
            queryCell.append(checkboxLabelGeneric);

            queryCell.width("100%");

            checkboxGeneric.hide();
            checkboxLabelGeneric.hide();

            //.................Variable Arguments check box
            var checkboxVarArgs = $(SetupManager.inputOpen+SetupManager.inputClose);
            var checkboxLabelVarArgs = $("<text >variable args</text>");
            checkboxVarArgs.attr("type","checkbox");
            checkboxVarArgs.attr("value","varArgs");


            queryCell.append(checkboxVarArgs);
            queryCell.append(checkboxLabelVarArgs);

            queryCell.width("100%");

            checkboxVarArgs.hide();
            checkboxLabelVarArgs.hide();

            //........add button.........

//
//            var icon  = $('<img width=16 height=16 src="http://level1router.ics.uci.edu/add.png"></img>');
//            icon.addClass("addQueryIcon");
//
//            var divBuffer = $('<div></div>');
//            divBuffer.addClass("topBuffer");
//            divBuffer.append(icon);
//
//            queryCell.append(divBuffer);
//            icon.click(function(event){
//                if(BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodCall) {
//                    methodCallQueryFunction();
//                }
//                else if(BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodDec) {
//                    methodDecQueryFunction();
//                }
//                else{
//                    var query = null;
//                    query = new QueryModel(combo.val(), queryBox.val());
//                    query.displayType = combo.find(":selected").text();
//                    query.displayValue = queryBox.val();
//                    BuildQueryBoxView.addAndSubmit(query);
//
//                    queryBox.val("");
//                }
//
//
//            });

            //...........................




            //combo box for query type
            var combo = $('<select name="queryType">'+
                '<option  style="background-color: #d4ebf2; color:black" disabled>Search by...</option>'+
                '<option  value="'+QueryBucketModel.snippetField+'" selected>keywords</option>'+
            //    '<option  style="background-color: #d4ebf2; color:black" disabled>Technical query</option>'+
                '<option  value="'+QueryBucketModel.extendsField+'">extends class</option>'+
                '<option  value="'+QueryBucketModel.implementsField+'">implements interface</option>'+
                '<option  value="'+QueryBucketModel.snippetImportsFiled+'">imports library</option>'+
                '<option  value="'+QueryBucketModel.snippetMethodCall+'">has method call</option>'+
                '<option  value="'+QueryBucketModel.snippetMethodDec+'">has method declaration</option>'+
                '<option  value="'+QueryBucketModel.snippetClassGeneric+'">is generic</option>'+
                '<option  value="'+QueryBucketModel.snippetClassAbstract+'">is abstract</option>'+
                '<option  value="'+QueryBucketModel.snippetClassWildCard+'">has wildcard</option>'+
                '<option  value="'+QueryBucketModel.snippetPackage+'">in package</option>'+
 //               '<option  value="'+QueryBucketModel.snippetInnerClass+'">is inner class</option>'+
  //              '<option  value="'+QueryBucketModel.snippetHasComments+'">has comments</option>'+

//                '<option  value="'+QueryBucketModel.methodNameField+'">method name</option>'+
//                '<option  value="'+QueryBucketModel.returnTypeField+'">return type</option>'+
//                '<option  value="'+QueryBucketModel.recursiveField+'">is recursive</option>'+
//                '<option  value="'+QueryBucketModel.varargsField+'">has variable arguments</option>'+
 //               '<option  style="background-color: #d4ebf2; color:black" disabled>Repository query</option>'+
//                '<option  value="'+QueryBucketModel.authorFiled+'">author</option>'+
                '<option  value="'+QueryBucketModel.projectField+'">project</option>'+
//                '<option  value="'+QueryBucketModel.humanLanguageOfComments+'">human language</option>'+
//                '<option  value="'+QueryBucketModel.lastUpdatedField+'">year</option>'+
//               '<option  value="'+QueryBucketModel.lastUpdatedField+'">month</option>'+
//                '<option  value="'+QueryBucketModel.lastUpdatedField+'">day</option>'+
                '</select>');

            combo.width("97%");


            var langShort = ['af','ar','bg','bn','cs','da',	'de','el','en',	'es',
                'et','fa','fi','fr','gu','he','hi',	'hr','hu','id','it',
                'ja','kn','ko','lt','lv','mk','ml','mr',
                'ne','nl','no',	'pa','pl','pt',	'ro','ru','sk',	'sl',
                'so', 'sq','sv','sw','ta','te',	'th','tl','tr',
                'uk','ur','vi','zh-cn',	'zh-tw'];
            var langLong = ['Afrikaans', 'Arabic', 'Bulgarian', 'Bengali', 'Czech',
                'Danish', 'German', 'Greek', 'English', 'Spanish',
                'Estonian', 'Persian', 'Finnish', 'French', 'Gujarati',
                'Hebrew', 'Hindi', 'Croatian', 'Hungarian', 'Indonesian',
                'Italian', 'Japanese', 'Kannada', 'Korean', 'Lithuanian',
                'Latvian', 'Macedonian', 'Malayalam', 'Marathi', 'Nepali',
                'Dutch', 'Norwegian','Punjabi','Polish','Portuguese',
                'Romanian',	'Russian',	'Slovak','Slovene',
                'Somali','Albanian','Swedish','Swahili',
                'Tamil','Telugu','Thai','Tagalog','Turkish',
                'Ukrainian','Urdu',	'Vietnamese','Simplified Chinese','Traditional Chinese'];

            //select language
            var selectLanguage = $("<select></select>");

            for(var i = 0; i <langShort.length; i++){
                var option = $('<option value="'+langShort[i]+'">'+langLong[i]+'</option>');

                if(langShort[i] == "en"){
                    option = $('<option selected="selected" value="'+langShort[i]+'">'+langLong[i]+'</option>');
                    QueryManager.humanLanguageOfComments = "en";
                }
                selectLanguage.append(option);

            }

            queryCell.append(selectLanguage);
            selectLanguage.hide();




            combo.change(function(event){
                BuildQueryBoxModel.currentQueryType = combo.val();

                if(BuildQueryBoxModel.currentQueryType == QueryBucketModel.humanLanguageOfComments){
                    selectLanguage.show();
                    queryBox.hide();
                    truebox.hide();
                    trueboxLabel.hide();
                    falsebox.hide();
                    falseboxLabel.hide();

                    checkboxGeneric.hide();
                    checkboxLabelGeneric.hide();
                    checkboxVarArgs.hide();
                    checkboxLabelVarArgs.hide();
                    ReturnTypeBox.hide();
                    ReturnTypeLabel.hide();

                    ClassNameBox.hide();
                    ClassNameLabel.hide();

                    MethodNameBox.hide();
                    MethodNameLabel.hide();

                    ParameterNameBox.hide();
                    ParameterNameLabel.hide();
                }
                else if(BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetClassGeneric ||
                    BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetClassAbstract ||
                    BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetClassWildCard ||
                    BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetInnerClass ||
                    BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetHasComments){
                    selectLanguage.hide();
                    queryBox.hide();
                    truebox.show();
                    trueboxLabel.show();
                    falsebox.show();
                    falseboxLabel.show();

                    checkboxGeneric.hide();
                    checkboxLabelGeneric.hide();
                    checkboxVarArgs.hide();
                    checkboxLabelVarArgs.hide();
                    ReturnTypeBox.hide();
                    ReturnTypeLabel.hide();

                    ClassNameBox.hide();
                    ClassNameLabel.hide();

                    MethodNameBox.hide();
                    MethodNameLabel.hide();

                    ParameterNameBox.hide();
                    ParameterNameLabel.hide();


                }else if(BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodCall){
                    ClassNameBox.attr(SetupManager.placeholder_attr, "class name (ex: java.util.hashmap)");

                    selectLanguage.hide();
                    ClassNameBox.show();
                    ClassNameLabel.show();

                    MethodNameBox.show();
                    MethodNameLabel.show();

                    MethodNameBox.attr(SetupManager.placeholder_attr, "method name (ex: put)");

                    ParameterNameBox.show();
                    ParameterNameLabel.show();

                    queryBox.hide();
                    truebox.hide();
                    falsebox.hide();
                    trueboxLabel.hide();
                    falseboxLabel.hide();

                    checkboxGeneric.hide();
                    checkboxLabelGeneric.hide();
                    checkboxVarArgs.hide();
                    checkboxLabelVarArgs.hide();
                    ReturnTypeBox.hide();
                    ReturnTypeLabel.hide();
                }else if(BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodDec){
                    selectLanguage.hide();
                    ClassNameBox.show();
                    ClassNameLabel.show();
                    ClassNameBox.attr(SetupManager.placeholder_attr, "class name");

                    MethodNameBox.show();
                    MethodNameLabel.show();
                    MethodNameBox.attr(SetupManager.placeholder_attr, "method name (ex: sort)");

                    ParameterNameBox.show();
                    ParameterNameLabel.show();

                    ReturnTypeBox.show();
                    ReturnTypeLabel.show();
                    ReturnTypeBox.attr(SetupManager.placeholder_attr, "type name (ex: java.lang.String)");

                    queryBox.hide();


                    checkboxGeneric.show();
                    checkboxLabelGeneric.show();

                    checkboxVarArgs.show();
                    checkboxLabelVarArgs.show();

                    truebox.hide();
                    trueboxLabel.hide();
                    falsebox.hide();
                    falseboxLabel.hide();

                }
                else{
                    selectLanguage.hide();
                    queryBox.show();
                    truebox.hide();
                    falsebox.hide();
                    trueboxLabel.hide();
                    falseboxLabel.hide();

                    checkboxGeneric.hide();
                    checkboxLabelGeneric.hide();
                    checkboxVarArgs.hide();
                    checkboxLabelVarArgs.hide();
                    ReturnTypeBox.hide();
                    ReturnTypeLabel.hide();


                    ClassNameBox.hide();
                    ClassNameLabel.hide();

                    MethodNameBox.hide();
                    MethodNameLabel.hide();

                    ParameterNameBox.hide();
                    ParameterNameLabel.hide();


                }

                queryBox.autocomplete({
                    source: function( request, response ){
                        QueryManager.submitAutoComplete(BuildQueryBoxModel.currentQueryType, request, response);
//                    QueryManager.submitSpellCheck(request, response,queryBox.val());


                    },
                    focus: function() {
                        // prevent value inserted on focus

                        return false;
                    },
                    select: function( event, ui ) {
                        var terms = null;

                        if(BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodDec ||
                            BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodCall ) {
                            terms = queryBox.val().split(/[\s,]+/);
                        }else{
                            terms = queryBox.val().split(/[\s]+/);
                        }



                        // remove the current input
                        terms.pop();
                        // add the selected item
                        terms.push( ui.item.value );

//LOG IT
                        UsageLogger.addEvent(UsageLogger.AUTO_COMPLETE_SELECTED, null,  BuildQueryBoxModel.currentQueryType);

                        queryBox.val( terms.join( " " ) );
                        return false;
                    }

                }).keyup(function (e) {
                    if(e.which === 13) {
                        $(".ui-menu-item").hide();
                    }
                });
            });


            //row for query type
            var queryTypeRow = $(SetupManager.trOpen+SetupManager.trClose);
            var queryTypeCell = $(SetupManager.tdOpen+SetupManager.tdClose);
            queryTypeRow.append(queryTypeCell);
            var queryTypeLabel = $("<text>type</text>");
            queryTypeLabel.addClass("QueryTypeTitle");
          //  queryTypeCell.append(queryTypeLabel);
            queryTypeCell.append(combo);
            queryTypeCell.attr("align", "center");
            combo.addClass("QueryCell");

            //view.append(queryTypeRow);

            //view.append(queryRow);


            var currentQuery = $(SetupManager.tableOpen+SetupManager.tableClose);
            //var currentQueryRow = (SetupManager.trOpen+SetupManager.trClose);
            currentQuery.addClass("BucketView");

            //title for bucket
            var titleRow = $(SetupManager.trOpen+SetupManager.trClose);


            var titleCell = $(SetupManager.tdOpen+SetupManager.tdClose);
            titleRow.append(titleCell);
            var label = $("<text>Current Query</text>");
            label.addClass("BuildQueryTitle");
           // titleCell.append($("<hr>"));
            titleCell.append(label);
            titleCell.attr("align", "center");
            currentQuery.append(titleRow);

            //row for query bucket
            var queryBucketCellInParentTable = $(SetupManager.tdOpen+SetupManager.tdClose);

            queryBucketCellInParentTable.append(QueryBucketView.getView());
            queryBucketCellInParentTable.attr("valign","bottom");
            var queryBucketRowInParentTable = $(SetupManager.trOpen+SetupManager.trClose);
            queryBucketRowInParentTable.append(queryBucketCellInParentTable);

            currentQuery.append(queryBucketRowInParentTable);

            var rowCell = $(SetupManager.trOpen+SetupManager.tdOpen+SetupManager.tdClose+SetupManager.trClose);
            rowCell.append(currentQuery);

            view.append(rowCell);

            var recommendationsTable = $(SetupManager.tableOpen+SetupManager.tableClose);
            //var currentQueryRow = (SetupManager.trOpen+SetupManager.trClose);
            recommendationsTable.addClass("BucketView");

 //title for query recommendations
            var titleRow = $(SetupManager.trOpen+SetupManager.trClose);
            var titleCell = $(SetupManager.tdOpen+SetupManager.tdClose);
            titleRow.append(titleCell);
            var label = $("<text>Recommendations</text>");
            label.addClass("BuildQueryTitle");
           // titleCell.append($("<hr>"));
            titleCell.append(label);
            titleCell.attr("align", "center");
            recommendationsTable.append(titleRow);

            //query Recommendations
            var recommendRow =$(SetupManager.trOpen+SetupManager.trClose);
            var recommendCell = $(SetupManager.tdOpen+SetupManager.tdClose);
            recommendRow.append(recommendCell);
            recommendCell.append(QueryRecommenderView.getView());
            recommendCell.addClass("recommendCell");
            recommendationsTable.append(recommendRow);

            var rowCell = $(SetupManager.trOpen+SetupManager.tdOpen+SetupManager.tdClose+SetupManager.trClose);
            rowCell.append(recommendationsTable);
            view.append(rowCell);


   //buttons
            var buttonTable = $(SetupManager.tableOpen+SetupManager.tableClose);
            //var currentQueryRow = (SetupManager.trOpen+SetupManager.trClose);
            buttonTable.addClass("BucketView");
            var buttonRow =$(SetupManager.trOpen+SetupManager.trClose);
            var buttonCell = $(SetupManager.tdOpen+SetupManager.tdClose);
            buttonRow.append(buttonCell);
            buttonCell.append(QueryTrailNavView.getView());

            buttonTable.append(buttonRow);

            var buttonCell = $(SetupManager.trOpen+SetupManager.tdOpen+SetupManager.tdClose+SetupManager.trClose);
            buttonCell.append(buttonTable);
            view.append(buttonCell);

            truebox.click(function(){
                //access value of changed radio group with $(this).val()

                var query = new QueryModel(combo.val(), $(this).val());
                query.displayType = combo.find(":selected").text();
                query.displayValue = true;
                BuildQueryBoxView.addAndSubmit(query);
//LOG IT
                //LOG IT
                UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Builder),query);

                //truebox.prop('selected', $(this).val());

            });

            falsebox.click(function(){
                //access value of changed radio group with $(this).val()

                var query = new QueryModel(combo.val(), $(this).val());
                query.displayType = combo.find(":selected").text();
                query.displayValue = false;


                BuildQueryBoxView.addAndSubmit(query);
//LOG IT
                //LOG IT
                UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Builder),query);

                //falsebox.prop('selected', $(this).val());

            });


//add keypress  for 'enter' listener to submit query
            queryBox.keypress(function(e) {
                if (e.keyCode == '13') {
                    e.preventDefault();

                    var query = null;
                    query = new QueryModel(combo.val(), queryBox.val());
                    query.displayType = combo.find(":selected").text();
                    query.displayValue = queryBox.val();

                      BuildQueryBoxView.addAndSubmit(query);

//LOG IT
                    //LOG IT
                    UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Builder),query);

                    queryBox.val("");

                }
            });

            //for method call queries
            var methodCallQueryFunction = function(){
                var query = null;
                var methodCallValue = '';
                if(ClassNameBox.val() != "") {
                    methodCallValue = methodCallValue + '%2B'
                        + QueryBucketModel.snippetMethodCallDecClass + ':"' + ClassNameBox.val() + '"';

                    if(!(/^[a-zA-Z0-9_.,><]+$/.test(ClassNameBox.val()))){
                        Controller.setStatus("Please enter only alphanumeric, "+
                            "underscore, period, comma, less than, or greater than characters for class name...");
                        return;
                    }
                }
                if(MethodNameBox.val() != "") {
                    methodCallValue = methodCallValue + '%2B' + QueryBucketModel.snippetMethodCallName
                        + ':"' +MethodNameBox.val()+ '"';

                    if(!(/^[a-zA-Z0-9_.,><]+$/.test(MethodNameBox.val()))){
                        Controller.setStatus("Please enter only alphanumeric, "+
                            "underscore, period, comma, less than, or greater than characters for method name...");
                        return;
                    }
                }
                if(ParameterNameBox.val() != "") {

                    var params = String(ParameterNameBox.val()).split(/[ ,]+/);

                    var paramsWithCount =  BuildQueryBoxView.appendWithCount(params);

                    var paramQuery = "";
                    for(var paramIndex = 0; paramIndex < paramsWithCount.length; paramIndex++){
                        if(paramQuery == ""){
                            paramQuery = '%2B' + QueryBucketModel.snippetMethodCallParameters
                                + ':'+'"'+paramsWithCount[paramIndex]+'"';
                        }else{
                            paramQuery = paramQuery +  '%2B' + QueryBucketModel.snippetMethodCallParameters
                                + ':'+'"'+paramsWithCount[paramIndex]+'"';
                        }

                        if(!(/^[a-zA-Z0-9_.,><]+$/.test(paramsWithCount[paramIndex]))){
                            Controller.setStatus("Please enter only alphanumeric, "+
                                "underscore, period, comma, less than, or greater than characters for parameter names...");
                            return;
                        }

                    }

                    methodCallValue = methodCallValue + paramQuery+'';
                }
                query = new QueryModel(combo.val(), methodCallValue);
                query.displayType = combo.find(":selected").text();
                query.displayValue = ClassNameBox.val()+"."+MethodNameBox.val()+"("+ParameterNameBox.val()+")";
                BuildQueryBoxView.addAndSubmit(query);

                //LOG IT
                UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Builder),query);

                ClassNameBox.val("");
                MethodNameBox.val("");
                ParameterNameBox.val("");
            };

            var testCharacters = function(){

            }

            //for method dec queries
            var methodDecQueryFunction = function(){
                var query = null;
                var methodCallValue = '';



                if(ReturnTypeBox.val() != "") {
                    methodCallValue = methodCallValue + '%2B'
                        + QueryBucketModel.snippetMethodDeclarationReturn + ':"' + ReturnTypeBox.val() + '"';

                    if(!(/^[a-zA-Z0-9_.,><]+$/.test(ReturnTypeBox.val()))){
                        Controller.setStatus("Please enter only alphanumeric, "+
                            "underscore, period, comma, less than, or greater than characters for return type...");
                        return;
                    }
                }

                if(checkboxGeneric[0].checked) {
                    methodCallValue = methodCallValue + '%2B'
                        + QueryBucketModel.snippetMethodDeclarationGeneric + ':"' + true + '"';
                }

                if(checkboxVarArgs[0].checked) {
                    methodCallValue = methodCallValue + '%2B'
                        + QueryBucketModel.snippetMethodDeclarationVarArgs + ':"' + true + '"';
                }

                if(ClassNameBox.val() != "") {
                    methodCallValue = methodCallValue + '%2B'
                        + QueryBucketModel.snippetMethodDeclarationClass + ':"' + ClassNameBox.val() + '"';

                    if(!(/^[a-zA-Z0-9_.,><]+$/.test(ClassNameBox.val()))){
                        Controller.setStatus("Please enter only alphanumeric, "+
                            "underscore, period, comma, less than, or greater than characters for class name...");
                        return;
                    }
                }
                if(MethodNameBox.val() != "") {
                    methodCallValue = methodCallValue + '%2B' + QueryBucketModel.snippetMethodDeclarationName
                        + ':"' +MethodNameBox.val()+ '"';

                    if(!(/^[a-zA-Z0-9_.,><]+$/.test(MethodNameBox.val()))){
                        Controller.setStatus("Please enter only alphanumeric, "+
                            "underscore, period, comma, less than, or greater than characters for method name...");
                        return;
                    }
                }
                if(ParameterNameBox.val() != "") {

                    var params = String(ParameterNameBox.val()).split(/[ ,]+/);

                    var paramsWithCount =  BuildQueryBoxView.appendWithCount(params);

                    var paramQuery = "";
                    for(var paramIndex = 0; paramIndex < paramsWithCount.length; paramIndex++){
                        if(paramQuery == ""){
                            paramQuery = '%2B' + QueryBucketModel.snippetMethodDeclarationParameters
                                + ':'+'"'+paramsWithCount[paramIndex]+'"';
                        }else{
                            paramQuery = paramQuery +  '%2B' + QueryBucketModel.snippetMethodDeclarationParameters
                                + ':'+'"'+paramsWithCount[paramIndex]+'"';
                        }

                        if(!(/^[a-zA-Z0-9_.,><]+$/.test(paramsWithCount[paramIndex]))){
                            Controller.setStatus("Please enter only alphanumeric, "+
                                "underscore, period, comma, less than, or greater than characters for parameter names...");
                            return;
                        }

                    }

                    methodCallValue = methodCallValue + paramQuery+'';
                }
                query = new QueryModel(combo.val(), methodCallValue);
                query.displayType = combo.find(":selected").text();
                query.displayValue = ReturnTypeBox.val()+':'+ClassNameBox.val()+"."+
                    MethodNameBox.val()+"("+ParameterNameBox.val()+")";

                if(checkboxGeneric[0].checked){
                    query.displayValue = "[generic]" + query.displayValue;
                }
                if(checkboxVarArgs[0].checked){
                    query.displayValue = "[var args]" + query.displayValue;
                }

                BuildQueryBoxView.addAndSubmit(query);

                //LOG IT
                UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Builder),query);

                ClassNameBox.val("");
                MethodNameBox.val("");
                ParameterNameBox.val("");
                ReturnTypeBox.val("");
            }




            //auto complete for method calls
            ClassNameBox.autocomplete({
                source: function( request, response ){
                    if(BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodCall) {
                        QueryManager.submitAutoComplete(QueryBucketModel.snippetMethodCallCallingClass, request, response);

                    }
                    else {
                        QueryManager.submitAutoComplete(QueryBucketModel.snippetMethodDeclarationClass, request, response);

                    }
                },
                //logging selection of autocomplete function
                select: function( event, ui ) {
                    if(BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodCall) {
//LOG IT
                        UsageLogger.addEvent(UsageLogger.AUTO_COMPLETE_SELECTED, null,
                            QueryBucketModel.snippetMethodCallCallingClass);
                    }
                    else {
//LOG IT
                        UsageLogger.addEvent(UsageLogger.AUTO_COMPLETE_SELECTED, null,
                            QueryBucketModel.snippetMethodDeclarationClass);
                    }

                    return false;
                }
            }).keyup(function (e) {
                if(e.which === 13) {
                    $(".ui-menu-item").hide();
                }
            });;

            MethodNameBox.autocomplete({
                source: function( request, response ){
                    if(BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodCall) {
                        QueryManager.submitAutoComplete(QueryBucketModel.snippetMethodCallName, request, response);
                    }
                    else {
                        QueryManager.submitAutoComplete(QueryBucketModel.snippetMethodDeclarationName, request, response);
                    }
                },
                //logging selection of autocomplete function
                select: function( event, ui ) {
                    if(BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodCall) {
                        //LOG IT
                        UsageLogger.addEvent(UsageLogger.AUTO_COMPLETE_SELECTED, null,
                            QueryBucketModel.snippetMethodCallName);
                    }
                    else {
                        //LOG IT
                        UsageLogger.addEvent(UsageLogger.AUTO_COMPLETE_SELECTED, null,
                            QueryBucketModel.snippetMethodDeclarationName);
                    }

                    return false;
                }
            }).keyup(function (e) {
                if(e.which === 13) {
                    $(".ui-menu-item").hide();
                }
            });;

            ParameterNameBox.autocomplete({
                source: function( request, response ){
                    if(BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodCall) {
                        QueryManager.submitAutoComplete(QueryBucketModel.snippetMethodCallParameters, request, response);
                    }
                    else {
                        QueryManager.submitAutoComplete(QueryBucketModel.snippetMethodDeclarationParameters, request, response);
                    }
                },
                focus: function() {
                    // prevent value inserted on focus
                    return false;
                },
                select: function( event, ui ) {
                    var terms = null;

                    if(BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodDec ||
                        BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodCall ) {
                        terms = ParameterNameBox.val().split(/[\s,]+/);
                    }else{
                        terms = ParameterNameBox.val().split(/[\s]+/);
                    }



                    // remove the current input
                    terms.pop();
                    // add the selected item
                    terms.push( ui.item.value );

                    ParameterNameBox.val( terms.join( ", " ) );

                    //LOG IT
                    if(BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodCall) {
                        //LOG IT
                        UsageLogger.addEvent(UsageLogger.AUTO_COMPLETE_SELECTED, null,
                            QueryBucketModel.snippetMethodCallParameters);
                    }
                    else {
                        //LOG IT
                        UsageLogger.addEvent(UsageLogger.AUTO_COMPLETE_SELECTED, null,
                            QueryBucketModel.snippetMethodDeclarationParameters);
                    }

                    return false;
                }
            }).keyup(function (e) {
                if(e.which === 13) {
                    $(".ui-menu-item").hide();
                }
            });;

            ReturnTypeBox.autocomplete({
                source: function( request, response ){
                        QueryManager.submitAutoComplete(QueryBucketModel.snippetMethodDeclarationReturn, request, response);
                }
            }).keyup(function (e) {
                if(e.which === 13) {
                    $(".ui-menu-item").hide();
                }
            });;

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


            ReturnTypeBox.keypress(function(e){
                if (e.keyCode == '13') {
                    e.preventDefault();
                    methodDecQueryFunction();

                }
            });

			return view
			
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