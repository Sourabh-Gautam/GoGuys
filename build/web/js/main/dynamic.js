// On click to the shop name at the sidebar the active color applied, filters showing and product updated accroding to the shop activated.

$('body').on('click', '.shop-nav li', (e) => {
    $("#product-card-cover").removeClass("display-none");
    $('#nav-list > li').removeClass('active-shop');
    $(e.currentTarget).addClass('active-shop');
    activeShop = $(e.currentTarget).text();
    let html = "<li class='active-shop'>All</li>";
    let categories = categoryobj[activeShop];
    for (let c of categories) {
        html = html.concat("<li>" + c + "</li>");
    }
    $('#filters').html(html);
    document.querySelector('#product-card').scrollTo(0, 0);
    scrollTopAlert = 0;
    scrollTop = 50;
    start = 1;
    end = 10;
    let data = {select: activeShop, selectedCategory: 'All', start: start, end: end};
    let xhr2 = $.post('GetProductServlet', data, processResponse);
    xhr2.fail((jqxhr, textstatus) => {
        swal("Error!", 'Some error occured:' + jqxhr.status, "error");
    });
});

// On click to the filters names at the topbar the active color applied, product updated accroding to the shop activated.

$('body').on('click', '#filters li', (e) => {
    $("#product-card-cover").removeClass("display-none");
    $('#filters > li').removeClass('active-shop');
    $(e.currentTarget).addClass('active-shop');
    activeCategory = $(e.target).text();
    document.querySelector('#product-card').scrollTo(0, 0);
    scrollTopAlert = 0;
    scrollTop = 50;
    start = 1;
    end = 10;
    let data = {
        select: activeShop,
        selectedCategory: activeCategory,
        start: start,
        end: end
    };
    let xhr2 = $.post('GetProductServlet', data, processResponse);
    xhr2.fail((jqxhr, textstatus) => {
        swal("Error!", 'Some error occured:' + jqxhr.status, "error");
    });
});

function processResponse(responseText) {
    if (responseText !== "error") {
        let promise = new Promise(function (resolve, rejecet)
        {
            $("#product-card").html(responseText);
            $("#product-card-cover").addClass("display-none");
            resolve();
        });
        promise.then(function () {
            $('#product-card > div').attr('class', resizeCard);
        });
    } else if (responseText === "null") {
    } else {
        swal("Error!", "Server not responding. Please try later", "error");
    }
}

// On scroll new product fetching

function fetchProductOnScroll() {
    return new Promise(function (resolve, reject) {
        start = end;
        end = end + 5;
        data = {select: activeShop, selectedCategory: activeCategory, start: start, end: end};
        console.log(data)
        let xhr2 = $.post('GetProductServlet', data, function (responseText) {
            if (responseText !== "error") {
                $("#product-card").append(responseText);
                resolve();
            } else if (responseText == "null") {
            } else {
                swal("Error!", "Server not responding. Please try later", "error");
            }
        });
        xhr2.fail((jqxhr, textstatus) => {
            swal("Error!", 'Some error occured:' + jqxhr.status, "error");
        });
    });
}

var isScrolling;
var scrollTopAlert = 0;
var scrollTop = 50;
document.querySelector('#product-card').addEventListener('scroll', function (e) {
    clearTimeout(isScrolling);
    isScrolling = setTimeout(function () {
        scrollTopAlert = document.querySelector('#product-card').scrollTop;
        console.log(scrollTopAlert);
        if (scrollTopAlert > scrollTop) {
            scrollTop = scrollTop + 50;
            let promise = fetchProductOnScroll();
            promise.then(function () {
                let c = $($('#product-card > div')[0]).attr('class');
                if (c.includes('br-dcss-gt1000')) {
                    $('#product-card > div').addClass('br-dcss-gt1000');
                } else if (c.includes('ct-dcss-gt1000')) {
                    $('#product-card > div').addClass('ct-dcss-gt1000');
                }
            });
        }
    }, 100);
}, false);


//Show Description when click on the product

$(".product-card").on('click', '.card', function (e) {
    $(".f-desc-parent").removeAttr("style");
    let id = $($(e.currentTarget).children()[0]).val();
    let xhr = $.post('GetOneProductServlet', {id: id}, function (responseText) {
        if (responseText !== "error") {
            $(".f-desc-parent").html(responseText);
        } else if (responseText == "null") {
        } else {
            swal("Error!", "Server not responding. Please try later", "error");
        }
    });
    xhr.fail((jqxhr, textstatus) => {
        swal("Error!", 'Some error occured:' + jqxhr.status, "error");
    });
});

$('.f-desc-parent').on('mouseenter', '.tiny-img ul li img', function (e) {
    let img = $(e.currentTarget).attr("src");
    $('.img-showcase .big-img img').attr("src", img);
});

$('body').on('click', '.bx-arrow-back', function (e) {
    $(".f-desc-parent").css("display", "none");
    $(".f-desc-parent").html("");
});

$('body').on('click', '.f-desc-parent', function () {
    $(".f-desc-parent").css("display", "none");
    $(".f-desc-parent").html("");
});

$('body').on('click','.f-desc-container',function(e){
    e.stopPropagation();
});
    
// On focus border color of search will be change and products name will be fetch

$('.header .search input').focus(function(){
    $('.header .search .search-list').removeClass("display-none");
    $('.header .search input').css({
        "border": "solid 2px rgb(38,151,255)",
        "border-right": "none",
    });
})

$('.header .search input').blur(function(){
    $('.header .search input').removeAttr("style");
    $('.header .search .search-list').addClass("display-none");
})

