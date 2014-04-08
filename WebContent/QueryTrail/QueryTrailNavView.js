/**
 * Created by lee on 4/8/14.
 */

var QueryTrailNavView = {

    getView  :   function(){

        var navigationRow = $(SetupManager.trOpen+SetupManager.trClose);
        var leftCell = $(SetupManager.tdOpen+SetupManager.tdClose);

        var rightCell = $(SetupManager.tdOpen+SetupManager.tdClose);

        navigationRow.append(leftCell);


        var leftButton = $(SetupManager.buttonOpen+"previous query"+SetupManager.buttonClose);
        leftButton.button();
        leftButton.width("100%");

        leftButton.click(function(event) {
            QueryTrailModel.goBackOne();


        });








        leftCell.append(leftButton);
        var rightButton = $(SetupManager.buttonOpen+"next query"+SetupManager.buttonClose);
        rightButton.button();
        rightButton.width("100%");
       rightButton.click(function(event) {

            QueryTrailModel.goForwardOne();

       });




        var centerCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        centerCell.width("100%");
        navigationRow.append(centerCell);


        rightCell.append(rightButton);
        navigationRow.append(rightCell);

        return navigationRow;
    }

}