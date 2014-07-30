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


    numFound : 0,

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
	
	submitAutoComplete	:	function(field, request, response, words){
		if(Controller.currentStatus != "SEARCHING...")
			Controller.setStatus("Searching for autocomplete recommendations...");
		
		QueryManager.currentRequest = request;
		QueryManager.currentResponse = response;




        if(field == QueryBucketModel.snippetMethodCallCallingClass
            || field == QueryBucketModel.snippetMethodDeclarationClass)
            QueryManager.completeUserTyped = words;
        else if(field == QueryBucketModel.snippetMethodCallName
            || field == QueryBucketModel.snippetMethodDeclarationName)
            QueryManager.completeUserTyped = words;
        else if(field == QueryBucketModel.snippetMethodCallParameters
            || field == QueryBucketModel.snippetMethodDeclarationParameters) {

          //  var words = $(SetupManager.pound + QueryBucketModel.ParamBox).val();
            words = words.split(/[\s,]+/);
            QueryManager.completeUserTyped = words[words.length-1];
        }
        else if(field == QueryBucketModel.snippetMethodDeclarationReturn)
            QueryManager.completeUserTyped = words;
        else{
         //   var words = $(SetupManager.pound + SetupManager.queryInput_ID).val();
            words = words.split(/[\s]+/);
            QueryManager.completeUserTyped = words[words.length-1];
        }


        //keyword completion
        if(field == QueryBucketModel.snippetField){
            field = QueryBucketModel.snippet_variable_names_delimited;

        }


		var queryFilter = QueryBucketModel.constructQuery();

        if(queryFilter == "")
            queryFilter = "*";

		var queryAutoComplete = "";

        var fieldShort = field+"_short";

        if( field != QueryBucketModel.snippetMethodCallCallingClass &&
            field != QueryBucketModel.snippetMethodCallName         &&
            field != QueryBucketModel.snippetMethodCallParameters   &&

            field != QueryBucketModel.snippetMethodDeclarationName   &&
            field != QueryBucketModel.snippetMethodDeclarationReturn   &&
            field != QueryBucketModel.snippetMethodDeclarationClass   &&
            field != QueryBucketModel.snippetMethodDeclarationParameters  ) {
            queryAutoComplete = 'http://' + URLQueryCreator.server + ':' + URLQueryCreator.port + '/solr/' + URLQueryCreator.collection + '/select/?' +
                'rows=0&q=' + queryFilter + '&facet=true' +
                '&facet.field=' + field +
                '&facet.mincount=1' + '&facet.limit=20' + '&facet.prefix=' + QueryManager.completeUserTyped.toLowerCase() +
                '&indent=on&wt=json&callback=?&json.wrf=autoCompleteCallBack';
        }else{
            queryAutoComplete = 'http://' + URLQueryCreator.server + ':' + URLQueryCreator.port + '/solr/' + URLQueryCreator.collection + '/select/?' +
                'rows=0&q=' + '*:*' + '&facet=true' +
                '&facet.field=' + field +
                '&facet.mincount=1' + '&facet.limit=20' + '&facet.prefix=' + QueryManager.completeUserTyped.toLowerCase() +
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
//LOG IT
        UsageLogger.addEvent(UsageLogger.PAGE_CHANGE,null,(QueryManager.currentStart/SetupManager.numberOfCells)+1);

	}
	
	

	


};

function getIntersectionImports(docs){
    $.each(docs,
        function(i, item) {

            var imports = item.snippet_imports;
            $.each(docs,
                function(j, item) {

                    if(j<=i){
                        return;
                    }


                }
            );

        });


}

/**
 *
 * @param data
 */
function facetCompleteCallBack(data){



    QueryRecommenderModel.clearRecommendedQueries();

    var snippet_variable_names_delimited = data.facet_counts.facet_fields.snippet_variable_names_delimited;

    //data.facet_counts.facet_fields.snippet_class_name_delimited;

    var keywordMax = 12;

    var wordsSuggested = "";

    for(i = 0; i<snippet_variable_names_delimited.length; i = i+2) {
        if(i >= keywordMax)
            continue;

        var variableName = snippet_variable_names_delimited[i];

        if(variableName == null)
            continue;

 //skipping suggestions that are empty or only 1 character long
        if(variableName == "" || variableName.length == 1) {
            keywordMax = keywordMax +2;
            continue;
        }

//seeing if it is already in suggestions or a singular form of a plural
        if(wordsSuggested.indexOf(variableName) > -1 || wordsSuggested.indexOf(variableName+'s') > -1
            || wordsSuggested.indexOf(variableName.substring(0,variableName.length-1)) > -1){
            keywordMax = keywordMax +2;
            continue;
        }

//testing if it is in keywords already
        if(QueryBucketModel.hasQuery(variableName.toLowerCase(), QueryBucketModel.snippetField)){
            keywordMax = keywordMax +2;
            continue;
        }

        wordsSuggested = wordsSuggested +" "+variableName;
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
    keywordMax = 6;

    for(i = 0; i<snippet_imports.length; i = i+2) {
        if(i >= keywordMax)
            continue;

        var importName = snippet_imports[i];

        if(importName == null)
            continue;

        if(importName == "")
            continue;

//testing if it is in keywords already
        if(QueryBucketModel.hasQuery(importName.toLowerCase(), QueryBucketModel.snippetImportsFiled)){
            keywordMax = keywordMax +2;
            continue;
        }

        var query4 = new QueryModel(QueryBucketModel.snippetImportsFiled, importName);
        query4.displayType = "imports library";
        query4.displayValue = importName;
        query4.score = snippet_imports[i+1];
        QueryRecommenderModel.addRecommendedQuery(query4);
    }

    var extendsRecommend = data.facet_counts.facet_fields.snippet_extends;
    keywordMax = 6;
    for(i = 0; i<extendsRecommend.length; i = i+2) {
        if(i >= keywordMax)
            continue;

        var extendsName = extendsRecommend[i];

        if(extendsName == null)
            continue;

        if(extendsName == "")
            continue;

        //testing if it is in keywords already
        if(QueryBucketModel.hasQuery(extendsName.toLowerCase(), QueryBucketModel.extendsField)){
            keywordMax = keywordMax +2;
            continue;
        }

        var query2 = new QueryModel(QueryBucketModel.extendsField, extendsName);
        query2.displayType = "extends class";
        query2.displayValue = extendsName;
        query2.score = extendsRecommend[i+1];
        QueryRecommenderModel.addRecommendedQuery(query2);
    }

    var implementsRecommend = data.facet_counts.facet_fields.snippet_implements;
    keywordMax = 6;
    for(i = 0; i<implementsRecommend.length; i = i+2) {
        if(i >= keywordMax)
            continue;
        var implementsName = implementsRecommend[i];

        if(implementsName == null)
            continue;

        if(implementsName == "")
            continue;

//testing if it is in keywords already
        if(QueryBucketModel.hasQuery(implementsName.toLowerCase(), QueryBucketModel.implementsField)){
            keywordMax = keywordMax +2;
            continue;
        }
        var query3 = new QueryModel(QueryBucketModel.implementsField, implementsName);
        query3.displayType = "implements interface";
        query3.displayValue = implementsName;
        query3.score = implementsRecommend[i+1];
        QueryRecommenderModel.addRecommendedQuery(query3);
    }
    QueryRecommenderView.update();
};

function retry(data){
    var docs = data.response.docs;

}

/**
 * Used to get next result
 * 
 * @param data
 */
function on_nextData(data) {
	var docs = data.response.docs;
	// lets clear all the displayed results
	Controller.clearAllCode();

    $(SetupManager.pound+"backgroundSave")
        .append($("#"+SetupManager.expandBtnArray_ID[0]));
    $(SetupManager.pound+"projectURL"+0).empty();
    $(SetupManager.pound+"backgroundSave")
        .append($("#"+SetupManager.expandBtnArray_ID[1]));
    $(SetupManager.pound+"projectURL"+1).empty();
    $(SetupManager.pound+"backgroundSave")
        .append($("#"+SetupManager.expandBtnArray_ID[2]));
    $(SetupManager.pound+"projectURL"+2).empty();

    var total = 'Found ' + data.response.numFound + ' results';
	// let's populate the table with the results


    var successCount = 0;
    $.each(docs,
        function(i, item) {

            if(successCount < 3){


                var codeURL = String(item.snippet_address);

                var url = "http://codeexchange.ics.uci.edu/getPage.php?url=" + codeURL + "&callback=?&json.wrf=displayCode";
                $.getJSON(url).fail(function (data, textStatus, jqXHR) {

                }).success(function (data, textStatus, jqXHR) {
                    $.each(data, function (index, element) {
                        if (successCount < 3) {
                            //we are leaking into the next page so need to increase page offset

                            var code = element;

                            var resultLength = SetupManager.resultPreArray_ID.length;
                            var metaLength = SetupManager.metaDivArray_ID.length;

                            var url = String(item.snippet_address);


                            var expandedChildren = data.expanded;

                            Controller.setCodeFromURL(successCount, SetupManager.resultPreArray_ID[successCount],
                                url, item.snippet_address_upper_bound, item.snippet_address_lower_bound, item.snippet_method_invocations,
                                expandedChildren, item.id, item.snippet_extends, item.snippet_implements,
                                item.snippet_project_address, item.snippet_this_version, code);

                            Controller.setProjectName(SetupManager.metaDivArray_ID[successCount], item.snippet_project_name, item.snippet_project_id);
                            Controller.setSizeReformulation(SetupManager.metaDivArray_ID[successCount], item.snippet_size);
                            Controller.setComplexityReformulation(SetupManager.metaDivArray_ID[successCount], item.snippet_path_complexity_class_sum);
                            Controller.setImportsReformulation(SetupManager.metaDivArray_ID[successCount], item.snippet_imports_count);




                            successCount++;
                        }

                    });//each

                });//success

            }

        }//function
    );




	Controller.setStatus("DONE");
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


function collectFirstExists(URLs){
    var urlsThatExist = new Array();

    $.getJSON(url).fail(function(data, textStatus, jqXHR) {
        return false;

    }).success(function(data, textStatus, jqXHR ) {
        return true;
    });

    return urlsThatExist;
}

function testExists(codeURL){
    var url = "http://codeexchange.ics.uci.edu/getPage.php?url="+codeURL+"&callback=?&json.wrf=displayCode";


    $.getJSON(url).fail(function(data, textStatus, jqXHR) {
        return false;

    }).success(function(data, textStatus, jqXHR ) {
        return true;
    });

return true;
}

/**
 * 
 * @param data
 */
// call back function when we get json
function on_data(data) {
	// alert("[on_data]");
    $(SetupManager.pound+"backgroundSave")
        .append($("#"+SetupManager.expandBtnArray_ID[0]));
    $(SetupManager.pound+"projectURL"+0).empty();
    $(SetupManager.pound+"backgroundSave")
        .append($("#"+SetupManager.expandBtnArray_ID[1]));
    $(SetupManager.pound+"projectURL"+1).empty();
    $(SetupManager.pound+"backgroundSave")
        .append($("#"+SetupManager.expandBtnArray_ID[2]));
    $(SetupManager.pound+"projectURL"+2).empty();
	var docs = data.response.docs;
	var total = 'Found ' + data.response.numFound + ' results';

	QueryManager.totalResuls = data.response.numFound;

	// alert("found"+docs.length);

	// lets clear all the displayed results
	Controller.clearAllCode();


    var successCount = 0;
    $.each(docs,
        function(i, item) {

            if(successCount < 3){


            var codeURL = String(item.snippet_address);

            var url = "http://codeexchange.ics.uci.edu/getPage.php?url=" + codeURL + "&callback=?&json.wrf=displayCode";
            $.getJSON(url).fail(function (data, textStatus, jqXHR) {

            }).success(function (data, textStatus, jqXHR) {
                $.each(data, function (index, element) {
                    if (successCount < 3) {
                        //we are leaking into the next page so need to increase page offset
                        if(i >= 3){
                            QueryManager.missOffset++;
                        }
                    var code = element;

                    var resultLength = SetupManager.resultPreArray_ID.length;
                    var metaLength = SetupManager.metaDivArray_ID.length;

                    var url = String(item.snippet_address);


                    var expandedChildren = data.expanded;

                    Controller.setCodeFromURL(successCount, SetupManager.resultPreArray_ID[successCount],
                        url, item.snippet_address_upper_bound, item.snippet_address_lower_bound, item.snippet_method_invocations,
                        expandedChildren, item.id, item.snippet_extends, item.snippet_implements,
                        item.snippet_project_address, item.snippet_this_version, code);

                    Controller.setProjectName(SetupManager.metaDivArray_ID[successCount], item.snippet_project_name, item.snippet_project_id);
                    Controller.setSizeReformulation(SetupManager.metaDivArray_ID[successCount], item.snippet_size);
                    Controller.setComplexityReformulation(SetupManager.metaDivArray_ID[successCount], item.snippet_path_complexity_class_sum);
                    Controller.setImportsReformulation(SetupManager.metaDivArray_ID[successCount], item.snippet_imports_count);




                        successCount++;
                    }

                });//each

            });//success

        }

        }//function
    );

	// update status
	Controller.setStatus("DONE - " + total);
//LOG IT
    UsageLogger.addEvent(UsageLogger.RESULTS_FOUND,null,total);

    QueryManager.numFound = data.response.numFound;

	QueryManager.makeNavigation(QueryManager.numFound, SetupManager.numberOfCells);
	
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

    if(Controller.currentStatus == "SEARCHING..."){
        return;
    }

	if(Controller.currentStatus == "Searching for autocomplete recommendations...")
		Controller.setStatus("DONE - Searching for autocomplete recommendations");
	var results = null;

    if(QueryManager.currentAutoCompleteField == QueryBucketModel.snippet_variable_names_delimited){
        results =  data.facet_counts.facet_fields.snippet_variable_names_delimited;
    }
	else if(QueryManager.currentAutoCompleteField == QueryBucketModel.extendsField){
		results =  data.facet_counts.facet_fields.snippet_extends;
	}else if(QueryManager.currentAutoCompleteField == QueryBucketModel.implementsField){
		results = data.facet_counts.facet_fields.snippet_implements;
	}else if(QueryManager.currentAutoCompleteField == QueryBucketModel.authorFiled){
        results = data.facet_counts.facet_fields.snippet_version_author;
    }else if(QueryManager.currentAutoCompleteField == QueryBucketModel.projectField){
        results = data.facet_counts.facet_fields.snippet_project_name;
    }else if(QueryManager.currentAutoCompleteField == QueryBucketModel.returnTypeField){
        results = data.facet_counts.facet_fields.snippet_return_type;
    }else if(QueryManager.currentAutoCompleteField == QueryBucketModel.snippetImportsFiled){
        results = data.facet_counts.facet_fields.snippet_imports;
    }else if(QueryManager.currentAutoCompleteField == QueryBucketModel.snippetMethodCallCallingClass){
        results = data.facet_counts.facet_fields.snippet_method_invocation_calling_class;
    }
    else if(QueryManager.currentAutoCompleteField == QueryBucketModel.snippetMethodCallName){
        results = data.facet_counts.facet_fields.snippet_method_invocation_name;
    }else if(QueryManager.currentAutoCompleteField == QueryBucketModel.snippetMethodCallParameters){
        results = data.facet_counts.facet_fields.snippet_method_invocation_arg_types_count;
    }
    else if(QueryManager.currentAutoCompleteField == QueryBucketModel.snippetMethodDeclarationClass){
        results = data.facet_counts.facet_fields.snippet_method_dec_declaring_class;
    }else if(QueryManager.currentAutoCompleteField == QueryBucketModel.snippetMethodDeclarationName){
        results = data.facet_counts.facet_fields.snippet_method_dec_name;
    }else if(QueryManager.currentAutoCompleteField == QueryBucketModel.snippetMethodDeclarationParameters){
        results = data.facet_counts.facet_fields.snippet_method_dec_parameter_types_count;
    }else if(QueryManager.currentAutoCompleteField == QueryBucketModel.snippetMethodDeclarationReturn){
        results = data.facet_counts.facet_fields.snippet_method_dec_return_type;
    }else if(QueryManager.currentAutoCompleteField == QueryBucketModel.snippetPackage){
        results = data.facet_counts.facet_fields.snippet_package;
    }



//    else if(QueryManager.currentAutoCompleteField == QueryBucketModel.snippetMethodCallCallingClassShort) {
//        var results = data.facet_counts.facet_fields.snippet_method_invocation_calling_class_short;
//    }

    //recommend auto complete
    if(results != null && results.length > 0){
        var temp = new Array();
        for(var i = 0; i<results.length; i++){
            //skip the odds because those are frequency counts and not results
            if(i%2 != 0)
                continue;

            temp.push(results[i]);
        }
        var mappedResults = $.map( temp, function( item ) {
            if(QueryManager.currentAutoCompleteField == QueryBucketModel.snippetMethodDeclarationParameters ||
                QueryManager.currentAutoCompleteField == QueryBucketModel.snippetMethodCallParameters  ){
                item = item.substring(0,item.length-2);
            }
            return {
                "label": item,
                "value": item
            };
        });
        QueryManager.currentResponse(mappedResults);
    }

}

