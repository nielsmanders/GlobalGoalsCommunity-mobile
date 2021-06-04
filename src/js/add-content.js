$(document).ready(function() {

    checkCharacters();

    // Check character limit short description
    $("#input-short-description").on("keypress", function() {
        checkCharacters();
    });

    function checkCharacters() {
        var count = $("#input-short-description").val().length;

        $(".shortDescription-count").html(count);

        if (count == 300) {
            $(".shortDescription-count-wrapper").addClass("text-red");
        } else {
            $(".shortDescription-count-wrapper").removeClass("text-red");
        }
    }

    // Remove sdg errorclass
    $(".sdg-checkbox").on("change", function(e) {
        if (this.checked) {
            $(".sdg-checkbox").parent().removeClass("error");
        }

        // Check if max. sdgs is reached
        var sdgs = $("#add-content").find(".sdg-checkbox:checked").map(function() {
            return $(this).val();
        }).get();

        if (sdgs.length > 2) {
            $(this).prop("checked", false);
            e.preventDefault();
        }
    });

    // Check if sdg is active and if video is uploaded when required
    $("#add-content").on("submit", function(e) {

        var sdgs = $(this).find(".sdg-checkbox:checked").map(function() {
            return $(this).val();
        }).get();

        if ($(this).find("#video")) {
            if ($(this).find("#video").val() == "") {
                e.preventDefault();
            }
        }

        if (sdgs.length == 0) {
            e.preventDefault();
            $(this).find(".checkbox-wrapper").addClass("error");
        }

    });
    
    // Custom input type
    $(".inputVideo").on("change", function() {
        var fileName = $(this).val().split("\\").pop();
        $(".outputVideo").addClass("selected").html(fileName);
    });
    
    // Custom input type
    $(".inputfile").on("change", function() {
        var fileName = $(this).val().split("\\").pop();
        $(".output").addClass("selected").html(fileName);
    });

});