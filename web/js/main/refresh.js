// Cross Button Functionalities

$("body").on('click', ".login-registration-page-container .remove-card", function (e) {
    refreshLoginRegister();
    var has = $("#registrationpage-container").hasClass("display-none");
    if (has !== true) {
        $("#registrationpage-container").addClass("display-none");
        $("#loginpage-container").removeClass("display-none");
    }
    $(".login-registration-page-container").addClass("display-none");
});

//Company Logo refresh

$(".login-registration-page-container .company-logo strong").click(function (e) {
    refreshLoginRegister();
});

function refreshLoginRegister() {
    verifiedNum = [];
    $("#login-eye").addClass("display-none");
    $("#registration-eye").addClass("display-none");
    $(".login-registration-page-container input").val("");
    $(".login-registration-page-container input").removeAttr("style");
    $("#registrationpage-container .num-verified").addClass("display-none");
    $(".login-registration-page-container .pno").removeAttr("style");
    $(".login-registration-page-container button").addClass("inactive-btn");
    $(".login-registration-page-container button").css("cursor", "default");
    $(".otp-section").addClass("display-none");
    $(".otp-section input").removeClass("flag2");
    $("#registrationpage-container input").removeClass("flag");
    $("#registration-card .request-otp").addClass("display-none");
    $(".rtt").removeAttr("style");
    $(".rtt").addClass("display-none");
}