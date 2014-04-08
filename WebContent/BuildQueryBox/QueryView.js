/**
 * Created by lee on 4/7/14.
 */

function QueryView(type, value, index){

    this.type = type;
    this.value = value;
    this.index = index;

   this.getView = function() {

       var div = $(SetupManager.divOpen+SetupManager.divClose);

       var label = $('<text>['+type+'] <font color="yellow">'+value+'</font></text>');

       div.append(label);

       var button = $(SetupManager.buttonOpen+"-"+SetupManager.buttonClose);
       button.addClass("QueryViewButton");

       button.click(function(event) {

            QueryBucketModel.removeQuery(index);
            QueryBucketView.update();

           QueryTrailModel.pushQuery(QueryBucketModel.stackOfQueries.slice(0));//the slice is for cloning

           Controller.setStatus("SEARCHING...");
           var query = QueryBucketModel.constructQuery();
           QueryManager.setQuery(query);
           QueryManager.submitQuery();
//                    //make it lose focus so we can detect when user refocus on query it
//                    $(SetupManager.pound+SetupManager.queryInput_ID).blur();
           var angle = 0;
           SetupManager.rotateStatusVar = setInterval(function(){
               angle+=3;
               $(SetupManager.pound+SetupManager.statusIconID).rotate(angle);
           },50);

       });

       button.width("25");
       button.height("20");
       div.append(button);

       return div;
   };

}