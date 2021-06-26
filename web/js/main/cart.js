// Cart Opening While Clicking On Cart Button

$(".cart").click(function (e) {
    e.preventDefault();
    $(".cart-section").toggleClass("ct-dcss-gt1000");
    $(".shop-filters").toggleClass("ct-dcss-gt1000");
    $(".product-card").toggleClass("ct-dcss-gt1000");
    $(".product-card-cover").toggleClass("ct-dcss-gt1000");
    if (!$(".shop-nav").hasClass("br-dcss-gt1000")) {
        $(".shop-filters").addClass("br-dcss-gt1000");
        $(".shop-nav").addClass("br-dcss-gt1000");
        $(".product-card").addClass("br-dcss-gt1000");
        $(".product-card-cover").addClass("br-dcss-gt1000");
        flag = true;
    } else {
        if (flag) {
            $(".shop-filters").removeClass("br-dcss-gt1000");
            $(".shop-nav").removeClass("br-dcss-gt1000");
            $(".product-card").removeClass("br-dcss-gt1000");
            $(".product-card-cover").removeClass("br-dcss-gt1000");
        }
    }
    $(".product-card .card").toggleClass("ct-dcss-gt1000");
    console.log(flag);
});

// Return To Top Icon Handler 

$(".cart-items-container .heading i").click(function () {
    $(".cart-section").scrollTop(0);
});
$(".cart-section").scroll(function () {
    if (Math.floor($(".cart-section").scrollTop()) == 0) {
        $(".cart-items-container .heading i").addClass("display-none");
    } else {
        $(".cart-items-container .heading i").removeClass("display-none");
    }
});