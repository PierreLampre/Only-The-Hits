$(document).ready(function() {
    $("#show").hide();
    $("#play").on("click", function() {
        $("#hide").hide();
        $("#show").show();
    });
});


$(document).on("scroll", (function() {
    if ($(document).scrollTop() > 60){  
        $("h1").addClass("sticky");
        $("#what").css("font-size", "40px");
    }
    else{
        $("h1").removeClass("sticky");
        $("#what").css("font-size", "70px");
    }
}));





// function hide() {
//     var x = document.getElementById("hide");
//     var y = document.getElementById("show");
//     if (x.style.display)
// }