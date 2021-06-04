$(document).ready(function() {

    $(".user-profile-image").on("click", function() {
        $(".user-profile-image-container").css("display", "flex");
    })

    $(".user-profile-image-container").on("click", function() {
        $(".user-profile-image-container").css("display", "none");
    })

    // Like comment
    $(".follow-user").on("click", function() {
        var button = $(this);
        var user_id = button.data("user-id");
        var user_name = button.data("user-name");

        if (button.hasClass("followed")) {
            // Send ajax request to unfollow user
            $.ajax({
                url: "includes/ajax.inc.php",
                method: "POST",
                async: false,
                dataType: "json",
                data: {
                    action: "unfollowUser",
                    user_id: user_id
                }
            }).done(function(data, textStatus, jqXHR) {
                button.removeClass("followed").toggleClass("btn-orange btn-primary ").html("<i class='fas fa-user-plus mr-10'></i> Volg " + user_name);
                $('.follower-count').html(data);
            }).fail(function(data) {
                alert("Something went wrong...");
            });
        } else {
            // Send ajax request to follow user
            $.ajax({
                url: "includes/ajax.inc.php",
                method: "POST",
                async: false,
                dataType: "json",
                data: {
                    action: "followUser",
                    user_id: user_id
                }
            }).done(function(data, textStatus, jqXHR) {
                button.addClass("followed").toggleClass("btn-primary btn-orange").html("<i class='fas fa-user-check mr-10'></i> Ontvolg " + user_name);
                $('.follower-count').html(data);
            }).fail(function(data) {
                alert("Something went wrong...");
            });
        }
    });

});