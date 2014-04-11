var URLQueryCreator = {
		server : 'codeexchange.ics.uci.edu',
		
		collection	:	'CodeExchangeIndex',//'noTagImportCollection',
	//	authorCollection	 :  'GitHubAuthorIndex',
	//	projectCollection	 :  'GitHubProjectIndex',
		port					: 8983,
		
		getQueryURL	:	function(callbackFunctionName){
		
	
			var query = QueryManager.currentQuery;
			var start = QueryManager.currentStart;
			
			
	
			var queryFilter = "";
			
			/**
			 * http://localhost:8983/solr/parents/select?q=alive:yes AND 
			 * _query_:"{!join fromIndex=children from=fatherid to=parentid v='childname:Tom'}"
			 */
			
//			var extendsFilter = $(SetupManager.pound+SetupManager.extendsInputID).val();
//			var implementsFilter = $(SetupManager.pound+SetupManager.implementsInputID).val();
			
//			if(extendsFilter != ""){
//				queryFilter = queryFilter+' AND snippet_extends:('+extendsFilter+')';
//			}
//			if(implementsFilter != ""){
//				queryFilter = queryFilter+' AND snippet_implements:('+implementsFilter+')';
//			}
			
			var invocationFilter = '';
			
//			var invocationEncode = EncoderDecoder.encodeInvocationFilter();
			
//			var objectsClassFilter = $(SetupManager.pound+SetupManager.callingObjectInputID).val();
//			var methodCallNameFilter = $(SetupManager.pound+SetupManager.callInputID).val();
//			var argumentTypeFilter = $(SetupManager.pound+SetupManager.argTypeInputID).val();
			
//			if(objectsClassFilter != "" || methodCallNameFilter != "" || argumentTypeFilter != "")
//				invocationFilter = " AND snippet_method_invocations:"+"/"+invocationEncode+"/";
			
	//		var invocationQuery = ' AND _query_:"{!join fromIndex='+URLQueryCreator.invocationCollection+' from=id to=invocation_snippet_id v="'+invocationFilter+'"}"';

			
			var commentsFilter = '';
			var languageFilter = '';
			
//			if(QueryManager.hasComments){
//				commentsFilter = ' AND snippet_has_comments:('+QueryManager.hasComments+')';
//				languageFilter = ' AND snippet_human_language:('+QueryManager.humanLanguageOfComments+')';
//			}
			
			

			var url = 'http://'+URLQueryCreator.server+':'+URLQueryCreator.port+'/solr/'+URLQueryCreator.collection+'/select/?q='
				+ query
				+ '&start=' + start
				+ '&fl=id snippet_version_author snippet_project_name '
				+ 'snippet_all_versions snippet_address snippet_address_lower_bound '
				+ 'snippet_address_upper_bound snippet_method_invocations project_id '
                + 'snippet_containing_class_id'
				+ '&facet=true'
                + '&facet.field=snippet_version_author'
                + '&facet.field=snippet_project_name'
                + '&facet.field=snippet_extends'
                + '&facet.field=snippet_implements'
                + '&facet.mincount=0'
				+ '&facet.limit=4';

			
			
			
			for(var i = 0; i < FilterManager.filters.length;i++){
				filter = FilterManager.filters[i];
				
				var strFilter = 'fq='+filter.category+':'+filter.value;
				
				url = url +"&"+strFilter;
			}
			
			
			
				url = url + '&rows='+SetupManager.numberOfCells+'&indent=on&wt=json&callback=?&json.wrf='+callbackFunctionName;
	
				

			return url;
	
		},
		
		getAuthorURL	: function(name, callbackFunctionName){
			var url = 'http://'+URLQueryCreator.server+':'+URLQueryCreator.port+'/solr/'+URLQueryCreator.authorCollection+'/select/?q='
			+ 'author_name:(' + name + ')';
		
		
		
		for(var i = 0; i < FilterManager.filters.length;i++){
			filter = FilterManager.filters[i];
			
			var strFilter = 'fq='+filter.category+':'+filter.value;
			
			url = url +"&"+strFilter;
		}
		
		
		
			url = url + '&rows=1&indent=on&wt=json&callback=?&json.wrf='+callbackFunctionName;
			
			return url;
		}
		
		
};