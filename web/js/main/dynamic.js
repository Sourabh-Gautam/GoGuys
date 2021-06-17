$('body').on('click', '.shop-nav li', (e) => {
    $('#nav-list > li').removeClass('active-shop');
    $(e.currentTarget).addClass('active-shop');
    let shop = "";
    if ($(e.target).text().trim() === shop) {
        shop = $($($(e.target)).siblings()[0]).text();
    } else {
        shop = $($(e.target)).text();
    }
    let xhr = $.post('GetShopCategoryServlet', {'select': shop}, (responseText) => {
        let parsedJSON = JSON.parse(responseText);
        let html = "<li class='active-shop'>All</li>";
        let categories = Object.values(parsedJSON);
        for (let i = 0; i < categories.length; i++) {
            html = html.concat("<li>" + categories[i] + "</li>");
        }
        $('#filters').html(html);
    });
    xhr.fail((jqxhr, textstatus) => {
        swal("Error!", 'Some error occured:' + jqxhr.status, "error");
    });
});