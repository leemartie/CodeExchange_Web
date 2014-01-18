
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
			
			var tableHeader = $(SetupManager.tableOpen+SetupManager.tableClose);
			$(SetupManager.pound+SetupManager.entireSiteDiv_ID).append(tableHeader);
			tableHeader.addClass("HeaderTable");
			tableHeader.attr(SetupManager.ID_attr,SetupManager.tableHeader_ID);
			
			
			var rowHeader = $(SetupManager.trOpen+SetupManager.trClose);
			tableHeader.append(rowHeader);
			tableHeader.addClass("HeaderTR");
			
			
			
			var queryTD = $(SetupManager.tdOpen+SetupManager.tdClose);
			rowHeader.append(queryTD);
			queryTD.addClass("HeaderTD");
			
			//make keyword input
			var input = $(SetupManager.textAreaOpen+SetupManager.textAreaClose);
			//append to header
			queryTD.append(input);
			//set id
			input.attr(SetupManager.ID_attr,SetupManager.queryInput_ID);
			input.attr(SetupManager.placeholder_attr, "keywords or code here (shift-enter for newline)");
			
	
			var filterTD = $(SetupManager.tdOpen+SetupManager.tdClose);
			rowHeader.append(filterTD);
			filterTD.addClass("FilterHeaderTD");
			
			
		
			//make filter summary
			var filterSummary = $(SetupManager.divOpen+SetupManager.divClose);
			//append to header
			filterTD.append(filterSummary);
			//set id
			filterSummary.attr(SetupManager.ID_attr,SetupManager.filterSummaryDiv_ID);
			filterSummary.addClass("FilterSummary");
		//	filterSummary.append($('<text>no filters set</text>'));
			
			
			//make filter input
			var filterDiv = $(SetupManager.divOpen+SetupManager.divClose);
			//append to header
			filterTD.append(filterDiv);
			//set id
			filterDiv.attr(SetupManager.ID_attr,SetupManager.filterDiv_ID);
			filterDiv.addClass("Filter");
		  
			//list
			var tabList = $(SetupManager.listOpen+SetupManager.listClose);
			filterDiv.append(tabList);
			tabList.attr(SetupManager.ID_attr,SetupManager.tabList_ID);
			
			
			//filterHeaderDive
			var filterHeader = $("<form></form>");
			filterDiv.append(filterHeader);
			filterHeader.addClass("FilterHeader");
			
//			var text = $("<text>sort by:</text>");
//			filterHeader.append(text);
//			text.addClass("FloatLeft");
			
			
			//sort toggle
			var radioDiv = $(SetupManager.divOpen+SetupManager.divClose);
			radioDiv.attr(SetupManager.ID_attr,"radio");
			
			filterHeader.append(radioDiv);

			var inputRadio = $(SetupManager.inputOpen+SetupManager.inputClose);
			radioDiv.append(inputRadio);
			
			inputRadio.attr("type","radio");
			inputRadio.attr("name","radio");
			inputRadio.attr(SetupManager.ID_attr,"radio1");
			inputRadio.attr("checked","false");
			inputRadio.click(function(event) {
				
				Controller.sortFiltersAlpha = true;
				QueryManager.populateFilters();
				
			});
			
			var radio1Label = $('<label>sort alphabetically</label>');
			radio1Label.attr("for","radio1");
			
			filterHeader.append(radio1Label);

			
			var inputRadio2 = $(SetupManager.inputOpen+SetupManager.inputClose);
			radioDiv.append(inputRadio2);
			inputRadio2.attr("type","radio");
			inputRadio2.attr("name","radio");
			inputRadio2.attr(SetupManager.ID_attr,"radio2");
			inputRadio2.attr("checked","true");
			inputRadio2.click(function(event) {
				
				Controller.sortFiltersAlpha = false;
				QueryManager.populateFilters();
			});
			
			
			var radio2Label = $('<label>sort by property count</label>');
			radio2Label.attr("for","radio2");
			filterHeader.append(radio2Label);
			
			$( "#radio" ).buttonset();
			
			//tag tab
			var tabTags = $(SetupManager.listItemOpen+SetupManager.listItemClose);
			tabTags.append($('<a href="#'+SetupManager.tagTabDiv_ID+'">Tags</a>'));
			tabList.append(tabTags);
			
			
			
			
			//tag div
			var tagDiv = $(SetupManager.divOpen+SetupManager.divClose);
			filterDiv.append(tagDiv);
			tagDiv.append($('<p>tags here</p>'));
			tagDiv.attr(SetupManager.ID_attr,SetupManager.tagTabDiv_ID);
			
			//tab people
			var peopleTabs = $(SetupManager.listItemOpen+SetupManager.listItemClose);
			peopleTabs.append($('<a href="#'+SetupManager.peopleTabDiv_ID+'">People</a>'));
			tabList.append(peopleTabs);
			
			//people div
			var peopleDiv = $(SetupManager.divOpen+SetupManager.divClose);
			filterDiv.append(peopleDiv);
			peopleDiv.append($('<p>people here</p>'));
			peopleDiv.attr(SetupManager.ID_attr,SetupManager.peopleTabDiv_ID);
			
			//tab projects
			var projectTab = $(SetupManager.listItemOpen+SetupManager.listItemClose);
			projectTab.append($('<a href="#'+SetupManager.projectTabDiv_ID+'">Projects</a>'));
			tabList.append(projectTab);
			
			//project div
			var projectDiv = $(SetupManager.divOpen+SetupManager.divClose);
			filterDiv.append(projectDiv);
			projectDiv.append($('<p>projects here</p>'));
			projectDiv.attr(SetupManager.ID_attr,SetupManager.projectTabDiv_ID);
			
			//tab lib
			var libTab = $(SetupManager.listItemOpen+SetupManager.listItemClose);
			libTab.append($('<a href="#'+SetupManager.libraryTabDiv_ID+'">Libraries</a>'));
			tabList.append(libTab);
			
			//lib div
			var libDiv = $(SetupManager.divOpen+SetupManager.divClose);
			filterDiv.append(libDiv);
			libDiv.append($('<p>libs here</p>'));
			libDiv.attr(SetupManager.ID_attr,SetupManager.libraryTabDiv_ID);			
			//make it tabs NOTE: must come after making children!!
			
			
			//granularity lib
			var granTab = $(SetupManager.listItemOpen+SetupManager.listItemClose);
			granTab.append($('<a href="#'+SetupManager.granularityTabDiv_ID+'">Granularities</a>'));
			tabList.append(granTab);
			
			//lib div
			var granDiv = $(SetupManager.divOpen+SetupManager.divClose);
			filterDiv.append(granDiv);
			granDiv.append($('<p>granularities here</p>'));
			granDiv.attr(SetupManager.ID_attr,SetupManager.granularityTabDiv_ID);			
			//make it tabs NOTE: must come after making children!!
			filterDiv.tabs();
			
			if(!Controller.headerExpanded){
				filterDiv.toggle();
			}
			
			//make header
			var header = $(SetupManager.tableOpen+SetupManager.tableClose);
			//append to entier site
			$(SetupManager.pound+SetupManager.entireSiteDiv_ID).append(header);
			//set id
			header.attr(SetupManager.ID_attr,SetupManager.headerDiv_ID);
			header.addClass("Header");
			
			//header row
			var rowHeader = $(SetupManager.trOpen+SetupManager.trClose);
			header.append(rowHeader);
			
			//row 2
			var rowHeader2 = $(SetupManager.trOpen+SetupManager.trClose);
			header.append(rowHeader2);
			
			//logo
			var logo = $(SetupManager.tdOpen+SetupManager.tdClose);
			rowHeader.append(logo);
			var logoName = $('<img src="http://codeexchange.ics.uci.edu/logo2.png"/>');
			logo.append(logoName);
			logo.addClass("Logo");
			logo.attr("rowspan", "2");
			logo.attr("valign","middle");
			
			
	
			//make status div
			var status = $(SetupManager.tdOpen+SetupManager.tdClose);
			//append to header
			rowHeader.append(status);
			//set id
			status.attr(SetupManager.ID_attr,SetupManager.statusDiv_ID);
			status.attr("valign","top");
			status.attr("padding-bottom", "0px");
			status.addClass("StatusTD");
			
			Controller.setStatus("Let's find some code.");
			

				
			//make page navigation
			var pageNavigation = $(SetupManager.tdOpen+SetupManager.tdClose);
			// append
			rowHeader2.append(pageNavigation);
			//set id
			pageNavigation.attr(SetupManager.ID_attr, SetupManager.pageNavigationDiv_ID);
			pageNavigation.attr("valign","top");
			pageNavigation.addClass("StatusTD");
			
			
			//make table
			var tableOfResults = $(SetupManager.tableOpen+SetupManager.tableClose);
			//set id
			tableOfResults.attr(SetupManager.ID_attr,SetupManager.resultTable_ID);
			//append to entire site
			$(SetupManager.pound+SetupManager.entireSiteDiv_ID).append(tableOfResults);
			//set width
			$(SetupManager.pound+SetupManager.resultTable_ID).width(screenWidth-SetupManager.sideBuffer);
			//set height
			$(SetupManager.pound+SetupManager.resultTable_ID).height(screenHeight/2);

			tableOfResults.addClass("ResultTable");
			
			//make cells
			SetupManager.makeTableCells(4);
				
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
			
//listener for expand input
			$(SetupManager.pound+SetupManager.tableHeader_ID).mouseenter(function(event){
				if(!Controller.headerExpanded){
					Controller.expandHeader();
				}
			});
			

//listen to collapse input
			$(SetupManager.pound+SetupManager.tableHeader_ID).mouseleave(function(event){
				if(Controller.headerExpanded){
					Controller.collapseHeader();
				}
				
			});
			
			
			// --- add listeners to cell 
			var screenWidth = jQuery(window).width();
			var screenHeight = jQuery(window).height();
			
//resize function called when resize event happens
			$(window).resize(function() {
				screenWidth = jQuery(window).width();
				screenHeight = jQuery(window).height();
				
				$('.Result').width((screenWidth/2)-SetupManager.sideBuffer);
				$('.Result').height((screenHeight/4));

				$('.ResultTD').width((screenWidth/2)-SetupManager.sideBuffer);
				$('.ResultTD').height((screenHeight/4));		
				$('.HeaderTD').width((screenWidth/2)-SetupManager.sideBuffer);
			
				
				$('.ResultTR').width((screenWidth)-SetupManager.sideBuffer);
				$('.ResultTR').height((screenHeight/4));
				$('.HeaderTR').width((screenWidth/2)-SetupManager.sideBuffer);
				
				
				$('.ResultTable').width((screenWidth)-SetupManager.sideBuffer);
				$('.HeaderTable').width((screenWidth)-SetupManager.sideBuffer);
								
				$(SetupManager.pound+SetupManager.resultTable_ID).width(screenWidth-SetupManager.sideBuffer);
				$(SetupManager.pound+SetupManager.resultTable_ID).height(screenHeight/2);
				
				//var searchButtonWidth = $(SetupManager.pound+SetupManager.searchBtn_ID).width();
				
				$(SetupManager.pound+SetupManager.queryInput_ID).width((screenWidth/2)-SetupManager.sideBuffer+25);
				$(SetupManager.pound+SetupManager.filterSummaryDiv_ID).width((screenWidth/2)-SetupManager.sideBuffer+30);
				
				//$(SetupManager.ID_attr,SetupManager.tableHeader_ID).width(screenWidth-SetupManager.sideBuffer);
				
				status.width(screenWidth  - 30);
				
				
			});
			$(window).trigger('resize');
			
//set dimensions of all Cells
			$('.Result').width((screenWidth/2)-SetupManager.sideBuffer);
			$('.Result').height((screenHeight/4));
			
			$('.ResultTD').width((screenWidth/2)-SetupManager.sideBuffer);
			$('.ResultTD').height((screenHeight/4));		
			$('.HeaderTD').width((screenWidth/2)-SetupManager.sideBuffer);
		
			
			$('.ResultTR').width((screenWidth)-SetupManager.sideBuffer);
			$('.ResultTR').height((screenHeight/4));
			$('.HeaderTR').width((screenWidth/2)-SetupManager.sideBuffer);
		
			
			$('.ResultTable').width((screenWidth)-SetupManager.sideBuffer);
			$('.HeaderTable').width((screenWidth)-SetupManager.sideBuffer);

//set dimensions of input box			
		//	var searchButtonWidth = $(SetupManager.pound+SetupManager.searchBtn_ID).width();
			
			$(SetupManager.pound+SetupManager.queryInput_ID).width((screenWidth/2)-SetupManager.sideBuffer+25);
			$(SetupManager.pound+SetupManager.filterSummaryDiv_ID).width((screenWidth/2)-SetupManager.sideBuffer+30);
			
			//$(SetupManager.ID_attr,SetupManager.tableHeader_ID).width(screenWidth-SetupManager.sideBuffer);
			
			status.width(screenWidth - 30);
			
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
				if( (i%2) == 0){
					
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