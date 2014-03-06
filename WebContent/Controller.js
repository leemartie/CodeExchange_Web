/**
 * @author lee
 */


/**
 * Controls all gets and sets of the HTML
 * 
 * REMEMBER THAT LITERALS are STATIC CLASSES
 */
var Controller = {
		previousHeight : 0,
		previousWidth : 0,
		previousX : 0,
		previousY : 0,
		headerExpanded	:	false,
		sortFiltersAlpha	:	false,
		

		/**
		 * Sets the code text of an html element
		 * It expects that codeNode will be either result0,result1,result2,or result3
		 * 
		 * @param codeNode
		 * @param codeText
		 * @returns
		 */
		setCode	:	function(codeNode,codeText){
	
			var result = new CodeResult(codeText);
			$(SetupManager.pound+codeNode).append(result.getJQueryObject());

		},
		
		setCodeFromURL: function(codeNode, codeURL, start, end){
			var url = "http://codeexchange.ics.uci.edu/getPage.php?url="+codeURL+"&callback=?&json.wrf=displayCode";
			 
			$.getJSON(url).fail(function(data, textStatus, jqXHR) {
			    alert( data + textStatus + jqXHR);
			  }).success(function(data, textStatus, jqXHR ) {
				  $.each(data, function(index, element) {
					    var code = element;
					    var result = new CodeResult(code,start,end);
					    var jQueryObject = result.getJQueryObject();
						$(SetupManager.pound+codeNode).append(jQueryObject);
				  });
			  });
		},

		
		/**
		 * 
		 * @param id
		 * @returns
		 */
		getExpandBtnToCell	:	function(id){
			return SetupManager.cellDivArray_ID[id];
		},
		
		/**
		 * 
		 * @returns
		 */
		clearAllCode	:	function(){
			var length = SetupManager.resultPreArray_ID.length;
			
			for(var i = 0; i<length; i++){
				
		          $(SetupManager.pound+SetupManager.resultPreArray_ID[i]).empty();
		          $(SetupManager.pound+SetupManager.metaDivArray_ID[i]).empty();
			}
		},
		
		/**
		 * FUNCTION
		 */
		setTotalResultsFound	:	function(total){
			$(SetupManager.pound+SetupManager.resultTotalP_ID).empty();
			$(SetupManager.pound+SetupManager.resultTotalP_ID).prepend(" " + total + " ");
		},
		
		/**
		 * FUNCTION
		 */
		setStatus	:	function(message){
			$(SetupManager.pound+SetupManager.statusDiv_ID).empty();
			var text = $("<text>"+message+"</text>");
			text.addClass("Message");
			$(SetupManager.pound+SetupManager.statusDiv_ID).append(text);
		},
		
		/**
		 * FUNCTION
		 */
		getQueryInBox	:	function(){
			return $(SetupManager.pound+SetupManager.queryInput_ID).val();
		},
		
		setAuthorName	:	function(meta, name, type){
			var metadiv = $(SetupManager.divOpen+SetupManager.divClose);
			var icon  = $('<span class="ui-icon ui-icon-person" style="display:inline-block"></span>');
			var authName = $('<text>'+type+' : '+name+'</text>');
			
			
			
			metadiv.addClass("MetaBorder");
			authName.addClass("MetaBorder");
			
			metadiv.append(icon);
			metadiv.append(authName);
			
			$(SetupManager.pound+meta).append(metadiv);
	
			
		},
		
		/**
		 * FUNCTION
		 */
		setAvatar	:	function(meta, avatar){
			$(SetupManager.pound+meta).empty();
			var image = $('<img class="MetaDatum" src="'+avatar+'"  width="40" height="40" >'+'</img>');
			$(SetupManager.pound+meta).append(image);
			image.addClass("MetaBorder");
		},
		
		
		/**
		 * FUNCTION
		 */
		setProjectName	:	function(meta, name){
			var metadiv = $(SetupManager.divOpen+SetupManager.divClose);
			var icon  = $('<span class="ui-icon ui-icon-folder-collapsed" style="display:inline-block"></span>');
			var authName = $('<text>'+name+'</text>');
			
			
			
			metadiv.addClass("MetaBorder");
			authName.addClass("MetaBorder");
			
			metadiv.append(icon);
			metadiv.append(authName);
			
			$(SetupManager.pound+meta).append(metadiv);
		},
		
		
		addFilterToSummary	:	function(type, name){
			
			
			
			
			var oneFilterDiv = $(SetupManager.divOpen+SetupManager.divClose);
			$(SetupManager.pound+SetupManager.filterSummaryDiv_ID).append(oneFilterDiv);
			
			oneFilterDiv.addClass("FilterSelected");
			
			var icon;
			if(type == FilterManager.AUTHOR_CATEGORY){
				
				icon  = $('<span class="ui-icon ui-icon-person" style="display:inline-block"></span>');
			}else if(type == FilterManager.TAG_CATEGORY){
				
				icon  = $('<span class="ui-icon ui-icon-tag" style="display:inline-block"></span>');
			}else if(type == FilterManager.PROJECT_CATEGORY){
				icon  = $('<span class="ui-icon ui-icon-folder-collapsed" style="display:inline-block"></span>');
			}else if (type == FilterManager.LIB_CATEGORY){
				icon  = $('<span class="ui-icon ui-icon-note" style="display:inline-block"></span>');
			}else if (type == FilterManager.GRANULARITY_CATEGORY){
				icon  = $('<span class="ui-icon ui-icon-script" style="display:inline-block"></span>');
			}
			
			oneFilterDiv.append(icon);
			oneFilterDiv.append("<text>"+name+"</text>");
			
			
//			var closeButton = $(SetupManager.buttonOpen+SetupManager.buttonClose);
//			
//			closeButton.button({
//				icons: {
//		        	primary: "ui-icon-circle-close"
//					}
//			});
//			
//			closeButton.height(30);
//			closeButton.width(30);
//			closeButton.addClass("CloseFilter");
			
			
			oneFilterDiv
			.click(function(){
				
				filter = new Filter(type,name);
				FilterManager.removeFilter(filter);
				
				oneFilterDiv.remove();
				//send new filtered query
				QueryManager.submitQuery();
				
				
				
			});
			
	//		oneFilterDiv.append(closeButton);
			
			
			
			
		
		},
		

		/**
		 * Assumes an even array length where even indicies are name and odd are facet count
		 */
		populateFilter	:	function(arrayValues, category){
			if(!Controller.sortFiltersAlpha){
				Controller.sortFilterByCount(arrayValues,category);
			}else{
				Controller.sortFilterAlpha(arrayValues,category);
			}
		},
		
		sortFilterAlpha	:	function(arrayValues,category){
			
			var div;
			
			
			if(category == FilterManager.AUTHOR_CATEGORY){
				div = $(SetupManager.pound+SetupManager.peopleTabDiv_ID);
			}else if(category == FilterManager.TAG_CATEGORY){
				div = $(SetupManager.pound+SetupManager.tagTabDiv_ID);
			}else if(category == FilterManager.PROJECT_CATEGORY){
				div = $(SetupManager.pound+SetupManager.projectTabDiv_ID);
			}else if(category == FilterManager.GRANULARITY_CATEGORY){
				div = $(SetupManager.pound+SetupManager.granularityTabDiv_ID);
			}else if(category == FilterManager.LIB_CATEGORY){
				div = $(SetupManager.pound+SetupManager.libraryTabDiv_ID);
			}
			
			
			div.empty();
			var table = $(SetupManager.tableOpen+SetupManager.tableClose);
			div.append(table);
			
			
			arrayValues = Controller.getOnlyFacetValues(arrayValues);
			
			arrayValues = arrayValues.filter(function(elem, index, self) {
			    return index == self.indexOf(elem);
			});
			
			arrayValues.sort();

			
			
			div.empty();
			var table = $(SetupManager.tableOpen+SetupManager.tableClose);
			div.append(table);
			
			var width = $(SetupManager.pound+SetupManager.filterDiv_ID).width();
			div.width(width);
			
			for(i = 0; i<arrayValues.length; i++){
				var filterCell;
				
				var tableRow;
				if(i == 0 || i%3 == 0){
					
					tableRow = $(SetupManager.trOpen+SetupManager.trClose);
					table.append(tableRow);
				}
				
			
				    filterCell = $(SetupManager.tdOpen+SetupManager.tdClose);
					tableRow.append(filterCell);
					
					filterCell.append("<text>"+arrayValues[i]+"</text>");
				
					filterCell.addClass("FilterTD");
					
					(function(cell,name){
							
							cell.mouseenter(function(){
								cell.addClass("FilterTDhover");					
							});
							
							cell.mouseleave(function(){
								cell.removeClass("FilterTDhover");					
							});
							cell.mouseup(function(){
								//add to filters
								if(category == FilterManager.AUTHOR_CATEGORY){
									filter = new Filter(FilterManager.AUTHOR_CATEGORY,name);
									FilterManager.addFilter(filter);
									//updated filter summary
									Controller.addFilterToSummary(FilterManager.AUTHOR_CATEGORY, name);
								}else if(category == FilterManager.TAG_CATEGORY){
									filter = new Filter(FilterManager.TAG_CATEGORY,name);
									FilterManager.addFilter(filter);
									//updated filter summary
									Controller.addFilterToSummary(FilterManager.TAG_CATEGORY, name);
								}else if(category == FilterManager.PROJECT_CATEGORY){
									filter = new Filter(FilterManager.PROJECT_CATEGORY,name);
									FilterManager.addFilter(filter);
									//updated filter summary
									Controller.addFilterToSummary(FilterManager.PROJECT_CATEGORY, name);
								}else if(category == FilterManager.LIB_CATEGORY){
									filter = new Filter(FilterManager.LIB_CATEGORY,name);
									FilterManager.addFilter(filter);
									//updated filter summary
									Controller.addFilterToSummary(FilterManager.LIB_CATEGORY, name);
								}else if(category == FilterManager.GRANULARITY_CATEGORY){
									filter = new Filter(FilterManager.GRANULARITY_CATEGORY,name);
									FilterManager.addFilter(filter);
									//updated filter summary
									Controller.addFilterToSummary(FilterManager.GRANULARITY_CATEGORY, name);
								}
		
								//send new filtered query
								QueryManager.submitQuery();
							});
							
					})(filterCell,arrayValues[i]);	
			}
			
		}
		,
		
		sortFilterByCount	: function(arrayValues, category){
			var div;
			
			
			if(category == FilterManager.AUTHOR_CATEGORY){
				div = $(SetupManager.pound+SetupManager.peopleTabDiv_ID);
			}else if(category == FilterManager.TAG_CATEGORY){
				div = $(SetupManager.pound+SetupManager.tagTabDiv_ID);
			}else if(category == FilterManager.PROJECT_CATEGORY){
				div = $(SetupManager.pound+SetupManager.projectTabDiv_ID);
			}else if(category == FilterManager.GRANULARITY_CATEGORY){
				div = $(SetupManager.pound+SetupManager.granularityTabDiv_ID);
			}else if(category == FilterManager.LIB_CATEGORY){
				div = $(SetupManager.pound+SetupManager.libraryTabDiv_ID);
			}
			
			
			div.empty();
			var table = $(SetupManager.tableOpen+SetupManager.tableClose);
			div.append(table);
			
			
//			var width = $(SetupManager.pound+SetupManager.filterDiv_ID).width();
//			div.width(width);
			
			for(i = 0; i<arrayValues.length; i = i+2){
				var filterCell;
				var tableRow;
				//set to mod 6 for 3 cells per row because we get a score between
				//names
				if(i == 0 || i%6 == 0){
					
					tableRow = $(SetupManager.trOpen+SetupManager.trClose);
					table.append(tableRow);
				}
				
				if( i == 0 || i%2 == 0){
				    filterCell = $(SetupManager.tdOpen+SetupManager.tdClose);
					tableRow.append(filterCell);
				
					
					 var rainbow = new RainbowVis(); 
					 rainbow.setNumberRange(1, arrayValues.length);
					 rainbow.setSpectrum('#FFCCCC', '#99E6FF');
					 var hexColor = rainbow.colourAt(i);

					var text = $("<text>["+arrayValues[i+1]+"] "+arrayValues[i]+""+"</text>");
					//var text = $("<text>"+arrayValues[i]+""+"</text>");
					//text.css("color","white");
					filterCell.append(text);
					
					filterCell.css("background-color","#"+hexColor);
					
					filterCell.addClass("FilterTD");
					
					(function(cell,name){
						
						cell.mouseenter(function(){
							cell.addClass("FilterTDhover");					
						});
						
						cell.mouseleave(function(){
							cell.removeClass("FilterTDhover");					
						});
						
						cell.mouseup(function(){
							//add to filters
							if(category == FilterManager.AUTHOR_CATEGORY){
								filter = new Filter(FilterManager.AUTHOR_CATEGORY,name);
								FilterManager.addFilter(filter);
								//updated filter summary
								Controller.addFilterToSummary(FilterManager.AUTHOR_CATEGORY, name);
							}else if(category == FilterManager.TAG_CATEGORY){
								filter = new Filter(FilterManager.TAG_CATEGORY,name);
								FilterManager.addFilter(filter);
								//updated filter summary
								Controller.addFilterToSummary(FilterManager.TAG_CATEGORY, name);
							}else if(category == FilterManager.PROJECT_CATEGORY){
								filter = new Filter(FilterManager.PROJECT_CATEGORY,name);
								FilterManager.addFilter(filter);
								//updated filter summary
								Controller.addFilterToSummary(FilterManager.PROJECT_CATEGORY, name);
							}else if(category == FilterManager.LIB_CATEGORY){
								filter = new Filter(FilterManager.LIB_CATEGORY,name);
								FilterManager.addFilter(filter);
								//updated filter summary
								Controller.addFilterToSummary(FilterManager.LIB_CATEGORY, name);
							}else if(category == FilterManager.GRANULARITY_CATEGORY){
								filter = new Filter(FilterManager.GRANULARITY_CATEGORY,name);
								FilterManager.addFilter(filter);
								//updated filter summary
								Controller.addFilterToSummary(FilterManager.GRANULARITY_CATEGORY, name);
							}
	
							//send new filtered query
							QueryManager.submitQuery();
						});
						
				})(filterCell,arrayValues[i]);
					
				}
				

				
			}
			
		}
		
		
		,
		
		getOnlyFacetValues	:	function(facetArray){
			
			var facetValues = new Array();
			
			for(i = 0; i<facetArray.length;i++){
				if(i == 0 || i%2 == 0){
					facetValues.push(facetArray[i]);
				}
			}
			
			return facetValues;
		},
		

		
		/**
		 * FUNCTION
		 * expand the input/filter header
		 */
		expandHeader	: function(){
			//let's see the filter tabs
			$(SetupManager.pound+SetupManager.filterDiv_ID).toggle();
			
			$(SetupManager.pound+SetupManager.queryInput_ID).animate({
				height: 400
			},700
			);
			
			$(SetupManager.pound+SetupManager.filterDiv_ID).animate({
				height: 400
			},700
			);
			
			Controller.headerExpanded = true;
			
		},
		
		/**
		 * FUNCTION
		 * collapse the input/filter header
		 * @returns
		 */
		collapseHeader	:function(){
			//let's hide the filter tabs
			$(SetupManager.pound+SetupManager.filterDiv_ID).toggle();
			
			$(SetupManager.pound+SetupManager.queryInput_ID).animate({
				height: 30
			},700
			);
			
			$(SetupManager.pound+SetupManager.filterDiv_ID).animate({
				height: 30
			},700
			);
			
			Controller.headerExpanded = false;

			
			
		},
		
		/**
		 * FUNCTION
		 */
		expandCell	:	function(cell){
			
			 // $(SetupManager.pound+cell).css({position:'relative'}); 
	         //turn the other cells off
	          Controller.toggleCells(cell);
			  var id = cell;
			  var number = id.charAt(id.length-1);
			  var result = SetupManager.resultPreArray_ID[number];
			  
			  previousHeight = $(SetupManager.pound+result).height();
	          previousWidth = $(SetupManager.pound+result).width();
	          previousX = $(SetupManager.pound+result).offset().left;
	          previousY = $(SetupManager.pound+result).offset().top;
	          

				var screenWidth = jQuery(window).width();
				var screenHeight = jQuery(window).height();
				var screenBuffer = screenWidth*(3/4)-SetupManager.sideBuffer-32;
				var screenHeightBuffer = screenHeight*(3/4)-75-10;
			  
	          $( SetupManager.pound+SetupManager.resultPreArray_ID[number] ).animate({
		           
		  
		            width:  screenBuffer,
		            height: screenHeightBuffer,
		            left:	'0px',
		            top:	'0px'
		          }, 0 );

		},
		
		/**
		 * FUNCTION
		 */
		collapseCell	:	function(cell){
			//$(SetupManager.pound+cell).css({position:'absolute'});
        	
			var currentX = $(SetupManager.pound+cell).position().left;
			var currentY = $(SetupManager.pound+cell).position().top;
			
	         //turn the other cells on
	         Controller.toggleCells(cell);
	         
	          
			  var id = cell;
			  var number = id.charAt(id.length-1);
			  var result = SetupManager.resultPreArray_ID[number];
			 
			  
	          $( SetupManager.pound+SetupManager.resultPreArray_ID[number] ).animate({
		          
		  
		            width: previousWidth,
		            height: previousHeight,
		            left:	previousX+'px',
		            top:	previousY+'px'
		          }, 0 );
	          

		},
		
		/**
		 * FUNCTION
		 */
		toggleCells		:	function(cell){
			var length = SetupManager.cellDivArray_ID.length;
			
			var rowIndex = 0;
			
			for(var i = 0; i<length; i++){
		          if(cell != SetupManager.cellDivArray_ID[i]){
		        	  $(SetupManager.pound+SetupManager.resultPreArray_ID[i]).toggle();
		        	  $(SetupManager.pound+SetupManager.cellDivArray_ID[i]).toggle();
		        	 
		          }else{
		        	  rowIndex = i;
		          }
			}
      	  
      	  //TODO: need to generalize this!!
//      	  if(rowIndex == 2 || rowIndex == 3){
//      		  		$("#row0").toggle();	  
//        		}else{
//        			$("#row2").toggle();	
//        		}
      	
		}
		
		
};