
/**
 * Controls the initial setup and keeps all the ids
 * of the elements created, always use this class
 * to refer to the IDs
 * 
 * @author lee
 */
var SetupManager = {
		
		
		//These are the id's of each element created
		//button
		searchBtn_ID	:	"search",
		
		//button
		searchExpandBtn_ID	:	"searchExpandButton",
		
		//button
		filterExpandBtn_ID	:	"filterExpandButton",
		
		expandBtnArray_ID	:	new Array(),
		
		//pre
		resultPreArray_ID	:	new Array(),
		
		//p
		resultTotalP_ID	:	"resultTotal",
		
		//div
		statusDiv_ID	:	"status",
		
		//div
		entireSiteDiv_ID	:	"entireSite",
		
		//input
		queryInput_ID	:	"query",
		
		//div
		filterDiv_ID	:	"filterDiv",
		
		//div
		filterSummaryDiv_ID	:	"filterSummaryDiv",
		
		//list
		tabList_ID			:	"tabList_ID",
		
		//div
		metaDivArray_ID	:	new Array(),
		
		//div
		cellDivArray_ID	:	new Array(),
		
		//div
		headerDiv_ID	:	"header",
		
		//table
		resultTable_ID		:	"resultTable",
		
		//div
		resultOptionsDiv_ID	:	"resultOptions",
		
		//div
		pageNavigationDiv_ID	:	"pageNavigation",
		
		//table
		tableHeader_ID			:	"table_header_ID",
		
		//div for tab
		tagTabDiv_ID			:	"tag_tab_div_ID",
		
		//div for tab
		peopleTabDiv_ID			:	"people_tab_div_ID",
		
		//div for tab
		projectTabDiv_ID		:	"project_tab_div_ID",
		
		libraryTabDiv_ID		:	"library_tab_div_ID",
		
		granularityTabDiv_ID	:	"granularity_tab_div_ID",
		
		filterTable_ID			:	"filterTable_ID",
		
		extendsInputID			:	"extends_ID",
		
		implementsInputID		:	"implements_ID",
		
		callInputID				:	"callInput_ID",
		callingObjectInputID	:	"callingObjectInput_ID",
		
			
		//These are the CSS classes
		Cell_CSS_Class			:	"Cell",
		Result_CSS_Class		:	"Result",
		Status_CSS_Class		:	"Status",
		Meta_CSS_Class			:	"Meta",
		MetaDatum_CSS_Class		:	"MetaDatum",
		ResultOptions_CSS_Class	:	"ResultOptions",
		ExpandBtn_CSS_Class		:	"Expand",
		
		//tags for setup
		divOpen			:	"<div>",
		divClose		:	"</div>",
		inputOpen		:	"<input>",
		inputClose		:	"</input>",
		buttonOpen		:	"<button>",
		buttonClose		:	"</button>",
		preOpen			:	"<pre>",
		preClose		:	"</pre>",
		tableOpen		:	"<table>",
		tableClose		:	"</table>",
		trOpen			:	"<tr>",
		trClose			:	"</tr>",
		tdOpen			:	"<td>",
		tdClose			:	"</td>",
		pOpen			:	"<p>",
		pClose			:	"</p>",
		newLine			:	"<br/>",
		textAreaOpen	:	"<textarea>",
		textAreaClose	:	"</textarea>",
		listOpen		:	"<ul>",
		listClose		:	"</ul>",
		listItemOpen	:	"<li>",
		listItemClose	:	"</li>",
		
		//attributes
		ID_attr				:	"id",
		width_attr			:	"width",
		height_attr			:	"height",
		placeholder_attr	:	"placeholder",
		columns				:	"cols",
		rows				:	"rows",
		
		//pound for finding by id
		pound		:	"#",
		//period for finding by class
		period		:	".",
		
		//distance from side of screen
		sideBuffer	:	50,
		
		/**
		 * FUNCTION: create the site visual structures and listeners
		 */
		setupSite	:	function(){

			screenWidth = jQuery(window).width();
			screenHeight = jQuery(window).height();
			
// --- create elements
			
			var tableForSite = $(SetupManager.tableOpen+SetupManager.tableClose);
			$(SetupManager.pound+SetupManager.entireSiteDiv_ID).append(tableForSite);
			tableForSite.addClass("HeaderTable");
			tableForSite.attr(SetupManager.ID_attr,SetupManager.tableHeader_ID);
			
			var headerRow = $(SetupManager.trOpen+SetupManager.trClose);
			tableForSite.append(headerRow);
			headerRow.addClass("HeaderTR");
			
			//query box
			var queryTD = $(SetupManager.tdOpen+SetupManager.tdClose);
			queryTD.attr("valign", "top");
			headerRow.append(queryTD);
			
			//queryTD.attr("bgcolor","darkgray");
			
			//logo
			var logo = $(SetupManager.divOpen+SetupManager.divClose);
			queryTD.append(logo);
			var logoName = $('<a href="index.html"><img src="http://codeexchange.ics.uci.edu/logo2.png"/></a>');
			logo.append(logoName);
			logo.addClass("Logo");

			
			//make keyword input
			var input = $(SetupManager.textAreaOpen+SetupManager.textAreaClose);
			//append to header
			logo.append(input);
			//set id
			input.attr(SetupManager.ID_attr,SetupManager.queryInput_ID);
			input.attr(SetupManager.placeholder_attr, "keywords in code");
			
			
			//--row for status
			var rowStatus = $(SetupManager.trOpen+SetupManager.trClose);
			tableForSite.append(rowStatus);
			
			//make status div
			var status = $(SetupManager.tdOpen+SetupManager.tdClose);
			
			rowStatus.append(status);
			//set id
			status.attr(SetupManager.ID_attr,SetupManager.statusDiv_ID);
			status.attr("valign","top");
			status.attr("padding-bottom", "0px");
			//status.addClass("StatusTD");
			
			Controller.setStatus("Let's find some code.");
			
			//--row for navigation
			var rowNavigation = $(SetupManager.trOpen+SetupManager.trClose);
			tableForSite.append(rowNavigation);
			
			//make page navigation
			var pageNavigation = $(SetupManager.tdOpen+SetupManager.tdClose);
			// append
			rowNavigation.append(pageNavigation);
			//set id
			pageNavigation.attr(SetupManager.ID_attr, SetupManager.pageNavigationDiv_ID);
			pageNavigation.attr("valign","top");
			pageNavigation.addClass("StatusTD");
			
			//result row
			var resultRow = $(SetupManager.trOpen+SetupManager.trClose);
			tableForSite.append(resultRow);
			
			//result td
			var resultTD = $(SetupManager.tdOpen+SetupManager.tdClose);
			resultRow.append(resultTD);
			
			
			//make table
			var tableOfResults = $(SetupManager.tableOpen+SetupManager.tableClose);
			//set id
			tableOfResults.attr(SetupManager.ID_attr,SetupManager.resultTable_ID);
			//append to entire site
			resultTD.append(tableOfResults);
			//set width
			$(SetupManager.pound+SetupManager.resultTable_ID).width(screenWidth-SetupManager.sideBuffer);
			//set height
			$(SetupManager.pound+SetupManager.resultTable_ID).height(screenHeight/2);

			tableOfResults.addClass("ResultTable");
			
			//make cells
			SetupManager.makeTableCells(3);
			
			
			//side filter
			var filterSideTD = $(SetupManager.tdOpen+SetupManager.tdClose);
			filterSideTD.attr("rowspan","4");
			headerRow.append(filterSideTD);
			filterSideTD.attr("valign", "top");
			
			filterSideTD.addClass("FilterSideTD");
			
			//filter table
			var filterTable = $(SetupManager.tableOpen+SetupManager.tableClose);
			filterTable.attr(SetupManager.ID_attr,SetupManager.filterTable_ID);
			filterSideTD.append(filterTable);
			
			var classHeader = $('<tr><table><th align="left">Class properties</th></table></tr>');
			filterTable.append(classHeader);
			
			//making the extnds filter
			var extendsRow = $(SetupManager.trOpen+SetupManager.trClose);
			filterTable.append(extendsRow);
			var extendsTD = $(SetupManager.tdOpen+SetupManager.tdClose);
			extendsRow.append(extendsTD);
			
			extendsTD.append("<text>extends&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</text>");
			var extendsInput = $(SetupManager.inputOpen+SetupManager.inputClose);
			extendsTD.append(extendsInput);
			extendsInput.attr(SetupManager.ID_attr, SetupManager.extendsInputID);
			$(SetupManager.pound+SetupManager.extendsInputID).autocomplete({ source: [] });
			
			//making the implements filter
			var implementsRow = $(SetupManager.trOpen+SetupManager.trClose);
			filterTable.append(implementsRow);
			var implementsTD = $(SetupManager.tdOpen+SetupManager.tdClose);
			implementsRow.append(implementsTD);
			
			implementsTD.append("<text>implements&nbsp&nbsp&nbsp&nbsp</text>");
			var implementsInput = $(SetupManager.inputOpen+SetupManager.inputClose);
			implementsTD.append(implementsInput);
			implementsInput.attr(SetupManager.ID_attr, SetupManager.implementsInputID);
			$(SetupManager.pound+SetupManager.implementsInputID).autocomplete({ source: [] });
			
			var callHeader = $('<tr><table><th align="left">Method call properties</th></table></tr>');
			filterTable.append(callHeader);
			
			//making calling object class name row
			var callingObjectRow = $(SetupManager.trOpen+SetupManager.trClose);
			filterTable.append(callingObjectRow);
			var callingObjectTD = $(SetupManager.tdOpen+SetupManager.tdClose);
			callingObjectRow.append(callingObjectTD);
			
			callingObjectTD.append("<text>object's Class&nbsp&nbsp&nbsp&nbsp</text>");
			var callingObjectInput = $(SetupManager.inputOpen+SetupManager.inputClose);
			callingObjectTD.append(callingObjectInput);
			callingObjectInput.attr(SetupManager.ID_attr, SetupManager.callingObjectInputID);
			$(SetupManager.pound+SetupManager.callingObjectInputID).autocomplete({ source: [] });
			
			//making method call name row
			var methodCallRow = $(SetupManager.trOpen+SetupManager.trClose);
			filterTable.append(methodCallRow);
			var callTD = $(SetupManager.tdOpen+SetupManager.tdClose);
			methodCallRow.append(callTD);
			
			callTD.append("<text>method name&nbsp&nbsp&nbsp&nbsp</text>");
			var callInput = $(SetupManager.inputOpen+SetupManager.inputClose);
			callTD.append(callInput);
			callInput.attr(SetupManager.ID_attr, SetupManager.callInputID);
			$(SetupManager.pound+SetupManager.callInputID).autocomplete({ source: [] });
			
			//making parameter type row
			

			
//-- autocomplete extends
			
			extendsInput.keypress(function(e){
				autoCompleteQuery = extendsInput.val();
				QueryManager.submitAutoComplete(SetupManager.extendsInputID,autoCompleteQuery);	
				
				if (!e.shiftKey && e.keyCode == '13') {
					var query = $(SetupManager.pound+SetupManager.queryInput_ID).val()
					QueryManager.setQuery(query);
					QueryManager.submitQuery();
					//make it lose focus so we can detect when user refocus on query it
					$(SetupManager.pound+SetupManager.queryInput_ID).blur();
				}
			});
			implementsInput.keypress(function(e){
				autoCompleteQuery = implementsInput.val();
				QueryManager.submitAutoComplete(SetupManager.implementsInputID,autoCompleteQuery);	
				
				if (!e.shiftKey && e.keyCode == '13') {
					var query = $(SetupManager.pound+SetupManager.queryInput_ID).val()
					QueryManager.setQuery(query);
					QueryManager.submitQuery();
					//make it lose focus so we can detect when user refocus on query it
					$(SetupManager.pound+SetupManager.queryInput_ID).blur();
				}
			});
			callInput.keypress(function(e){
				autoCompleteQuery = callInput.val();
				QueryManager.submitAutoComplete(SetupManager.callInputID,autoCompleteQuery);	
				
				if (!e.shiftKey && e.keyCode == '13') {
					var query = $(SetupManager.pound+SetupManager.queryInput_ID).val()
					QueryManager.setQuery(query);
					QueryManager.submitQuery();
					//make it lose focus so we can detect when user refocus on query it
					$(SetupManager.pound+SetupManager.queryInput_ID).blur();
				}
			});
			callingObjectInput.keypress(function(e){
				autoCompleteQuery = callInput.val();
				QueryManager.submitAutoComplete(SetupManager.callingObjectInputID,autoCompleteQuery);	
				
				if (!e.shiftKey && e.keyCode == '13') {
					var query = $(SetupManager.pound+SetupManager.queryInput_ID).val()
					QueryManager.setQuery(query);
					QueryManager.submitQuery();
					//make it lose focus so we can detect when user refocus on query it
					$(SetupManager.pound+SetupManager.queryInput_ID).blur();
				}
			});
			
				
// --- set dimensions (good to do later so can to relative to other's dimensions
			
			//set input width
			var buttonWidth = $(SetupManager.pound+SetupManager.searchBtn_ID).width();
		//	input.width(screenWidth - buttonWidth - 50);
			
// --- add listeners
			//add mouse click listener to search button
			$(SetupManager.pound+SetupManager.searchBtn_ID)
			.click(function(){
				QueryManager.submitQuery(
						$(SetupManager.pound+SetupManager.queryInput_ID).val(),0);
				});
			
			
			//add keypress  for 'enter' listener to body to submit query
			$('body').keypress(function(e) {
				if (!e.shiftKey && e.keyCode == '13') {
					
					var query = $(SetupManager.pound+SetupManager.queryInput_ID).val()
					QueryManager.setQuery(query);
					QueryManager.submitQuery();
					//make it lose focus so we can detect when user refocus on query it
					$(SetupManager.pound+SetupManager.queryInput_ID).blur();
							
					
				}
			});
			
//listener for expand button
			var collapsed = true;
			$(".Expand").click(function(event) {
        	//use event.currentTarget.id for some resson event.target.id does not work
			  var id = event.currentTarget.id;
			  var number = id.charAt(id.length-1);
	          var cellSelected = Controller.getExpandBtnToCell(number);
	          
	        if ( collapsed ) {
		      //expand the cell
	        	Controller.expandCell(cellSelected);
	          
	        } else {
	        	Controller.collapseCell(cellSelected);	          
	        }
	        collapsed = !collapsed;

	      });
			
////listener for expand input
//			$(SetupManager.pound+SetupManager.tableHeader_ID).mouseenter(function(event){
//				if(!Controller.headerExpanded){
//					Controller.expandHeader();
//				}
//			});
//			
//
////listen to collapse input
//			$(SetupManager.pound+SetupManager.tableHeader_ID).mouseleave(function(event){
//				if(Controller.headerExpanded){
//					Controller.collapseHeader();
//				}
//				
//			});
			
			
			// --- add listeners to cell 
			var screenWidth = jQuery(window).width();
			var screenHeight = jQuery(window).height();
			var screenBuffer = screenWidth*(3/4);
			var screenHeightBuffer = screenHeight*(3/4)-50;
			
//resize function called when resize event happens
			$(window).resize(function() {
				screenWidth = jQuery(window).width();
				screenHeight = jQuery(window).height();
				var screenBuffer = screenWidth*(3/4);
				var screenHeightBuffer = screenHeight*(3/4)-50;
				
				$('.Result').width(((screenBuffer)/3)-SetupManager.sideBuffer);
				$('.Result').height((screenHeightBuffer));

				$('.ResultTD').width(((screenBuffer)/3)-SetupManager.sideBuffer);
				$('.ResultTD').height((screenHeightBuffer));		
				//$('.HeaderTD').width((screenWidth/2)-SetupManager.sideBuffer);
			
				
				$('.ResultTR').width(((screenBuffer))-SetupManager.sideBuffer);
				$('.ResultTR').height((screenHeightBuffer));
			//	$('.HeaderTR').width((screenWidth-screenBuffer)-SetupManager.sideBuffer);
				
				
				$('.ResultTable').width(((screenBuffer))-SetupManager.sideBuffer);
				//$('.HeaderTable').width((screenWidth)-SetupManager.sideBuffer);

				
				
				$(SetupManager.pound+SetupManager.queryInput_ID).width((screenBuffer)-(SetupManager.sideBuffer+168));
				
				
		
				
				$('.FilterSideTD').width(((screenBuffer)/3));
				
				
			});
			$(window).trigger('resize');
			
//set dimensions of all Cells
			$('.Result').width(((screenBuffer)/3)-SetupManager.sideBuffer);
			$('.Result').height((screenHeightBuffer));
			
			$('.ResultTD').width(((screenBuffer)/3)-SetupManager.sideBuffer);
			$('.ResultTD').height((screenHeightBuffer));		
		//	$('.HeaderTD').width((screenWidth/2)-SetupManager.sideBuffer);
		
			
			$('.ResultTR').width(((screenBuffer))-SetupManager.sideBuffer);
			$('.ResultTR').height((screenHeightBuffer));
		//	$('.HeaderTR').width((screenWidth-screenBuffer)-SetupManager.sideBuffer);
		
			
			$('.ResultTable').width(((screenBuffer))-SetupManager.sideBuffer);
		//	$('.HeaderTable').width((screenWidth)-SetupManager.sideBuffer);

//set dimensions of input box			
			
			$(SetupManager.pound+SetupManager.queryInput_ID).width((screenBuffer)-(SetupManager.sideBuffer+168));
			//$(SetupManager.pound+SetupManager.filterSummaryDiv_ID).width((screenWidth/2)-SetupManager.sideBuffer+30);
			
			$('.FilterSideTD').width(((screenBuffer)/3));
		
			
		},
		/**
		 * FUNCTION
		 * makes the cells in the table of results
		 * assumes 2 columns max
		 * @returns
		 */
		makeTableCells	:	function(numOfCells){
			var tempRowId;
			var tempTdId;
			

			
			for(var i = 0; i< numOfCells; i++){
				tempTdId = "td"+i;
				
				
				//new row every even - where assumption is implemented
				if( (i%3) == 0){
					
					tempRowId = "row"+i;
					//make row
					var row = $(SetupManager.trOpen+SetupManager.trClose);
					row.addClass("ResultTR");
					row.attr(SetupManager.ID_attr,tempRowId);
					$(SetupManager.pound+SetupManager.resultTable_ID).append(row);
					
				}
				
				//make td
				var td = $(SetupManager.tdOpen+SetupManager.tdClose);
				td.addClass("ResultTD");
				td.attr(SetupManager.ID_attr,tempTdId);
				$(SetupManager.pound+tempRowId).append(td);
				
				
				//make cell to go into td
				var cell = $(SetupManager.divOpen+SetupManager.divClose);
				var cell_id = "cell"+i;
				SetupManager.cellDivArray_ID[i] = cell_id;
				cell.attr(SetupManager.ID_attr,SetupManager.cellDivArray_ID[i]);
				cell.addClass("Cell");
				//add to td
				$(SetupManager.pound+tempTdId).append(cell);
				
				//make meta data for cell
				var metaData = $(SetupManager.divOpen+SetupManager.divClose);
				var meta_id = "meta"+i;
				SetupManager.metaDivArray_ID[i] = meta_id;
				metaData.attr(SetupManager.ID_attr,SetupManager.metaDivArray_ID[i]);
				metaData.addClass("Meta");
				//add to cell
				$(SetupManager.pound+SetupManager.cellDivArray_ID[i]).append(metaData);
				
				$(SetupManager.pound+SetupManager.cellDivArray_ID[i]).append($(SetupManager.newLine));
				
				//make result data for cell
				var resultData = $(SetupManager.preOpen+SetupManager.preClose);
				var result_id = "result"+i;
				SetupManager.resultPreArray_ID[i] = result_id;
				resultData.attr(SetupManager.ID_attr,SetupManager.resultPreArray_ID[i]);
				resultData.addClass("Result");
				//add to cell
				$(SetupManager.pound+SetupManager.cellDivArray_ID[i]).append(resultData);
				
				//make result options for cell
				var resultOptions = $(SetupManager.divOpen+SetupManager.divClose);
				var resultOptions_id = "resultOptions"+i;
				resultOptions.addClass("ResultOptions");
				
				resultOptions.attr(SetupManager.ID_attr, resultOptions_id);
				$(SetupManager.pound+SetupManager.cellDivArray_ID[i]).append(resultOptions);
				
				//make expand button for result options
				var expandButton	 = $(SetupManager.buttonOpen+SetupManager.buttonClose);
				var expandButton_id	="expandBtn"+i;
				SetupManager.expandBtnArray_ID[i] = expandButton_id;
				expandButton.attr(SetupManager.ID_attr, SetupManager.expandBtnArray_ID[i]);
				expandButton.addClass("Expand");
				//add to result options
				$(SetupManager.pound+resultOptions_id).append(expandButton);
				//button attributes
				$(SetupManager.pound+SetupManager.expandBtnArray_ID[i]).button({
					icons: {
			        	primary: "ui-icon-arrow-4-diag"
						}
				});
				


				
				

				
				
			}
			

		}
		

		
		
		
};