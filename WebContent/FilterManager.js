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
var FilterManager = {
	filters	: new Array(),
	AUTHOR_CATEGORY	:	"author",
	TAG_CATEGORY	:	"snippet_tag",
	PROJECT_CATEGORY	:	"project",
	LIB_CATEGORY		:	"snippet_imports",
	GRANULARITY_CATEGORY	:"snippet_granularity",
	
	addFilter	:	function(filter){
		FilterManager.filters.push(filter);
	},

	/**
	 * Removes first occurence of filter by value
	 * it is assumed all filters are unique given their category and value
	 * @param filter
	 * @returns
	 */
	removeFilter	:	function(filter){
		for(var i = 0; i<FilterManager.filters.length; i++){
			if(filter.category == FilterManager.filters[i].category){
				if(filter.value == FilterManager.filters[i].value){
					FilterManager.filters.splice(i,1);
					break;
				}
			}
		}
		
	}
		
};

function Filter (category, value){
	this.category = category;
	this.value = value;
}