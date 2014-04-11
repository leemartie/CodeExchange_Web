/**
 * Created by lee on 4/10/14.
 */
var QueryRecommenderModel = {

    recommendedQueries : new Array(),

    addRecommendedQuery :   function(query){

        QueryRecommenderModel.recommendedQueries.push(query);

    },

    clearRecommendedQueries : function(){
        QueryRecommenderModel.recommendedQueries.length = 0;
    }


}