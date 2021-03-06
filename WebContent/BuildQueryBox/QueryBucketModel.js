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
var QueryBucketModel = {

    /*represents the current bucket of queries*/
    /*double array where index is assoative to field*/
    listOfQueries        :   new Array(),
    listOfActiveQueries  :   new Array(),
    //this is just current stack of all queries in the order they are given
    stackOfQueries       :   new Array()/*QueryModel*/,

    MORE_LIKE_THIS             :   "MORE_LIKE_THIS",
    MORE_LIKE_THIS_VARIABLES   :   "MORE_LIKE_THIS_VARIABLES",
    MORE_LIKE_THIS_COMPLEX      : "MORE_LIKE_THIS_COMPLEX",

    classNameField       :   "snippet_class_name_delimited",
    snippetField         :   "snippet_code",
    extendsField         :   "snippet_extends",
    implementsField      :   "snippet_implements",
    authorFiled          :   "snippet_author_name",
    projectField         :   "snippet_project_name",
    projectOwnerField    :   "snippet_project_owner",
    returnTypeField      :   "snippet_return_type",
    recursiveField       :   "snippet_method_dec_is_recursive",
    varargsField         :   "snippet_method_dec_is_var_args",
    lastUpdatedField                : "snippet_last_updated",
    snippetImportsFiled             : "snippet_imports",
    methodNameField                 : "snippet_method_invocations",
    sizeField                       : "snippet_size",
    complexityField                 : "snippet_path_complexity_class_sum",
    importCountField                : "snippet_imports_count",
    functionCountField              : "snippet_number_of_functions",
    snippetMethodCall               : "is_method_invocation_Child",
    snippetMethodDec                : "is_method_dec_child",

    snippetMethodDeclarationName       : "snippet_method_dec_name",
    snippetMethodDeclarationClass      : "snippet_method_dec_declaring_class",
    snippetMethodDeclarationParameters : "snippet_method_dec_parameter_types_count",
    snippetMethodDeclarationReturn     : "snippet_method_dec_return_type",
    snippetMethodDeclarationGeneric    : "snippet_method_dec_is_generic",
    snippetMethodDeclarationVarArgs    : "snippet_method_dec_is_var_args",

    snippetMethodCallCallingClass   : "snippet_method_invocation_calling_class",
    snippetMethodCallCallingClassShort : "snippet_method_invocation_calling_class_short",
    snippetMethodCallName           : "snippet_method_invocation_name",
    snippetMethodCallParameters     : "snippet_method_invocation_arg_types_count",
    snippetMethodCallParametersPlace     : "snippet_method_invocation_arg_types_place",
    snippetMethodCallValues         :   "snippet_method_invocation_arg_values",

    snippetMethodCallDecClass   :   "snippet_method_invocation_declaring_class",

    snippetPackage              :   "snippet_package",


    snippetCodeChurn            : "snippet_changed_code_churn",


    snippetClassGeneric             :   "snippet_is_generic",
    snippetClassAbstract            :   "snippet_is_abstract",
    snippetClassWildCard            :   "snippet_is_wildcard",
    snippetInnerClass               :   "snippet_is_innerClass",

    snippetHasComments              :   "snippet_has_comments",

    humanLanguageOfComments         : "snippet_human_language",

    snippet_variable_names_delimited: "snippet_variable_names_delimited",

    ClassBox: "ClassBox",
    MethodBox: "MethodBox",
    ParamBox: "ParamBox",
    ReturnBox : "ReturnBox",

    listOfKeys           :   new Array(),

    addQuery    :   function(/*QueryModel*/query){
        QueryBucketModel.stackOfQueries.push(query);
        query.stackIndex = QueryBucketModel.stackOfQueries.length-1;

        var arrayOfValues = QueryBucketModel.listOfQueries[query.type];

        //adding key if not there yet
        if(QueryBucketModel.listOfKeys.indexOf(query.type) == -1){
            QueryBucketModel.listOfKeys.push(query.type);
        }

        if(arrayOfValues == null)
            arrayOfValues = new Array();

        var activeValues = QueryBucketModel.listOfActiveQueries[query.type];
        if(activeValues == null)
            activeValues = new Array();

        arrayOfValues.push(query.value);
        activeValues.push(true);
        query.valueIndex = arrayOfValues.length-1;

        QueryBucketModel.listOfQueries[query.type] = arrayOfValues;
        QueryBucketModel.listOfActiveQueries[query.type] = activeValues;

        if(Controller.gridOn)
            QueryGridView.update();

        QueryBucketModel.storeCurrentQuery();

    },

    activateQuery: function(type, index, stackIndex){
        QueryBucketModel.listOfActiveQueries[type][index] = true;
        QueryBucketModel.stackOfQueries[stackIndex].active = true;

//LOG IT
        UsageLogger.addEvent(UsageLogger.ACTIVATE_QUERY,QueryBucketModel.stackOfQueries[stackIndex]);
    },


    deactivateQuery: function(type, index, stackIndex){
        QueryBucketModel.listOfActiveQueries[type][index] = false;
        QueryBucketModel.stackOfQueries[stackIndex].active = false;


//LOG IT

        UsageLogger.addEvent(UsageLogger.DEACTIVATE_QUERY,QueryBucketModel.stackOfQueries[stackIndex]);
    },

    /**
     * Edit Query
     *
     * @param type
     * @param index
     * @param stackIndex
     * @param value
     */
    editQuery: function(type, index, stackIndex, value){
        QueryBucketModel.listOfQueries[type][index] = value;
        QueryBucketModel.stackOfQueries[stackIndex].value = value;
        QueryBucketModel.stackOfQueries[stackIndex].displayValue = value;
    },

    removeQuery :   function(index){
            var query = QueryBucketModel.stackOfQueries[index];
            var key = query.type;
            var value = query.value;
            var valueIndex = query.valueIndex;

            QueryBucketModel.stackOfQueries.splice(index,1);
            QueryBucketModel.listOfQueries[key].splice(valueIndex,1);

    },

    /*detects if this value of type is already covered by current query*/
    hasQuery : function(value, type){

        for(var i = 0; i < QueryBucketModel.stackOfQueries.length; i++){
            var query = QueryBucketModel.stackOfQueries[i];

            if(query.type == QueryBucketModel.snippetField
                && type == QueryBucketModel.snippetField){

                if(query.value.toLowerCase().indexOf(value.toLowerCase()) > -1
                    || value.toLowerCase().indexOf(query.value.toLowerCase()) > -1){
                    return true;
                }

            }else{
                if(query.type == type && query.value.toLowerCase() == value.toLowerCase()){
                    return true;
                }
            }
        }

        return false;
    },

    inStack : function(query){

        if(query == null)
            return true;

        for(var i = 0; i<QueryBucketModel.stackOfQueries.length; i++){
            var stackQuery = QueryBucketModel.stackOfQueries[i];
            if(query.type == stackQuery.type && query.value == stackQuery.value){
                return true;
            }
        }

        return false;
    },

    storeCurrentQuery: function(){
        var expiration_date = new Date();
        expiration_date.setFullYear(expiration_date.getFullYear() + 1);

        var query = "";
        for (var j = 0; j < QueryBucketModel.stackOfQueries.length; j++) {

            var type = QueryBucketModel.stackOfQueries[j].type;
            var value = QueryBucketModel.stackOfQueries[j].value;
            var valueIndex = QueryBucketModel.stackOfQueries[j].valueIndex;
            var stackIndex = QueryBucketModel.stackOfQueries[j].stackIndex;
            var displayType = QueryBucketModel.stackOfQueries[j].displayType;
            var displayValue = QueryBucketModel.stackOfQueries[j].displayValue;
            var active = QueryBucketModel.stackOfQueries[j].active;
            var score = QueryBucketModel.stackOfQueries[j].score;
            var rangeQuery = QueryBucketModel.stackOfQueries[j].rangeQuery;

            query = query + type + "!!@@$$" + value + "!!@@$$" + valueIndex + "!!@@$$" + stackIndex + "!!@@$$"
                + displayType + "!!@@$$" + displayValue + "!!@@$$" + active + "!!@@$$" + score + "!!@@$$" + rangeQuery+"!!@@$$~~";

        }

        var indexID = QueryGridModel.history.length;

        localStorage.setItem("search"+indexID, query);
    },


    storeCookie : function() {



        for (var i = 0; i < QueryGridModel.history.length; i++) {
            var query = "";
            for (var j = 0; j < QueryGridModel.history[i].length; j++) {

                var type = QueryGridModel.history[i][j].type;
                var value = QueryGridModel.history[i][j].value;
                var valueIndex = QueryGridModel.history[i][j].valueIndex;
                var stackIndex = QueryGridModel.history[i][j].stackIndex;
                var displayType = QueryGridModel.history[i][j].displayType;
                var displayValue = QueryGridModel.history[i][j].displayValue;
                var active = QueryGridModel.history[i][j].active;
                var score = QueryGridModel.history[i][j].score;
                var rangeQuery = QueryGridModel.history[i][j].rangeQuery;

                query = query + type + "!!@@$$" + value + "!!@@$$" + valueIndex + "!!@@$$" + stackIndex + "!!@@$$"
                    + displayType + "!!@@$$" + displayValue + "!!@@$$" + active + "!!@@$$" + score + "!!@@$$" + rangeQuery+"!!@@$$~~";

            }

            localStorage.setItem("search"+i, query);


        }

         localStorage.setItem("length", QueryGridModel.history.length);


    },



    removeAll   :   function() {
        //add to history first
        for(var i = 0; i < QueryBucketModel.stackOfQueries.length; i++){
            var query = QueryBucketModel.stackOfQueries[i];
            query.active = true;

        }
        QueryGridModel.history.push(QueryBucketModel.stackOfQueries.slice(0));
        QueryBucketModel.storeCookie();

        for (var i = 0; i < QueryBucketModel.listOfKeys.length; i++) {
            var key = QueryBucketModel.listOfKeys[i];
            QueryBucketModel.listOfQueries[key].length = 0;
            QueryBucketModel.listOfActiveQueries[key].length = 0;
        }

        QueryBucketModel.listOfKeys.length = 0;
        QueryBucketModel.stackOfQueries.length = 0;
    },

    repopulateQuery :   function(stackOfQueries){

      for(var i = 0; i < QueryBucketModel.listOfKeys.length; i++){
          QueryBucketModel.listOfQueries[QueryBucketModel.listOfKeys[i]].length = 0;
      }
      QueryBucketModel.listOfQueries.length = 0;
      QueryBucketModel.listOfKeys.length = 0;
      QueryBucketModel.stackOfQueries.length = 0;

        for(var i = 0; i<stackOfQueries.length; i++){
            QueryBucketModel.addQuery((stackOfQueries[i]));
        }
    },

    /**
     *
     * @returns {string}
     */
    constructChildQuery:function(){
        var childQuery = "";

        //get method invocation queries
        var valueList = QueryBucketModel.listOfQueries[QueryBucketModel.snippetMethodCall];
        var valueListDec = QueryBucketModel.listOfQueries[QueryBucketModel.snippetMethodDec];

        if(valueList != null) {
            for (var j = 0; j < valueList.length; j++) {
                if (QueryBucketModel.listOfActiveQueries[QueryBucketModel.snippetMethodCall][j] == true) {
                    if (childQuery == "")
                        childQuery = "(" + valueList[j] + ")";
                    else
                        childQuery = childQuery + " OR " + "(" + valueList[j] + ")";
                }


            }
        }

        if(valueListDec != null){
            for (var j = 0; j < valueListDec.length; j++) {
                if (QueryBucketModel.listOfActiveQueries[QueryBucketModel.snippetMethodDec][j] == true) {
                    if (childQuery == "")
                        childQuery = "(" + valueListDec[j] + ")";
                    else
                        childQuery = childQuery + " OR " + "(" + valueListDec[j] + ")";
                }


            }
        }

        if (childQuery == ""){
            childQuery = "*:*";
        }

        //get method declaration queries

        return childQuery;

    },


    constructQuery : function(){
        var query = "";

        for(var i = 0; i<QueryBucketModel.listOfKeys.length; i++){
            var key = QueryBucketModel.listOfKeys[i];


            var field = "";
            var valueList = QueryBucketModel.listOfQueries[key];


            //query for field
            for(var j = 0; j<valueList.length; j++){

                //checking if active
                if(QueryBucketModel.listOfActiveQueries[key][j] == true){


                    if(field == "") {

                        if(key == QueryBucketModel.snippetMethodCall || key == QueryBucketModel.snippetMethodDec)
                            field = '((_query_:{!parent which=parent:true}';
                        else if(key == QueryBucketModel.MORE_LIKE_THIS)
                            field = field;
                        else if(key == QueryBucketModel.MORE_LIKE_THIS_VARIABLES)
                            field = field;
                        else if(key == QueryBucketModel.MORE_LIKE_THIS_COMPLEX)
                            field = field;
                        else
                            field = key+":(";


                        if(valueList[j] == "") {
                            field = field + "*";
                        }else {
                            if(key != QueryBucketModel.lastUpdatedField && key != QueryBucketModel.sizeField
                                && key != QueryBucketModel.complexityField && key != QueryBucketModel.snippetMethodCall
                                && key != QueryBucketModel.snippetMethodDec && key != QueryBucketModel.importCountField
                                && key != QueryBucketModel.functionCountField && key != QueryBucketModel.MORE_LIKE_THIS
                                && key != QueryBucketModel.MORE_LIKE_THIS_VARIABLES && key != QueryBucketModel.MORE_LIKE_THIS_COMPLEX
                                && key != QueryBucketModel.snippetCodeChurn){

                                field = field + SmartQueryCreator.makeSmartQuery(valueList[j],false);
                            }
                            else if (key == QueryBucketModel.snippetMethodCall
                                    || key == QueryBucketModel.snippetMethodDec){
                                field = field + valueList[j]+')';
                            }
                            else if(key == QueryBucketModel.MORE_LIKE_THIS ||
                                key == QueryBucketModel.MORE_LIKE_THIS_VARIABLES ||
                                key == QueryBucketModel.MORE_LIKE_THIS_COMPLEX){
                                field = field + valueList[j];
                            }
                            else
                                field = field + valueList[j];
                        }

                    }else{
                        if(key != QueryBucketModel.lastUpdatedField && key != QueryBucketModel.sizeField
                            && key != QueryBucketModel.complexityField && key != QueryBucketModel.snippetMethodCall
                            && key != QueryBucketModel.snippetMethodDec && key != QueryBucketModel.importCountField
                            && key != QueryBucketModel.functionCountField && key != QueryBucketModel.MORE_LIKE_THIS
                            && key != QueryBucketModel.MORE_LIKE_THIS_VARIABLES && key != QueryBucketModel.MORE_LIKE_THIS_COMPLEX
                            && key != QueryBucketModel.snippetCodeChurn) {

                            field = field + " AND " + SmartQueryCreator.makeSmartQuery(valueList[j], false);
                        }
                        else if (key == QueryBucketModel.snippetMethodCall
                                || key == QueryBucketModel.snippetMethodDec){
                            field = field + 'AND (_query_:{!parent which=parent:true}'+valueList[j]+')';
                        }
                        else if(key == QueryBucketModel.MORE_LIKE_THIS ||
                            key == QueryBucketModel.MORE_LIKE_THIS_VARIABLES ||
                            key == QueryBucketModel.MORE_LIKE_THIS_COMPLEX){
                            field = field + " OR " +valueList[j];
                        }
                        else
                            field = field + " AND "+valueList[j];
                    }
                }


            }



            //close it up if added something
            if(field != "" && key != QueryBucketModel.MORE_LIKE_THIS){
                field = field+")";
            }

            if(query != "" && field != ""){
                query = query+" AND "+field;
            }else{
                query = query+field;
            }



        }

        return query;
    }

}