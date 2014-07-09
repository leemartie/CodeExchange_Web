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
    this.row = $(SetupManager.trOpen+SetupManager.trClose);
    this.cell = $(SetupManager.tdOpen+SetupManager.tdClose);

   this.getView = function() {

       var table = $(SetupManager.tableOpen+SetupManager.tableClose);



       if(displayValue != null && displayValue.length > 30)
         displayValue = [displayValue.slice(0, 30), '\n', displayValue.slice(30)].join('');

       this.row.append(this.cell);
       table.append(this.row);
       var label = $('<text><font color="#8b0000">['+displayType+']</font> <font color="black">'+displayValue+'</font></text>');


       this.cell.append(label);
       this.cell.width("100%");
       this.row.height("100%");

       this.row.addClass("QueryViewRow");

//       var buttonCell = $(SetupManager.tdOpen+SetupManager.tdClose);
//       this.row.append(buttonCell);
//
//       var button = $(SetupManager.buttonOpen+SetupManager.buttonClose);
//       buttonCell.append(button);
//
//       button.addClass("QueryViewButton");
//       if(this.active == true){
//           button.attr("value","-");
//           button.append($("<text>-</text>"));
//       }else{
//           button.attr("value","+");
//           button.append($("<text>+</text>"));
//       }
//
//       button.width("25px");
//       button.height("15px");

       var so = this;

       so.cell.attr("title","click to activate or deactivate");

//
       (function(){so.cell.mouseenter(function(){

           if(so.active) {
               so.cell.removeClass("QueryView");
               so.cell.addClass("QueryViewHover");
           }else{
               so.cell.removeClass("QueryViewDeactive");
               so.cell.addClass("QueryViewDeactiveHover");
           }



       })})();
//
       (function(){so.cell.mouseleave(function(){

           if(so.active) {
               so.cell.removeClass("QueryViewHover");
               so.cell.addClass("QueryView");
           }else{
               so.cell.removeClass("QueryViewDeactiveHover");
               so.cell.addClass("QueryViewDeactive");
           }

       })})();

 //

       (function(type, active, index, stackIndex){ so.cell.click(function(event) {
           //button.empty();

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

           var childQuery = QueryBucketModel.constructChildQuery();
           QueryManager.setChildQuery(childQuery);

          // var fqQuery = QueryBucketModel.constructFQQuery()
           //QueryManager.setQuery(fqQuery);
           QueryManager.submitQuery();
//           var angle = 0;
//           SetupManager.rotateStatusVar = setInterval(function(){
//               angle+=3;
//               $(SetupManager.pound+SetupManager.statusIconID).rotate(angle);
//           },50);

       })})(this.type,this.active,this.index, this.stackIndex);


    //   this.row.append(buttonCell);

       this.cell.addClass("QueryView");
       return table;
   };

    this.setDeactive = function(){
        this.cell.removeClass("QueryView");
        this.cell.addClass("QueryViewDeactive");
    };

    this.setActive = function(){
        this.cell.removeClass("QueryViewDeactive");
        this.cell.addClass("QueryView");
    }

}