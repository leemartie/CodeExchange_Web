var URLQueryCreator = {
		server : 'codeexchange.ics.uci.edu',
		
		collection	:	'CodeExchangeIndex',//'noTagImportCollection',
	//	authorCollection	 :  'GitHubAuthorIndex',
	//	projectCollection	 :  'GitHubProjectIndex',
		port					: 8983,
		
		getQueryURL	:	function(callbackFunctionName){

			var query = QueryManager.currentQuery;
			var start = QueryManager.currentStart;

			var url = 'http://'+URLQueryCreator.server+':'+URLQueryCreator.port+'/solr/'+URLQueryCreator.collection+'/select/?q='
				+ query
				+ '&start=' + start
				+ '&fl=id snippet_author_name snippet_project_name '
				+ 'snippet_all_versions snippet_address snippet_address_lower_bound '
				+ 'snippet_address_upper_bound snippet_project_id '
                + 'snippet_containing_class_id snippet_code snippet_granularity '
                + 'snippet_path_complexity_class_sum snippet_changed_code_churn '
                + 'snippet_size'
				+ '&facet=true'
                + '&facet.field=snippet_imports'
                + '&facet.field=snippet_project_id'
                + '&facet.field=snippet_author_name'
                + '&facet.field=snippet_project_name'
                + '&facet.field=snippet_extends'
                + '&facet.field=snippet_implements'
                + '&facet.mincount=1'
				+ '&facet.limit=4';
//                + '&expand=true'
//                + '&expand.field=expand_id'
//                + '&expand.q=*:*';  // could also query by those that met the children query

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
		},

    getClassURL	: function(name, callbackFunctionName){
        var url = 'http://'+URLQueryCreator.server+':'+URLQueryCreator.port+'/solr/'+URLQueryCreator.collection+'/select/?q='
            + 'id:(' + name + ')';

        url = url + '&rows=1&indent=on&wt=json&callback=?&json.wrf='+callbackFunctionName;

        return url;
    }
		
		
};