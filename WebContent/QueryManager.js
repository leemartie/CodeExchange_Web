var QueryManager = {
	lowestPage : 0,
	highestPage : 0,
	maxPages : 0,
	totalResuls : 0,
	moveCount : 0,
	linkArray : new Array(),
	linkArrayData	:	new Array(),
	currentQuery	:	"",
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

	/**
	 * 
	 * @param query
	 * @returns
	 */
	setQuery	:	function(query){
		QueryManager.currentQuery = query;
	},
	
	/**
	 * 
	 * @param query
	 * @param start
	 * @returns
	 */
	submitQuery : function() {
		Controller.setStatus("SEARCHING...");
		// alert("[submitQuery]");

		QueryManager.currentStart = 0;
		
		//first we have to get all the code id's that have the method 
		//invocations ? well... if blank keywords
		
		//if keywords not blank, then get those first then
		//pair down
		
		var url = URLQueryCreator.getQueryURL('on_data');

		// alert(url);
		$.getJSON(url);
		
		
		
	},
	
	submitAutoComplete	:	function(field, request, response){
		QueryManager.currentRequest = request;
		QueryManager.currentResponse = response;
		//constrain autocomplete by the values of the other code properties
		var extendsFilter = $(SetupManager.pound+SetupManager.extendsInputID).val();
		var implementsFilter = $(SetupManager.pound+SetupManager.implementsInputID).val();
		
		
		
		var property = '';
		if(field == SetupManager.extendsInputID){
			property = 'snippet_extends';
			QueryManager.completeUserTyped = $(SetupManager.pound+SetupManager.extendsInputID).val();
			
		}else if(field == SetupManager.implementsInputID){
			property = 'snippet_implements';
			QueryManager.completeUserTyped = $(SetupManager.pound+SetupManager.implementsInputID).val();
			
		}else if(field == SetupManager.callInputID){
			property = 'snippet_method_invocations';
			QueryManager.completeUserTyped = $(SetupManager.pound+SetupManager.callInputID).val();
			
			
			
		}else if(field == SetupManager.callingObjectInputID){
			property = 'snippet_method_invocations';
			QueryManager.completeUserTyped = $(SetupManager.pound+SetupManager.callingObjectInputID).val();
			
			
			
		}else if(field == SetupManager.argTypeInputID){
			property = 'snippet_method_invocations';
			QueryManager.completeUserTyped = $(SetupManager.pound+SetupManager.argTypeInputID).val();
			
			
			
			
		}
		
		
		
		//alert (completeUserTyped);
		
		var queryFilter = "snippet_code:("+SmartQueryCreator.makeSmartQuery(QueryManager.currentQuery)+")";
		
		if(field != SetupManager.extendsInputID && extendsFilter != ""){
			queryFilter = queryFilter+' AND snippet_extends:('+extendsFilter+')';
		}
		if(field != SetupManager.implementsInputID && implementsFilter != ""){
			queryFilter = queryFilter+' AND snippet_implements:('+implementsFilter+')';
		}
		
		var prefix = EncoderDecoder.encodeInvocationFilterLeaveOneOut(field,QueryManager.completeUserTyped);
		var invocationFilter = "";
		
		if(prefix == "*")
			invocationFilter = " AND snippet_method_invocations:"+"/"+EncoderDecoder.encodeInvocationFilter()+"/";
		else
			invocationFilter = " AND snippet_method_invocations:"+"/"+prefix+"/";
		
		
		var queryAutoComplete = "";
		if(property != 'snippet_method_invocations'){
			queryAutoComplete = 'http://'+URLQueryCreator.server+':9000/solr/'+URLQueryCreator.collection+'/select/?' +
			'rows=0&q='+queryFilter+invocationFilter+'&facet=true' +
			'&facet.field='+property+'&facet.mincount=1'+'&facet.limit=1000'+'&facet.prefix='+QueryManager.completeUserTyped +
			'&indent=on&wt=json&callback=?&json.wrf=autoCompleteCallBack';
		}else{
			queryAutoComplete = 'http://'+URLQueryCreator.server+':9000/solr/'+URLQueryCreator.collection+'/select/?' +
			'rows=0&q='+queryFilter+invocationFilter+'&facet=true' +
			'&facet.field='+property+'&facet.mincount=1'+'&facet.limit=1000'+//'&facet.prefix='+completeUserTyped +
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
											.append(
													(QueryManager.highestPage + QueryManager.moveCount + 1)//plus one so does not visually start at 0
															+ "");
									
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
				link.append(i+1); //plus one so does not visually start at 0
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
											.append(
													(QueryManager.lowestPage - QueryManager.moveCount + 1)//plus one so does not visually start at 0
															+ "");
									
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
	
	
	populateFilters	:	function(){
		//populate filters - get updated only on issuing new query or new fq by some facet
				
		
		Controller.populateFilter(topAuthors,FilterManager.AUTHOR_CATEGORY);
		
		
		Controller.populateFilter(tagArray,FilterManager.TAG_CATEGORY);
		
		
		Controller.populateFilter(projectArray, FilterManager.PROJECT_CATEGORY);
		
		
		Controller.populateFilter(libArray, FilterManager.LIB_CATEGORY);
		
		
		Controller.populateFilter(granArray, FilterManager.GRANULARITY_CATEGORY);	
		

	}
	
	
	

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
	
	//highlight matched keywords
//	var highlight = new Array();	
//	$.each(data.highlighting, function(i, hitem){
//		
//	    var match = hitem.snippet[0].match(/<em>(.*?)<\/em>/g);
//	    highlight[i] = match;
//	});
	
	// let's populate the table with the results
	$.each(docs,
			function(i, item) {
				var resultLength = SetupManager.resultPreArray_ID.length;
				var metaLength = SetupManager.metaDivArray_ID.length;
				if (i < resultLength && i < metaLength) {
					
					getMetaData(item.snippet_version_author, item.snippet_project_name, SetupManager.metaDivArray_ID[i],i);
					

					
					//highlight matched keywords
//					$.each(highlight[item.id], function(j, word){
//						//    word = escape(word);
//							word = word.substring(4,word.length-5);
//						    var result = item.snippet.replace(new RegExp(word, 'gi'), '</code><em>' + word + '</em><code data-language="java">');
//							Controller.setCode(SetupManager.resultPreArray_ID[i],
//									result);
//						});
				
				

					var versions = item.snippet_all_versions;
					var correctVersion = versions[0];
					var wrongVersion = item.snippet_this_version;
					
					var url = String(item.snippet_address);
					var correctURL = url.replace(wrongVersion,correctVersion);
					
					
					Controller.setCodeFromURL(SetupManager.resultPreArray_ID[i],
							correctURL, item.snippet_address_upper_bound, item.snippet_address_lower_bound);
				}
				

			});
	// now highlight the code
	//CodeFormatter.highLight();
	

	
	
	Controller.setStatus("DONE LOADING CODE");
}

/**
 * had to generate dynamic callback names so that I could use jsonp and
 * to keep scope of the local params
 * @param name
 * @param metaDiv
 * @param count
 */
function getMetaData(name, projectName, metaDiv, count){
	

	callback = 'onAuthorData'+count;
	
	
	var url = URLQueryCreator.getAuthorURL(Utf8.decode(name), callback);
	
	
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

//function onAuthorData(data){
//
//	  return data;
//};



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
	
	//highlight matched keywords
//	var highlight = new Array();	
//	$.each(data.highlighting, function(i, hitem){
//		
//	    var match = hitem.snippet[0].match(/<em>(.*?)<\/em>/g);
//	    highlight[i] = match;
//	});
	
	// let's populate the table with the results
	$.each(docs,
			function(i, item) {
				var resultLength = SetupManager.resultPreArray_ID.length;
				var metaLength = SetupManager.metaDivArray_ID.length;
				if (i < resultLength && i < metaLength) {
					getMetaData(item.snippet_version_author, item.snippet_project_name, SetupManager.metaDivArray_ID[i],i);

			

					
					//TODO will need to replace item.snippet with content from url
					
//						$.each(highlight[item.id], function(j, word){
//						//    word = escape(word);
//							word = word.substring(4,word.length-5);
//						    var result = item.snippet.replace(new RegExp(word, 'gi'), '</code><em>' + word + '</em><code data-language="java">');
//							Controller.setCode(SetupManager.resultPreArray_ID[i],
//									result);
//						});

					
					var versions = item.snippet_all_versions;
					var correctVersion = versions[0];
					var wrongVersion = item.snippet_this_version;
					
					var url = String(item.snippet_address);
					var correctURL = url.replace(wrongVersion,correctVersion);
					
					
					Controller.setCodeFromURL(SetupManager.resultPreArray_ID[i],
							correctURL, item.snippet_address_upper_bound, item.snippet_address_lower_bound);
				}

			});
	// now highlight the code
//	CodeFormatter.highLight();
	

	
	// update status
	Controller.setStatus("DONE - " + total);

	QueryManager.makeNavigation(data.response.numFound, SetupManager.numberOfCells);
	
//	topAuthors = data.facet_counts.facet_fields.author;
//	tagArray = data.facet_counts.facet_fields.snippet_tag;
//	projectArray = data.facet_counts.facet_fields.project;
//	libArray = data.facet_counts.facet_fields.snippet_imports;
//	granArray = data.facet_counts.facet_fields.snippet_granularity;
//	
//	QueryManager.populateFilters();
}

function autoCompleteCallBack(data){
	
	
	if(QueryManager.currentAutoCompleteField == SetupManager.extendsInputID){
		var results =  data.facet_counts.facet_fields.snippet_extends;
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

		//$(SetupManager.pound+QueryManager.currentAutoCompleteField).autocomplete({ source: results, autoFocus: true, delay: 500 });
	}else if(QueryManager.currentAutoCompleteField == SetupManager.implementsInputID){
		var results = data.facet_counts.facet_fields.snippet_implements;
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
		//$(SetupManager.pound+QueryManager.currentAutoCompleteField).autocomplete({ source: results, autoFocus: true, delay: 500 });
	}
	
	else if(QueryManager.currentAutoCompleteField == SetupManager.callInputID){
		var results = data.facet_counts.facet_fields.snippet_method_invocations;
		
		var temp = new Array();
		
		for(var i = 0; i<results.length; i++){
			//skip the odds because those are frequency counts and not results
			if(i%2 != 0)
				continue;
			
			//TODO MUSHT MAKE SURE EVERYPART OF STRING MATCHES THE TYPED IN VALEUES
			//so decoded results but start with prefix QueryManager.compleUserTyped
			//AND the other parts decoded must match the typed in values, so the class
			//must also match the typed in class
			
			var className = $(SetupManager.pound+SetupManager.callingObjectInputID).val();
			var argTypeName = $(SetupManager.pound+SetupManager.argTypeInputID).val();
			var pushBoolean = true;
			
			if(className != ""){
				var classDecoded = EncoderDecoder.decodeClassFilter(results[i]);
				if(className !=  classDecoded)
					pushBoolean = false;
			}
			
			if(argTypeName != ""){
				if(argTypeName !=  EncoderDecoder.decodeArgumentFilter(results[i]))
					pushBoolean = false;
			}
			
			var decodedResult = EncoderDecoder.decodeMethodFilter(results[i]);
			if((String(decodedResult).indexOf(
					QueryManager.completeUserTyped.toUpperCase()) == 0
					|| 
					String(decodedResult).indexOf(QueryManager.completeUserTyped.toLowerCase()) == 0)
					&& 
					pushBoolean)
				temp.push(decodedResult);
		}
		
		temp = Util.getOnlyUniqueElements(temp);
		var mappedResults = $.map( temp, function( item ) {
            return {
              "label": item,
              "value": item
            };
          });
		
		
		QueryManager.currentResponse(mappedResults);
		//return jsonResults;
		//$(SetupManager.pound+QueryManager.currentAutoCompleteField).autocomplete({ source: temp, autoFocus: true, delay: 500 });
	}else if(QueryManager.currentAutoCompleteField == SetupManager.callingObjectInputID){
		var results = data.facet_counts.facet_fields.snippet_method_invocations;
		
		var temp = new Array();
		
		for(var i = 0; i<results.length; i++){
			//skip the odds because those are frequency counts and not results
			if(i%2 != 0)
				continue;
			
			var methodName = $(SetupManager.pound+SetupManager.callInputID).val();
			var argTypeName = $(SetupManager.pound+SetupManager.argTypeInputID).val();
			var pushBoolean = true;
			
			if(methodName != ""){
				var methodFilterDecoded = EncoderDecoder.decodeMethodFilter(results[i]);
				if(methodName !=  methodFilterDecoded)
					pushBoolean = false;
			}
			
			if(argTypeName != ""){
				if(argTypeName !=  EncoderDecoder.decodeArgumentFilter(results[i]))
					pushBoolean = false;
			}
			
			var decodedResult = EncoderDecoder.decodeClassFilter(results[i]);
			if((String(decodedResult).indexOf(
					QueryManager.completeUserTyped.toUpperCase()) == 0
					|| 
					String(decodedResult).indexOf(QueryManager.completeUserTyped.toLowerCase()) == 0)
					&& 
					pushBoolean)
				temp.push(decodedResult);
		}
		temp = Util.getOnlyUniqueElements(temp);
		var mappedResults = $.map( temp, function( item ) {
            return {
              "label": item,
              "value": item
            };
          });
		
		QueryManager.currentResponse(mappedResults);	
		//return jsonResults;
		//$(SetupManager.pound+QueryManager.currentAutoCompleteField).autocomplete({ source: temp, autoFocus: true, delay: 500 });	

	}else if(QueryManager.currentAutoCompleteField == SetupManager.argTypeInputID){
		var results = data.facet_counts.facet_fields.snippet_method_invocations;
		
		var temp = new Array();
		
		for(var i = 0; i<results.length; i++){
			//skip the odds because those are frequency counts and not results
			if(i%2 != 0)
				continue;
			
			var methodName = $(SetupManager.pound+SetupManager.callInputID).val();
			var className = $(SetupManager.pound+SetupManager.callingObjectInputID).val();
			var argTypeName = $(SetupManager.pound+SetupManager.argTypeInputID).val();
			var pushBoolean = true;
			
			if(methodName != ""){
				if(methodName !=  EncoderDecoder.decodeMethodFilter(results[i]))
					pushBoolean = false;
			}
			
			if(className != ""){
				if(className !=  EncoderDecoder.decodeClassFilter(results[i]))
					pushBoolean = false;
			}
			
			var decodedResult = EncoderDecoder.decodeArgumentFilter(results[i]);
			if((String(decodedResult).indexOf(
					QueryManager.completeUserTyped.toUpperCase()) == 0
					|| 
					String(decodedResult).indexOf(QueryManager.completeUserTyped.toLowerCase()) == 0)
					&& 
					pushBoolean)
				temp.push(decodedResult);
		}
		temp = Util.getOnlyUniqueElements(temp);
		var mappedResults = $.map( temp, function( item ) {
              return {
                "label": item,
                "value": item
              };
            });
		
		QueryManager.currentResponse(mappedResults);		
		//return jsonResults;
		
	}
	
	
	//return temp;
	
	
	

}

