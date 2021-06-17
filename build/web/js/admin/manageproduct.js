$('.sidebar #product').click(function (e) {

});
$('.manage-action button').click((e) => {
    let a = $(e.target).attr('id');
    $('.product form>div').addClass('display-none');
    $('.product form .' + a).removeClass('display-none');
});


//Trigger click event on file input whiile click on a normal button

var choosed = null;
$('.product-images .not-img .bx-plus').click(e => {
    e.preventDefault();
    $($(e.target).siblings()[0]).trigger('click');
    choosed = e.target;
});

$('.product-images .img-file').change(() => {
    console.log("Image change");
    getImgData();
});


function getImgData() {
    console.log("getImg Data ");
    const chooseFile = $($(choosed).siblings())[0];
    console.log(chooseFile);
    const files = chooseFile.files[0];
    console.log(files);
    if (files) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.addEventListener("load", function () {
            console.log("load happened");
            console.log($($($(choosed).siblings()[1])));
            $($($($(choosed).parent())).append('<div class="img-container"><img src="' + this.result + '" /><i class="bx bxs-trash-alt"></i></div>'));
        });
    }
}


// Remove Added images

$('body').on('click', '.product-images .img-container i', function (e) {
    $(e.target).parent().remove();
});


// Retrieve and upload product to the server

$('body').on('click', '.add-product .product-action-button', e => {
    e.preventDefault();
    let formData = new FormData($('.product form')[0]);
    for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }

    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "AddProductServlet",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (responseText) {
            alert(responseText);
        },
        error: function (e) {
            alert("Error");
        }
    });
});


//Remove product section


var productArr = [];
var products;

$(".product #remove-product, .product #update-product").click(function () {
    $.post('GetProductServlet', function (responseText) {
        let parsedJSON = JSON.parse(responseText);
        products = Object.values(parsedJSON);
        productArr = [];
        for (let product of products) {
            productArr.push(product.pname);
        }
        let shop = $('.remove-product  #product-shops').val();
        let category = $('.remove-product  #product-categories').val();
        $(".product #products-dropdown").html(scrapProduct(shop, category));
        $(".product-counter strong").html("" + products.length);
    });
});

//On change of shop the category in remove product will be change

$("select#product-shops").change(function (e) {
    promise.then(function (shopAndCategoryCollection) {
        let promise1 = new Promise(function (resolve, reject) {
            let html = "";
            let  categories = shopAndCategoryCollection[$("select#product-shops").val()];
            for (let category of categories) {
                html = html.concat("<option value='" + category + "'>" + category + "</option>");
            }
            $("select#product-categories").html(html);
            resolve();
        });
        promise1.then(function () {
            let shop = $('.remove-product  #product-shops').val();
            let category = $('.remove-product  #product-categories').val();
            $(".product #products-dropdown").html(scrapProduct(shop, category));
        });
    });
});

$("select#product-categories").change(function (e) {
    let shop = $('.remove-product  #product-shops').val();
    let category = $('.remove-product  #product-categories').val();
    $(".product #products-dropdown").html(scrapProduct(shop, category));
});

function scrapProduct(shop, category) {
    let html = "";
    for (let product of products) {
        if (product.shop === shop && product.category === category) {
            html = html + `<option value="${product.pname}">${product.pname}</option>`;
        }
    }
    return html;
}

//Search Product 

var input = document.querySelector(".product .search-p");
input.addEventListener("keyup", (e) => {
    let value = input.value;
    if (value === "") {
        document.querySelector(".product .search-result").innerHTML = "";
        return;
    }
    let filter = searching(value);
    let html = "";
    for (let product of filter) {
        html = html + "<li class='" + product + "'>" + product + "</li>";
    }
    document.querySelector(".product .search-result").innerHTML = html;
});

var input2 = document.querySelector(".product .search-up");
input2.addEventListener("keyup", (e) => {
    console.log("Event fired")
    let value = input2.value;
    if (value === "") {
        document.querySelector(".product .search-up-result").innerHTML = "";
        return;
    }
    let filter = searching(value);
    let html = "";
    for (let product of filter) {
        html = html + "<li class='" + product + "'>" + product + "</li>";
    }
    document.querySelector(".product .search-up-result").innerHTML = html;
});



function searching(value) {
    console.log(value)
    let charArr = Array.from(value.toLowerCase());
    // console.log(charArr);
    console.log(productArr)
    let ph = "";
    let filter = [];
    for (let product of productArr) {
        let flag = 0;
        ph = product.toLowerCase();
        for (let char of charArr) {
            // console.log(ph + " : " + char);
            if (!ph.includes(char)) {
                flag = -1;
                // console.log("break");
                break;
            }
            ph = ph.substring(ph.indexOf(char) + 1);
        }
        if (flag !== -1) {
            filter.push(product);
        }
        // console.log("Filtered : " + filter);
    }
    filter.sort();
    console.log(filter)
    return filter;
}

$('.search-p-div .search-result').click(function (e) {
    let selection = $(e.target).attr("class");
    for (let product of products) {
        if (product.pname === selection) {
            console.log("entered");
            console.log(product.shop);
            $(".remove-product  select#product-shops option[value='" + product.shop + "']").prop('selected', true);
            $(".remove-product  select#product-shops").trigger('change');
            promise.then(function () {
                $(".remove-product  select#product-categories option[value='" + product.category + "']").prop('selected', true);
            });
        }
    }
});

//Request to Remove Product to servlet

$(".product #remove-product-btn").click(function (e) {
    e.preventDefault();
    let data = new Object();
    let v = $(".remove-product-box select").val(function (i, v) {
        data[i] = v;
        return v;
    });
    let xhr = $.post("RemoveProductServlet", data, function (responseText) {
        alert("response arrived");
        if (responseText != null) {
            let parsedJSON = JSON.parse(responseText);
            products = Object.values(parsedJSON);
            $(".product-counter strong").html("" + products.length);
            $("select#product-categories").trigger("change");
        } else {
            console.log(responseText)
        }
    });
});