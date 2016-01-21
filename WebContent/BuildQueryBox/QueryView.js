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
    this.cellEdit = $(SetupManager.tdOpen+SetupManager.tdClose);

   this.getView = function() {

       var table = $(SetupManager.tableOpen+SetupManager.tableClose);

        table.addClass("QueryViewTable");


//       if(displayValue != null && displayValue.length > 30)
//         displayValue = [displayValue.slice(0, 30), '\n', displayValue.slice(30)].join('');

       this.row.append(this.cell);
       //this.row.append(this.cellEdit);
       table.append(this.row);

       if(displayValue instanceof Array){
           displayValue = displayValue[0].replace(/</gi,"&lt;");
           displayValue = displayValue.replace(/</gi,"&gt;");
       }else if(!displayValue instanceof Boolean){
           displayValue = displayValue.replace(/</gi,"&lt;");
           displayValue = displayValue.replace(/</gi,"&gt;");
       }


       displayType = displayType.replace(/</gi,"&lt;");
       displayType = displayType.replace(/</gi,"&gt;");


       var htmlEscapes = {
           '&': '&amp;',
           '<': '&lt;',
           '>': '&gt;',
           '"': '&quot;',
           "'": '&#x27;',
           '/': '&#x2F;'
       };

// Regex containing the keys listed immediately above.
       var htmlEscaper = /[&<>"'\/]/g;

// Escape a string for HTML interpolation.
       var escape = function(string) {
           return ('' + string).replace(htmlEscaper, function(match) {
               return htmlEscapes[match];
           });
       };

       var label = $('<text><font color="#8b0000">['+displayType+']</font> <font color="black"><code>'+escape(displayValue)+'</code></font></text>');


        var pencilImage = $(SetupManager.divOpen+
            '<img width="10" height="10" src="http://codeexchange.ics.uci.edu/close.png"/>'+SetupManager.divClose);
       this.cellEdit.append(pencilImage);

       this.cell.append(label);
       this.cell.width("97%");
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

           if(Controller.gridOn)
            Controller.showGrid();

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