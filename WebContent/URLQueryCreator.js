var URLQueryCreator = {
		server : 'codeexchange.ics.uci.edu',
		collection	:	'CodeExchangeIndex',//'noTagImportCollection',
		
		getQueryURL	:	function(callbackFunctionName){
		
	
			var query = QueryManager.currentQuery;
			var start = QueryManager.currentStart;
			
			query = SmartQueryCreator.makeSmartQuery(query);
	
			var url = 'http://'+URLQueryCreator.server+':9000/solr/'+URLQueryCreator.collection+'/select/?q='
				+ "snippet:(" + query + ")"
				+ '&start=' + start 
				+ '&fl= id author_type snippet author author_avatar snippet_tag project snippet_imports snippet_granularity'
				+ '&facet=true' 
				+ '&facet.field=author' 
				+ '&facet.field=snippet_tag' 
				+ '&facet.field=project'
				+ '&facet.field=snippet_imports'
				+ '&facet.field=snippet_granularity'
				+ '&facet.mincount=1'
				+ '&hl=true'
				+ '&hl.fl=snippet'
				+ '&hl.highlightMultiTerm=true ';
				//+ '&facet.limit=200';
			
			
			
			for(var i = 0; i < FilterManager.filters.length;i++){
				filter = FilterManager.filters[i];
				
				var strFilter = 'fq='+filter.category+':'+filter.value;
				
				url = url +"&"+strFilter;
			}
			
			
			
				url = url + '&rows=4&indent=on&wt=json&callback=?&json.wrf='+callbackFunctionName;
	

			return url;
	
		}
		
		
};