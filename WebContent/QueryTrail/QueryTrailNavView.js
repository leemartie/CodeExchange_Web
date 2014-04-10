/**
 * Created by lee on 4/8/14.
 */

var QueryTrailNavView = {

    getView  :   function(){

        var navTable = $(SetupManager.tableOpen+SetupManager.tableClose);
        var navigationRow = $(SetupManager.trOpen+SetupManager.trClose);
        navTable.append(navigationRow);



        var centerCell = $(SetupManager.tdOpen+SetupManager.tdClose);
        var createNewQueryButton = $(SetupManager.buttonOpen+"create new query"+SetupManager.buttonClose);
        createNewQueryButton.button();

        createNewQueryButton.width("100%");

        createNewQueryButton.click(function(event) {

            QueryBucketModel.removeAll();
            QueryBucketView.update();
            Controller.clearAllCode();
            Controller.setStatus("Let's find some code");
            $(SetupManager.pound + SetupManager.pageNavigationDiv_ID).empty();

       });

        centerCell.append(createNewQueryButton);
        navigationRow.append(centerCell);


        return navTable;
    }

}