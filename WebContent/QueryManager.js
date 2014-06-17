var QueryManager = {
	lowestPage : 0,
	highestPage : 0,
	maxPages : 0,
	totalResuls : 0,
	moveCount : 0,
	linkArray : new Array(),
	linkArrayData	:	new Array(),
	currentQuery	:	"*:*",
    currentChildQuery : "*:*",
	currentStart	:	0,
	topAuthors: new Array(),
	tagArray: new Array(),
	projectArray: new Array(),
	libArray: new Array(),
	granArray: new Array(),
	currentAutoCompleteField:	"",
	completeUserTyped : "",
	currentRequest : null,
	currentResponse : null,
	methodNameQuery : "",
	methodArgQuery : "",
	methodClassQuery : "",
    classExtendsQuery : "",
    classImplementsQuery : "",
    hasComments	: 	false,
    humanLanguageOfComments:	"",
    currentFQquery :    "",

	/**
	 * 
	 * @param query
	 * @returns
	 */
	setQuery	:	function(query){
		QueryManager.currentQuery = query;

	},

    setChildQuery	:	function(query){
        QueryManager.currentChildQuery = query;

    },

    setFQQuery  :   function(fqQuery){
        QueryManager.currentFQquery = fqQuery;
    },
	
	/**
	 * 
	 * @param query
	 * @param start
	 * @returns
	 */
	submitQuery : function() {
		Controller.setStatus("SEARCHING...");

		QueryManager.currentStart = 0;





		var url = URLQueryCreator.getQueryURL('on_data');

		$.getJSON(url);
		
		
		
	},
	
	submitSpellCheck	:	function(request,response,val){
		var url = 'http://grok.ics.uci.edu:8983/solr/CodeExchangeIndex/spell?q=(snippet_code:'+val+')'+
			'&rows=0&spellcheck=true&spellcheck.collate=true&indent=on&wt=json&callback=?&json.wrf=spellCheck';
		
		QueryManager.currentResponse = response;
		
		$.getJSON(url);
	},
	
	submitAutoComplete	:	function(field, request, response){
		if(Controller.currentStatus != "SEARCHING...")
			Controller.setStatus("Searching for autocomplete recommendations...");
		
		QueryManager.currentRequest = request;
		QueryManager.currentResponse = response;


        if(field == QueryBucketModel.snippetMethodCallCallingClass
            || field == QueryBucketModel.snippetMethodDeclarationClass)
            QueryManager.completeUserTyped = $(SetupManager.pound+QueryBucketModel.ClassBox).val();
        else if(field == QueryBucketModel.snippetMethodCallName
            || field == QueryBucketModel.snippetMethodDeclarationName)
            QueryManager.completeUserTyped = $(SetupManager.pound+QueryBucketModel.MethodBox).val();
        else if(field == QueryBucketModel.snippetMethodCallParameters
            || field == QueryBucketModel.snippetMethodDeclarationParameters)
            QueryManager.completeUserTyped = $(SetupManager.pound+QueryBucketModel.ParamBox).val();
        else
            QueryManager.completeUserTyped = $(SetupManager.pound+SetupManager.queryInput_ID).val();



		var queryFilter = QueryBucketModel.constructQuery();

        if(queryFilter == "")
            queryFilter = "*";

		var queryAutoComplete = "";

        var fieldShort = field+"_short";

        if( field != QueryBucketModel.snippetMethodCallCallingClass &&
            field != QueryBucketModel.snippetMethodCallName         &&
            field != QueryBucketModel.snippetMethodCallParameters   &&

            field != QueryBucketModel.snippetMethodDeclarationName   &&
            field != QueryBucketModel.snippetMethodDeclarationClass   &&
            field != QueryBucketModel.snippetMethodDeclarationParameters  ) {
            queryAutoComplete = 'http://' + URLQueryCreator.server + ':' + URLQueryCreator.port + '/solr/' + URLQueryCreator.collection + '/select/?' +
                'rows=0&q=' + queryFilter + '&facet=true' +
                '&facet.field=' + field +
                '&facet.mincount=1' + '&facet.limit=20' + '&facet.prefix=' + QueryManager.completeUserTyped +
                '&indent=on&wt=json&callback=?&json.wrf=autoCompleteCallBack';
        }else{
            queryAutoComplete = 'http://' + URLQueryCreator.server + ':' + URLQueryCreator.port + '/solr/' + URLQueryCreator.collection + '/select/?' +
                'rows=0&q=' + '*:*' + '&facet=true' +
                '&facet.field=' + field +
                '&facet.mincount=1' + '&facet.limit=20' + '&facet.prefix=' + QueryManager.completeUserTyped +
                '&indent=on&wt=json&callback=?&json.wrf=autoCompleteCallBack';
        }
		QueryManager.currentAutoCompleteField = field;
		
		$.getJSON(queryAutoComplete);

		
	},
	
	
	
	/**
	 * 
	 * @returns
	 */
	removePreviousLinks	: 	function(){	
			$(SetupManager.pound+SetupManager.pageNavigationDiv_ID).empty();
	},
	
	/**
	 * 
	 * @param pageNumber
	 * @param numberOfCells
	 * @returns
	 */
	movePagesDisplayed	:	function(pageNumber, numberOfCells){
		QueryManager.currentStart = (pageNumber * numberOfCells);
		QueryManager.nextResult();
	},
	

	/**
	 * Make Navigation widget
	 * @param numberOfResults
	 * @param numberOfCells
	 * @returns
	 */
	makeNavigation : function(numberOfResults, numberOfCells) {
		var numberOfLinks = Math.ceil(numberOfResults / numberOfCells);
		// clear links
		// $(SetupManager.pound+SetupManager.pageNavigationDiv_ID).empty();

		QueryManager.maxPages = numberOfLinks;

		QueryManager.lowestPage = 0;
		QueryManager.highestPage = 0;

		
		
		// set the max of links
		if (numberOfLinks > 10) {
			numberOfLinks = 10;
		}

		//setting highest page
		QueryManager.highestPage = numberOfLinks-1;
		
		
		//remove previous links
		QueryManager.removePreviousLinks();

		// right link
		var link = $(SetupManager.preOpen + ">" + SetupManager.preClose);
		link.addClass("LinkToPage");
		var id = "right";
		$(SetupManager.pound + SetupManager.pageNavigationDiv_ID).append(link);
		link.attr(SetupManager.ID_attr, id);

		// right link click function
		$(SetupManager.pound + id)
				.click(
						function() {
							Controller.setStatus("LOADING...");
							if (QueryManager.highestPage < QueryManager.maxPages-1) {
								
								$(".LinkToPage").removeClass("HighLightLink");
								
								// empty the link array elements
								for ( var i = 0; i < QueryManager.linkArray.length; i++) {
									$(
											SetupManager.pound
													+ QueryManager.linkArray[i])
											.empty();
							}

								QueryManager.moveCount = 0;
								for ( var i = 0; (QueryManager.highestPage + QueryManager.moveCount+1) < QueryManager.maxPages
										&& i <= (numberOfLinks-1); i++) {
									
									
									QueryManager.moveCount++;
									
									$(SetupManager.pound + QueryManager.linkArray[i])
											.append(" "+
													(QueryManager.highestPage + QueryManager.moveCount + 1)//plus one so does not visually start at 0
															+ " ");
									
									QueryManager.linkArrayData[i] = QueryManager.highestPage + QueryManager.moveCount;
									
									
									
								}

								
								QueryManager.lowestPage = QueryManager.highestPage+1;
								QueryManager.highestPage = QueryManager.highestPage
										+ QueryManager.moveCount;
								
								

							}
							
							QueryManager.movePagesDisplayed(QueryManager.lowestPage, numberOfCells);
							$(SetupManager.pound+"link0").addClass("HighLightLink");
							

						});

		// page numbers
			
		
		for ( var i = (numberOfLinks-1); i >= 0; i--) {
			
			(function(i) {
				var link = $(SetupManager.preOpen + SetupManager.preClose);
				link.append(" "+(i+1)+" "); //plus one so does not visually start at 0
				link.addClass("LinkToPage");
				var id = "link" + i;
				link.attr(SetupManager.ID_attr, id);

				QueryManager.linkArray[i] = id;
				QueryManager.linkArrayData[i] = i;


				$(SetupManager.pound + SetupManager.pageNavigationDiv_ID).append(link);
				
			//	alert($(SetupManager.pound + QueryManager.linkArray[i]).attr(SetupManager.ID_attr));


				
				if (i == 0)
					$(SetupManager.pound + id).addClass("HighLightLink");

				//click function
				$(SetupManager.pound + id)
						.click(
								function() {
									
									
									$(".LinkToPage").removeClass("HighLightLink");
									Controller.setStatus("LOADING...");
									
									$(".LinkToPage").removeClass(
											"HighLightLink");
									var page = SetupManager.pound + QueryManager.linkArray[i];
									$(page).addClass(
											"HighLightLink");

								
									QueryManager.movePagesDisplayed(QueryManager.linkArrayData[i], numberOfCells);
								});

			})(i);// notice the parameter at the end of this anonymous
					// function

		}

		// left link
		var link = $(SetupManager.preOpen + "<" + SetupManager.preClose);
		link.addClass("LinkToPage");
		var id = "left";
		$(SetupManager.pound + SetupManager.pageNavigationDiv_ID).append(link);
		link.attr(SetupManager.ID_attr, id);

		//left click function
		$(SetupManager.pound + id)
				.click(
						function() {
							Controller.setStatus("LOADING...");
							if (QueryManager.lowestPage > 0) {
								$(".LinkToPage").removeClass("HighLightLink");
								// empty the link array elements
								for ( var i = 0; i < QueryManager.linkArray.length; i++) {
									$(
											SetupManager.pound
													+ QueryManager.linkArray[i])
											.empty();
								}

								QueryManager.moveCount = 0;
								//going backwards because of the way i am substracting the move count
								for ( var i = (numberOfLinks-1); (QueryManager.lowestPage - (QueryManager.moveCount+1)) >= 0
										&& i >=0; i--) {
									QueryManager.moveCount++;
									
									$(
											SetupManager.pound
													+ QueryManager.linkArray[i])
											.append(" "+
													(QueryManager.lowestPage - QueryManager.moveCount + 1)//plus one so does not visually start at 0
															+ " ");
									
									QueryManager.linkArrayData[i] = QueryManager.lowestPage - QueryManager.moveCount;
									
									
								}

								QueryManager.highestPage = QueryManager.lowestPage-1;
								QueryManager.lowestPage = QueryManager.lowestPage
										- QueryManager.moveCount;
								
								

							}
							
							QueryManager.movePagesDisplayed(QueryManager.lowestPage, numberOfCells);
							$(SetupManager.pound+"link0").addClass("HighLightLink");
							
							

						});
	},

	/**
	 * 
	 * @param query
	 * @param start
	 * @returns
	 */
	nextResult : function() {
		
		var url = URLQueryCreator.getQueryURL('on_nextData');

		// alert(url);
		$.getJSON(url);
	},
	
	

	


};

/**
 *
 * @param data
 */
function facetCompleteCallBack(data){



    QueryRecommenderModel.clearRecommendedQueries();

    var snippet_variable_names_delimited = data.facet_counts.facet_fields.snippet_variable_names_delimited;


    for(i = 0; i<snippet_variable_names_delimited.length; i = i+2) {
        if(i >= 12)
            continue;

        var variableName = snippet_variable_names_delimited[i];

        if(variableName == "")
            continue;

        var query4 = new QueryModel(QueryBucketModel.snippetField, variableName);
        query4.displayType = "keywords";
        query4.displayValue = variableName;
        query4.score = snippet_variable_names_delimited[i+1];
        QueryRecommenderModel.addRecommendedQuery(query4);
    }





//    var projects = data.facet_counts.facet_fields.snippet_project_id;

//    for(i = 0; i<projects.length; i = i+2){
//        if(i >= 6)
//            continue;
//
//        var projectName = projects[i];
//
//
//        if(projectName == "")
//            continue;
//
//        var query1 = new QueryModel("snippet_project_id", projectName);
//        query1.displayType = "project";
//        query1.displayValue = projectName.substring(projectName.lastIndexOf("/")+1,projectName.length);
//        query1.score = projects[i+1];
//        QueryRecommenderModel.addRecommendedQuery(query1);
//    }

//    var authors = data.facet_counts.facet_fields.snippet_version_author;
//
//    for(i = 0; i<projects.length; i = i+2){
//        if(i >= 6)
//            continue;
//
//        var authorName = authors[i];
//
//
//        if(authorName == "")
//            continue;
//
//        var query1 = new QueryModel(QueryBucketModel.authorFiled, authorName);
//        query1.displayType = "author";
//        query1.displayValue = authorName;
//        query1.score = authors[i+1];
//        QueryRecommenderModel.addRecommendedQuery(query1);
//    }

    var snippet_imports = data.facet_counts.facet_fields.snippet_imports;

    for(i = 0; i<snippet_imports.length; i = i+2) {
        if(i >= 6)
            continue;

        var importName = snippet_imports[i];

        if(importName == "")
            continue;

        var query4 = new QueryModel(QueryBucketModel.snippetImportsFiled, importName);
        query4.displayType = "imports library";
        query4.displayValue = importName;
        query4.score = snippet_imports[i+1];
        QueryRecommenderModel.addRecommendedQuery(query4);
    }

    var extendsRecommend = data.facet_counts.facet_fields.snippet_extends;
    for(i = 0; i<extendsRecommend.length; i = i+2) {
        if(i >= 6)
            continue;

        var extendsName = extendsRecommend[i];

        if(extendsName == "")
            continue;

        var query2 = new QueryModel(QueryBucketModel.extendsField, extendsName);
        query2.displayType = "extends class";
        query2.displayValue = extendsName;
        query2.score = extendsRecommend[i+1];
        QueryRecommenderModel.addRecommendedQuery(query2);
    }

    var implementsRecommend = data.facet_counts.facet_fields.snippet_implements;
    for(i = 0; i<implementsRecommend.length; i = i+2) {
        if(i >= 6)
            continue;
        var implementsName = implementsRecommend[i];

        if(implementsName == "")
            continue;

        var query3 = new QueryModel(QueryBucketModel.implementsField, implementsName);
        query3.displayType = "implements interface";
        query3.displayValue = implementsName;
        query3.score = implementsRecommend[i+1];
        QueryRecommenderModel.addRecommendedQuery(query3);
    }
    QueryRecommenderView.update();
};


/**
 * Used to get next result
 * 
 * @param data
 */
function on_nextData(data) {
	var docs = data.response.docs;
	// lets clear all the displayed results
	Controller.clearAllCode();


	// let's populate the table with the results
	$.each(docs,
			function(i, item) {
				var resultLength = SetupManager.resultPreArray_ID.length;
				var metaLength = SetupManager.metaDivArray_ID.length;
				if (i < resultLength && i < metaLength) {

				//	var versions = item.snippet_all_versions;
				//	var correctVersion = versions[0];
				//	var wrongVersion = item.snippet_this_version;
					
					var url = String(item.snippet_address);
					//var correctURL = url.replace(wrongVersion,correctVersion);


					Controller.setCodeFromURL(i,SetupManager.resultPreArray_ID[i],
							url, item.snippet_address_upper_bound, item.snippet_address_lower_bound, item.snippet_method_invocations);
					Controller.setAuthorName(SetupManager.metaDivArray_ID[i], item.snippet_author_name);
					Controller.setProjectName(SetupManager.metaDivArray_ID[i],item.snippet_project_name, item.snippet_project_id);
                    Controller.setSizeReformulation(SetupManager.metaDivArray_ID[i],item.snippet_size);
                    Controller.setComplexityReformulation(SetupManager.metaDivArray_ID[i],item.snippet_path_complexity_class_sum);
                    Controller.setImportsReformulation(SetupManager.metaDivArray_ID[i],item.snippet_imports_count);
                    Controller.setFunctionCountReformulation(SetupManager.metaDivArray_ID[i],item.snippet_number_of_functions);

//                    if(item.snippet_granularity == "Class")
//                        Controller.setCodeComplexity(SetupManager.metaDivArray_ID[i],item.snippet_path_complexity_class_sum);
//                    else
//                        Controller.setCodeComplexity(SetupManager.metaDivArray_ID[i],item.snippet_path_complexity_method);
				}
				

			});
	// now highlight the code


	
	Controller.setStatus("DONE - Getting next page");
	clearInterval(SetupManager.rotateStatusVar);

    facetCompleteCallBack(data);

}

/**
 * had to generate dynamic callback names so that I could use jsonp and
 * to keep scope of the local params
 * @param name
 * @param metaDiv
 * @param count
 */
function getMetaData(name, classID, metaDiv, count){
	

	callback = 'classInfoCallBack'+count;
	
	
	var url = URLQueryCreator.getClassURL('"'+name+'"', callback);

	
	
	(function(div, url){
	
	$.getJSON(url, window[callback] = function(results) {
		
		
		(function(div, results){
			var docs = results.response.docs;
			$.each(docs,function(i, item) {
				//Controller.setAvatar(div,item.author_avatar);
				Controller.setAuthorName(div, name, item.author_type);
				Controller.setProjectName(div,projectName);
		  
			});
			
		}(div, results));
	});
		
	}(metaDiv, url));
	
		
 


	

	
}

/**
 * 
 * @param data
 */
// call back function when we get json
function on_data(data) {
	// alert("[on_data]");

	var docs = data.response.docs;
	var total = 'Found ' + data.response.numFound + ' results';

	QueryManager.totalResuls = data.response.numFound;

	// alert("found"+docs.length);

	// lets clear all the displayed results
	Controller.clearAllCode();
	
	// let's populate the table with the results
	$.each(docs,
			function(i, item) {
				var resultLength = SetupManager.resultPreArray_ID.length;
				var metaLength = SetupManager.metaDivArray_ID.length;
				if (i < resultLength && i < metaLength) {
				//	getMetaData(item.snippet_version_author, item.snippet_project_name, SetupManager.metaDivArray_ID[i],i);

					
				//	var versions = item.snippet_all_versions;
				//	var correctVersion = versions[0];
				//	var wrongVersion = item.snippet_this_version;
					
					var url = String(item.snippet_address);
				//	var correctURL = url.replace(wrongVersion,correctVersion);



                    var expandedChildren = data.expanded;

					Controller.setCodeFromURL(i,SetupManager.resultPreArray_ID[i],
							url, item.snippet_address_upper_bound, item.snippet_address_lower_bound, item.snippet_method_invocations,
                            expandedChildren, item.id);
					
					Controller.setAuthorName(SetupManager.metaDivArray_ID[i], item.snippet_author_name);
					Controller.setProjectName(SetupManager.metaDivArray_ID[i],item.snippet_project_name, item.snippet_project_id);
	//				Controller.setCodeChurn(SetupManager.metaDivArray_ID[i],item.snippet_changed_code_churn);
                    Controller.setSizeReformulation(SetupManager.metaDivArray_ID[i],item.snippet_size);
                    Controller.setComplexityReformulation(SetupManager.metaDivArray_ID[i],item.snippet_path_complexity_class_sum);
                    Controller.setImportsReformulation(SetupManager.metaDivArray_ID[i],item.snippet_imports_count);
                    Controller.setFunctionCountReformulation(SetupManager.metaDivArray_ID[i],item.snippet_number_of_functions);

                    //Controller.setCodeComplexity(SetupManager.metaDivArray_ID[i],item.snippet_path_complexity_method);
//                    if(item.snippet_granularity == "Class")
//                        Controller.setCodeComplexity(SetupManager.metaDivArray_ID[i],item.snippet_path_complexity_class_sum);
//                    else
//                        Controller.setCodeComplexity(SetupManager.metaDivArray_ID[i],item.snippet_path_complexity_method);








                }

			});
	
	// update status
	Controller.setStatus("DONE - " + total);

	QueryManager.makeNavigation(data.response.numFound, SetupManager.numberOfCells);
	
	clearInterval(SetupManager.rotateStatusVar);




    facetCompleteCallBack(data);
//	tagArray = data.facet_counts.facet_fields.snippet_tag;
//	projectArray = data.facet_counts.facet_fields.project;
//	libArray = data.facet_counts.facet_fields.snippet_imports;
//	granArray = data.facet_counts.facet_fields.snippet_granularity;
//	
//	QueryManager.populateFilters();
}




function spellCheck(data){
	var results = data.spellcheck.suggestions[1];
	if(results != false){
		var numFound = results.numFound;
		var suggestions = results.suggestion;
		var autoSpell = new Array();
		for(var i = 0; i<numFound; i++){
			autoSpell.push(suggestions[i].word);
		}
		var mappedResults = $.map( autoSpell, function( item ) {
            return {
              "label": item,
              "value": item
            };
          });
		
		QueryManager.currentResponse(mappedResults);
	}
	;
}
function autoCompleteCallBack(data){
	if(Controller.currentStatus != "SEARCHING...")
		Controller.setStatus("DONE - searching for autocomplete recommendations");
	
	if(QueryManager.currentAutoCompleteField == QueryBucketModel.extendsField){
		var results =  data.facet_counts.facet_fields.snippet_extends;
	}else if(QueryManager.currentAutoCompleteField == QueryBucketModel.implementsField){
		var results = data.facet_counts.facet_fields.snippet_implements;
	}else if(QueryManager.currentAutoCompleteField == QueryBucketModel.authorFiled){
        var results = data.facet_counts.facet_fields.snippet_version_author;
    }else if(QueryManager.currentAutoCompleteField == QueryBucketModel.projectField){
        var results = data.facet_counts.facet_fields.snippet_project_name;
    }else if(QueryManager.currentAutoCompleteField == QueryBucketModel.returnTypeField){
        var results = data.facet_counts.facet_fields.snippet_return_type;
    }else if(QueryManager.currentAutoCompleteField == QueryBucketModel.snippetImportsFiled){
        var results = data.facet_counts.facet_fields.snippet_imports;
    }else if(QueryManager.currentAutoCompleteField == QueryBucketModel.snippetMethodCallCallingClass){
        var results = data.facet_counts.facet_fields.snippet_method_invocation_calling_class;
    }
    else if(QueryManager.currentAutoCompleteField == QueryBucketModel.snippetMethodCallName){
        var results = data.facet_counts.facet_fields.snippet_method_invocation_name;
    }else if(QueryManager.currentAutoCompleteField == QueryBucketModel.snippetMethodCallParameters){
        var results = data.facet_counts.facet_fields.snippet_method_invocation_arg_types;
    }
    else if(QueryManager.currentAutoCompleteField == QueryBucketModel.snippetMethodDeclarationClass){
        var results = data.facet_counts.facet_fields.snippet_method_dec_declaring_class;
    }else if(QueryManager.currentAutoCompleteField == QueryBucketModel.snippetMethodDeclarationName){
        var results = data.facet_counts.facet_fields.snippet_method_dec_name;
    }else if(QueryManager.currentAutoCompleteField == QueryBucketModel.snippetMethodDeclarationParameters){
        var results = data.facet_counts.facet_fields.snippet_method_dec_parameter_types;
    }



//    else if(QueryManager.currentAutoCompleteField == QueryBucketModel.snippetMethodCallCallingClassShort) {
//        var results = data.facet_counts.facet_fields.snippet_method_invocation_calling_class_short;
//    }

    //recommend auto complete
    if(results.length > 0){
        var temp = new Array();
        for(var i = 0; i<results.length; i++){
            //skip the odds because those are frequency counts and not results
            if(i%2 != 0)
                continue;

            temp.push(results[i]);
        }
        var mappedResults = $.map( temp, function( item ) {
            return {
                "label": item,
                "value": item
            };
        });
        QueryManager.currentResponse(mappedResults);
    }

}

