// shopobj var contains a parsed json javascript object having shopname as keys and icons as values
var shopobj;

// categoryobj var contains a parsed json js object having shopname as keys and array containing categories as values
var categoryobj;

// start and end tell to the server range of product fetch from the database
var start = 1;
var end = 11;

// active shop
var activeShop='Grocery';

// active category
var activeCategory='All';

// product resize when the user has pressed on burger and then try to navigate over the shops
var resizeCard;
$(document).click(function(){
    resizeCard = $($('#product-card > div')[0]).attr('class');
});

// productsName will hold all the products name and it mainly use for searching
var productsName;