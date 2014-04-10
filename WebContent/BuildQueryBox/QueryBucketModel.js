/**
 * Created by lee on 4/7/14.
 */
var QueryBucketModel = {

    /*represents the current bucket of queries*/
    /*double array where index is assoative to field*/
    listOfQueries        :   new Array(),
    listOfActiveQueries  :   new Array(),
    //this is just current stack of all queries in the order they are given
    stackOfQueries       :   new Array()/*QueryModel*/,
    snippetField         :   "snippet_code",
    extendsField         :   "snippet_extends",
    implementsField      :   "snippet_implements",
    authorFiled          :   "snippet_version_author",
    projectField         :   "snippet_project_name",
    returnTypeField      :   "snippet_return_type",
    recursiveField       :   "snippet_is_recursive",
    varargsField         :   "snippet_is_var_args",
    lastUpdatedField     :   "snippet_last_updated",
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
    },

    activateQuery: function(type, index, stackIndex){
        QueryBucketModel.listOfActiveQueries[type][index] = true;
        QueryBucketModel.stackOfQueries[stackIndex].active = true;
    },
    deactivateQuery: function(type, index, stackIndex){
        QueryBucketModel.listOfActiveQueries[type][index] = false;
        QueryBucketModel.stackOfQueries[stackIndex].active = false;
    },

    removeQuery :   function(index){
            var query = QueryBucketModel.stackOfQueries[index];
            var key = query.type;
            var value = query.value;
            var valueIndex = query.valueIndex;

            QueryBucketModel.stackOfQueries.splice(index,1);
            QueryBucketModel.listOfQueries[key].splice(valueIndex,1);

    },

    removeAll   :   function() {
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
     * This will construct a Lucene query based on the contents of the QueryBucket
     * @returns {string}
     */
    constructQuery: function(){
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
                        field = key+":(";

                        if(valueList[j] == "") {
                            field = field + "*";
                        }else {
                            if(key != QueryBucketModel.lastUpdatedField)
                                field = field + SmartQueryCreator.escapeSpecialCharacters(valueList[j]);
                            else
                                field = field + valueList[j];
                        }

                    }else{
                        if(key != QueryBucketModel.lastUpdatedField)
                            field = field + " AND "+SmartQueryCreator.escapeSpecialCharacters(valueList[j]);
                        else
                            field = field + " AND "+valueList[j];
                    }
                }


            }

            //close it up if added something
            if(field != ""){
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