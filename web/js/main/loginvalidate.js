$($("#loginpage-container input")[0]).keyup(function (e) {
    let el = $(e.target);
    if(el.val().length!==0){
        el.addClass("flag");
    }else{
        el.removeClass("flag");
    }
    loginActive();
});

$($("#loginpage-container input")[1]).keyup(function (e) {
    let el = $(e.target);
    if(el.val().length>=6){
        el.addClass("flag");
    }else{
        el.removeClass("flag");
    }
    loginActive();
});

function loginActive(){
    let e1 = $($("#loginpage-container input")[0]).hasClass('flag');
    let e2 = $($("#loginpage-container input")[1]).hasClass('flag');
    if(e1 && e2){
       $("#loginpage-container .l-btn").removeClass("inactive-btn");
       $("#loginpage-container .l-btn").css("cursor", "pointer");
    }else{
         $("#loginpage-container .l-btn").addClass("inactive-btn");
         $("#loginpage-container .l-btn").css("cursor", "default");
    }
}