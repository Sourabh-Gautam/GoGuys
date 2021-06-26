// Global Variable Declaration 


// Function definitions

function showContent(element){
    $(".home-section > div").addClass("display-none");
    $(".sidebar .nav-links li").attr("id", function(index, text){
        if($(element).attr("id")===text){
            $(".home-section ."+text).removeClass("display-none");
        }
    });
}

// Burger Functionality

$(".three-bar").click(function(){
    $(".sidebar").toggleClass("active");
});

// Sidebar Selection Functionality

$('.sidebar li').click(function(e){
    showContent(e.currentTarget);
});

