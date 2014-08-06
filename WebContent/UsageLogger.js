/**
 * Created by lee on 6/23/14.
 */
var UsageLogger = {

//QUERY BUILDER FEATURE EVENT
    QUERY_BUILDER_KEY_WORDS             : "QUERY_BUILDER_KEY_WORDS",
    QUERY_BUILDER_EXTENDS               : "QUERY_BUILDER_EXTENDS",
    QUERY_BUILDER_IMPLEMENTS            : "QUERY_BUILDER_IMPLEMENTS",
    QUERY_BUILDER_IMPORTS               : "QUERY_BUILDER_IMPORTS",
    QUERY_BUILDER_METHOD_DECLARATION    : "QUERY_BUILDER_METHOD_DECLARATION",
    QUERY_BUILDER_METHOD_CALL           : "QUERY_BUILDER_METHOD_CALL",
    QUERY_BUILDER_PACKAGE               : "QUERY_BUILDER_PACKAGE",
    QUERY_BUILDER_PROJECT               : "QUERY_BUILDER_PROJECT",

    QUERY_BUILDER_IS_GENERIC            : "QUERY_BUILDER_IS_GENERIC",
    QUERY_BUILDER_IS_WILDCARD           : "QUERY_BUILDER_IS_WILDCARD",
    QUERY_BUILDER_IS_ABSTRACT           : "QUERY_BUILDER_IS_ABSTRACT",

///QUERY CRITICISMS
    QUERY_CRITICISMS_LENGTH             : "QUERY_CRITICISMS_LENGTH",
    QUERY_CRITICISMS_COMPLEXITY         : "QUERY_CRITICISMS_COMPLEXITY",
    QUERY_CRITICISMS_IMPORTS            : "QUERY_CRITICISMS_IMPORTS",
    QUERY_CRITICISMS_METHODS            : "QUERY_CRITICISMS_METHODS",

//QUERY CODE PROP
    QUERY_CODE_PROP_PACKAGE             : "QUERY_CODE_PROP_PACKAGE",
    QUERY_CODE_PROP_EXTENDS             : "QUERY_CODE_PROP_EXTENDS",
    QUERY_CODE_PROP_IMPLEMENTS          : "QUERY_CODE_PROP_IMPLEMENTS",
    QUERY_CODE_PROP_METHOD_DECLARATION  : "QUERY_CODE_PROP_METHOD_DECLARATION",
    QUERY_CODE_PROP_METHOD_CALL         : "QUERY_CODE_PROP_METHOD_CALL",
    QUERY_CODE_PROP_IMPORTS             : "QUERY_CODE_PROP_IMPORTS",
    QUERY_CODE_PROP_PROJECT             : "QUERY_CODE_PROP_PROJECT",

//QUERY RECOMMENDER
    QUERY_RECOMMENDER_KEYWORDS          : "QUERY_RECOMMENDER_KEYWORDS",
    QUERY_RECOMMENDER_IMPLEMENTS        : "QUERY_RECOMMENDER_IMPLEMENTS",
    QUERY_RECOMMENDER_EXTENDS           : "QUERY_RECOMMENDER_EXTENDS",
    QUERY_RECOMMENDER_IMPORTS           : "QUERY_RECOMMENDER_IMPORTS",

//TOOL TIP
    TOOL_TIP_METHOD_DECLARATION         : "TOOL_TIP_METHOD_DECLARATION",
    TOOL_TIP_METHOD_CALL                : "TOOL_TIP_METHOD_CALL",
    TOOL_TIP_PACKAGE                    : "TOOL_TIP_PACKAGE",
    TOOL_TIP_EXTENDS                    : "TOOL_TIP_EXTENDS",
    TOOL_TIP_IMPORTS                    : "TOOL_TIP_IMPORTS",
    TOOL_TIP_IMPLEMENTS                 : "TOOL_TIP_IMPLEMENTS",
    TOOL_TIP_DOWNLOAD_PROJECT           : "TOOL_TIP_DOWNLOAD_PROJECT",
    TOOL_TIP_CLASS_FOUND                : "TOOL_TIP_CLASS_FOUND",

//DOWNLOAD PROJECT CLICK
    DOWNLOAD_PROJECT                    : "DOWNLOAD_PROJECT",

    DOWNLOAD_FILE                       : "DOWNLOAD_FILE",

//CELL WINDOW
    WINDOW_EXPAND_CELL1                 : "WINDOW_EXPAND_CELL1",
    WINDOW_EXPAND_CELL2                 : "WINDOW_EXPAND_CELL2",
    WINDOW_EXPAND_CELL3                 : "WINDOW_EXPAND_CELL3",

    WINDOW_COLLAPSE_CELL1               : "WINDOW_COLLAPSE_CELL1",
    WINDOW_COLLAPSE_CELL2               : "WINDOW_COLLAPSE_CELL2",
    WINDOW_COLLAPSE_CELL3               : "WINDOW_COLLAPSE_CELL3",

    WINDOW_SCROLL_CELL1                 : "WINDOW_SCROLL_CELL1",
    WINDOW_SCROLL_CELL2                 : "WINDOW_SCROLL_CELL2",
    WINDOW_SCROLL_CELL3                 : "WINDOW_SCROLL_CELL3",

    WINDOW_SELECT_CELL1                 : "WINDOW_SELECT_CELL1",
    WINDOW_SELECT_CELL2                 : "WINDOW_SELECT_CELL2",
    WINDOW_SELECT_CELL3                 : "WINDOW_SELECT_CELL3",

    WINDOW_COPY_CELL1                   : "WINDOW_COPY_CELL1",
    WINDOW_COPY_CELL2                   : "WINDOW_COPY_CELL2",
    WINDOW_COPY_CELL3                   : "WINDOW_COPY_CELL3",

    WINDOW_CUT_CELL1                   : "WINDOW_CUT_CELL1",
    WINDOW_CUT_CELL2                   : "WINDOW_CUT_CELL2",
    WINDOW_CUT_CELL3                   : "WINDOW_CUT_CELL3",

    AUTO_COMPLETE_SELECTED              : "AUTO_COMPLETE_SELECTED",


//QUERY HISTORY
    QUERY_CODE_PROP_BUTTON_ON             : "QUERY_HISTORY_BUTTON_ON",
    QUERY_HISTORY_BUTTON_OFF            : "QUERY_HISTORY_BUTTON_OFF",
    QUERY_HISTORY_CELL_CLICK            : "QUERY_HISTORY_CELL_CLICK",
    QUERY_HISTORY_CELL_PART_CLICK       : "QUERY_HISTORY_CELL_PART_CLICK",
    QUERY_HISTORY_CELL_DELETE           : "QUERY_HISTORY_CELL_DELETE",

//NEW QUERY BUTTON
    NEW_QUERY_BUTTON_CLICKED            : "NEW_QUERY_BUTTON_CLICKED",

//ACTIVE QUERY
    DEACTIVATE_QUERY                    : "DEACTIVATE_QUERY",
    ACTIVATE_QUERY                      : "ACTIVATE_QUERY",

//PAGE NAVIGATION
    PAGE_CHANGE                         : "PAGE_CHANGE",

    SESSION_START                      : "SESSION_START",

    RESULTS_FOUND                       : "RESULTS_FOUND",


    //keeping track of stored events to send at some time
    events                              : new Array(),

//used to indicate where for converQueryToEventType
    Query_Builder : "Query_Builder",
    Query_Recommendation : "Query_Recommendation",
    Query_Criticisms    : "Query_Criticisms",
    Query_Code_Prop     : "Query_Code_Prop",

    LastTimeStamp       : "",
    LastEventType       : "",

    optionalValue       : null,

    convertQueryToEventType: function(query,where){


        //generated with query builder
        if(where == UsageLogger.Query_Builder){
            var type = query.type;
            switch(type){
                case QueryBucketModel.snippetField:
                    return UsageLogger.QUERY_BUILDER_KEY_WORDS;
                case QueryBucketModel.snippetImportsFiled:
                    return UsageLogger.QUERY_BUILDER_IMPORTS;
                case QueryBucketModel.snippetMethodCall:
                    return UsageLogger.QUERY_BUILDER_METHOD_CALL;
                case QueryBucketModel.snippetMethodDec:
                    return UsageLogger.QUERY_BUILDER_METHOD_DECLARATION;
                case QueryBucketModel.snippetPackage:
                    return UsageLogger.QUERY_BUILDER_PACKAGE;
                case QueryBucketModel.extendsField:
                    return UsageLogger.QUERY_BUILDER_EXTENDS;
                case QueryBucketModel.implementsField:
                    return UsageLogger.QUERY_BUILDER_IMPLEMENTS;
                case QueryBucketModel.projectField:
                    return UsageLogger.QUERY_BUILDER_PROJECT;
                case QueryBucketModel.snippetClassAbstract:
                    return UsageLogger.QUERY_BUILDER_IS_ABSTRACT;
                case QueryBucketModel.snippetClassGeneric:
                    return UsageLogger.QUERY_BUILDER_IS_GENERIC;
                case QueryBucketModel.snippetClassWildCard:
                    return UsageLogger.QUERY_BUILDER_IS_WILDCARD;
                default :
                    return null;
            }
        }else if(where == UsageLogger.Query_Recommendation){
            var type = query.type;
            switch(type) {
                case QueryBucketModel.snippetField:
                    return UsageLogger.QUERY_RECOMMENDER_KEYWORDS
                case QueryBucketModel.snippetImportsFiled:
                    return UsageLogger.QUERY_RECOMMENDER_IMPORTS
                case QueryBucketModel.extendsField:
                    return UsageLogger.QUERY_RECOMMENDER_EXTENDS
                case QueryBucketModel.implementsField:
                    return UsageLogger.QUERY_RECOMMENDER_IMPLEMENTS
                default :
                    return null;
            }

        }else if(where == UsageLogger.Query_Criticisms){
                var type = query.type;
                switch(type) {
                    case QueryBucketModel.sizeField:
                        return UsageLogger.QUERY_CRITICISMS_LENGTH
                    case QueryBucketModel.complexityField:
                        return UsageLogger.QUERY_CRITICISMS_COMPLEXITY
                    case QueryBucketModel.importCountField:
                        return UsageLogger.QUERY_CRITICISMS_IMPORTS
                    default :
                        return null;
                }
        }else if(where == UsageLogger.Query_Code_Prop){
            var type = query.type;
            switch(type){
                case QueryBucketModel.snippetImportsFiled:
                    return UsageLogger.QUERY_CODE_PROP_IMPORTS
                case QueryBucketModel.snippetMethodCall:
                    return UsageLogger.QUERY_CODE_PROP_METHOD_CALL;
                case QueryBucketModel.snippetMethodDec:
                    return UsageLogger.QUERY_CODE_PROP_METHOD_DECLARATION;
                case QueryBucketModel.snippetPackage:
                    return UsageLogger.QUERY_CODE_PROP_PACKAGE;
                case QueryBucketModel.extendsField:
                    return UsageLogger.QUERY_CODE_PROP_EXTENDS;
                case QueryBucketModel.implementsField:
                    return UsageLogger.QUERY_CODE_PROP_IMPLEMENTS;
                case QueryBucketModel.projectField:
                    return UsageLogger.QUERY_CODE_PROP_PROJECT;
                default :
                    return null;
            }
        }
    },

    addEvent: function(eventType, query, optionalValue){

        //don't want to log lots of hovering.
        if(UsageLogger.LastEventType == UsageLogger.TOOL_TIP_CLASS_FOUND &&
            eventType == UsageLogger.TOOL_TIP_CLASS_FOUND){
            return;
        }

//don't want to log lots of hovering.
        if(UsageLogger.LastEventType == UsageLogger.TOOL_TIP_METHOD_CALL &&
            eventType == UsageLogger.TOOL_TIP_METHOD_CALL){
            return;
        }
//don't want to log lots of hovering.
        if(UsageLogger.LastEventType == UsageLogger.TOOL_TIP_EXTENDS &&
            eventType == UsageLogger.TOOL_TIP_EXTENDS){
            return;
        }
//don't want to log lots of hovering.
        if(UsageLogger.LastEventType == UsageLogger.TOOL_TIP_IMPLEMENTS &&
            eventType == UsageLogger.TOOL_TIP_IMPLEMENTS){
            return;
        }
//don't want to log lots of hovering.
        if(UsageLogger.LastEventType == UsageLogger.TOOL_TIP_IMPORTS &&
            eventType == UsageLogger.TOOL_TIP_IMPORTS){
            return;
        }
//don't want to log lots of hovering.
        if(UsageLogger.LastEventType == UsageLogger.TOOL_TIP_METHOD_DECLARATION &&
            eventType == UsageLogger.TOOL_TIP_METHOD_DECLARATION){
            return;
        }
//don't want to log lots of hovering.
        if(UsageLogger.LastEventType == UsageLogger.TOOL_TIP_PACKAGE &&
            eventType == UsageLogger.TOOL_TIP_PACKAGE){
            return;
        }

        if(optionalValue == undefined || optionalValue == null)
            optionalValue = null;

        UsageLogger.optionalValue = optionalValue;

        var event = new Event(Client.id,eventType, query);
        UsageLogger.events.push(event);
        UsageLogger.uploadEvents();

        UsageLogger.LastEventType = eventType;
    },

    uploadEvents : function(){
        for(var i = 0; i < UsageLogger.events.length; i++) {

            var id = Client.id;
            var eventType = UsageLogger.events[i].eventType;

            var queryType = null;
            var queryValue = null;
            var queryActive = null;


            if (UsageLogger.events[i].query != null) {
                queryType = UsageLogger.events[i].query.type;
                queryValue = UsageLogger.events[i].query.value;
                queryActive = UsageLogger.events[i].query.active;
            }

            var timeStamp = UsageLogger.events[i].timeStamp;

            UsageLogger.LastTimeStamp = timeStamp;

            var url = "http://codeexchange.ics.uci.edu/logEvent.php?id="+id+
                "&eventType="+eventType+
                "&queryType="+queryType+
                "&queryValue="+queryValue+
                "&queryActive="+queryActive+
                "&optionalValue="+UsageLogger.optionalValue+
                "&timeStamp="+timeStamp+
                "&callback=?&json.wrf=displayCode";

            $.getJSON(url).fail(function(data, textStatus, jqXHR) {
                //alert(data.status);

            }).success(function(data, textStatus, jqXHR ) {
                $.each(data, function(index, element) {
                   //     alert(data.status);
                });
            });

            break;
        }

         UsageLogger.events.length = 0;
    }






}