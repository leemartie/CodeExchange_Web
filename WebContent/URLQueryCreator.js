var URLQueryCreator = {
		getQueryURL	:	function(callbackFunctionName){
		
	
			var query = QueryManager.currentQuery;
			var start = QueryManager.currentStart;
			
			query = SmartQueryCreator.makeSmartQuery(query);
	
			var url = 'http://localhost:8983/solr/noTagImportCollection/select/?q='
				+ "snippet:(" + query + ") AND snippet_granularity:Class"
				+ '&start=' + start + '&facet=true' + '&facet.field=author' + '&facet.field=snippet_tag' + '&facet.field=project'
				+ '&facet.mincount=1';
			
			
			
			for(var i = 0; i < FilterManager.filters.length;i++){
				filter = FilterManager.filters[i];
				
				var strFilter = 'fq='+filter.category+':'+filter.value;
				
				url = url +"&"+strFilter;
			}
			
			
			
				url = url + '&rows=4&indent=on&wt=json&callback=?&json.wrf='+callbackFunctionName;
	
	
			return url;
	
		}
		
		
};