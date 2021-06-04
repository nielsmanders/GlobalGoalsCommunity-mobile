$(document).ready(function() {  
    $('#badge-information').on('click', function() {
        $(this).css("display", "none");
    });

    $('.badge-click').on('click', function() {
        // $(this).data("id");
        $("#badge-information").css("display", "block");
    });
});