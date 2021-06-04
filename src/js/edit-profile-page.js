$(document).ready(function() {

    // Custom input type
    $(".custom-file-input").on("change", function() {
        var fileName = $(this).val().split("\\").pop();
        $(".output").html(fileName);
        $(".image-output").css("visibility", "visible");
    }); 

});