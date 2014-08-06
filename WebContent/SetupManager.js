
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

        //editor
        resultEditors       : new Array(),
		
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
		
		argTypeInputID			:	"argTypeInput_ID",
		
		methodDecNameInputID	:	"methodDecNameInput_ID",
		
		commentsCheckBoxID		:	"commentsCheckBox_ID",
		
		statusIconID			:	"statusIconID",

        resultsTD_ID            :   "resultsTD_ID",
		
		rotateStatusVar			:	null,
		
			
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
		numberOfCells		:	3,
		numberOfCellsPerRow	:	3,
		
		//pound for finding by id
		pound		:	"#",
		//period for finding by class
		period		:	".",
		
		//distance from side of screen
		sideBuffer	:	50,

        cellStatus : new Array(),
		
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
            //border="0" cellpadding="0" cellspacing="0"
            tableForSite.attr("cellpadding","0");
            tableForSite.attr("cellspacing","0");
            tableForSite.attr("border","0");

//			tableForSite.addClass("SiteBack");
			$(SetupManager.pound+SetupManager.entireSiteDiv_ID).addClass("SiteBack");
			tableForSite.attr(SetupManager.ID_attr,SetupManager.tableHeader_ID);

			var headerRow = $(SetupManager.trOpen+SetupManager.trClose);
			tableForSite.append(headerRow);





            //side filter
            var filterSideTD = $(SetupManager.tdOpen+SetupManager.tdClose);
            filterSideTD.attr("rowspan","1");
            headerRow.append(filterSideTD);
            filterSideTD.attr("valign", "top");
            filterSideTD.addClass("FilterSideTD");
            filterSideTD.append(BuildQueryBoxView.getView());
           // filterSideTD.height("70%");



			//result td
			var resultTD = $(SetupManager.tdOpen+SetupManager.tdClose);
            headerRow.append(resultTD);
			resultTD.addClass("ResultsBack");
            resultTD.attr(SetupManager.ID_attr,SetupManager.resultsTD_ID);
            resultTD.height("70%");


			//make table
			var tableOfResults = $(SetupManager.tableOpen+SetupManager.tableClose);
            tableOfResults.attr("cellpadding","0");
            tableOfResults.attr("cellspacing","2");
            tableOfResults.attr("border","0");
			//set id
			tableOfResults.attr(SetupManager.ID_attr,SetupManager.resultTable_ID);
			//append to entire site
			resultTD.append(tableOfResults);
            resultTD.attr("valign","top");
            resultTD.attr("align","center");

            QueryGridView.setup();
            resultTD.append(QueryGridView.grid);
            QueryGridView.grid.hide();
//
			tableOfResults.addClass("ResultTable");

			//make cells
			SetupManager.makeTableCells();

            //--row for status
//            var statusTable = $(SetupManager.tableOpen+SetupManager.tableClose);
//            statusTable.attr("cellpadding","0");
//            statusTable.attr("cellspacing","0");
//            statusTable.attr("border","0");
            var rowStatus = $(SetupManager.trOpen+SetupManager.trClose);
            tableForSite.append(rowStatus);
            //$(SetupManager.pound+SetupManager.entireSiteDiv_ID).append(statusTable);

            //make status div
            var status = $(SetupManager.tdOpen+SetupManager.tdClose);
            rowStatus.append(status);
            //set id
            status.attr(SetupManager.ID_attr,SetupManager.statusDiv_ID);
            status.attr("valign","top");
            status.attr("padding-bottom", "0px");
            status.addClass("Status");
            status.attr("align","left");
            status.width("50%");
            status.height("10%");

            Controller.setStatus("Let's find some code.");

            //make page navigation
            var pageNavigation = $(SetupManager.tdOpen+SetupManager.tdClose);
            //set id
            pageNavigation.attr(SetupManager.ID_attr, SetupManager.pageNavigationDiv_ID);
            pageNavigation.attr("valign","top");
            pageNavigation.attr("align","right");
            pageNavigation.attr("width","50%");
            pageNavigation.addClass("PageNavigation");
            // append
            rowStatus.append(pageNavigation);


//
            var surveyRow = $(SetupManager.trOpen+SetupManager.trClose);
            tableForSite.append(surveyRow);


            var surveyCell = $(SetupManager.tdOpen+SetupManager.tdClose);
            surveyRow.append(surveyCell);

            var footerTable = $(SetupManager.tableOpen+SetupManager.tableClose);
            footerTable.css({"border":"0px solid black","width":"600px"});
            footerTable.attr("cellpadding","0");
            footerTable.attr("cellspacing","0");

            var divCenter = $("<div style='margin:auto;'</div>");
            divCenter.append(footerTable);
                    surveyCell.append(divCenter);
                    //surveyCell.width("100%");
                    surveyCell.attr("colspan","2");
                     surveyCell.attr("align","center");
           // surveyCell.css({"padding-left":"10px"});
            var footerRow = $(SetupManager.trOpen+SetupManager.trClose);
                    footerTable.append(footerRow);
            var footerCell1 = $(SetupManager.tdOpen+SetupManager.tdClose);
                    footerRow.append(footerCell1);



//bring up the survey if cell is clicked
            footerCell1.click(function(event) {
                $('<div id="blanket"></div>').
                    appendTo(SetupManager.pound+SetupManager.entireSiteDiv_ID);
                var survey = Survey.getView();
                survey.appendTo(SetupManager.pound+SetupManager.entireSiteDiv_ID);
            });
            var divSurvey = $(SetupManager.divOpen+SetupManager.divClose);
            divSurvey.append("<img height='15' width='auto' style='margin-right: 10px;vertical-align:text-bottom;'" +
                " src='http://codeexchange.ics.uci.edu/science.png'></img>" +
                "<text>Help us improve code search.</text>");
            divSurvey.addClass("SurveyLabel");
            footerCell1.append(divSurvey);
           // footerCell1.attr("width","40%");
            footerCell1.attr("align","center");
            footerCell1.attr("valign","bottom");


//disclaimer

            var footerCellDASH = $(SetupManager.tdOpen+SetupManager.tdClose);
            footerCellDASH.append("<text>&mdash;</text>");
            footerCellDASH.attr("align","center");
            footerCellDASH.addClass("LetterLabel");

            footerRow.append(footerCellDASH);

            var footerCell2 = $(SetupManager.tdOpen+SetupManager.tdClose);
            footerRow.append(footerCell2);

            var divDisclaimer = $(SetupManager.divOpen+SetupManager.divClose);
//            divDisclaimer.append("<img height='20' width='auto' style='margin-right: 5px;vertical-align:text-bottom;'" +
//                    " src='http://codeexchange.ics.uci.edu/letter.png'></img>" +
//                    "<text>Introduction Letter</text>");

            divDisclaimer.append("<text>Introduction letter</text>");
            divDisclaimer.addClass("LetterLabel");
            footerCell2.click(function(event) {
                $('<div id="blanket"></div>').
                    appendTo(SetupManager.pound+SetupManager.entireSiteDiv_ID);
                var survey = Survey.getLetter();
                survey.appendTo(SetupManager.pound+SetupManager.entireSiteDiv_ID);
            });
            footerCell2.append(divDisclaimer);
          //  footerCell2.attr("width","30%");
            footerCell2.attr("align","center");

//examples page

            var footerCellDASH = $(SetupManager.tdOpen+SetupManager.tdClose);
            footerCellDASH.append("<text>&mdash;</text>");
            footerCellDASH.attr("align","center");
            footerCellDASH.addClass("LetterLabel");
            footerRow.append(footerCellDASH);

            var footerCell3 = $(SetupManager.tdOpen+SetupManager.tdClose);
            footerRow.append(footerCell3);

            var divExamples = $(SetupManager.divOpen+SetupManager.divClose);

            divExamples.append("<text>Example searches</text>");
            divExamples.addClass("LetterLabel");

            footerCell3.click(function(event) {
                window.location = "http://codeexchange.ics.uci.edu/examples.html";
            });

            footerCell3.append(divExamples);
          //  footerCell3.attr("width","30%");
            footerCell3.attr("align","center");


//listener for expand button
			var collapsed = true;
            $(".Expand").attr("title","Expand Window");
			$(".Expand").click(function(event) {
                $(".Expand").removeClass("ExpandButtonHover");
                $(".Expand").addClass("ExpandButton");

        	//use event.currentTarget.id for some resson event.target.id does not work
			  var id = event.currentTarget.id;
			  var number = id.charAt(id.length-1);
	          var cellSelected = Controller.getExpandBtnToCell(number);

	        if ( collapsed ) {
		      //expand the cell
              //  $(SetupManager.pound+SetupManager.resultTable_ID).attr("cellspacing","10");

                $(".Expand").attr("title","Collapse Window");
	        	Controller.expandCell(cellSelected);
	        	$(SetupManager.pound+SetupManager.expandBtnArray_ID[number]).empty();
	        	$(SetupManager.pound+SetupManager.expandBtnArray_ID[number]).text("").
				append($('<img align="middle" height="30" src="http://codeexchange.ics.uci.edu/collapse.png" width="30"></img>')).width("30");


//LOG IT
                if(number == 0)
                    UsageLogger.addEvent(UsageLogger.WINDOW_EXPAND_CELL1,null);
                else if (number == 1)
                    UsageLogger.addEvent(UsageLogger.WINDOW_EXPAND_CELL2,null);
                else if (number == 2)
                    UsageLogger.addEvent(UsageLogger.WINDOW_EXPAND_CELL2,null);

	        } else {
                $(".Expand").attr("title","Expand Window");

              //  $(SetupManager.pound+SetupManager.resultTable_ID).attr("cellspacing","0");

	        	Controller.collapseCell(cellSelected);
	        	$(SetupManager.pound+SetupManager.expandBtnArray_ID[number]).empty();

	        	$(SetupManager.pound+SetupManager.expandBtnArray_ID[number]).text("").
				append($('<img align="middle" height="30" src="http://codeexchange.ics.uci.edu/expand.png" width="30"></img>')).width("30");
                //LOG IT
                if(number == 0)
                    UsageLogger.addEvent(UsageLogger.WINDOW_COLLAPSE_CELL1,null);
                else if (number == 1)
                    UsageLogger.addEvent(UsageLogger.WINDOW_COLLAPSE_CELL2,null);
                else if (number == 2)
                    UsageLogger.addEvent(UsageLogger.WINDOW_COLLAPSE_CELL3,null);



	            }
	        collapsed = !collapsed;

	      });


//resize function called when resize event happens
			$(window).resize(function() {
				var screenWidth = jQuery(window).width();
				var screenHeight = jQuery(window).height();
				var screenBuffer = screenWidth*(4/5)-15;
				var screenHeightBuffer = screenHeight*(3/4)-90;

                if(!Controller.isExpanded)
				    $('.Result').width(((screenBuffer)/SetupManager.numberOfCells));
                else {
                    $('.Result').width(((screenBuffer) ) );
                }

				$('.Result').height((screenHeightBuffer));

                if(!Controller.isExpanded)
				    $('.ResultTD').width(((screenBuffer)/SetupManager.numberOfCells));
                else {
                    $('.ResultTD').width(((screenBuffer) ) );
                }


	    		$('.ResultTD').height((screenHeightBuffer));


				$('.ResultTR').width(((screenBuffer)));


                $('.ResultTR').height((screenHeightBuffer));


				$('.ResultTable').width(((screenBuffer)));
                $('.GridCell').height((screenHeightBuffer/5));
                $('.GridCell').width(((screenBuffer+100)/5));


                $('.QueryBucket').height(screenHeightBuffer *(1/4));

				$('.FilterSideTD').width(screenWidth*(1/5));
                $('.FilterSideTD').height(screenHeightBuffer);

                $('.Grid').width(screenBuffer);
                $('.Grid').height(screenHeightBuffer);

                ScreenSizes.FilterTD = $('.FilterSideTD').width();

                $('.BottomButtons').height("100%");


			});
			$(window).trigger('resize');


            var editor = ace.edit('result0');
            editor.setTheme("ace/theme/xcode");
            editor.getSession().setMode("ace/mode/java");
            editor.getSession().setUseWrapMode(true);
            editor.setReadOnly(false);


            editor.on("copy", function(text){

                //LOG IT
                UsageLogger.addEvent(UsageLogger.WINDOW_COPY_CELL1,null, Controller.currentURLs[0]);

            });

            editor.on("cut", function(text){

                //LOG IT
                UsageLogger.addEvent(UsageLogger.WINDOW_CUT_CELL1,null, Controller.currentURLs[0]);

            });



                    var editor2 = ace.edit('result1');
            editor2.setTheme("ace/theme/xcode");
            editor2.getSession().setMode("ace/mode/java");
            editor2.getSession().setUseWrapMode(true);
            editor2.setReadOnly(false);

            editor2.on("copy", function(text){
                //LOG IT
                UsageLogger.addEvent(UsageLogger.WINDOW_COPY_CELL2,null, Controller.currentURLs[1]);
            });

            editor.on("cut", function(text){

                //LOG IT
                UsageLogger.addEvent(UsageLogger.WINDOW_CUT_CELL2,null, Controller.currentURLs[1]);

            });


            var editor3 = ace.edit('result2');
            editor3.setTheme("ace/theme/xcode");
            editor3.getSession().setMode("ace/mode/java");
            editor3.getSession().setUseWrapMode(true);
            editor3.setReadOnly(false);

            editor3.on("copy", function(text){
                //LOG IT
                UsageLogger.addEvent(UsageLogger.WINDOW_COPY_CELL3,null, Controller.currentURLs[2]);
            });

            editor.on("cut", function(text){

                //LOG IT
                UsageLogger.addEvent(UsageLogger.WINDOW_CUT_CELL3,null, Controller.currentURLs[2]);

            });


            SetupManager.resultEditors.push(editor);
            SetupManager.resultEditors.push(editor2);
            SetupManager.resultEditors.push(editor3);





        },
		/**
		 * used to call the query manager for auto complete.
		 * 
		 */
		autoCompleteField : function(request, response, field){
			QueryManager.submitAutoComplete(field, request, response);	
		},
		/**
		 * FUNCTION
		 * makes the cells in the table of results
		 * assumes 2 columns max
		 * @returns
		 */
		makeTableCells	:	function(){
			var tempRowId;
			var tempTdId;
			

			
			for(var i = 0; i< SetupManager.numberOfCells; i++){
				tempTdId = "td"+i;
				
				
				//new row every even - where assumption is implemented
				if( (i%SetupManager.numberOfCellsPerRow) == 0){
					
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
				var metaData = $("<div style='display: table; width: 100%; border-spacing: 0;padding-top:5px'>"+SetupManager.divClose);
				var meta_id = "meta"+i;
				SetupManager.metaDivArray_ID[i] = meta_id;
				metaData.attr(SetupManager.ID_attr,SetupManager.metaDivArray_ID[i]);
				metaData.addClass("Meta");
				//add to cell
				$(SetupManager.pound+SetupManager.cellDivArray_ID[i]).append(metaData);
				
				$(SetupManager.pound+SetupManager.cellDivArray_ID[i]).append($(SetupManager.newLine));
				




				var resultData = $(SetupManager.divOpen+SetupManager.divClose);

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
				var expandButton	 = $(SetupManager.divOpen+SetupManager.divClose);
                expandButton.addClass("ExpandButton");
				var expandButton_id	="expandBtn"+i;
				SetupManager.expandBtnArray_ID[i] = expandButton_id;
				expandButton.attr(SetupManager.ID_attr, SetupManager.expandBtnArray_ID[i]);
				expandButton.addClass("Expand");


                var expandButtonDiv = $(SetupManager.divOpen+SetupManager.divClose);
                expandButtonDiv.addClass("ExpandButtonDiv");
                expandButtonDiv.append(expandButton);


                (function(expandButton)
                {
                    expandButton.mouseenter(function (event) {
                        expandButton.removeClass("ExpandButton");
                        expandButton.addClass("ExpandButtonHover");
                    });

                    expandButton.mouseleave(function (event) {
                        expandButton.removeClass("ExpandButtonHover");
                        expandButton.addClass("ExpandButton");

                    });
                })(expandButton);








//project
                var projectURLCell = $("<div>"+"</div>");
                projectURLCell.attr("id","projectURL"+i);
                $(SetupManager.pound+resultOptions_id).append(projectURLCell);
                $(SetupManager.pound+"projectURL"+i).addClass("URLStatus");
                $(SetupManager.pound+"projectURL"+i).hover(function(event) {
                    var id = event.currentTarget.id;
                    var number = id.charAt(id.length-1);
//LOG IT
                    UsageLogger.addEvent(UsageLogger.TOOL_TIP_DOWNLOAD_PROJECT,null,null);
                });

                var backgroundSave = $("<div>"+"</div>");
                $(SetupManager.pound+resultOptions_id).append(backgroundSave);
                backgroundSave.attr("id","backgroundSave");
               backgroundSave.hide();
                $(SetupManager.pound+"backgroundSave").append(expandButtonDiv);




				//button attributes
				$(SetupManager.pound+SetupManager.expandBtnArray_ID[i]).text("").
					append($('<img align="middle" height="30" src="http://codeexchange.ics.uci.edu/expand.png" width="30"></img>')).width("30");



                var resultOptions_id = "resultOptions"+i;



                var statusCell = $("<div>"+"</div>");
                statusCell.attr("id","cellStatus"+i);
                $(SetupManager.pound+resultOptions_id).append(statusCell);



			}
			

		}
		

		
		
		
};