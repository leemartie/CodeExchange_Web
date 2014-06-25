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



//QUERY HISTORY

    QUERY_HISTORY_BUTTON_ON             : "QUERY_HISTORY_BUTTON_ON",
    QUERY_HISTORY_BUTTON_OFF            : "QUERY_HISTORY_BUTTON_OFF",
    QUERY_HISTORY_CELL_CLICK            : "QUERY_HISTORY_CELL_CLICK",
    QUERY_HISTORY_CELL_PART_CLICK       : "QUERY_HISTORY_CELL_PART_CLICK",

//NEW QUERY BUTTON
    NEW_QUERY_BUTTON_CLICKED            : "NEW_QUERY_BUTTON_CLICKED",

    DEACTIVATE_QUERY                    : "DEACTIVATE_QUERY",
    ACTIVATE_QUERY                      : "ACTIVATE_QUERY",

    //keeping track of stored events to send at some time
    events                              : new Array(),

//used to indicate where for converQueryToEventType
    Query_Builder : "Query_Builder",
    Query_Recommendation : "Query_Recommendation",
    Query_Criticisms    : "Query_Criticisms",
    Query_Code_Prop     : "Query_Code_Prop",

    LastTimeStamp       : "",

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

    addEvent: function(eventType, query){

        var event = new Event(Client.id,eventType, query);
        UsageLogger.events.push(event);
        UsageLogger.uploadEvents();
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

            var url = "http://level1router.ics.uci.edu/logEvent.php?id="+id+
                "&eventType="+eventType+
                "&queryType="+queryType+
                "&queryValue="+queryValue+
                "&queryActive="+queryActive+
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