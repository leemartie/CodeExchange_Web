var URLQueryCreator = {
		server : 'codeexchange.ics.uci.edu',
		collection	:	'noTagImportCollection',
		
		getQueryURL	:	function(callbackFunctionName){
		
	
			var query = QueryManager.currentQuery;
			var start = QueryManager.currentStart;
			
			query = SmartQueryCreator.makeSmartQuery(query);
	
			var url = 'http://'+URLQueryCreator.server+':8983/solr/'+URLQueryCreator.collection+'/select/?q='
				+ "snippet:(" + query + ")"
				+ '&start=' + start 
				+ '&fl= author_type snippet author author_avatar snippet_tag project snippet_imports snippet_granularity'
				+ '&facet=true' 
				+ '&facet.field=author' 
				+ '&facet.field=snippet_tag' 
				+ '&facet.field=project'
				+ '&facet.field=snippet_imports'
				+ '&facet.field=snippet_granularity'
				+ '&facet.mincount=1';
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