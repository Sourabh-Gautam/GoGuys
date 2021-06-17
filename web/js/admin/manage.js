$(document).ready(function () {
    dynamicShopUpdateOnReady();
});

var promise;

function dynamicShopUpdateOnReady() {
    xhr = $.post('GetShopServlet', (responseText) => {
        let shopname = Object.keys(JSON.parse(responseText));
        let html = "";
        for (let shop of shopname) {
            html = html.concat("<option value='" + shop + "'>" + shop + "</option>");
        }
        $("select#shops").html(html);
        $(".add-product .not-description select.shops").html(html);
        $("select#product-shops").html(html);
        promise = dynamicShopCategoryUpdate();
        promise.then(function (shopAndCategoryCollection) {
            let html = "";
            for (let category of shopAndCategoryCollection[$('select#shops').val()]) {
                html = html.concat("<option value='" + category + "'>" + category + "</option>");
            }
            $("select#categories").html(html);
            $(".add-product .not-description select.category").html(html);
            $("select#product-categories").html(html);
        });
    });
    xhr.fail((jqxhr, textstatus) => {
        swal("Error!", 'Some error occured:' + jqxhr.status, "error");
    });
}

function manageShop(e, action) {
    if (!validate(e))
        return
    let data = new Object();
    let inputs = $('.' + action + '-shop-box input, ' + '.' + action + '-shop-box select');
    data[0] = action;
    for (let i = 1; i <= inputs.length; i++) {
        data[i] = $(inputs[i - 1]).val();
    }
    if (action === 'remove') {
        swal({
            title: "Are you sure?",
            text: "Do you really want to delete?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
                .then((willDelete) => {
                    if (willDelete) {
                        xhr = $.post('ManageShopServlet', data, (responseText) => {
                            swal("Shop has been deleted!", {
                                icon: "success",
                            });
                            dynamicShopUpdate();
                        });
                        xhr.fail((jqxhr, textstatus) => {
                            swal("Error!", 'Some error occured:' + jqxhr.status, "error");
                        });
                    } else {
                        swal("Thanks! Shop is safe.");
                    }
                });
    } else {
        xhr = $.post('ManageShopServlet', data, (responseText) => {
            if (action === 'update') {
                action = action.substring(0, action.length - 1);
            }
            if (responseText === 'true') {
                swal('Success!', 'Shop has been ' + action + 'ed!', 'success');
            } else {
                swal('Something went wrong!', 'please check if you\'re entering an existing shop', 'error');
            }
            dynamicShopUpdate();
        });
        xhr.fail((jqxhr, textstatus) => {
            swal("Error!", 'Some error occured:' + jqxhr.status, "error");
        });
    }
}

function manageShopCategory(e, action) {
    if (!validate(e))
        return
    let data = new Object();
    let inputs = $('.' + action + '-shopc-box input, ' + '.' + action + '-shopc-box select');
    data[0] = action;
    for (let i = 1; i <= inputs.length; i++) {
        data[i] = $(inputs[i - 1]).val();
    }

    if (action === 'remove') {
        swal({
            title: "Are you sure?",
            text: "Do you really want to delete?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
                .then((willDelete) => {
                    if (willDelete) {
                        xhr = $.post('ManageShopCategoryServlet', data, (responseText) => {
                            swal("Shop Category has been deleted!", {
                                icon: "success",
                            });
                            promise = dynamicShopCategoryUpdate();
                            promise.then(function (shopAndCategoryCollection) {

                                $('select#categories').each(function (index, element) {
                                    let html = "";
                                    let  categories = shopAndCategoryCollection[$(element).prev().val()];
                                    for (let category of categories) {
                                        html = html.concat("<option value='" + category + "'>" + category + "</option>");
                                    }
                                    console.log(html)
                                    $(element).html(html);
                                });
                            });
                        }
                        );
                        xhr.fail((jqxhr, textstatus) => {
                            swal("Error!", 'Some error occured:' + jqxhr.status, "error");
                        });
                    } else {
                        swal("Thanks! Shop Category is safe.");
                    }
                });
    } else {
        xhr = $.post('ManageShopCategoryServlet', data, (responseText) => {
            if (action === 'update') {
                action = action.substring(0, action.length - 1);
            }
            if (responseText === 'true') {
                swal('Success!', 'Shop Category has been ' + action + 'ed!', 'success');
            } else {
                swal('Something went wrong!', 'please check if you entered an existing shop Category', 'error');
            }
            if (action.trim() === 'add') {
                promise = dynamicShopCategoryUpdate();
                promise.then(function (shopAndCategoryCollection) {
                    $('select#categories').each(function (index, element) {
                        let html = "";
                        let  categories = shopAndCategoryCollection[$(element).prev().val()];
                        for (let category of categories) {
                            html = html.concat("<option value='" + category + "'>" + category + "</option>");
                        }
                        console.log(html)
                        $(element).html(html);
                    });
                });
            }
        });
        xhr.fail((jqxhr, textstatus) => {
            swal("Error!", 'Some error occured:' + jqxhr.status, "error");
        });
    }
}

function validate(e) {
    let flag = false;
    $($($(e).parent()).children("input[type='text']")).each(function (i, e) {
        if ($(e).val() === "") {
            flag = true;
        }
    });
    if (flag) {
        swal("Error!", 'All fields required', "warning");
        return false;
    }
    return true;
}

function dynamicShopUpdate() {
    xhr = $.post('GetShopServlet', (responseText) => {

        let shopname = Object.keys(JSON.parse(responseText));
        let html = "";
        for (let shop of shopname) {
            html = html.concat("<option value='" + shop + "'>" + shop + "</option>");
        }
        $("select#shops").html(html);
        promise = dynamicShopCategoryUpdate();
        promise.then(function (shopAndCategoryCollection) {
            $('select#categories').each(function (index, element) {
                let html = "";
                let  categories = shopAndCategoryCollection[$(element).prev().val()];
                for (let category of categories) {
                    html = html.concat("<option value='" + category + "'>" + category + "</option>");
                }
                console.log(html)
                $(element).html(html);
            });
        });
    });
    xhr.fail((jqxhr, textstatus) => {
        swal("Error!", 'Some error occured:' + jqxhr.status, "error");
    })
}

function dynamicShopCategoryUpdate() {
    return new Promise(function (resolve, reject) {
        xhr = $.post('GetShopCategoryServlet', (responseText) => {
            shopAndCategoryCollection = JSON.parse(responseText);
            resolve(shopAndCategoryCollection);
            reject(new Error("Promises of fetching shop and category collection refused"));
        });
        xhr.fail((jqxhr, textstatus) => {
            swal("Error!", 'Some error occured:' + jqxhr.status, "error");
        });
    });
}

$("body").on('change', 'select#shops', (e) => {
    let changeC = shopAndCategoryCollection[$(e.target).val()];
    let html = "";
    for (let category of changeC) {
        html = html.concat("<option value='" + category + "'>" + category + "</option>");
    }

    if ($($(e.target).parent()).hasClass('remove-shopc-box')) {
        $(".remove-shopc-box select#categories").html(html);
    } else if ($($(e.target).parent()).hasClass('update-shopc-box')) {
        $(".update-shopc-box select#categories").html(html);
    }
}
);

$("body").on('change', '.add-product .not-description select.shops', (e) => {
    let changeC = shopAndCategoryCollection[$(e.target).val()];
    let html = "";
    for (let category of changeC) {
        html = html.concat("<option value='" + category + "'>" + category + "</option>");
    }

    $(".add-product .not-description select.category").html(html);
}
);

$(".enter-key").keypress(function(e){
    if(e.charCode === 13){
        $($(e.target).siblings("button")).trigger("click");
        console.log($(e.target))
        $(e.target).focus();
    }
});