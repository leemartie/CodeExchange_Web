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
	//called when the page is completely loaded
    var Client = {
        id: null
    }

	function on_ready() {
        //RecommendationManager.addInput();
        //RecommendationManager.populateLandscape("raspberry AND pi",1);
		//alert("[on_ready]");

        var id = CookieUtil.getCookie("id");

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

        $('#CurrentQueryBucket').mCustomScrollbar({
                axis:"x",
                theme:"dark-thin",
                advanced:{
                    updateOnContentResize: true,
                    autoExpandHorizontalScroll: true
                }
            }
        );


        $('.RecommendationContainer').mCustomScrollbar({
                live: "on",
                axis:"y",
                theme:"dark-thin",
                advanced:{
                    updateOnContentResize: true,
                    autoExpandScroll: true
                }
            }
        );
	}

    function getClientId(){
        var url = "http://codeexchange.ics.uci.edu/logger.php"+"?callback=?&json.wrf=displayCode";

        $.getJSON(url).fail(function(data, textStatus, jqXHR) {


        }).success(function(data, textStatus, jqXHR ) {

            Client.id = data.id;
            var expiration_date = new Date();
            expiration_date.setFullYear(expiration_date.getFullYear() + 1);
            CookieUtil.setCookie("id", Client.id, expiration_date.toGMTString());

//LOG IT
            UsageLogger.addEvent(UsageLogger.SESSION_START,null);
        });

    }
