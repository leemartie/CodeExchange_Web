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
//LOG IT
            UsageLogger.addEvent(UsageLogger.SESSION_START,null);
        }else{
            Client.id = getClientId();

        }



        //splash screen
        SplashScreen.getSplash();
        //needs to happen after splash screen
		//SetupManager.setupSite();

	}

    function setCookie(id) {
        // Build the expiration date string:
        var expiration_date = new Date();
        expiration_date.setFullYear(expiration_date.getFullYear() + 1);
        document.cookie = "id=" + id+"; expires=" + expiration_date.toGMTString();
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
        var url = "http://codeexchange.ics.uci.edu/logger.php"+"?callback=?&json.wrf=displayCode";

        $.getJSON(url).fail(function(data, textStatus, jqXHR) {


        }).success(function(data, textStatus, jqXHR ) {

            Client.id = data.id;
            setCookie(Client.id);
//LOG IT
            UsageLogger.addEvent(UsageLogger.SESSION_START,null);
        });

    }
