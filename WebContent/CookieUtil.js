/**
 * Created by Tariq on 15-03-2016.
 */

var CookieUtil = {

    setCookie: function(cname, cdata, expirationDate) {
        if(expirationDate != undefined && expirationDate != "undefined" && expirationDate != "") {
            document.cookie = cname + "=" + cdata + "; expires=" + expirationDate;
        } else {
            document.cookie = cname + "=" + cdata;
        }
    },

    getCookie: function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    },

    deleteCookie: function(cname) {
        document.cookie = cname + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}