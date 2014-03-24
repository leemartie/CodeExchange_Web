var URLQueryCreator = {
		server : 'codeexchange.ics.uci.edu',
		
		collection	:	'CodeExchangeIndex',//'noTagImportCollection',
		authorCollection	 :  'GitHubAuthorIndex',
		projectCollection	 :  'GitHubProjectIndex',
		port					: 8983,
		
		getQueryURL	:	function(callbackFunctionName){
		
	
			var query = SmartQueryCreator.makeSmartQuery(QueryManager.currentQuery);
			var start = QueryManager.currentStart;
			
			
	
			var queryFilter = "";
			
			/**
			 * http://localhost:8983/solr/parents/select?q=alive:yes AND 
			 * _query_:"{!join fromIndex=children from=fatherid to=parentid v='childname:Tom'}"
			 */
			
			var extendsFilter = $(SetupManager.pound+SetupManager.extendsInputID).val();
			var implementsFilter = $(SetupManager.pound+SetupManager.implementsInputID).val();
			
			if(extendsFilter != ""){
				queryFilter = queryFilter+' AND snippet_extends:('+extendsFilter+')';
			}
			if(implementsFilter != ""){
				queryFilter = queryFilter+' AND snippet_implements:('+implementsFilter+')';
			}
			
			var invocationFilter = " AND snippet_method_invocations:"+"/"+EncoderDecoder.encodeInvocationFilter()+"/";
			
	//		var invocationQuery = ' AND _query_:"{!join fromIndex='+URLQueryCreator.invocationCollection+' from=id to=invocation_snippet_id v="'+invocationFilter+'"}"';

			
			var commentsFilter = ' AND snippet_has_comments:('+'*'+')';
			var languageFilter = ' AND snippet_human_language:('+'*'+')';
			
			if(QueryManager.hasComments){
				commentsFilter = ' AND snippet_has_comments:('+QueryManager.hasComments+')';
				languageFilter = ' AND snippet_human_language:('+QueryManager.humanLanguageOfComments+')';
			}
			
			

			var url = 'http://'+URLQueryCreator.server+':'+URLQueryCreator.port+'/solr/'+URLQueryCreator.collection+'/select/?q='
				+ 'snippet_code:(' + query + ')'
				+ queryFilter
				+ invocationFilter
				+ commentsFilter
				+ languageFilter
				+ '&start=' + start 
				+ '&fl= id snippet_code snippet_version_author snippet_project_name '
				+ 'snippet_all_versions snippet_address snippet_address_lower_bound '
				+ 'snippet_changed_code_churn snippet_address_upper_bound snippet_method_invocations ';
				+ 'snippet_has_comments snippet_human_language';
//				+ '&facet=true' 
//				+ '&facet.field=snippet_version_author' 
				//+ '&facet.field=snippet_tag' 
//				+ '&facet.field=snippet_project_name'
//				+ '&facet.field=snippet_imports'
///				+ '&facet.field=snippet_granularity'
//				+ '&facet.mincount=1'
//				+ '&hl=true'
//				+ '&hl.fl=snippet'
//				+ '&hl.highlightMultiTerm=true ';
//				+ '&facet.limit=200';
			
			
			
			for(var i = 0; i < FilterManager.filters.length;i++){
				filter = FilterManager.filters[i];
				
				var strFilter = 'fq='+filter.category+':'+filter.value;
				
				url = url +"&"+strFilter;
			}
			
			
			
				url = url + '&rows=3&indent=on&wt=json&callback=?&json.wrf='+callbackFunctionName;
	
				

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