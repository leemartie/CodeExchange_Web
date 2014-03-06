var URLQueryCreator = {
		server : 'codeexchange.ics.uci.edu',
		
		collection	:	'CodeExchangeIndex',//'noTagImportCollection',
		invocationCollection :	'GitHubMethodInvocationIndex',
		authorCollection	 :  'GitHubAuthorIndex',
		projectCollection	 :  'GitHubProjectIndex',
		
		getQueryURL	:	function(callbackFunctionName){
		
	
			var query = SmartQueryCreator.makeSmartQuery(QueryManager.currentQuery);
			var start = QueryManager.currentStart;
			
			query = SmartQueryCreator.makeSmartQuery(query);
	
			var queryFilter = "";
			
			/**
			 * http://localhost:8983/solr/parents/select?q=alive:yes AND 
			 * _query_:"{!join fromIndex=children from=fatherid to=parentid v='childname:Tom'}"
			 */
			
			var extendsFilter = $(SetupManager.pound+SetupManager.extendsInputID).val();
			var implementsFilter = $(SetupManager.pound+SetupManager.implementsInputID).val();
			var objectsFilter = $(SetupManager.pound+SetupManager.callingObjectInputID).val();
			var methodCallNameFilter = $(SetupManager.pound+SetupManager.callInputID).val();;
			var argumentTypeFilter = $(SetupManager.pound+SetupManager.argTypeInputID).val();
			
			if(extendsFilter != ""){
				queryFilter = queryFilter+' AND snippet_extends:('+extendsFilter+')';
			}
			if(implementsFilter != ""){
				queryFilter = queryFilter+' AND snippet_implements:('+implementsFilter+')';
			}
			
			var invocationFilter = '';
			
			if(objectsFilter != ""){
				invocationFilter = invocationFilter+'invocation_calling_object_class:('+objectsFilter+')';
			}
			if(methodCallNameFilter != ""){
				invocationFilter = invocationFilter+' AND invocation_name:('+methodCallNameFilter+')';
			}
			if(argumentTypeFilter != ""){
				invocationFilter = invocationFilter+' AND invocation_argument_types:('+argumentTypeFilter+')';
			}
			
	//		var invocationQuery = ' AND _query_:"{!join fromIndex='+URLQueryCreator.invocationCollection+' from=id to=invocation_snippet_id v="'+invocationFilter+'"}"';

			

			var url = 'http://'+URLQueryCreator.server+':9000/solr/'+URLQueryCreator.collection+'/select/?q='
				+ 'snippet_code:(' + query + ')'
				+ queryFilter
				+ invocationQuery
				+ '&start=' + start 
			//	+ '&fl= id snippet author author_avatar snippet_tag project snippet_imports snippet_granularity'
				+ '&facet=true' 
				+ '&facet.field=snippet_version_author' 
				//+ '&facet.field=snippet_tag' 
				+ '&facet.field=snippet_project_name'
				+ '&facet.field=snippet_imports'
				+ '&facet.field=snippet_granularity'
				+ '&facet.mincount=1'
				+ '&hl=true';
//				+ '&hl.fl=snippet'
//				+ '&hl.highlightMultiTerm=true ';
				//+ '&facet.limit=200';
			
			
			
			for(var i = 0; i < FilterManager.filters.length;i++){
				filter = FilterManager.filters[i];
				
				var strFilter = 'fq='+filter.category+':'+filter.value;
				
				url = url +"&"+strFilter;
			}
			
			
			
				url = url + '&rows=3&indent=on&wt=json&callback=?&json.wrf='+callbackFunctionName;
	
				

			return url;
	
		}
		
		
};