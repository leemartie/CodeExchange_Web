/**
 * Created by lee on 10/14/14.
 */

var RecommendationManager = {

    baseQuery       :   null,
    Max_Depth       :   4,
    currentDepth    :   1,
    jsonArray     : new Array(),
    //holds nodes
    layer1        : new Array(),
    //holds array lists
    layer2          : new Array(),
    layer3          : new Array(),
    layer4          : new Array(),
    complete2        : new Array(),
    node            : new Node(),


    /**
     * KEYWORDS JSON
     * @param query
     */
    getKeywordsJSON : function(query){
        QueryManager.currentQuery = QueryBucketModel.snippetField+":("+query+")";
        QueryManager.currentStart = 0;
        var url = URLQueryCreator.getQueryURL('getChildrenJSON');





        $.ajax({
            context: this,
            url: url,
            dataType: 'jsonp',
            async: true,
            crossDomain: true,
            success: function (data, status) {
                alert(data);
            },
            complete: function(){
                if(RecommendationManager.currentDepth == 1) {
                    RecommendationManager.currentDepth++;
                    for (i = 0; i < RecommendationManager.layer1.length; i++) {
                        var newQuery = query + " AND "+RecommendationManager.layer1[i];
                        RecommendationManager.complete2[query + " AND "+RecommendationManager.layer1[i]] = false;
                        RecommendationManager.getKeywordsJSON(newQuery);
                    }
                }else{
                    RecommendationManager.complete2[query] = true;

                    var done = true;
                    for(x in RecommendationManager.complete2){
                        if(RecommendationManager.complete2[x] == false)
                            done = false;
                    }

                    if(done)
                    WheelLandscape.render(RecommendationManager.constructJSON());
                }

            }
        });



        },


    /**
     *
     * @param query
     * @param depth
     */
    populateLandscape    :   function(query, depth){
        RecommendationManager.layer1.length = 0;
        RecommendationManager.layer2.length = 0;
        RecommendationManager.complete2.length = 0;
        RecommendationManager.baseQuery = null;
        RecommendationManager.currentDepth = 1;
        $("#vis").empty();

        //start base query
        if(RecommendationManager.baseQuery == null)
            RecommendationManager.baseQuery = query;

        RecommendationManager.Max_Depth = depth;
        RecommendationManager.getKeywordsJSON(query);

    },

    addInput    :   function(){
        var inputDiv = $(SetupManager.divOpen+SetupManager.divClose);
        inputDiv.addClass("SplashInputDiv");
        var input = $(SetupManager.inputOpen+SetupManager.inputClose);
        inputDiv.append(input);

        input.attr(SetupManager.placeholder_attr, "Type keywords and hit Enter");
        input.attr(SetupManager.ID_attr,SetupManager.queryInput_ID);

        $(SetupManager.pound+SetupManager.entireSiteDiv_ID).append(inputDiv);

        input.keypress(function(e) {

            if (input.val() == "")
                return;

            if (e.keyCode == '13') {
                RecommendationManager.populateLandscape(input.val(),1)
            }
        });
    },

    constructJSON   :   function(){
        var jsonArray = new Array();
        for(i = 0; i<RecommendationManager.layer1.length;i++){
            var children = new Array();
            for(j = 0; j<RecommendationManager.layer2[i].length; j++){
                children.push({
                    name:  RecommendationManager.layer2[i][j],
                    colour: "#404040"
                })
            }
            jsonArray.push({
                name:  RecommendationManager.layer1[i],
                children: children.slice(0)

            });
        }

        return jsonArray;
    }

}

////                            children.push({
////                                name: variableName,
////                                colour: "#33ffcc"
////                            });
////
////
//                RecommendationManager.jsonArray.push({
//                    name: variableName,
//                    colour: "#33ffcc"
//                });

/**
 * get Children JSON
 * @param data
 */
function getChildrenJSON(data){



    var snippet_variable_names_delimited =
        data.facet_counts.facet_fields.snippet_variable_names_delimited;

    var keywordMax = 100;

//    if(RecommendationManager.currentDepth == 1)
//        keywordMax = 40;
    if(RecommendationManager.currentDepth == 2)
        keywordMax = 15;



    var wordsSuggested = "";

    var words = new Array();


    for(i = 0; i<snippet_variable_names_delimited.length; i = i+2) {
        if (i >= keywordMax)
            continue;

        var variableName = snippet_variable_names_delimited[i];

        if (variableName == null)
            continue;
        //skipping suggestions that are empty or only 1 character long
        if (variableName == "" || variableName.length == 1) {
            keywordMax = keywordMax + 2;
            continue;
        }
        //seeing if it is already in suggestions or a singular form of a plural
        if (RecommendationManager.layer1.indexOf(variableName) > -1 ) {
            keywordMax = keywordMax + 2;
            continue;
        }

0

        words.push(variableName);
    }//loop
    if(RecommendationManager.currentDepth == 1) {
        for(i = 0; i < words.length; i++){
          var node = new Node();
          node.name = words[i];


              RecommendationManager.layer1.push(words[i]);
          }
    }

    if(RecommendationManager.currentDepth == 2) {
        RecommendationManager.layer2.push(words.slice(0));
    }




}