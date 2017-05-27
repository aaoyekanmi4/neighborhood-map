//toggle "Directions To" area of panel
$(".towards").click(function() {
    if ( $( ".go-to" ).is( ":hidden" ) ) {
        $( ".go-to" ).show();
    } else {
        $( ".go-to" ).slideUp("slow");
    }
    $(this).toggleClass("fa fa-minus");
    $(this).toggleClass("fa fa-plus");
});

//toggle "Directions From" area of panel
$(".away").click(function() {
    if ( $( ".get-from" ).is( ":hidden" ) ) {
        $( ".get-from" ).show();
    } else {
        $( ".get-from" ).slideUp("slow");
    }
    $(this).toggleClass("fa fa-minus");
    $(this).toggleClass("fa fa-plus");
});