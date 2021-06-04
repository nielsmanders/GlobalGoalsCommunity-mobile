$(document).ready(function() {
    
    // Toggle mobile menu
    $("#toggle").on('click', function() {
        $("#menu-mobile").toggleClass("closed");
        $("#toggle").find("svg").toggleClass("fa-bars fa-times")
    });

    // Toggle user menu
    $("#toggle-user-menu").on("click", function() {
        $(".user-menu-options").toggleClass("open");
    });
    
    // Breadcrumbs go back button
    $('#go-back').click(function(){
        parent.history.back();
        return false;
    });
    
});