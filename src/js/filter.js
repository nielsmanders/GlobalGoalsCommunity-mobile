$(document).ready(function() {

    $("#type-filter").click(function() {
        $(this).parent().find(".types").slideToggle();
        $("#arrow-solutions").toggleClass("down");
    });

    $("#sdg-filter").click(function() {
        $(this).parent().find(".sdg-filter-items").slideToggle();
        $("#arrow-sdgs").toggleClass("down");
    });

});