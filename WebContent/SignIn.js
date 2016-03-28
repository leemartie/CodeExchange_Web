/**
 * Created by Tariq on 3/06/16.
 */
var SignIn = {

    getSigninPopup: function () {

        var div = $('<div id="signinbox" class="popupContainer" style="display:none;">');
        var header = $('<header class="popupHeader"></header>');
        header.append($('<text class="header_titles">Sign In</text>'));
        var signinClose = ($('<span id="signin_close">X</span>'));
        header.append(signinClose);
        signinClose.on("click", function () {
            $("#signinbox").fadeOut(function () {
                $(this).remove();
            });
            $("#blanket").remove();
        });
        div.append(header);
        var section = $(SetupManager.sectionOpen + SetupManager.sectionClose);
        section.addClass("popupBody");
        var socialLoginDiv = $(SetupManager.divOpen + SetupManager.divClose);
        socialLoginDiv.addClass("social_login");
        socialLoginDiv.attr("align", "center");

        var gitHubButton = $(SetupManager.buttonOpen + SetupManager.buttonClose);
        gitHubButton.text("Sign in with GitHub");
        gitHubButton.addClass("githubButton");
        gitHubButton.on("click", function () {
            var gitHubWindow = window.open("https://github.com/login?return_to=/login/oauth/authorize?client_id=8a706d9892c77bf19951", "gitHubAuth", 'height=400,width=350');
        });

        socialLoginDiv.append(gitHubButton);

        socialLoginDiv.append($(SetupManager.newLine + SetupManager.newLine));

        var faceBookButton = $(SetupManager.buttonOpen + SetupManager.buttonClose);
        faceBookButton.text("Sign in with Facebook");
        faceBookButton.addClass("facebookButton");
        faceBookButton.on("click", function () {
            facebookLogin();
        });

        socialLoginDiv.append(faceBookButton);

        socialLoginDiv.append($(SetupManager.newLine + SetupManager.newLine));

        var actionButtonDiv = $(SetupManager.divOpen + SetupManager.divClose);
        actionButtonDiv.addClass("action_btns");

        var loginButtonDiv = $(SetupManager.divOpen + SetupManager.divClose);
        loginButtonDiv.addClass("one_half");
        var loginFormButton = $('<a href="#" id="login_form" class="btn">Login</a>');
        loginButtonDiv.append(loginFormButton);

        loginFormButton.on("click", function () {
            $(".social_login").hide();
            $(".user_login").show();
            $(".header_title").text('Login');
        });

        var registerButtonDiv = $(SetupManager.divOpen + SetupManager.divClose);
        registerButtonDiv.addClass("one_half");
        registerButtonDiv.addClass("last");
        var registerFormButton = $('<a href="#" id="register_form" class="btn">Sign up</a>');
        registerButtonDiv.append(registerFormButton);
        registerFormButton.on("click", function () {
            $(".social_login").hide();
            $(".user_register").show();
            $(".header_title").text('Register');
        });


        actionButtonDiv.append(loginButtonDiv);
        actionButtonDiv.append(registerButtonDiv);

        socialLoginDiv.append(actionButtonDiv);
        section.append(socialLoginDiv);

        var userLoginDiv = $(SetupManager.divOpen + SetupManager.divClose);
        userLoginDiv.addClass("user_login");
        var userLoginForm = $(SetupManager.formOpen + SetupManager.formClose);
        userLoginForm.append($('<label>Email / Username</label>'));
        userLoginForm.append($('<input type="text"/>'));
        userLoginForm.append($(SetupManager.newLine));

        userLoginForm.append($('<label>Password</label>'));
        userLoginForm.append($('<input type="password"/>'));
        userLoginForm.append($(SetupManager.newLine));

        var checkBoxDiv = $(SetupManager.divOpen + SetupManager.divClose);
        checkBoxDiv.addClass("checkbox");
        checkBoxDiv.append($('<input id="remember" type="checkbox"/>'));
        checkBoxDiv.append($('<label for="remember">Remember me on this computer</label>'));
        userLoginForm.append(checkBoxDiv);

        var actionButtonDiv = $(SetupManager.divOpen + SetupManager.divClose);
        actionButtonDiv.addClass("action_btns");
        var backButtonDiv = $(SetupManager.divOpen + SetupManager.divClose);
        backButtonDiv.addClass("one_half");
        var backButton = $('<a href="#" class="btn back_btn">Back</a>');
        backButton.on("click", function () {
            $(".user_login").hide();
            $(".user_register").hide();
            $(".social_login").show();
            $(".header_title").text('Sign In');
            return false;
        });
        backButtonDiv.append(backButton);
        actionButtonDiv.append(backButtonDiv);
        actionButtonDiv.append($('<div class="one_half last"><a href="#" class="btn btn_red">Login</a></div>'));
        userLoginForm.append(actionButtonDiv);

        userLoginDiv.append(userLoginForm);
        userLoginDiv.append($('<a href="#" class="forgot_password">Forgot password?</a>'));

        var userRegisterDiv = $(SetupManager.divOpen + SetupManager.divClose);
        userRegisterDiv.addClass("user_register");
        var userRegisterForm = $(SetupManager.formOpen + SetupManager.formClose);
        userRegisterForm.append($('<label>First Name</label>'));
        userRegisterForm.append($('<input type="text"/>'));
        userRegisterForm.append($(SetupManager.newLine));

        userRegisterForm.append($('<label>Last Name</label>'));
        userRegisterForm.append($('<input type="text"/>'));
        userRegisterForm.append($(SetupManager.newLine));

        userRegisterForm.append($('<label>Email Address</label>'));
        userRegisterForm.append($('<input type="email"/>'));
        userRegisterForm.append($(SetupManager.newLine));

        userRegisterForm.append($('<label>Password</label>'));
        userRegisterForm.append($('<input type="password"/>'));
        userRegisterForm.append($(SetupManager.newLine));

        userRegisterForm.append($('<label>Confirm Password</label>'));
        userRegisterForm.append($('<input type="password"/>'));
        userRegisterForm.append($(SetupManager.newLine));

        var actionButtonDiv = $(SetupManager.divOpen + SetupManager.divClose);
        actionButtonDiv.addClass("action_btns");
        var backButtonDiv = $(SetupManager.divOpen + SetupManager.divClose);
        backButtonDiv.addClass("one_half");
        var backButton = $('<a href="#" class="btn back_btn">Back</a>');
        backButton.on("click", function () {
            $(".user_login").hide();
            $(".user_register").hide();
            $(".social_login").show();
            $(".header_title").text('Sign In');
            return false;
        });
        backButtonDiv.append(backButton);
        actionButtonDiv.append(backButtonDiv);
        actionButtonDiv.append($('<div class="one_half last"><a href="#" class="btn btn_red">Register</a></div>'));

        userRegisterForm.append(actionButtonDiv);

        userRegisterDiv.append(userRegisterForm);
        section.append(userRegisterDiv);
        section.append(userLoginDiv);
        div.append(section);
        return div;
    },

    getAccountPopup: function (imageSource, name, email) {
        var dropDownMenu = $(SetupManager.divOpen + SetupManager.divClose);
        dropDownMenu.addClass("dropdown-menu");
        var menuContainer = $(SetupManager.divOpen + SetupManager.divClose);
        menuContainer.addClass("menuContainer");
        var imageContainer = $(SetupManager.divOpen + SetupManager.divClose);
        imageContainer.addClass("imageContainer");
        var image = $(SetupManager.image);
        image.attr("style", "margin-bottom:5px;");
        image.attr("src", imageSource);
        image.attr("height", "96px");
        image.attr("width", "96px");
        imageContainer.append(image);
        menuContainer.append(imageContainer);
        var infoContainer = $(SetupManager.divOpen + SetupManager.divClose);
        infoContainer.addClass("infoContainer");
        infoContainer.append($(SetupManager.newLine + '<b>' + name + '</b>'));
        if (email != null && email.length > 0) {
            infoContainer.append($('<br/>' + email + '<br/><br/>'));
        } else {
            infoContainer.append($(SetupManager.newLine + SetupManager.newLine + SetupManager.newLine));
        }
        var signOutLink = $('<a id="signout_trigger" class="signin">Sign Out</a>');
        signOutLink.on("click", function () {
            CookieUtil.deleteCookie("authData");
            window.location.reload();
        });
        infoContainer.append(signOutLink);
        menuContainer.append(infoContainer);
        dropDownMenu.append(menuContainer);
        return dropDownMenu;
    },

    getProfilePicture: function (imageSource) {
        var profilePicture = $(SetupManager.image);
        profilePicture.attr("src", imageSource);
        profilePicture.attr("style", "margin-bottom:5px;border-radius:50%");
        profilePicture.attr("height", "48px");
        profilePicture.attr("width", "48px");
        profilePicture.on("click", function () {
            var $this = $(this);
            if ($('.dropdown-menu').hasClass('open')) {
                $('.dropdown-menu').removeClass('open');
                $('.dropdown-menu').fadeOut("fast");
            }
            else {
                $('.dropdown-menu').addClass('open');
                $('.dropdown-menu').fadeIn("fast");
            }
        });
        return profilePicture;
    }
}

function getGithubToken(code) {
    var url = "http://localhost:9999/authenticate/" + code;
    $.getJSON(url).success(function(data){
        var access_token = data.token;
        setCookieWithToken(access_token, "github");
        window.location.reload();
    });
}

function facebookLogin() {
    FB.login(function (response) {
        if (response.authResponse) {
            var access_token = FB.getAuthResponse()['accessToken'];
            setCookieWithToken(access_token, "facebook");
            window.location.reload();
8        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {scope: 'email, user_photos, user_videos, user_friends'});


}


function setCookieWithToken(access_token, authType) {
    var authData =  new Object();
    authData.token = access_token;
    authData.type = authType;
    CookieUtil.setCookie("authData", JSON.stringify(authData));
}