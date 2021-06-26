var input = document.querySelector(".header .search input");
input.addEventListener("keyup", handler);
function handler(e) {
    var products = productsName;
    console.log(products);
    let value = input.value;
    value = value.toLowerCase();
    if (value === "") {
        document.querySelector(".header .search .search-list").innerHTML = "";
        return;
    }
    // console.log(value);

    // let charArr = Array.from(value.toLowerCase());
    // console.log(charArr);

    // let ph = "";
    let filter1 = [];
    let filter2 = [];
    const filter3 = new Object();
    for (let product of products) {
        product = product.toLowerCase();
        if (product.indexOf(value) == 0) {
            filter1.push(product);
        }
        if (product.indexOf(value) >= 1) {
            filter2.push(product);
        }
        if (product.indexOf(value) == -1) {

            if (value.length > 3) {
                for (i = 0, j = 3; j <= value.length; i++, j++) {
                    if (product.includes(value.substring(i, j))) {
                        //filter3.add(product); // Make it set
                        filter3[product]++;
                    }
                }
            }
        }
    }
    const sortable = Object.fromEntries(Object.entries(filter3).sort(([, a], [, b]) => a - b));
    const filter4 = Object.keys(sortable);
    var result1 = filter1.concat(filter2);
    // var result = Array.from(filter3);
    var finalresult = result1.concat(filter4);
    // filter.sort();
    let html = "";
    let count = 1;
    for (let product of finalresult) {
        html =
                html +
                "<li>" +
                product.charAt(0).toLocaleLowerCase() +
                product.substring(1) +
                "</li>";
        if(count===15){
            break;
        }
        count++
    }
    document.querySelector(".header .search .search-list").innerHTML = html;
}
