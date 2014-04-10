/**
 * Created by lee on 4/7/14.
 */

function QueryView(displayType, type, value, index, stackIndex, active, displayValue){

    this.displayType = displayType;
    this.type = type;
    this.value = value;
    this.index = index;
    this.active = active;
    this.stackIndex = stackIndex;
    this.displayValue = displayValue;

   this.getView = function() {

       var div = $(SetupManager.divOpen+SetupManager.divClose);

       var label = $('<text>['+displayType+'] <font color="yellow">'+displayValue+'</font></text>');

       div.append(label);

       var button = $(SetupManager.buttonOpen+SetupManager.buttonClose);
       button.addClass("QueryViewButton");
       if(this.active == true){
           button.attr("value","-");
           button.append($("<text>-</text>"));
       }else{
           button.attr("value","+");
           button.append($("<text>+</text>"));
       }

       (function(type, active, index, stackIndex){ button.click(function(event) {
           button.empty();

           if(active == true){
               active = false;
               QueryBucketModel.deactivateQuery(type, index,  stackIndex);

           }else{
               active = true;
               QueryBucketModel.activateQuery(type, index, stackIndex);

           }


           QueryBucketView.update();

           QueryTrailModel.pushQuery(QueryBucketModel.stackOfQueries.slice(0));//the slice is for cloning

           Controller.setStatus("SEARCHING...");
           var query = QueryBucketModel.constructQuery();
           QueryManager.setQuery(query);
           QueryManager.submitQuery();
//           var angle = 0;
//           SetupManager.rotateStatusVar = setInterval(function(){
//               angle+=3;
//               $(SetupManager.pound+SetupManager.statusIconID).rotate(angle);
//           },50);

       })})(this.type,this.active,this.index, this.stackIndex);

       button.width("25");
       button.height("20");
       div.append(button);

       return div;
   };

}