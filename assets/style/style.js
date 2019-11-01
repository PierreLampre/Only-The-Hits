
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