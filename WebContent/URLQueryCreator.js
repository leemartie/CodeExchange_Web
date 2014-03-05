var URLQueryCreator = {
		server : 'codeexchange.ics.uci.edu',
		collection	:	'CodeExchangeIndex',//'noTagImportCollection',
		
		getQueryURL	:	function(callbackFunctionName){
		
	
			var query = QueryManager.currentQuery;
			var start = QueryManager.currentStart;
			
			query = SmartQueryCreator.makeSmartQuery(query);
	
			
			var extendsFilter = $(SetupManager.pound+SetupManager.extendsInputID).val();
			if(extendsFilter == "")
				extendsFilter = "*";
			
			
			
			var url = 'http://'+URLQueryCreator.server+':9000/solr/'+URLQueryCreator.collection+'/select/?q='
				+ 'snippet_code:(' + query + ')'
				+ 'snippet_extends:('+extendsFilter+')'
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