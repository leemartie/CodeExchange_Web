
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
			tableForSite.addClass("SiteBack");
			$(SetupManager.pound+SetupManager.entireSiteDiv_ID).addClass("SiteBack");
			tableForSite.attr(SetupManager.ID_attr,SetupManager.tableHeader_ID);
			
			var headerRow = $(SetupManager.trOpen+SetupManager.trClose);
			tableForSite.append(headerRow);
			headerRow.addClass("HeaderTR");
			headerRow.addClass("HeaderBack");
			
			//query box
			var queryTD = $(SetupManager.tdOpen+SetupManager.tdClose);

			
			//logo
			var logo = $(SetupManager.divOpen+SetupManager.divClose);
			//queryTD.append(logo);
			var logoName = $('<a href="index.html"><img src="http://codeexchange.ics.uci.edu/logo2.png"/></a>');
			logo.append(logoName);
			logo.addClass("Logo");

			

			
			//--row for status
			var statusTable = $(SetupManager.tableOpen+SetupManager.tableClose);
			var rowStatus = $(SetupManager.trOpen+SetupManager.trClose);
			statusTable.append(rowStatus);
			$(SetupManager.pound+SetupManager.entireSiteDiv_ID).append(statusTable);
			
			
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
			//status.addClass("StatusTD");
			
			Controller.setStatus("Let's find some code.");
			
//			//--row for navigation
			
			//make page navigation
			var pageNavigation = $(SetupManager.tdOpen+SetupManager.tdClose);

			//set id
			pageNavigation.attr(SetupManager.ID_attr, SetupManager.pageNavigationDiv_ID);
			pageNavigation.attr("valign","top");
			pageNavigation.attr("align","center");
			pageNavigation.attr("width","100%");
			pageNavigation.addClass("PageNavigation");
			
			
			// append
            rowStatus.append(pageNavigation);

			//result row
			var resultRow = $(SetupManager.trOpen+SetupManager.trClose);
			tableForSite.append(resultRow);
			
			//result td
			var resultTD = $(SetupManager.tdOpen+SetupManager.tdClose);
			resultRow.append(resultTD);
			resultTD.addClass("ResultsBack");
            resultTD.attr(SetupManager.ID_attr,SetupManager.resultsTD_ID)
			
			
			
			//make table
			var tableOfResults = $(SetupManager.tableOpen+SetupManager.tableClose);
			//set id
			tableOfResults.attr(SetupManager.ID_attr,SetupManager.resultTable_ID);
			//append to entire site
			resultTD.append(tableOfResults);

            QueryGridView.setup();
            $(SetupManager.pound+SetupManager.resultsTD_ID).append(QueryGridView.grid);
            QueryGridView.grid.hide();
			//set width
			$(SetupManager.pound+SetupManager.resultTable_ID).width(screenWidth-SetupManager.sideBuffer);
			//set height
			$(SetupManager.pound+SetupManager.resultTable_ID).height(screenHeight/2);

			tableOfResults.addClass("ResultTable");
			
			//make cells
			SetupManager.makeTableCells();
			
			
			//side filter
			var filterSideTD = $(SetupManager.tdOpen+SetupManager.tdClose);
			filterSideTD.attr("rowspan","4");
			
			headerRow.append(filterSideTD);


			filterSideTD.attr("valign", "top");

			filterSideTD.addClass("FilterSideTD");

            filterSideTD.append(BuildQueryBoxView.getView());


            filterSideTD.append(QueryTrailNavView.getView());

			
			
			//filter table
			var filterTable = $(SetupManager.tableOpen+SetupManager.tableClose);
			filterTable.addClass("FilterBackground");
			
			filterTable.attr(SetupManager.ID_attr,SetupManager.filterTable_ID);
			//TODO commented out this and will replace with BuildQueryBoxView filterSideTD.append(filterTable);
			filterSideTD.addClass("FilterBackground");
			
			var classHeader = $('<tr><table><th align="left">I need code that</th></table></tr>');
			classHeader.addClass("FilterTitle");
			filterTable.append(classHeader);
			
			//making the extends filter
			var extendsRow = $(SetupManager.trOpen+SetupManager.trClose);
			filterTable.append(extendsRow);
			var extendsTD = $(SetupManager.tdOpen+SetupManager.tdClose);
			extendsRow.append(extendsTD);
			
			var extendsTitle = $("<text>extends&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</text>");
			extendsTitle.addClass("FilterTitle");
			extendsTD.append(extendsTitle);
			
			var extendsInput = $(SetupManager.inputOpen+SetupManager.inputClose);
			extendsTD.append(extendsInput);
			extendsInput.attr(SetupManager.ID_attr, SetupManager.extendsInputID);
			extendsInput.attr(SetupManager.placeholder_attr, "ex: java.lang.Thread");
			$(SetupManager.pound+SetupManager.extendsInputID).autocomplete({ 
				source: function( request, response ){
					SetupManager.autoCompleteField(request, response,SetupManager.extendsInputID);
					}
				});
			
			//making the implements filter
			var implementsRow = $(SetupManager.trOpen+SetupManager.trClose);
			filterTable.append(implementsRow);
			var implementsTD = $(SetupManager.tdOpen+SetupManager.tdClose);
			implementsRow.append(implementsTD);
			
			var implementsTitle = $("<text>implements&nbsp&nbsp&nbsp&nbsp</text>");
			implementsTitle.addClass("FilterTitle");
			
			implementsTD.append(implementsTitle);
			var implementsInput = $(SetupManager.inputOpen+SetupManager.inputClose);
			implementsTD.append(implementsInput);
			implementsInput.attr(SetupManager.ID_attr, SetupManager.implementsInputID);
			implementsInput.attr(SetupManager.placeholder_attr, "ex: java.util.comparator");
			$(SetupManager.pound+SetupManager.implementsInputID).autocomplete({ 
				source: function( request, response ){
					SetupManager.autoCompleteField(request, response,SetupManager.implementsInputID);
					}
				});
			
			implementsTD.append($("<hr>"));
			

			var callHeader = $('<tr><table><th align="left">with method call examples</th></table></tr>');
			callHeader.addClass("FilterTitle");
			filterTable.append(callHeader);
			
			//making calling object class name row
			var callingObjectRow = $(SetupManager.trOpen+SetupManager.trClose);
			filterTable.append(callingObjectRow);
			var callingObjectTD = $(SetupManager.tdOpen+SetupManager.tdClose);
			callingObjectRow.append(callingObjectTD);
			
			var classNameTitle = $("<text>class name &nbsp&nbsp&nbsp&nbsp</text>");
			callingObjectTD.append(classNameTitle);
			classNameTitle.addClass("FilterTitle");
			
			
			var callingObjectInput = $(SetupManager.inputOpen+SetupManager.inputClose);
			callingObjectTD.append(callingObjectInput);
			callingObjectInput.attr(SetupManager.ID_attr, SetupManager.callingObjectInputID);
			callingObjectInput.attr(SetupManager.placeholder_attr, "ex: org.apache.log4j.Logger");
			$(SetupManager.pound+SetupManager.callingObjectInputID).autocomplete({ 
				source: function( request, response ){
						SetupManager.autoCompleteField(request, response,SetupManager.callingObjectInputID);
						}
					});
			
			//making method call name row
			var methodCallRow = $(SetupManager.trOpen+SetupManager.trClose);
			filterTable.append(methodCallRow);
			var callTD = $(SetupManager.tdOpen+SetupManager.tdClose);
			methodCallRow.append(callTD);
			
			var methodNameTitle = $("<text>method name &nbsp&nbsp&nbsp&nbsp</text>");
			methodNameTitle.addClass("FilterTitle");
			callTD.append(methodNameTitle);
			
			var callInput = $(SetupManager.inputOpen+SetupManager.inputClose);
			callTD.append(callInput);
			callInput.attr(SetupManager.ID_attr, SetupManager.callInputID);
			callInput.attr(SetupManager.placeholder_attr, "ex: debug");
			$(SetupManager.pound+SetupManager.callInputID).autocomplete({ 
				source: function( request, response ){
					SetupManager.autoCompleteField(request, response,SetupManager.callInputID);
					}
				});
			
			//making parameter type row
			var methodArgType = $(SetupManager.trOpen+SetupManager.trClose);
			filterTable.append(methodArgType);
			var argTypeTD = $(SetupManager.tdOpen+SetupManager.tdClose);
			methodArgType.append(argTypeTD);
			
			var arg1Title = $("<text>1st argument type &nbsp&nbsp&nbsp&nbsp</text>");
			arg1Title.addClass("FilterTitle");
			
			argTypeTD.append(arg1Title);
			var argTypeInput = $(SetupManager.inputOpen+SetupManager.inputClose);
			argTypeTD.append(argTypeInput);
			argTypeInput.attr(SetupManager.ID_attr, SetupManager.argTypeInputID);
			argTypeInput.attr(SetupManager.placeholder_attr, "ex: java.lang.String");
			//argTypeInput.width("85%");
			$(SetupManager.pound+SetupManager.argTypeInputID).autocomplete({ 
				source: function( request, response ){
					SetupManager.autoCompleteField(request, response,SetupManager.argTypeInputID);
					}
				});
			
			argTypeTD.append($("<hr>"));
			

			//making comments row
			
			
			var commentsRow = $(SetupManager.trOpen+SetupManager.trClose);
			filterTable.append(commentsRow);
			
			var commentsRowTD = $(SetupManager.tdOpen+SetupManager.tdClose);
			commentsRow.append(commentsRowTD);
			
			
			var commentsCheckBox = $(SetupManager.inputOpen+SetupManager.inputClose);
			commentsCheckBox.attr(SetupManager.ID_attr, SetupManager.commentsCheckBoxID);
			commentsCheckBox.attr("type","checkbox");
			
			
			commentsCheckBox.addClass("Check");
			
			
			var formDiv = $("<form></form>");
			var parentDiv = $(SetupManager.divOpen+SetupManager.divClose);
			formDiv.append(parentDiv);
			parentDiv.append(commentsCheckBox);
			var labelComments = $('<label for="'+SetupManager.commentsCheckBoxID+'">and has comments: </label>');
			labelComments.addClass("FilterTitle");
			
			labelComments.append(commentsCheckBox);
			parentDiv.append(labelComments);
			commentsRowTD.append(parentDiv);
			
			commentsCheckBox.change(function() {
		        if($(this).is(":checked")) {
		            QueryManager.hasComments = true;
		           
		        }else{
		        	 QueryManager.hasComments = false;
		        }       
		    });
			
		

			
			var langShort = ['af','ar','bg','bn','cs','da',	'de','el','en',	'es',
					'et','fa','fi','fr','gu','he','hi',	'hr','hu','id','it',
					'ja','kn','ko','lt','lv','mk','ml','mr',
					'ne','nl','no',	'pa','pl','pt',	'ro','ru','sk',	'sl',
					'so', 'sq','sv','sw','ta','te',	'th','tl','tr',
					'uk','ur','vi','zh-cn',	'zh-tw'];
			var langLong = ['Afrikaans', 'Arabic', 'Bulgarian', 'Bengali', 'Czech',
					'Danish', 'German', 'Greek', 'English', 'Spanish',
					'Estonian', 'Persian', 'Finnish', 'French', 'Gujarati',
					'Hebrew', 'Hindi', 'Croatian', 'Hungarian', 'Indonesian',
					'Italian', 'Japanese', 'Kannada', 'Korean', 'Lithuanian',
					'Latvian', 'Macedonian', 'Malayalam', 'Marathi', 'Nepali',
					'Dutch', 'Norwegian','Punjabi','Polish','Portuguese',
					'Romanian',	'Russian',	'Slovak','Slovene',
					'Somali','Albanian','Swedish','Swahili',
					'Tamil','Telugu','Thai','Tagalog','Turkish',
					'Ukrainian','Urdu',	'Vietnamese','Simplified Chinese','Traditional Chinese'];
			
			//select language
			var selectLanguage = $("<select></select>");
			
			for(var i = 0; i <langShort.length; i++){
				var option = $('<option value="'+langShort[i]+'">'+langLong[i]+'</option>');	
				
				if(langShort[i] == "en"){
				option = $('<option selected="selected" value="'+langShort[i]+'">'+langLong[i]+'</option>');	
				QueryManager.humanLanguageOfComments = "en";
				}
				selectLanguage.append(option);
				
			}

			
			
			var languagesRow = $(SetupManager.trOpen+SetupManager.trClose);
			filterTable.append(languagesRow);
			
			var languageTD = $(SetupManager.tdOpen+SetupManager.tdClose);
			languagesRow.append(languageTD);
			
			var title = $("<text>in human language: </text>");
			title.addClass("FilterTitle");
			languageTD.append(title);
			languageTD.append(selectLanguage);

			//listener for language select
			selectLanguage.change(function () {
				$( "select option:selected" ).each(function() {
				     QueryManager.humanLanguageOfComments = $(this).attr("value");
				    });
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
			

			// --- add listeners to cell 
			var screenWidth = jQuery(window).width();
			var screenHeight = jQuery(window).height();
			var screenBuffer = screenWidth*(3/4);
			var screenHeightBuffer = screenHeight*(3/4)-100;
			
//resize function called when resize event happens
			$(window).resize(function() {
				screenWidth = jQuery(window).width();
				screenHeight = jQuery(window).height();
				var screenBuffer = screenWidth*(3/4);
				var screenHeightBuffer = screenHeight*(3/4)-75;

                if(!Controller.isExpanded)
				    $('.Result').width(((screenBuffer)/SetupManager.numberOfCells)+30);
                else {
                    $('.Result').width(((screenBuffer) ) + 30);
                }

				$('.Result').height((screenHeightBuffer));

                if(!Controller.isExpanded)
				    $('.ResultTD').width(((screenBuffer)/SetupManager.numberOfCells));
                else {
                    $('.ResultTD').width(((screenBuffer) ) + 30);
                }


				$('.ResultTD').height((screenHeightBuffer));		
				//$('.HeaderTD').width((screenWidth/2)-SetupManager.sideBuffer);


				    $('.ResultTR').width(((screenBuffer)));


                $('.ResultTR').height((screenHeightBuffer));
			//	$('.HeaderTR').width((screenWidth-screenBuffer)-SetupManager.sideBuffer);
				
				
				$('.ResultTable').width(((screenBuffer)));
                $('.GridCell').height((screenHeightBuffer/5));
                $('.GridCell').width((screenWidth/5));
                $('.Grid').height((screenHeightBuffer+135));

				//$('.HeaderTable').width((screenWidth)-SetupManager.sideBuffer);

				
				
				//$(SetupManager.pound+SetupManager.queryInput_ID).width((screenBuffer)-(SetupManager.sideBuffer+186));


                $('.QueryBucket').height(screenHeightBuffer *(1/4));

				$('.FilterSideTD').width(((screenBuffer)/(SetupManager.numberOfCells*1.5)));

                $('.Grid').width(screenWidth - $('.FilterSideTD').width()-32);
				
				
			});
			$(window).trigger('resize');
			
//set dimensions of all Cells
			$('.Result').width(((screenBuffer)/SetupManager.numberOfCells)+30);
			$('.Result').height((screenHeightBuffer));
			
			$('.ResultTD').width(((screenBuffer)/SetupManager.numberOfCells));
			$('.ResultTD').height((screenHeightBuffer));		
		//	$('.HeaderTD').width((screenWidth/2)-SetupManager.sideBuffer);
		
			
			$('.ResultTR').width(((screenBuffer)));
			$('.ResultTR').height((screenHeightBuffer));
		//	$('.HeaderTR').width((screenWidth-screenBuffer)-SetupManager.sideBuffer);
		
			
			$('.ResultTable').width(((screenBuffer)));
            $('.GridCell').height((screenHeightBuffer/5));
            $('.GridCell').width((screenWidth/5));
            $('.Grid').height((screenHeightBuffer+135));

		//	$('.HeaderTable').width((screenWidth)-SetupManager.sideBuffer);

//set dimensions of input box			
			
			//$(SetupManager.pound+SetupManager.queryInput_ID).width((screenBuffer)-(SetupManager.sideBuffer+186));
			//$(SetupManager.pound+SetupManager.filterSummaryDiv_ID).width((screenWidth/2)-SetupManager.sideBuffer+30);
			
			$('.FilterSideTD').width(((screenBuffer)/(SetupManager.numberOfCells*1.5)));
            var height = $('QueryRecommenderView').height;
            $('.QueryBucket').height(screenHeightBuffer *(1/4));

            $('.Grid').width(screenWidth - $('.FilterSideTD').width()-32);


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
				var metaData = $(SetupManager.divOpen+SetupManager.divClose);
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
				var expandButton	 = $(SetupManager.buttonOpen+SetupManager.buttonClose);
                expandButton.button();
				var expandButton_id	="expandBtn"+i;
				SetupManager.expandBtnArray_ID[i] = expandButton_id;
				expandButton.attr(SetupManager.ID_attr, SetupManager.expandBtnArray_ID[i]);
				expandButton.addClass("Expand");
				//add to result options
				$(SetupManager.pound+resultOptions_id).append(expandButton);
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