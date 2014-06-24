/**
 * @author lee
 */
	//called when the page is completely loaded
    var Client = {
        id: null
    }

	function on_ready() {
		
		//alert("[on_ready]");

		Client.id = getClientId();

		SetupManager.setupSite();
		
		
		
	}

    function getClientId(){
        var url = "http://level1router.ics.uci.edu/logger.php"+"?callback=?&json.wrf=displayCode";

        $.getJSON(url).fail(function(data, textStatus, jqXHR) {


        }).success(function(data, textStatus, jqXHR ) {

            Client.id = data.id;

        });

    }
