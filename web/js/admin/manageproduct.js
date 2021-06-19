$('.sidebar #product').click(function (e) {

});
$('.manage-action button').click((e) => {
    let a = $(e.target).attr('id');
    $('.manage-action button').removeClass('active');
    $(e.target).addClass('active');
    $('.product form>div').addClass('display-none');
    $('.product form .' + a).removeClass('display-none');
});


//Trigger click event on file input whiile click on a normal button

var choosed = null;
$('body').on('click', '.product-images .not-img .bx-plus', e => {
    e.preventDefault();
    $($(e.target).siblings()[0]).trigger('click');
    choosed = e.target;
});

$('body').on('change', '.product-images .img-file', () => {
    getImgData();
});


function getImgData() {
    const chooseFile = $($(choosed).siblings())[0];
    const files = chooseFile.files[0];
    if (files) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.addEventListener("load", function () {
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
    let formData = new FormData($('.product .add-product-form')[0]);
    for (var pair of formData.entries()) {
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
            if (responseText === "error") {
                swal("Error!", "Something went wrong. Try again later", "error");
            } else if (responseText === "warning") {
                swal("Error!", "A product is already existing with this name", "warning");
            } else {
                swal("Success!", responseText, "success");
            }
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
    let xhr = $.post('GetProductServlet', function (responseText) {
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
    xhr.fail((jqxhr, textstatus) => {
        swal("Error!", 'Some error occured:' + jqxhr.status, "error");
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
input.addEventListener("keyup", showSearch);

function showSearch() {
    {
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
    }
}

function searching(value) {
    let charArr = Array.from(value.toLowerCase());
    let ph = "";
    let filter = [];
    for (let product of productArr) {
        let flag = 0;
        ph = product.toLowerCase();
        for (let char of charArr) {
            if (!ph.includes(char)) {
                flag = -1;
                break;
            }
            ph = ph.substring(ph.indexOf(char) + 1);
        }
        if (flag !== -1) {
            filter.push(product);
        }
    }
    filter.sort()
    return filter;
}

$('.search-p-div .search-result').click(function (e) {
    let selection = $(e.target).attr("class");
    for (let product of products) {
        if (product.pname === selection) {
            $(".remove-product  select#product-shops option[value='" + product.shop + "']").prop('selected', true);
            $(".remove-product  select#product-shops").trigger('change');
            promise.then(function () {
                let pro = new Promise(function (resolve, reject) {
                    $(".remove-product  select#product-categories option[value='" + product.category + "']").prop('selected', true);
                    resolve();
                })
                pro.then(function () {
                    $(".product #products-dropdown option[value='" + product.pname + "']").prop('selected', true);
                });
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
        if (responseText != "null") {
            let parsedJSON = JSON.parse(responseText);
            products = Object.values(parsedJSON);
            console.log(productArr);
            productArr = [];
            for (let product of products) {
                productArr.push(product.pname);
            }
            showSearch();
            console.log(productArr);
            $(".product-counter strong").html("" + products.length);
            $("select#product-categories").trigger("change");
            swal("Success!", "Product deleted successfully", "success");
        } else if (responseText === "null") {
            console.log(responseText)
            swal("Sorry!", "Record not found", "error");
        } else {
            swal("Error!", 'Some error occured! Try again later', "error");
        }
    });
    xhr.fail((jqxhr, textstatus) => {
        swal("Error!", 'Some error occured:' + jqxhr.status, "error");
    });
});

//Update product 

var input2 = document.querySelector(".product .search-up");
input2.addEventListener("keyup", (e) => {
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

//handle the click on search result li 

$('#update-product-form .search-up-result').click(function (e) {
    console.log("called");
    let selection = $(e.target).attr("class");
    $('input#search-up').val(selection);
    $('#update-product-form .search-up-result').html("");
});

//handle the click on get button of search

let lastHTML = $(".product .server-data").html();
$('#update-product-form .search-up-div button.gp').click(function (e) {
    e.preventDefault();
    let select = $('input#search-up').val();
    if (select === "") {
        swal("Error!", "Choose or type a product first", "warning");
        $(".product .server-data").html(lastHTML);
        return false;
    }
    $.post('UpdateProductServlet', {product: select}, function (responseText) {
        if (responseText === "failed") {
            swal("Error!", "Something went wrong. Try again later", "error");
            $(".product .server-data").html(lastHTML);
        } else if (responseText === "null") {
            swal("Error!", "No such product found", "error");
            $(".product .server-data").html(lastHTML);
        } else {
            $(".product .server-data").html(responseText);
        }
    })
});


// Action took on update button clicked
var oldform;
$(".product .update-product-btn").click(function (e) {
    e.preventDefault();
    return new Promise(function (resolve, reject) {
        let id = $(".product input[ name='id' ]").val();
        let xhr = $.post("UpdateProductServlet", {id: id}, responseText => {
            if (responseText === 'success') {
                alert(responseText);
                resolve();
            } else {
                swal("Error!", "Something went wrong. Try again later", "error");
            }
        });
        xhr.fail((jqxhr, textstatus) => {
            swal("Error!", 'Some error occured:' + jqxhr.status, "error");
        });
    });
});