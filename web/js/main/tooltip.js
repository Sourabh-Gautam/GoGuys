var clearGlobalTt;
function showTooltip(element, message, timeDelay, horizontalMove, verticalMove) {
    clearGlobalTt = setTimeout(function () {
        let left = element.getBoundingClientRect().left;
        let bottom = element.getBoundingClientRect().bottom;
        let width = element.getBoundingClientRect().width;
        $("#global-tt").removeClass("display-none");
        $("#global-tt").text(message);
        $("#global-tt").css("top", bottom + verticalMove);
        $("#global-tt").css("left", left + width/2 + horizontalMove);
    }, timeDelay);
}

function hideTooltip(){
    clearTimeout(clearGlobalTt);
    $("#global-tt").addClass("display-none");
    $("#global-tt").removeAttr("style");
}

var clear;

function tooltipSetting(e, h, text) {
    let left = e.target.getBoundingClientRect().left;
    let right = e.target.getBoundingClientRect().right;
    let top = e.target.getBoundingClientRect().top;
    let width = e.target.getBoundingClientRect().width;
    let height = e.target.getBoundingClientRect().height;
    if (right + 10 + 75 > $("body").width()) { //10 is ToolTip Arrow length and 75 is length of ToolTip
        $(".tooltip").text(text);
        $(".tooltip").css("left", left - 100);
        $(".tooltip").css("top", top);
        $(".tooltip-arrow").css("left", left - 40);
        $(".tooltip-arrow").css("top", top + height / h);
    } else {
        $(".tooltip").text(text);
        $(".tooltip").css("left", left + width + 15);
        $(".tooltip").css("top", top);
        $(".tooltip-arrow").css("left", left + width + 10);
        $(".tooltip-arrow").css("top", top + height / h);
    }
}

function showTip() {
    clear = setTimeout(() => {
        $(".tooltip").show(50);
        $(".tooltip-arrow").show(50);
    }, 600);
}
function hideTip() {
    clearTimeout(clear);
    $(".tooltip").hide(10);
    $(".tooltip-arrow").hide(10);
}

//Goguys logo in register and login page tooltip

$("body").on("mouseenter", ".login-registration-page-container .company-logo strong", function (e) {
    showTooltip(e.target, "Refresh", 500, 0, 0);
});
$("body").on("mouseleave", ".login-registration-page-container .company-logo strong", function (e) {
    hideTooltip();
});

//Cross button in register and login page tooltip

$("body").on("mouseenter", ".login-registration-page-container .remove-card", function (e) {
    showTooltip(e.target, "Back to shop", 500, 0, 10);
});
$("body").on("mouseleave", ".login-registration-page-container .remove-card", function (e) {
    hideTooltip();
});

// Card icon in Header section

$("body").on("mouseenter", ".header .bx-cart", function (e) {
    showTooltip(e.target, "Go to cart", 500, 0, 10);
});
$("body").on("mouseleave", ".header .bx-cart", function (e) {
    hideTooltip();
});