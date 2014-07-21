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
		currentStatus	:	"",
        annotationsArrayByEditor: new Array(),
        annotationsArrayKeyByEditor: new Array(),
        gridOn : false,
        markers : new Array(),

        childRows : new Array(),
        childIdsToColStart : new Array(),
        childIdsToColEnd : new Array(),
        childIdsToMethodIncDecClass : new Array(),
        childIdsToMethodIncName : new Array(),
        childIdsToMethodIncParams  : new Array(),
        childIdsToMethodIncCallingClass : new Array(),
        childIdsToMethodDecName : new Array(),

        rowToImportQuery        : new Array(),

        editorToExtendsQuery    : new Array(),

        editorToImplementsQuery : new Array(),

        editorToPackageQuery       : new Array(),

        isExpanded : false,

        currentURLs             : new Array(),

        projectURLs             : new Array(),
        versions             : new Array(),

    //used so we can prevent doing the same function multiple times whent the even propgaes up
        LAST_EVENT_TIME_UP     :"",
        LAST_EVENT_TIME_MOVE     :"",

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

		setCodeFromURL: function(editorNumber, codeNode, codeURL, start, end,invocations, expanded, codeID, extendsResult,
            implementsResult, projectURL, version){

            $(SetupManager.pound+"cellStatus"+editorNumber).empty();
            var text = $("<text>"+"downloading..."+"</text>");
            text.addClass("CellStatus");
            $(SetupManager.pound+"cellStatus"+editorNumber).append(text);

			var url = "http://codeexchange.ics.uci.edu/getPage.php?url="+codeURL+"&callback=?&json.wrf=displayCode";


            var classStart = start;

            Controller.currentURLs[editorNumber] = codeURL;
            Controller.projectURLs[editorNumber] = projectURL;
            Controller.versions[editorNumber] = version;

            (function(codeNode, editorNumber, classStart, expanded, extendsResult, implementsResult, projectURL, version){
                $.getJSON(url).fail(function(data, textStatus, jqXHR) {

                    var editor = ace.edit(codeNode);
                    editor.getSession().setValue("");

                    $(SetupManager.pound+"cellStatus"+editorNumber).empty();
                    var text = $("<text>"+"Oops... this code has been moved or deleted."+"</text>");
                    text.addClass("CellStatus");
                    $(SetupManager.pound+"cellStatus"+editorNumber).append(text);

                    $(SetupManager.pound+"projectURL"+editorNumber).empty();

                }).success(function(data, textStatus, jqXHR ) {
                    $.each(data, function(index, element) {


                        $(SetupManager.pound+"cellStatus"+editorNumber).empty();
                        var text = $("<text>"+""+"</text>");
                        $(SetupManager.pound+"cellStatus"+editorNumber).append(text);

                        $(SetupManager.pound+"projectURL"+editorNumber).empty();

                        var currentURL = Controller.currentURLs[editorNumber];
                        var versionIndex = currentURL.indexOf(version);


                        var path = currentURL.substring(versionIndex+version.length);

                        var urlToProject = Controller.projectURLs[editorNumber]
                            +'/archive/'+Controller.versions[editorNumber]+'.zip';


                        var projectURL = $('<div><text></text>' +
                            '<img  src="http://codeexchange.ics.uci.edu/zip.png"></img></div>');

                        projectURL.addClass("downloadLink");

                        projectURL.click(function(e) {

 //LOG IT
                            UsageLogger.addEvent(UsageLogger.DOWNLOAD_PROJECT,null,urlToProject);

//have to set this time out so there is enough time for the log post to go through
                            setTimeout(function() {
                            window.location.href = urlToProject;
                            }, 250);

                        });



                        $(SetupManager.pound+"projectURL"+editorNumber).attr("title",
                            "Download the GitHub project.\n Note: this code is in file: .."+path);
                        $(SetupManager.pound+"projectURL"+editorNumber).append(projectURL);


                        var code = element;

                        var editor = ace.edit(codeNode);
                        editor.getSession().setValue(code);

                        editor.setHighlightActiveLine(true);

                        var newLines = String(code).split("\n");
                        var count = 0;
                        var row = 0;
                        var classRow = 0;

//assigning extendsResult
                        Controller.editorToExtendsQuery[editorNumber] = extendsResult;

//assigning implementsResult
                        Controller.editorToImplementsQuery[editorNumber] = implementsResult;

//remove current markers
                        var currentMarkers = Controller.markers[editorNumber];
                        if(currentMarkers != null){
                            for(var k = 0; k < currentMarkers.length; k++){
                                editor.session.removeMarker(currentMarkers[k]);
                            }
                            currentMarkers.length = 0;
                        }


//local markers array
                        var localMarkers = new Array();


//                        for(var i = 0; i < newLines.length; i++){
//
//                            var indexOfClass = newLines[i].indexOf(/^([*]||[/])"class"/);
//                            if( indexOfClass != -1){
//
//                                var aceRange = ace.require('ace/range').Range;
//                                var markerID = editor.session.addMarker(new aceRange(i, 0,
//                                    i, 1000), "classHeadHighlight","background");
//                                localMarkers.push(markerID);
//                            }
//
//                        }



                        for(var i = 0; i < newLines.length; i++){
                            count = count + newLines[i].length;
                            if(count >= classStart) {
                                row = i;
                                i = newLines.length;
                            }

                        }



//annotations
                        editor.session.clearAnnotations();
                        editor.session.clearBreakpoints();


                        var annotationArray = new Array();
                        var annotationKey = new Array();

                        for(var i = 0; i < newLines.length; i++){
                            var indexOfClass = newLines[i].indexOf("import ");

//                            annotationKey[i] = {
//                                row: i,
//                                annotationArrayindex: -1
//                            };


                            //check for package
                            var indexOfPackage = newLines[i].indexOf("package ");
                            if( indexOfPackage > -1) {
                                var indexOfSemiColon = newLines[i].indexOf(";");
                                var indexOfStar = newLines[i].indexOf("*");
                                var startIndex = 8;

                                if (indexOfStar > -1)
                                    indexOfSemiColon = indexOfStar - 1;

                                var value = newLines[i].substring(startIndex, indexOfSemiColon);

                                var query = new QueryModel(QueryBucketModel.snippetPackage, value);
                                query.displayType = "package";
                                query.displayValue = value;

                                if(Controller.editorToPackageQuery[editorNumber] == null){
                                    Controller.editorToPackageQuery[editorNumber] = new Array();
                                }
                                Controller.editorToPackageQuery[editorNumber] = query;

                                var aceRange = ace.require('ace/range').Range;
                                var markerID = editor.session.addMarker(new aceRange(i, 0,
                                    i, 7), "package","background");

                                localMarkers.push(markerID);
                            }

                            //check for imports
                            if( indexOfClass > -1){
                                var type = QueryBucketModel.snippetImportsFiled;
                                var startIndex = 7;

                                if(newLines[i].indexOf("static") > -1) {
                                    startIndex = 13;
                                }

                                var indexOfSemiColon = newLines[i].indexOf(";");
                                var indexOfStar = newLines[i].indexOf("*");


                                if(indexOfStar > -1)
                                    indexOfSemiColon = indexOfStar-1;

                                var value = newLines[i].substring(startIndex, indexOfSemiColon);

                                var aceRange = ace.require('ace/range').Range;
                                var markerID = editor.session.addMarker(new aceRange(i, 0,
                                    i, 1000), "import","background");

                                localMarkers.push(markerID);

                                var query = new QueryModel(type, value);
                                query.displayType = "imports";
                                query.displayValue = value;

                                if(Controller.rowToImportQuery[editorNumber] == null){
                                    Controller.rowToImportQuery[editorNumber] = new Array();
                                }
                                Controller.rowToImportQuery[editorNumber][i] = query;


//                                annotationArray.push({
//                                    row: i,
//                                    column: 0,
//                                    text: "add query part: "+"["+"imports"+"]"+" "+value,
//                                    type: "info",
//                                    queryType: type,
//                                    queryValue: value
//
//                                });
//
//                                annotationKey[i] = {
//                                    row: i,
//                                    annotationArrayindex: annotationArray.length-1
//                                };

                            }


                        }



                        Controller.annotationsArrayByEditor[editorNumber] = annotationArray.slice(0);
                        Controller.annotationsArrayKeyByEditor[editorNumber] = annotationKey.slice(0);

//gutter code
//                        editor.on("guttermousedown", function(e){
//                            var target = e.domEvent.target;
//
//                            var row = e.getDocumentPosition().row;
//                            editor.session.clearBreakpoints();
//                            editor.session.setBreakpoint(row);
//
//                            var annotation = Controller.annotationsArrayByEditor[editorNumber]
//                                [Controller.annotationsArrayKeyByEditor[editorNumber][row].annotationArrayindex];
//
//                            if(annotation != null) {
//                                var type = annotation.queryType;
//                                var value = annotation.queryValue;
//
//                                var query = new QueryModel(type, value);
//                                query.displayType = "imports";
//                                query.displayValue = value;
//
//                                BuildQueryBoxView.addAndSubmit(query);
//                            }
//                            e.stop();
//                        });





                        //  editor.gotoLine(row-2);

                        //    editor.getSession().foldAll(classRow+2,newLines.length);
                        //     editor.getSession().foldAll(row+2,newLines.length);

//                      var aceRange = ace.require('ace/range').Range;
//                      var adjRangeAce = new aceRange(row, 0, row+1, 0);
//                      editor.session.addMarker(adjRangeAce,"highlightBackground","background",false);

                        var word = "";
                        for(var i = 0; i < QueryBucketModel.stackOfQueries.length; i++){
                            var query = QueryBucketModel.stackOfQueries[i];

                            if(query.type == QueryBucketModel.sizeField
                                || query.type == QueryBucketModel.complexityField)
                                continue;

                            var  words = query.value.split(' ');
                            for( var j  = 0; j < words.length; j++){
                                var part = words[j];

                                if(word == "")
                                    word = part;
                                else
                                    word = word+'|'+part;
                            }



                        }

//                        var regEx = new RegExp( word, "gi" );

//                      editor.findAll(regEx,{
//                          //caseSensitive: false,
//                          //wholeWord: true,
//                          regExp: true
//                      });




                        var cumLength = [];
                        var cnt = editor.session.getLength();
                        var cuml = 0, nlLength = editor.session.getDocument().getNewLineCharacter().length;
                        cumLength.push(cuml);
                        var text = editor.session.getLines(0, cnt);
                        for(var i=0; i< cnt; i++){
                            cuml += text[i].length + nlLength;
                            cumLength.push(cuml);
                        }

//scroll to line the class is on
                        var rowOfClass = Controller.getRow(cumLength, parseInt(classStart), 0, cumLength.length);

                        //need this line here because of an issue with the ace editor
                        editor.resize(true);
                        editor.scrollToLine(rowOfClass, true, false, (function(){}));
                        var aceRange = ace.require('ace/range').Range;

                        var characters = newLines[rowOfClass];
                        var newRow = rowOfClass;


                        if((characters.indexOf("/*") > -1)){

                            for(var k = 0; k<newLines.length; k++){
                                characters = newLines[newRow];

                                if(!(characters.indexOf("*") > -1) && !(characters.indexOf("@") > -1)
                                    &&(characters.trim().toLowerCase().substring(0,5) == 'publi' ||
                                        characters.trim().toLowerCase().substring(0,5) == 'priva' ||
                                    characters.trim().toLowerCase().substring(0,5) == 'prote' ||
                                    characters.trim().toLowerCase().substring(0,5) == 'class')){
                                    break;
                                }else{
                                    newRow++;
                                }
                            }

                        }


                        var markerID = editor.session.addMarker(new aceRange(newRow, 0,
                            newRow, 1000), "classFound","background");



                        localMarkers.push(markerID);


//let's find if the extends or implements is clicked then we can refine query by this...
                        var classLine = newLines[newRow];
                        //add marker
                        var indexExtends = classLine.indexOf(" extends ");

                        if( indexExtends > -1){
                            var markerID = editor.session.addMarker(new aceRange(newRow, indexExtends+1,
                                newRow, indexExtends+1+7), "extends","background");

                            localMarkers.push(markerID);

                            Controller.editorToExtendsQuery
                        }

                        var indexImplements = classLine.indexOf(" implements ");

                        if( indexImplements > -1){
                            var markerID = editor.session.addMarker(new aceRange(newRow, indexImplements+1,
                                newRow, indexImplements+1+10), "implements","background");

                            localMarkers.push(markerID);
                        }



////clear it out
                        if(Controller.childRows[editorNumber] != null)
                            Controller.childRows[editorNumber].length = 0;
//
//                        Controller.childRows.length = 0;
//                        Controller.childIdsToColStart.length = 0;
//                        Controller.childIdsToColEnd.length = 0;

                        var TokenTooltip = ace.require("kitchen-sink/token_tooltip").TokenTooltip;
                        editor.tokenTooltip = new TokenTooltip(editor);

                        for (var property in expanded) {
                            if(property.toLowerCase().localeCompare(codeID.toLowerCase()) != 0)
                                continue;
                            if (expanded.hasOwnProperty(property)) {
                                var childrenDocs = expanded[property].docs;

                                for(var id_index = 0; id_index < childrenDocs.length; id_index++){
                                    var split = childrenDocs[id_index].id.split('&');
                                    var startSplit  = split[2].split('=');
                                    var endSplit    = split[3].split('=');

                                    var start = startSplit[1];

                                    var rowNumber = Controller.getRow(cumLength, parseInt(start), 0, cumLength.length);


                                    var columnNumber = parseInt(start) - cumLength[rowNumber];

                                    var end = endSplit[1];

                                    var endColumnNumber = parseInt(end) - cumLength[rowNumber];

                                    var aceRange = ace.require('ace/range').Range;

                                    var CSSclass = "child";

                                    if(endSplit[0].indexOf("method") > -1){
                                        CSSclass = "decChild";
                                    }else{
                                        CSSclass = "child";
                                    }



                                    var markerID = editor.session.addMarker(new aceRange(rowNumber, columnNumber,
                                        rowNumber, endColumnNumber), CSSclass,"background",false);

                                    if(CSSclass == "child") {
                                        var markerID2 = editor.session.addMarker(new aceRange(rowNumber, columnNumber,
                                            rowNumber, endColumnNumber), "tip", "background", true);

                                        localMarkers.push(markerID2);
                                    }else if(CSSclass == "decChild"){
                                        var markerID2 = editor.session.addMarker(new aceRange(rowNumber, columnNumber,
                                            rowNumber, endColumnNumber), "tipDec", "background", true);

                                        localMarkers.push(markerID2);
                                    }



                                    if(Controller.childRows[editorNumber] == null){
                                        Controller.childRows[editorNumber] = new Array();
                                    }


                                    if(Controller.childRows[editorNumber][rowNumber] == null){
                                        Controller.childRows[editorNumber][rowNumber] = new Array();
                                    }


                                    Controller.childRows[editorNumber][rowNumber].push(childrenDocs[id_index].id);
                                    Controller.childIdsToColStart[childrenDocs[id_index].id] = columnNumber;
                                    Controller.childIdsToColEnd[childrenDocs[id_index].id] = endColumnNumber;


                                    Controller.childIdsToMethodIncDecClass[childrenDocs[id_index].id] =
                                        childrenDocs[id_index].snippet_method_invocation_declaring_class;

                                    Controller.childIdsToMethodIncParams[childrenDocs[id_index].id] =
                                        childrenDocs[id_index].snippet_method_invocation_arg_types_place;

                                    Controller.childIdsToMethodIncName[childrenDocs[id_index].id] =
                                        childrenDocs[id_index].snippet_method_invocation_name;

                                    Controller.childIdsToMethodIncCallingClass[childrenDocs[id_index].id] =
                                        childrenDocs[id_index].snippet_method_invocation_calling_class;

                                    Controller.childIdsToMethodDecName[childrenDocs[id_index].id] =
                                        childrenDocs[id_index].snippet_method_dec_name;

                                    localMarkers.push(markerID);



//                                  annotationArray.push({
//                                      row: rowNumber,
//                                      column: columnNumber,
//                                      text: "",
//                                      type: "warning",
//                                      queryType: type,
//                                      queryValue: value
//
//                                  });
//
//                                  annotationKey[i] = {
//                                      row: rowNumber,
//                                      annotationArrayindex: annotationArray.length-1
//                                  };

                                }
                            }
                        }

                        //for class
                        var aceRange = ace.require('ace/range').Range;

                        editor.session.setAnnotations(annotationArray);
                        annotationArray.length = 0;
                        annotationKey.length = 0;
                        Controller.markers[editorNumber] = localMarkers;




//listener

 //move
                        editor.container.addEventListener("mousemove", function(e){
                            var target = e.target;


                            //method call
                            if (target.classList.contains("tip") || target.classList.contains("tipDec")
                                || target.classList.contains("import") || target.classList.contains("extends")
                                || target.classList.contains("implements") || target.classList.contains("package")) {


//getting around multiple events propagating up
                                if(Controller.LAST_EVENT_TIME_MOVE == "")
                                    Controller.LAST_EVENT_TIME_MOVE = e.timeStamp;
                                else if(Controller.LAST_EVENT_TIME_MOVE != e.timeStamp){
                                    Controller.LAST_EVENT_TIME_MOVE = e.timeStamp;
                                }else{
                                    return;
                                }

                                var r = editor.renderer;
                                var canvasPos = r.rect || (r.rect = r.scroller.getBoundingClientRect());

                                var x = e.clientX;
                                var y = e.clientY;

                                var offset = (x + r.scrollLeft - canvasPos.left - r.$padding) / r.characterWidth;
                                var row = Math.floor((y + r.scrollTop - canvasPos.top) / r.lineHeight);
                                var col = Math.round(offset);

                                var screenPos = {row: row, column: col, side: offset - col > 0 ? 1 : -1};
                                var docPos = editor.session.screenToDocumentPosition(screenPos.row, screenPos.column);

                                // alert(docPos.row +" "+docPos.column);


                                if(target.classList.contains("import")){
                                    toolTip = "*Refine current query for code importing this*";
                                    target.setAttribute("title",toolTip);
//LOG IT
                                    UsageLogger.addEvent(UsageLogger.TOOL_TIP_IMPORTS,null);
                                    return;
                                }

                                else if(target.classList.contains("extends")){
                                    toolTip = "*Refine current query for code extending this*";
                                    target.setAttribute("title",toolTip);
//LOG IT
                                    UsageLogger.addEvent(UsageLogger.TOOL_TIP_EXTENDS,null);
                                    return;
                                }

                                else if(target.classList.contains("implements")){
                                    toolTip = "*Refine current query for code implementing this*";
                                    target.setAttribute("title",toolTip);
//LOG IT
                                    UsageLogger.addEvent(UsageLogger.TOOL_TIP_IMPLEMENTS,null);
                                    return;
                                }

                                else if(target.classList.contains("package")){
                                    toolTip = "*Refine current query for code in this package*";
                                    target.setAttribute("title",toolTip);
//LOG IT
                                    UsageLogger.addEvent(UsageLogger.TOOL_TIP_PACKAGE,null);
                                    return;
                                }

                                var rowOfIds = Controller.childRows[editorNumber][docPos.row];

                                if(rowOfIds!= null && rowOfIds.length == 1) {
                                    var toolTip = "";

                                    if(target.classList.contains("tip")) {
                                        var dec = Controller.childIdsToMethodIncDecClass[rowOfIds[0]];

                                        var name = Controller.childIdsToMethodIncName[rowOfIds[0]];

                                        var params = Controller.childIdsToMethodIncParams[rowOfIds[0]];

                                        var calling = Controller.childIdsToMethodIncCallingClass[rowOfIds[0]];

                                        toolTip = Controller.createToolTip(dec, calling, name, params);
                                    }else if(target.classList.contains("tipDec")){
                                        toolTip = "*Refine current query for similar method declarations*"
                                    }

//LOG IT
                                    UsageLogger.addEvent(UsageLogger.TOOL_TIP_METHOD_CALL,null);

                                         //tool tip
                                    target.setAttribute("title",toolTip);


                                }else if(rowOfIds!= null){
                                    //need to get the closest column
                                    var foundId = "";
                                    var lastStart = 0;
                                    for(var i = 0; i<rowOfIds.length; i++){
                                        var start = Controller.childIdsToColStart[rowOfIds[i]];
                                        var end   = Controller.childIdsToColEnd[rowOfIds[i]];

                                        if(start <= docPos.column && end >= docPos.column){
                                            if(foundId == "") {
                                                foundId = rowOfIds[i];
                                                lastStart = start;
                                            }//if
                                            else{
                                                if(lastStart < start){
                                                    foundId = rowOfIds[i];
                                                    lastStart = start;
                                                }//if
                                            }//else
                                        }//if
                                    }//for

                                    if(foundId != "") {
                                        var toolTip = "";

                                        if(target.classList.contains("tip")) {
                                        var dec = Controller.childIdsToMethodIncDecClass[foundId];

                                        var name =  Controller.childIdsToMethodIncName[foundId];

                                        var params = Controller.childIdsToMethodIncParams[foundId];

                                        var calling = Controller.childIdsToMethodIncCallingClass[foundId];

                                        toolTip = Controller.createToolTip(dec,calling,name,params);
                                        }else if(target.classList.contains("tipDec")){
                                            toolTip = "*Refine current query for similar method declarations*"
                                        }
//LOG IT
                                        UsageLogger.addEvent(UsageLogger.TOOL_TIP_METHOD_DECLARATION,null);

                                        //tool tip
                                        target.setAttribute("title",toolTip);
                                    }
                                }//else
                            }else {

                                //clear last event so that we can log re-entering a tool tip
                                if (UsageLogger.LastEventType == UsageLogger.TOOL_TIP_METHOD_DECLARATION
                                    || UsageLogger.LastEventType == UsageLogger.TOOL_TIP_METHOD_CALL
                                    || UsageLogger.LastEventType == UsageLogger.TOOL_TIP_EXTENDS
                                    || UsageLogger.LastEventType == UsageLogger.TOOL_TIP_IMPLEMENTS
                                    || UsageLogger.LastEventType == UsageLogger.TOOL_TIP_IMPORTS
                                    || UsageLogger.LastEventType == UsageLogger.TOOL_TIP_PACKAGE) {
                                    UsageLogger.LastEventType = "";
                                }
                            }

                        });

 //up
                        editor.container.addEventListener("mouseup", function(e) {
                            var target = e.target;



                            //method call
                            if (target.classList.contains("tip")|| target.classList.contains("tipDec")
                                || target.classList.contains("import") || target.classList.contains("extends")
                                || target.classList.contains("implements") || target.classList.contains("package")) {

//getting around multiple events propogating up
                                if(Controller.LAST_EVENT_TIME_UP == "")
                                    Controller.LAST_EVENT_TIME_UP = e.timeStamp;
                                else if(Controller.LAST_EVENT_TIME_UP != e.timeStamp){
                                    Controller.LAST_EVENT_TIME_UP = e.timeStamp;
                                }else{
                                    return;
                                }


                                var r = editor.renderer;
                                var canvasPos = r.rect || (r.rect = r.scroller.getBoundingClientRect());

                                var x = e.clientX;
                                var y = e.clientY;

                                var offset = (x + r.scrollLeft - canvasPos.left - r.$padding) / r.characterWidth;
                                var row = Math.floor((y + r.scrollTop - canvasPos.top) / r.lineHeight);
                                var col = Math.round(offset);

                                var screenPos = {row: row, column: col, side: offset - col > 0 ? 1 : -1};
                                var docPos = editor.session.screenToDocumentPosition(screenPos.row, screenPos.column);

                                // alert(docPos.row +" "+docPos.column);

                                if(target.classList.contains("import")){
                                    Controller.addImportQuery(docPos.row, editorNumber);
                                    return;
                                }

                                else if(target.classList.contains("extends")){
                                    Controller.addExtendsQuery(Controller.editorToExtendsQuery[editorNumber]);
                                    return;
                                }

                                else if(target.classList.contains("implements")){
                                    Controller.addImplementsQuery(Controller.editorToImplementsQuery[editorNumber]);
                                    return;
                                }

                                else if(target.classList.contains("package")){
                                    Controller.addPackageQuery(Controller.editorToPackageQuery[editorNumber]);
                                    return;
                                }

                                var rowOfIds = Controller.childRows[editorNumber][docPos.row];

                                if(rowOfIds!= null && rowOfIds.length == 1) {
                                    var toolTip = "Declaring class: "+
                                        Controller.childIdsToMethodIncDecClass[rowOfIds[0]]
                                        +"\n"
                                        +Controller.childIdsToMethodIncName[rowOfIds[0]]
                                        +"\n"
                                        +Controller.childIdsToMethodIncParams[rowOfIds[0]]
                                        +"\n"
                                        +Controller.childIdsToMethodIncDecClass[rowOfIds[0]];


//sends a method call query
                                    if(target.classList.contains("tip")) {
                                        Controller.addMethodcallQuery(Controller.childIdsToMethodIncDecClass[rowOfIds[0]],
                                            Controller.childIdsToMethodIncParams[rowOfIds[0]],
                                            Controller.childIdsToMethodIncName[rowOfIds[0]]);
                                    }else{
                                        Controller.addMethodDecQuery(Controller.childIdsToMethodDecName[rowOfIds[0]])
                                    }
                                }else if (rowOfIds!= null){
                                    //need to get the closest column
                                    var foundId = "";
                                    var lastStart = 0;
                                    for(var i = 0; i<rowOfIds.length; i++){
                                        var start = Controller.childIdsToColStart[rowOfIds[i]];
                                        var end   = Controller.childIdsToColEnd[rowOfIds[i]];

                                        if(start <= docPos.column && end >= docPos.column){
                                            if(foundId == "") {
                                                foundId = rowOfIds[i];
                                                lastStart = start;
                                            }//if
                                            else{
                                                if(lastStart < start){
                                                    foundId = rowOfIds[i];
                                                    lastStart = start;
                                                }//if
                                            }//else
                                        }//if
                                    }//for

                                    if(foundId != "") {
//sends a method call query
                                        if(target.classList.contains("tip")) {
                                            Controller.addMethodcallQuery(Controller.childIdsToMethodIncDecClass[foundId],
                                                Controller.childIdsToMethodIncParams[foundId],
                                                Controller.childIdsToMethodIncName[foundId]);
                                        }else{
                                            Controller.addMethodDecQuery(Controller.childIdsToMethodDecName[rowOfIds[0]])
                                        }
                                    }
                                }//else

                            }



                        });



//blur
                        editor.on("blur", function(){
                            var word = "";
                            for(var i = 0; i < QueryBucketModel.stackOfQueries.length; i++){
                                var query = QueryBucketModel.stackOfQueries[i];


                                if(query.type == QueryBucketModel.sizeField
                                    || query.type == QueryBucketModel.complexityField)
                                    continue;

                                var  words = query.value.split(' ');
                                for( var j  = 0; j < words.length; j++){
                                    var part = words[j];

                                    if(word == "")
                                        word = part;
                                    else
                                        word = word+'|'+part;
                                }



                            }

//                            var regEx = new RegExp( word, "gi" );

//                          editor.findAll(regEx,{
//                              //caseSensitive: false,
//                              //wholeWord: true,
//                              regExp: true
//                          });


                        });








                    });
                }); // end of sucess function




            })(codeNode, editorNumber,classStart,expanded, extendsResult, implementsResult, projectURL, version);











		},

    /**
     * this creates the tool tips
     * @param declaringClass
     * @param callingClass
     * @param methodName
     * @param params
     * @returns {string}
     */
    createToolTip : function (declaringClass, callingClass, methodName, params){
        var toolTip =      "*Refine current query for similar method calls*\n";

        toolTip = toolTip + "\n---------------------------INFO---------------------------\n"

        if(declaringClass != null){
//            if(declaringClass.length > 20)
//                declaringClass = [declaringClass.slice(0, 20), '\n\t\t', declaringClass.slice(20)].join('');

            toolTip = toolTip + "[Declaring Class]\t"+declaringClass;
        }

        if(callingClass != null){
//            if(callingClass.length > 20)
//                callingClass = [callingClass.slice(0, 20), '\n\t\t', callingClass.slice(20)].join('');

            toolTip = toolTip + "\n[Calling Class]\t\t"+callingClass;
        }

        if(methodName != null){
//            if(methodName.length > 20)
//                methodName = [methodName.slice(0, 30), '\n\t\t', methodName.slice(20)].join('');

            toolTip = toolTip + "\n[Method Name]\t"+methodName;
        }

        if(params != null){

            var paramArray = String(params).split(",");


            for(var i = 0; i<paramArray.length; i++){

//                if(paramArray[i].length > 20)
//                    paramArray[i] = [paramArray[i].slice(0, 20), '\n\t\t', paramArray[i].slice(20)].join('');

                paramArray[i] = paramArray[i].substring(0,paramArray[i].length-2)

                toolTip = toolTip + "\n[Parameter Type]\t"+paramArray[i];
            }



        }


        return toolTip;
    },

    addMethodDecQuery: function(name){
      var query = null;

        var methodDecValue = '';

        methodDecValue = methodDecValue + '%2B' +
                QueryBucketModel.snippetMethodDeclarationName +':"'+name+'"';

        query = new QueryModel(QueryBucketModel.snippetMethodDec, methodDecValue);
        query.displayType = "has method declaration";
        query.displayValue = ":."+name+"("+")";

        BuildQueryBoxView.addAndSubmit(query);
        //LOG IT
        UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Code_Prop),query);
    },

    addImplementsQuery : function(implementsList){

        for(var i = 0; i < implementsList.length; i++){
            var query = null;
            query = new QueryModel(QueryBucketModel.implementsField, implementsList[i]);
            query.displayType = "implements";
            query.displayValue = implementsList[i];
            BuildQueryBoxView.addAndSubmit(query);
//LOG IT
            UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Code_Prop),query);
        }

    },

    addExtendsQuery : function(extendsClass){
        var query = null;
        query = new QueryModel(QueryBucketModel.extendsField, extendsClass);
        query.displayType = "extends class";
        query.displayValue = extendsClass;
        BuildQueryBoxView.addAndSubmit(query);
        //LOG IT
        UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Code_Prop),query);
    },

    addImportQuery: function(row,editorNumber){
        var query = Controller.rowToImportQuery[editorNumber][row];
        BuildQueryBoxView.addAndSubmit(query);
        //LOG IT
        UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Code_Prop),query);
    },

    addPackageQuery: function(query){

        BuildQueryBoxView.addAndSubmit(query)
        //LOG IT
        UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Code_Prop),query);
    },


    addMethodcallQuery: function(callingClass, params, name){
        var query = null;
        var methodCallValue = '';
        if(callingClass != null) {
            methodCallValue = methodCallValue + '%2B'
                + QueryBucketModel.snippetMethodCallDecClass + ':"' + callingClass + '"';
        }else{
            callingClass = "";
        }
        if(name != null) {
            methodCallValue = methodCallValue + '%2B' + QueryBucketModel.snippetMethodCallName
                + ':"' +name+ '"';
                + ':"' +name+ '"';
        }else{
            name = "";
        }

        var formatedParams = "";

        if(params != null) {

            var params = String(params).split(/[ ,]+/);

            var paramQuery = "";

            formatedParams = "";

            for(var paramIndex = 0; paramIndex < params.length; paramIndex++){
                var paramString = params[paramIndex].substring(0,params[paramIndex].length-2);

                if(paramIndex == 0)
                    formatedParams = paramString;
                else{
                    formatedParams = formatedParams+","+paramString
                }

                if(paramQuery == ""){
                    paramQuery = '%2B' + QueryBucketModel.snippetMethodCallParametersPlace
                        + ':'+'"'+params[paramIndex]+'"';
                }else{
                    paramQuery = paramQuery +  '%2B' + QueryBucketModel.snippetMethodCallParametersPlace
                        + ':'+'"'+params[paramIndex]+'"';
                }

            }

            methodCallValue = methodCallValue + paramQuery+'';
        }else{
            params = "";
        }
        query = new QueryModel(QueryBucketModel.snippetMethodCall, methodCallValue);
        query.displayType = "has method call";
        query.displayValue = callingClass+"."+name+"("+formatedParams+")";
        BuildQueryBoxView.addAndSubmit(query);
//LOG IT
        UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Code_Prop),query);

    },
    /**
     * Finds the row the character position is on in a binary search way
     * @param newLineArray
     * @param startPosition
     * @returns {*}
     */
    getRow: function(newLineArray, startPosition, lengthStart, lengthEnd){

        var middle = Math.floor((lengthStart+lengthEnd)/2);


        if(lengthStart + 1 === lengthEnd)
            return lengthStart;

     if(newLineArray[middle] < startPosition){
           return Controller.getRow(newLineArray, startPosition, middle, lengthEnd);
     }else if(newLineArray[middle] > startPosition){
            return Controller.getRow(newLineArray, startPosition, lengthStart,middle);
     }else{
        return middle;
     }

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
            QueryRecommenderModel.clearRecommendedQueries();
            QueryRecommenderView.update();

			for(var i = 0; i<length; i++){
                var editor = ace.edit('result'+i).setValue("");

		        //  $(SetupManager.pound+SetupManager.resultPreArray_ID[i]).empty();
		          $(SetupManager.pound+SetupManager.metaDivArray_ID[i]).empty();
                $(SetupManager.pound+"projectURL"+i).empty();
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
			Controller.currentStatus = message;
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

    /**
     * COMPLEXITY
     * @param meta
     * @param complexity
     */
        setComplexityReformulation: function(meta,complexity){


            var tableIncreaseDecrease = $(SetupManager.tableOpen+SetupManager.tableClose);
            tableIncreaseDecrease.addClass("CriticBorder");

            var tr1 = $(SetupManager.trOpen+SetupManager.trClose);
            tableIncreaseDecrease.append(tr1);
            var td1 = $(SetupManager.tdOpen+SetupManager.tdClose);
            td1.attr("align","center");
            tr1.append(td1);


            var icon  = $('<img width=15 height=15 src="http://codeexchange.ics.uci.edu/downArrow.png"></img>');
            icon.click(function(event){
                var query = new QueryModel(QueryBucketModel.complexityField,"[* TO "+(complexity-1)+"]");
                query.displayType = "complexity";
                query.displayValue = String("less than "+(complexity));
                query.rangeQuery = true;
                BuildQueryBoxView.addAndSubmit(query);
//LOG IT
                UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Criticisms),query);
            });

            icon.addClass("MetaQuery");
        icon.mouseover(function(event){
            icon.attr("title","decrease branch complexity to be less than this code's complexity (decrease for loops, if statments, try/catch, etc...)");
        });

            var tr2 = $(SetupManager.trOpen+SetupManager.trClose);
            tableIncreaseDecrease.append(tr2);
            var td2 = $(SetupManager.tdOpen+SetupManager.tdClose);
            tr2.append(td2);
            td2.attr("align","center");

            var tr3 = $(SetupManager.trOpen+SetupManager.trClose);
            tableIncreaseDecrease.append(tr3);
            var td3 = $(SetupManager.tdOpen+SetupManager.tdClose);
            tr3.append(td3);
            td3.attr("align","center");

            var icon2  = $('<img width=15 height=15 src="http://codeexchange.ics.uci.edu/upArrow.png"></img>');
            icon2.click(function(event){
                var query = new QueryModel(QueryBucketModel.complexityField,"["+(complexity+1)+" TO *]");
                query.displayType = "complexity";
                query.displayValue = String("more than "+(complexity));
                query.rangeQuery = true;
                BuildQueryBoxView.addAndSubmit(query);

//LOG IT
                UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Criticisms),query);

            });


            icon2.addClass("MetaQuery");

        icon2.mouseover(function(event){
            icon2.attr("title","increase branch complexity to be more than this code's complexity (increase for loops, if statments, try/catch, etc...)");
        });


            td1.append(icon2);

            td2.append("<text><font size='2'>complexity</font> <font color='#8b0000'>" +complexity+"</font></text>");

            td3.append(icon);


            var table = $(SetupManager.tableOpen+SetupManager.tableClose);
            var row = $(SetupManager.trOpen+SetupManager.trClose);
            table.append(row);
            var td = $(SetupManager.tdOpen+SetupManager.tdClose);
            row.append(td);
            td.append(tableIncreaseDecrease);

            table.addClass("MetaGroupBorder");
            table.width("10%");
            table.height("10%");


            $(SetupManager.pound+meta).append(table);
        },

    /**
     * IMPORTS
     * @param meta
     * @param complexity
     */
    setImportsReformulation: function(meta,importCount){


        var tableIncreaseDecrease = $(SetupManager.tableOpen+SetupManager.tableClose);
        tableIncreaseDecrease.addClass("CriticBorder");

        var tr1 = $(SetupManager.trOpen+SetupManager.trClose);
        tableIncreaseDecrease.append(tr1);
        var td1 = $(SetupManager.tdOpen+SetupManager.tdClose);
        td1.attr("align","center");
        tr1.append(td1);


        var icon  = $('<img width=15 height=15 src="http://codeexchange.ics.uci.edu/downArrow.png"></img>');
        icon.click(function(event){
            var query = new QueryModel(QueryBucketModel.importCountField,"[* TO "+(importCount-1)+"]");
            query.displayType = "import count";
            query.displayValue = String("less than "+(importCount));
            query.rangeQuery = true;
            BuildQueryBoxView.addAndSubmit(query);
//LOG IT
            UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Criticisms),query);
        });

        icon.addClass("MetaQuery");

        icon.mouseover(function(event){
            icon.attr("title","decrease imports to be less than this code's imports");
        });

        var tr2 = $(SetupManager.trOpen+SetupManager.trClose);
        tableIncreaseDecrease.append(tr2);
        var td2 = $(SetupManager.tdOpen+SetupManager.tdClose);
        tr2.append(td2);
        td2.attr("align","center");

        var tr3 = $(SetupManager.trOpen+SetupManager.trClose);
        tableIncreaseDecrease.append(tr3);
        var td3 = $(SetupManager.tdOpen+SetupManager.tdClose);
        tr3.append(td3);
        td3.attr("align","center");

        var icon2  = $('<img width=15 height=15 src="http://codeexchange.ics.uci.edu/upArrow.png"></img>');
        icon2.click(function(event){
            var query = new QueryModel(QueryBucketModel.importCountField,"["+(importCount+1)+" TO *]");
            query.displayType = "import count";
            query.displayValue = String("more than "+(importCount));
            query.rangeQuery = true;
            BuildQueryBoxView.addAndSubmit(query);

//LOG IT
            UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Criticisms),query);

        });


        icon2.addClass("MetaQuery");

        icon2.mouseover(function(event){
            icon2.attr("title","increase imports to be more than this code's imports");
        });


        td1.append(icon2);

        td2.append("<text><font size='2'>imports</font> <font color='#8b0000'>" +importCount+"</font></text>");

        td3.append(icon);


        var table = $(SetupManager.tableOpen+SetupManager.tableClose);
        var row = $(SetupManager.trOpen+SetupManager.trClose);
        table.append(row);
        var td = $(SetupManager.tdOpen+SetupManager.tdClose);
        row.append(td);
        td.append(tableIncreaseDecrease);

        table.addClass("MetaGroupBorder");
        table.width("10%");
        table.height("10%");


        $(SetupManager.pound+meta).append(table);
    },

    /**
     * SIZE
     *
     * @param meta
     * @param size
     */
        setSizeReformulation: function(meta, size){

            var tableIncreaseDecrease = $(SetupManager.tableOpen+SetupManager.tableClose);
            tableIncreaseDecrease.addClass("CriticBorder");

            var tr1 = $(SetupManager.trOpen+SetupManager.trClose);
            tableIncreaseDecrease.append(tr1);
            var td1 = $(SetupManager.tdOpen+SetupManager.tdClose);
            td1.attr("align","center");
            tr1.append(td1);


            var icon  = $('<img width=15 height=15 src="http://codeexchange.ics.uci.edu/downArrow.png"></img>');
            icon.click(function(event){
                var query = new QueryModel(QueryBucketModel.sizeField,"[* TO "+(size-1)+"]");
                query.displayType = "size";
                query.displayValue = String("less than "+(size)+" characters");
                query.rangeQuery = true;
                BuildQueryBoxView.addAndSubmit(query);
//LOG IT
                UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Criticisms),query);


            });

        icon.mouseover(function(event){
           icon.attr("title","decrease length to be less than this code's size (number of characters)");
        });


            icon.addClass("MetaQuery");

            var tr2 = $(SetupManager.trOpen+SetupManager.trClose);
            tableIncreaseDecrease.append(tr2);
            var td2 = $(SetupManager.tdOpen+SetupManager.tdClose);
            tr2.append(td2);
            td2.attr("align","center");

            var tr3 = $(SetupManager.trOpen+SetupManager.trClose);
            tableIncreaseDecrease.append(tr3);
            var td3 = $(SetupManager.tdOpen+SetupManager.tdClose);
            tr3.append(td3);
            td3.attr("align","center");


            var icon2  = $('<img width=15 height=15 src="http://codeexchange.ics.uci.edu/upArrow.png"></img>');
            icon2.click(function(event){
                var query = new QueryModel(QueryBucketModel.sizeField,"["+(size+1)+" TO *]");
                query.displayType = "size";
                query.displayValue = String("more than "+(size)+" characters");
                query.rangeQuery = true;
                BuildQueryBoxView.addAndSubmit(query);

//LOG IT
                UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Criticisms),query);

            });

        icon2.mouseover(function(event){
            icon2.attr("title","increase length to be more than this code's size (number of characters)");
        });


            icon2.addClass("MetaQuery");





            td1.append(icon2);

        td2.append("<text><font size='2'>size</font> <font color='#8b0000'>" +size+"</font></text>");

            td3.append(icon);

            var table = $(SetupManager.tableOpen+SetupManager.tableClose);
            var row = $(SetupManager.trOpen+SetupManager.trClose);
            table.append(row);
            var td = $(SetupManager.tdOpen+SetupManager.tdClose);
            row.append(td);
            td.append(tableIncreaseDecrease);

            table.addClass("MetaGroupBorder");
            table.width("10%");
            table.height("10%");

            $(SetupManager.pound+meta).append(table);


        },

    /**
     * FUNCTION count
     * @param meta
     * @param complexity
     */
    setFunctionCountReformulation: function(meta,functionCount){


        var tableIncreaseDecrease = $(SetupManager.tableOpen+SetupManager.tableClose);
        tableIncreaseDecrease.addClass("CriticBorder");

        var tr1 = $(SetupManager.trOpen+SetupManager.trClose);
        tableIncreaseDecrease.append(tr1);
        var td1 = $(SetupManager.tdOpen+SetupManager.tdClose);
        td1.attr("align","center");
        tr1.append(td1);


        var icon  = $('<img width=15 height=15 src="http://codeexchange.ics.uci.edu/downArrow.png"></img>');
        icon.click(function(event){
            var query = new QueryModel(QueryBucketModel.functionCountField,"[* TO "+(functionCount-1)+"]");
            query.displayType = "method count";
            query.displayValue = String("less than "+(functionCount));
            query.rangeQuery = true;
            BuildQueryBoxView.addAndSubmit(query);

        });

        icon.addClass("MetaQuery");

        var tr2 = $(SetupManager.trOpen+SetupManager.trClose);
        tableIncreaseDecrease.append(tr2);
        var td2 = $(SetupManager.tdOpen+SetupManager.tdClose);
        tr2.append(td2);
        td2.attr("align","center");


        var tr3 = $(SetupManager.trOpen+SetupManager.trClose);
        tableIncreaseDecrease.append(tr3);
        var td3 = $(SetupManager.tdOpen+SetupManager.tdClose);
        tr3.append(td3);
        td3.attr("align","center");

        var icon2  = $('<img width=15 height=15 src="http://codeexchange.ics.uci.edu/upArrow.png"></img>');
        icon2.click(function(event){
            var query = new QueryModel(QueryBucketModel.functionCountField,"["+(functionCount+1)+" TO *]");
            query.displayType = "method count";
            query.displayValue = String("more than "+(functionCount));
            query.rangeQuery = true;
            BuildQueryBoxView.addAndSubmit(query);

        });


        icon2.addClass("MetaQuery");




        td1.append(icon2);

        td2.append("<text>methods</text>");


        td3.append(icon);


        var table = $(SetupManager.tableOpen+SetupManager.tableClose);
        var row = $(SetupManager.trOpen+SetupManager.trClose);
        table.append(row);
        var td = $(SetupManager.tdOpen+SetupManager.tdClose);
        row.append(td);
        td.append(tableIncreaseDecrease);

        table.addClass("MetaGroupBorder");
        table.width("10%");
        table.height("10%");


        $(SetupManager.pound+meta).append(table);
    },

		setAuthorName	:	function(meta, name){
			var metadiv = $(SetupManager.divOpen+SetupManager.divClose);
			var icon  = $('<img width=20 height=20 src="http://codeexchange.ics.uci.edu/author.png"></img>');
			var authName = $('<div><u>'+name+'[+]</u></div>');


            authName.click(function(event){
                var query = new QueryModel(QueryBucketModel.authorFiled,name);
                query.displayType = "author";
                query.displayValue = name;
                BuildQueryBoxView.addAndSubmit(query);

            });



			metadiv.addClass("MetaBorder");
			authName.addClass("MetaBorder");

			metadiv.append(icon);
			metadiv.append(authName);

			$(SetupManager.pound+meta).append(metadiv);


		},

       setCodeComplexity : function(meta, complexity){
           var metadiv = $(SetupManager.divOpen+SetupManager.divClose);
           //var icon  = $('<span class="ui-icon ui-icon-folder-collapsed" style="display:inline-block"></span>');
           var level = "low";

         if(complexity >=5)
            level = "medium";

         if(complexity >= 11)
           level = "high";

           var complexText = $('<text>complexity: '+level +'</text>');



           metadiv.addClass("MetaBorder");
           complexText.addClass("MetaBorder");

           metadiv.append(complexText);

           $(SetupManager.pound+meta).append(metadiv);
       },

		setCodeChurn: function(meta, codechurn){
			var metadiv = $(SetupManager.divOpen+SetupManager.divClose);
			//var icon  = $('<span class="ui-icon ui-icon-folder-collapsed" style="display:inline-block"></span>');

            var level = "low";

            if(codechurn >=.4)
                level = "medium";

            if(codechurn >= .8)
                level = "high";


            var churnText = $('<text>chance of bugs: '+level+'</text>');



			metadiv.addClass("MetaBorder");
			churnText.addClass("MetaBorder");

			metadiv.append(churnText);

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
		setProjectName	:	function(meta, name, projectURL){
			var metadiv = $(SetupManager.divOpen+SetupManager.divClose);
			var icon  = $('<img width=20 height=20 src="http://codeexchange.ics.uci.edu/project.png"></img>');
			var projectName = $('<div><u><font size="2">'+name+'</font></u></div>');

            projectName.click(function(event){
                var query = new QueryModel(QueryBucketModel.projectField,name);
                query.displayType = "project";
                query.displayValue = name;
                BuildQueryBoxView.addAndSubmit(query);
//LOG IT
                UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Code_Prop),query);
            });


			metadiv.addClass("MetaBorder");
            projectName.addClass("MetaBorder");
            projectName.addClass("MetaQuery");
			metadiv.append(icon);
			metadiv.append(projectName);

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

			Controller.previousHeight = $(SetupManager.pound+result).height();
            Controller.previousWidth = $(SetupManager.pound+result).width();
            Controller.previousX = $(SetupManager.pound+result).left;
            Controller.previousY = $(SetupManager.pound+result).top;


				var screenWidth = jQuery(window).width();
				var screenHeight = jQuery(window).height();
				var screenBuffer = screenWidth-$('.FilterSideTD').width()-46;
				var screenHeightBuffer = Controller.previousHeight;

	          $( SetupManager.pound+SetupManager.resultPreArray_ID[number] ).animate({


		            width:  screenBuffer,
		            height: screenHeightBuffer,
		            left:	'0px',
		            top:	'0px'
		          }, 0 );

            var editor = ace.edit(SetupManager.resultPreArray_ID[number]);
            editor.resize();

            Controller.isExpanded = true;

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


		            width: Controller.previousWidth,
		            height: Controller.previousHeight,
		            left:	Controller.previousX+'px',
		            top:	Controller.previousY+'px'
		          }, 0 );



            Controller.isExpanded = false;

            //important to get the resizing right..
            $(window).trigger('resize');
            var editor = ace.edit(SetupManager.resultPreArray_ID[number]);
            editor.resize();

            for(var i = 0; i <SetupManager.resultEditors.length; i++){
                var editor = ace.edit(SetupManager.resultPreArray_ID[i]);
                editor.resize();

//                if(i> 0 && QueryManager.totalResuls == 1){
//                    editor.session.setValue("");
//                }else if(i > 0 && QueryManager.totalResuls == 2){
//                    editor.session.setValue("");
//                }

            }



		},

		/**
		 * FUNCTION
		 */
		toggleCells		:	function(cell){
			var length = SetupManager.cellDivArray_ID.length;

		//	var rowIndex = 0;

			for(var i = 0; i<length; i++){
		          if(cell != SetupManager.cellDivArray_ID[i]){
		        	  $(SetupManager.pound+SetupManager.resultPreArray_ID[i]).toggle();
		        	  $(SetupManager.pound+SetupManager.cellDivArray_ID[i]).toggle();

		          }
//		        	  else{
//		        	  rowIndex = i;
//		          }
			}

      	  //TODO: need to generalize this!!
//      	  if(rowIndex == 2 || rowIndex == 3){
//      		  		$("#row0").toggle();
//        		}else{
//        			$("#row2").toggle();
//        		}

		},

    showGrid    : function(){
        $('.Grid').height($('.FilterSideTD').height());

        $(SetupManager.pound+SetupManager.resultTable_ID).toggle();
        QueryGridView.grid.toggle();
        Controller.gridOn = !Controller.gridOn;


        if(Controller.gridOn) {
            QueryGridView.update();


        }

        //refresh editors
        if(!Controller.gridOn){
            for(var i = 0; i <SetupManager.resultEditors.length; i++){
                var editor = ace.edit(SetupManager.resultPreArray_ID[i]);
                editor.resize();
            }


        }



    }


};