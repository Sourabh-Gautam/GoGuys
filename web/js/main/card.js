$("body").on("mouseenter", ".qbuy", function (e) {
    tooltipSetting(e, 6, "Quick Buy");
    showTip();
});
$("body").on("mouseleave", ".qbuy", function (e) { 
    hideTip();
});


$("body").on("mouseenter", ".acart", function (e) { 
    tooltipSetting(e, 6, "Add to Cart");
    showTip();
});
$("body").on("mouseleave", ".acart", function (e) { 
     hideTip();
});