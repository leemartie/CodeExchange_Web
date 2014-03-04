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
		
		var url = URLQueryCreator.getQueryURL('on_data');

		// alert(url);
		$.getJSON(url);
		
		
		
	},
	
	submitAutoComplete	:	function(field, userTyped){
		var queryAutoComplete = 'http://'+URLQueryCreator.server+':9000/solr/'+URLQueryCreator.collection+'/select/?' +
				'fl=id snippet_extends&rows=0&q=*:*&facet=true&' +
				'facet.field=snippet_extends&facet.mincount=1&facet.prefix='+userTyped +
				'&indent=on&wt=json&callback=?&json.wrf=autoCompleteCallBack';
		
		QueryManager.currentAutoCompleteField = field;
		
		results = $.getJSON(queryAutoComplete);
		
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
					Controller.setAvatar(SetupManager.metaDivArray_ID[i],
							item.author_avatar);
					Controller.setAuthorName(SetupManager.metaDivArray_ID[i], item.snippet_version_author, item.author_type);
					Controller.setProjectName(SetupManager.metaDivArray_ID[i],
							item.snippet_project_name);
					
					
					//highlight matched keywords
//					$.each(highlight[item.id], function(j, word){
//						//    word = escape(word);
//							word = word.substring(4,word.length-5);
//						    var result = item.snippet.replace(new RegExp(word, 'gi'), '</code><em>' + word + '</em><code data-language="java">');
//							Controller.setCode(SetupManager.resultPreArray_ID[i],
//									result);
//						});
				
				


					Controller.setCodeFromURL(SetupManager.resultPreArray_ID[i],
							item.snippet_address);
				}
				

			});
	// now highlight the code
	CodeFormatter.highLight();
	

	
	
	Controller.setStatus("DONE LOADING CODE");
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
					Controller.setAvatar(SetupManager.metaDivArray_ID[i],
							item.author_avatar);
				
					Controller.setAuthorName(SetupManager.metaDivArray_ID[i], item.snippet_version_author, item.author_type);
			
					Controller.setProjectName(SetupManager.metaDivArray_ID[i],
							item.snippet_project_name);
					
					//TODO will need to replace item.snippet with content from url
					
//						$.each(highlight[item.id], function(j, word){
//						//    word = escape(word);
//							word = word.substring(4,word.length-5);
//						    var result = item.snippet.replace(new RegExp(word, 'gi'), '</code><em>' + word + '</em><code data-language="java">');
//							Controller.setCode(SetupManager.resultPreArray_ID[i],
//									result);
//						});

					

					Controller.setCodeFromURL(SetupManager.resultPreArray_ID[i],
							item.snippet_address);
				}

			});
	// now highlight the code
	CodeFormatter.highLight();
	

	
	// update status
	Controller.setStatus("DONE - " + total);

	QueryManager.makeNavigation(data.response.numFound, 4);
	
//	topAuthors = data.facet_counts.facet_fields.author;
//	tagArray = data.facet_counts.facet_fields.snippet_tag;
//	projectArray = data.facet_counts.facet_fields.project;
//	libArray = data.facet_counts.facet_fields.snippet_imports;
//	granArray = data.facet_counts.facet_fields.snippet_granularity;
//	
//	QueryManager.populateFilters();
}

function autoCompleteCallBack(data){
	var results = data.facet_counts.facet_fields.snippet_extends;
	$(SetupManager.pound+QueryManager.currentAutoCompleteField).autocomplete({ source: results });

}

