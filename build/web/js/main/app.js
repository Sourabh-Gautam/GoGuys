// global variable declaration
var active = false;
var active2 = false;
var flag = false;
var remAnim = null;

// function declarations

function animateMe(e1){
    if($(e1.target).hasClass("burger") || $(e1.target).hasClass("right-arrow") || $(e1.target).hasClass("left-arrow")){
        $(e1.target).css("background-color", "rgba(163, 163, 163, 0.2)");
        $(e1.target).css("border", "solid 1px lightgray");
        remAnim = e1.target;
    }
}
    // $(document).ready(function () {
    //     if(window.matchMedia("(max-width : 540px)").matches){
    //         setTimeout(() => {
    //             $(".shop-nav").addClass("dynamic-css-540");
    //             $(".shop-nav .nav-list").addClass("dynamic-css-540");
    //             $(".shop-nav .nav-list li span").addClass("dynamic-css-540");
    //             $(".shop-nav .nav-list li").addClass("dynamic-css-540");
    //             $(".shop-nav .nav-list li i").addClass("dynamic-css-540");
    //             $(".shop-filters").addClass("dynamic-css-540");
    //             $(".shop-filters .filters li").addClass("dynamic-css-540");
    //         }, 2000);
    //     }
    // });
    
   
// Refresh page when click on logo

$('.header .logo').click(function(e){
    window.location.reload();
});

// Login | Register Functionalities

$(".login-register-dp").click(function (e) { 
    $(".login-registration-page-container").removeClass("display-none");
});

$("body").on('click', '#register-link', function (e) { 
    e.preventDefault();
    $("#loginpage-container").addClass("display-none");
    $("#registrationpage-container").removeClass("display-none");
});

$("body").on('click', '#login-link',function (e) { 
    e.preventDefault();
    $("#registrationpage-container").addClass("display-none");
    $("#loginpage-container").removeClass("display-none");

});

// Eye Button Functionalies

$("#login-password").keyup(function (e) { 
    if($("#login-password").val()!==""){
        $("#login-eye").removeClass("display-none");
    }
    else{
        $("#login-eye").addClass("display-none");
    }
});

$("#registration-password").keyup(function (e) { 
    if($("#registration-password").val()!==""){
        $("#registration-eye").removeClass("display-none");
    }
    else{
        $("#registration-eye").addClass("display-none");
    }
});

$(".see-password").click(function (e) { 
    e.preventDefault();
    if($(e.target).is("#login-eye")){
        $("#login-password").focus();
        let att = $("#login-password").attr("type");
        let newAtt = att==="password" ? "text" : "password";
        $("#login-password").attr("type", newAtt);
        $("#login-eye").toggleClass("fa-eye-slash");
        $("#login-eye").toggleClass("fa-eye");
    }
    else if($(e.target).is("#registration-eye")){
        console.log("Herlkjwed");
        let att = $("#registration-password").attr("type");
        let newAtt = att==="password" ? "text" : "password";
        $("#registration-password").attr("type", newAtt);
        $("#registration-eye").toggleClass("fa-eye-slash");
        $("#registration-eye").toggleClass("fa-eye");
    }
});


// Burger functionalities

$(".burger").click(function (e) { 
    let scrsize = window.matchMedia("(max-width: 1000px)");
    if($(".shop-nav").hasClass("br-dcss-gt1000")){
        flag = true;
    }else{
        flag = false;
    }

    if($("body").width() < 1000){
        if($(".shop-nav").hasClass("br-dcss-gt1000") ){
            $(".shop-nav").removeClass("br-dcss-gt1000");
            $(".shop-filters").removeClass("br-dcss-gt1000");
            $(".product-card").removeClass("br-dcss-gt1000");
            $("#product-card-cover").removeClass("br-dcss-gt1000");
            $(".product-card .card").removeClass("br-dcss-gt1000");
        }
        $(".shop-nav").toggleClass("br-dcss-lt1000");
        $(".shop-filters").toggleClass("br-dcss-lt1000");
        $(".product-card").toggleClass("br-dcss-lt1000");
        $("#product-card-cover").toggleClass("br-dcss-lt1000");
        $(".product-card .card").toggleClass("br-dcss-lt1000");
    }
    else{
        if($("#cart-section").hasClass("ct-dcss-gt1000")){
            $("#cart-section").removeClass("ct-dcss-gt1000");
            $(".shop-filters").removeClass("ct-dcss-gt1000");
            $(".product-card").removeClass("ct-dcss-gt1000");
            $("#product-card-cover").removeClass("ct-dcss-gt1000");
            $(".product-card .card").removeClass("ct-dcss-gt1000");
            $(".product-card .card").addClass("br-dcss-gt1000");
        }
        if($(".shop-nav").hasClass("br-dcss-lt1000") ){
            $(".shop-nav").removeClass("br-dcss-lt1000");
            $(".shop-filters").removeClass("br-dcss-lt1000");
            $(".product-card").removeClass("br-dcss-lt1000");
            $("#product-card-cover").removeClass("br-dcss-lt1000");
            $(".product-card .card").removeClass("br-dcss-lt1000");
        }
        $(".shop-nav").toggleClass("br-dcss-gt1000");
        $(".shop-filters").toggleClass("br-dcss-gt1000");
        $(".product-card").toggleClass("br-dcss-gt1000");
        $("#product-card-cover").toggleClass("br-dcss-gt1000");
        $(".product-card .card").toggleClass("br-dcss-gt1000");
    }
});

// Filter Scrolling Implements On Left and Right arrow clicked

$(".right-arrow").click(function (e) { 
    e.preventDefault();
    var scroll = document.getElementById('filters');
    sideScroll(scroll,'right',15,160,10);
});

$(".left-arrow").click(function (e) { 
    e.preventDefault();
    var scroll = document.getElementById('filters');
    sideScroll(scroll,'left',15,160,10);
});

function sideScroll(element,direction,speed,distance,step){
    scrollAmount = 0;
    var slideTimer = setInterval(function(){
        if(direction == 'left'){
            element.scrollLeft -= step;
        } else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if(scrollAmount >= distance){
            window.clearInterval(slideTimer);
        }
    }, speed);
}

// Scolling filters using mouse dragging

const slider = document.querySelector('#filters');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft; //offsetLeft will return the distance between calling element and its parent that is how much it far away from its parent element
   //e.pageX will returns the x coordinate of the mounse clicked in the canvas 
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
  console.log(walk);
});

// Click on a icon animation

$("body").mousedown(function (e) { 
    animateMe(e);
});

$(window).mouseup(function (e2) { 
    if(remAnim !== null){
        $(remAnim).css("background-color", "unset");
        setTimeout(() => {
            $(remAnim).css("border", "none");
        }, 200);
    }
});


    