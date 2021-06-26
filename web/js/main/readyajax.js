$(document).ready(() => {
    let promise1 = new Promise(function (resolve, reject) {
        let xhr = $.post('GetShopServlet', (responseText) => {
            shopobj = JSON.parse(responseText);
            let html = '';
            let shop = Object.keys(shopobj);
            let icon = Object.values(shopobj);
            for (let i = 0; i < shop.length; i++) {
                if (shop[i] === 'Grocery') {
                    html = html.concat("<li class='active-shop' id='" + shop[i].toLowerCase() + "'>" + icon[i] + "<span>" + shop[i] + "</span></li>");
                    continue;
                }
                html = html.concat("<li id='" + shop[i].toLowerCase() + "'>" + icon[i] + "<span>" + shop[i] + "</span></li>");
            }
            $('#shop-nav #nav-list').html(html);
            resolve();
        });
        xhr.fail((jqxhr, textstatus) => {
            swal("Error!", 'Some error occured:' + jqxhr.status, "error");
        });
    });

    var data1 = {select: 'Grocery'};

    promise1.then(function () {
        let xhr1 = $.post('GetShopCategoryServlet', data1, (responseText) => {
            categoryobj = JSON.parse(responseText);
            let html = "<li class='active-shop'>All</li>";
            let categories = categoryobj['Grocery'];
            for (let i = 0; i < categories.length; i++) {
                html = html.concat("<li>" + categories[i] + "</li>");
            }
            $('#filters').html(html);
        });
        xhr1.fail((jqxhr, textstatus) => {
            swal("Error!", 'Some error occured:' + jqxhr.status, "error");
        });
    });

    let data2 = {select: 'Grocery', selectedCategory: 'All', start: start, end: end};
    let xhr2 = $.post('GetProductServlet', data2, function (responseText) {
        if (responseText !== "error") {
            $("#product-card").html(responseText);
        } else {
            swal("Error!", "Server not responding. Try later", "error");
        }
    });
    xhr2.fail((jqxhr, textstatus) => {
        swal("Error!", 'Some error occured:' + jqxhr.status, "error");
    });

    let xhr3 = $.post('GetProductServlet', function (responseText) {
        let parsedJSON = JSON.parse(responseText);
        products = Object.values(parsedJSON);
        productsName = [];
        for (let product of products) {
            productsName.push(product.pname);
        }
        productsName.sort();
    });
    xhr3.fail((jqxhr, textstatus) => {
        swal("Error!", 'Some error occured:' + jqxhr.status, "error");
    });
});


