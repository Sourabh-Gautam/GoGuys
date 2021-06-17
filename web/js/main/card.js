var clear;

function tooltipSetting(e, h, text){
    let left = e.target.getBoundingClientRect().left;
    let right = e.target.getBoundingClientRect().right;
    let top = e.target.getBoundingClientRect().top;
    let width = e.target.getBoundingClientRect().width;
    let height = e.target.getBoundingClientRect().height;
    if(right + 10 + 75 > $("body").width()){ //10 is ToolTip Arrow length and 75 is length of ToolTip
        $(".tooltip").text(text);
        $(".tooltip").css("left", left - 100);
        $(".tooltip").css("top", top);
        $(".tooltip-arrow").css("left", left - 40);
        $(".tooltip-arrow").css("top", top + height / h);
    }else{
        $(".tooltip").text(text);
        $(".tooltip").css("left", left + width + 15);
        $(".tooltip").css("top", top);
        $(".tooltip-arrow").css("left", left + width + 10);
        $(".tooltip-arrow").css("top", top + height / h);  
    }  
}

function showTip(){
    clear = setTimeout(() => {
        $(".tooltip").show(50);
        $(".tooltip-arrow").show(50);
    }, 600);
}
function hideTip(){
    clearTimeout(clear);
    $(".tooltip").hide(10);
    $(".tooltip-arrow").hide(10);
}

$(".qbuy").mouseenter(function (e) {
    showTip();
    tooltipSetting(e, 6, "Quick Buy");
});
$(".qbuy").mouseleave(function (e) { 
    hideTip();
});


$(".acart").mouseenter(function (e) { 
    showTip();
    tooltipSetting(e, 6, "Add to Cart");
});
$(".acart").mouseleave(function (e) { 
     hideTip();
});