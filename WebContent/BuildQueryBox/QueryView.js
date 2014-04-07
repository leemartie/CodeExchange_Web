/**
 * Created by lee on 4/7/14.
 */

function QueryView(type, value){

    this.type = type;
    this.value = value;

   this.getView = function() {

       var div = $(SetupManager.divOpen+SetupManager.divClose);

       var label = $('<text>['+type+'] <font color="yellow">'+value+'</font></text>');

       div.append(label);

       var button = $(SetupManager.buttonOpen+"-"+SetupManager.buttonClose);
        button.addClass("QueryViewButton");

       button.width("25");
       button.height("20");
       div.append(button);

       return div;
   };

}