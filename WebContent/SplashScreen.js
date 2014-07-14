/**
 * Created by lee on 7/14/14.
 */
var SplashScreen = {

    InputSplashID: "InputSplashID",
    showing     :        true,

    getSplash : function(){

        var tableForSite = $(SetupManager.tableOpen+SetupManager.tableClose);
        tableForSite.attr("height","45%");

        var row = $(SetupManager.trOpen+SetupManager.trClose);

        tableForSite.append(row);
        var cell = $(SetupManager.tdOpen+SetupManager.tdClose);

        row.append(cell);

        var title = $("<div><text>CodeExchange</text></div>");
        title.addClass("SplashTitle");
        cell.append(title);



        var input = $(SetupManager.inputOpen+SetupManager.inputClose);
        input.addClass("SplashInput");
        input.attr(SetupManager.placeholder_attr, "type keywords and hit enter");
        input.attr(SetupManager.ID_attr,SplashScreen.InputSplashID);

        var inputDiv = $(SetupManager.divOpen+SetupManager.divClose);
        inputDiv.append(input);
        inputDiv.addClass("SplashInputDiv");





//auto complete
        input.autocomplete({
            source: function( request, response ){
                BuildQueryBoxModel.currentQueryType = QueryBucketModel.snippetField;
                QueryManager.submitAutoComplete(BuildQueryBoxModel.currentQueryType, request, response);


            },
            focus: function() {
                // prevent value inserted on focus

                return false;
            },
            select: function( event, ui ) {
                var terms = null;

                if (BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodDec ||
                    BuildQueryBoxModel.currentQueryType == QueryBucketModel.snippetMethodCall) {
                    terms = input.val().split(/[\s,]+/);
                } else {
                    terms = input.val().split(/[\s]+/);
                }

                // remove the current input
                terms.pop();
                // add the selected item
                terms.push(ui.item.value);

//LOG IT
                UsageLogger.addEvent(UsageLogger.AUTO_COMPLETE_SELECTED, null, BuildQueryBoxModel.currentQueryType);

                input.val(terms.join(" "));
                return false;

            },

            open: function(event, ui){
                   $(".ui-menu").addClass("AutoComplete");
            }

        }).keyup(function (e) {
            if(e.which === 13) {
                $(".ui-menu-item").hide();
            }
        })

//key press
        input.keypress(function(e) {
            if (e.keyCode == '13') {
                e.preventDefault();

                tableForSite.hide();
                SplashScreen.showing = false;


                SetupManager.setupSite();

                var query = null;
                query = new QueryModel(QueryBucketModel.snippetField, input.val());
                query.displayType = "keywords";
                query.displayValue = input.val();

                BuildQueryBoxView.addAndSubmit(query);

                //LOG IT
                UsageLogger.addEvent(UsageLogger.convertQueryToEventType(query, UsageLogger.Query_Builder),query);

                input.val("");

            }
        });


        cell.append(inputDiv);



        cell.addClass("Splash");
        cell.attr("align","center");


        var subtext = $("<div><text>Let's find some code</text></div>");
        subtext.addClass("subtext");
        cell.append(subtext);

        var screenHeight = jQuery(window).height();


        $(SetupManager.pound+SetupManager.entireSiteDiv_ID).height(screenHeight-15);
        $(SetupManager.pound+SetupManager.entireSiteDiv_ID).append(tableForSite);

    }


}