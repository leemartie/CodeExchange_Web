/*******************************************************************************
 * Copyright (c) {2014} {Software Design and Collaboration Laboratory (SDCL)
 *				, University of California, Irvine}.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    {Software Design and Collaboration Laboratory (SDCL)
 *	, University of California, Irvine}
 *			- initial API and implementation and/or initial documentation
 *******************************************************************************/
var URLQueryCreator = {
		server : 'codeexchange.ics.uci.edu',
		
		collection	:	'CodeExchangeIndex',//'noTagImportCollection',
	//	authorCollection	 :  'GitHubAuthorIndex',
	//	projectCollection	 :  'GitHubProjectIndex',
		port					: 8983,
		
		getQueryURL	:	function(callbackFunctionName){

			var query = QueryManager.currentQuery;
            var childQuery = QueryManager.currentChildQuery;
			var start = QueryManager.currentStart;



			var url = 'http://'+URLQueryCreator.server+':'+URLQueryCreator.port+'/solr/'+URLQueryCreator.collection+'/select/?q='
				+ query+" AND parent:true"
				+ '&start=' + start
				+ '&fl=id snippet_author_name snippet_project_name '
				+ 'snippet_all_versions snippet_address snippet_address_lower_bound '
				+ 'snippet_address_upper_bound snippet_project_id '
                + 'snippet_code snippet_imports_count snippet_number_of_functions '
                + 'snippet_path_complexity_class_sum '
                + 'snippet_size snippet_variable_names_delimited snippet_method_invocation_arg_types_place '
                + 'snippet_method_invocation_declaring_class snippet_method_invocation_name '
                + 'snippet_method_invocation_calling_class snippet_method_dec_name snippet_extends snippet_implements '
                + 'snippet_package snippet_project_address snippet_this_version snippet_imports snippet_author_avatar '
                + 'snippet_changed_code_churn snippet_class_name_delimited snippet_number_of_insertions snippet_number_of_deletions '
                + 'snippet_method_invocation_arg_values snippet_project_owner snippet_method_invocation_arg_values score'
				+ '&facet=true'

//                + '&group.facet=true'
//                + '&group.field=snippet_imports'
//                + '&group.field=snippet_project_id'
//                + '&group.field=snippet_author_name'
//                + '&group.field=snippet_project_name'
//                + '&group.field=snippet_implements'
//                + '&group.field=snippet_extends'
//                + '&group.field=snippet_variable_names_delimited'

                + '&facet.field=snippet_imports'
                + '&facet.field=snippet_project_id'
                + '&facet.field=snippet_author_name'
                + '&facet.field=snippet_project_name'
                + '&facet.field=snippet_extends'
                + '&facet.field=snippet_implements'
                + '&facet.field=snippet_variable_names_delimited'
                + '&facet.field=snippet_method_invocation_name'
                + '&facet.mincount=1'
				+ '&facet.limit=100'
//                + '&group=true'
//                + '&group.field=snippet_code'
                + '&expand=true'
                + '&expand.rows=5000'
                + '&expand.field=expand_id'
                + '&expand.q=*:*'//+childQuery;  // could also query by those that met the children query
                + '&sort=div(snippet_path_complexity_class_sum, product(max(snippet_size,1), max(snippet_imports_count,1) ) ) desc';
            
			for(var i = 0; i < FilterManager.filters.length;i++){
				filter = FilterManager.filters[i];
				
				var strFilter = 'fq='+filter.category+':'+filter.value;
				
				url = url +"&"+strFilter;
			}
			
			
			
				url = url + '&rows='+12+'&indent=on&wt=json&callback=?&json.wrf='+callbackFunctionName;
	
				

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