
$(document).on("scroll", (function() {
    if ($(document).scrollTop() > 60){  
        $("h1").addClass("sticky");
    }
    else{
        $("h1").removeClass("sticky");
    }
}));