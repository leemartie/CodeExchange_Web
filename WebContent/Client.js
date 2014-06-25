/**
 * @author lee
 */
	//called when the page is completely loaded
    var Client = {
        id: null
    }

	function on_ready() {
		
		//alert("[on_ready]");

        var id = getCookie("id");

        if (id != undefined && id != "undefined" && id != "") {
            Client.id = id;
        }else{
            Client.id = getClientId();

        }

        UsageLogger.addEvent(UsageLogger.SESSION_START,null);

		SetupManager.setupSite();

	}

    function setCookie(id) {
        document.cookie = "id=" + id;
    }

    function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i<ca.length; i++) {
            var c = ca[i].trim();
          if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
     return "";
    }

    function getClientId(){
        var url = "http://level1router.ics.uci.edu/logger.php"+"?callback=?&json.wrf=displayCode";

        $.getJSON(url).fail(function(data, textStatus, jqXHR) {


        }).success(function(data, textStatus, jqXHR ) {

            Client.id = data.id;
            setCookie(Client.id);

        });

    }
