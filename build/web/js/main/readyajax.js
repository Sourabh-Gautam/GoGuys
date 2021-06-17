$(document).ready(() => {
    let xhr = $.post('GetShopServlet', (responseText) => {
        let parsedJSON = JSON.parse(responseText);
        let html = '';
        let shop = Object.keys(parsedJSON);
        let icon = Object.values(parsedJSON);
        for (let i = 0; i < shop.length; i++) {
            if(shop[i]==='Grocery'){
                 html = html.concat("<li class='active-shop' id='" + shop[i].toLowerCase() + "'>" + icon[i] + "<span>" + shop[i] + "</span></li>");
                 continue;
            }
            html = html.concat("<li id='" + shop[i].toLowerCase() + "'>" + icon[i] + "<span>" + shop[i] + "</span></li>");
        }
        $('#shop-nav #nav-list').html(html);
    });
    xhr.fail((jqxhr, textstatus) => {
        swal("Error!", 'Some error occured:' + jqxhr.status, "error");
    })
    
    let data = {select: 'Grocery'};
    let xhr1 = $.post('GetShopCategoryServlet', data, (responseText) => {
        let parsedJSON = JSON.parse(responseText);
        let html = "<li class='active-shop'>All</li>";
        let categories = Object.values(parsedJSON);
        for (let i = 0; i < categories.length; i++) {
            html = html.concat("<li>" + categories[i] + "</li>");
        }
        $('#filters').html(html);
    });
    xhr1.fail((jqxhr, textstatus) => {
        swal("Error!", 'Some error occured:' + jqxhr.status, "error");
    })
});


