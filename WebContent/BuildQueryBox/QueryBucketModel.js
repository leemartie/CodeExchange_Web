/**
 * Created by lee on 4/7/14.
 */
var QueryBucketModel = {

    /*represents the current bucket of queries*/
    /*double array where index is assoative to field*/
    listOfQueries        :   new Array(),
    //this is just current stack of all queries in the order they are given
    stackOfQueries       :   new Array()/*QueryModel*/,
    snippetField         :   "snippet_code",
    extendsField         :   "snippet_extends",
    implementsField      :   "snippet_implements",


    listOfKeys:new Array(),

    addQuery    :   function(/*QueryModel*/query){
        QueryBucketModel.stackOfQueries.push(query);

        var arrayOfValues = QueryBucketModel.listOfQueries[query.type];

        //adding key if not there yet
        if(QueryBucketModel.listOfKeys.indexOf(query.type) == -1){
            QueryBucketModel.listOfKeys.push(query.type);
        }

        if(arrayOfValues == null)
            arrayOfValues = new Array();

        arrayOfValues.push(query.value);
        query.valueIndex = arrayOfValues.length-1;

        QueryBucketModel.listOfQueries[query.type] = arrayOfValues;

    },

    removeQuery :   function(index){
            var query = QueryBucketModel.stackOfQueries[index];
            var key = query.type;
            var value = query.value;
            var valueIndex = query.valueIndex;

            QueryBucketModel.stackOfQueries.splice(index,1);
            QueryBucketModel.listOfQueries[key].splice(valueIndex,1);

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

            if(valueList.length > 0){
                field = key+":(";
            }
            //query for field
            for(var j = 0; j<valueList.length; j++){
                if(j == 0) {
                    if(valueList[j] == "")
                        field = field + "*";
                    else
                        field = field + SmartQueryCreator.escapeSpecialCharacters(valueList[j]);
                }else{
                    field = field + " AND "+valueList[j];
                }

            }
            if(valueList.length > 0){
                field = field+")";
            }

            if(query != ""){
                query = query+" AND "+field;
            }else{
                query = query+field;
            }

        }

        return query;

    }

}