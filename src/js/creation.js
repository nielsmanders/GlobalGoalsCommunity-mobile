$(document).ready(function() {

    // Save creation
    $("#save").on("click", function() {
        var content_id = $(this).attr("data-creationId");
        var user_id = $(this).attr("data-userId");

        if ($(this).hasClass("saved")) {
            // Send ajax request to unsave content
            $.ajax({
                url: "includes/ajax.inc.php",
                method: "POST",
                async: false,
                dataType: "json",
                data: {
                    action: "unsaveCreation",
                    content_id: content_id,
                    user_id: user_id
                }
            }).done(function(data, textStatus, jqXHR) {
                $("#save").toggleClass("saved").toggleClass("btn-orange btn-primary").find("p").html("Opslaan");
                $(".saved_count").html(data);
            }).fail(function(data) {
                alert("Something went wrong...");
            });
        } else {
            // Send ajax request to save
            $.ajax({
                url: "includes/ajax.inc.php",
                method: "POST",
                async: false,
                dataType: "json",
                data: {
                    action: "saveCreation",
                    content_id: content_id,
                    user_id: user_id
                }
            }).done(function(data, textStatus, jqXHR) {
                $("#save").toggleClass("saved").toggleClass("btn-orange btn-primary").find("p").html("Opgeslagen");
                $(".saved_count").html(data);
            }).fail(function(data) {
                alert("Something went wrong...");
            });
        }
    });

    // Like creation
    $("#like").on("click", function() {
        var content_id = $(this).attr("data-creationId");
        var user_id = $(this).attr("data-userId");

        if ($(this).hasClass("liked")) {
            // Send ajax request to ulike content
            $.ajax({
                url: "includes/ajax.inc.php",
                method: "POST",
                async: false,
                dataType: "json",
                data: {
                    action: "unlikeCreation",
                    content_id: content_id,
                    user_id: user_id
                }
            }).done(function(data, textStatus, jqXHR) {
                $("#like").toggleClass("liked").find("div").html("Like").parent().find("svg").attr("data-prefix", "far");
                $(".like_count").html(data);
            }).fail(function(data) {
                console.log(data);
                alert("Something went wrong...");
            });
        } else {
            // Send ajax request to save
            $.ajax({
                url: "includes/ajax.inc.php",
                method: "POST",
                async: false,
                dataType: "json",
                data: {
                    action: "likeCreation",
                    content_id: content_id,
                    user_id: user_id
                }
            }).done(function(data, textStatus, jqXHR) {
                $("#like").toggleClass("liked").find("div").html("Liked").parent().find("svg").attr("data-prefix", "fas");
                $(".like_count").html(data);
            }).fail(function(data) {
                alert("Something went wrong...");
            });
        }
    });

    // Report creation
    $("#report").on("click", function(e) {
        var content_id = $(this).attr("data-creationId");
        var user_id = $(this).attr("data-userId");

        if (!$(this).hasClass("reported")) {
            // Send ajax request to report creation
            $.ajax({
                url: "includes/ajax.inc.php",
                method: "POST",
                async: false,
                dataType: "json",
                data: {
                    action: "reportCreation",
                    content_id: content_id,
                    user_id: user_id
                }
            }).done(function(data, textStatus, jqXHR) {
                $("#report").addClass("reported").find("div").html("Gerapporteerd");
                Swal.fire(
                    'Gelukt!',
                    'Deze creatie is gerapporteerd',
                    'success'
                  )
            }).fail(function(data) {
                alert("Something went wrong...");
            });
        }
    });

    // Comment
    $("#comment-form").on("submit", function(e) {
        e.preventDefault();

        let values = $(this).serializeArray();
        let emptyValues = [];

        // Check empty values and add to array
        $.each(values, function(index, el) {
            if (!el.value) {
                emptyValues.push(el.name);
            }
        });

        // If empty values show error
        if (emptyValues.length > 0) {
            $.each(emptyValues, function(index, el) {
                $("#" + el).addClass("error");
            });
        } else {
            // Send ajax request to create a new user
            $.ajax({
                url: "includes/ajax.inc.php",
                method: "POST",
                async: false,
                dataType: "json",
                data: {
                    action: "comment",
                    content_id: values.find(x => x.name === "content_id").value,
                    title: values.find(x => x.name === "title").value,
                    content: values.find(x => x.name === "content").value,
                }
            }).done(function(data, textStatus, jqXHR) {
                if (data === 1) {
                    location.reload();
                } else {
                    console.log(data);
                }
            }).fail(function(data) {
                console.log(data);
            });
        }
    });

    // Like comment
    $(".like-comment").on("click", function() {
        let comment = $(this);
        var comment_id = comment.attr("data-commentId");
        var comment_user = comment.attr("data-commentUser");
        var user_id = comment.attr("data-userId");

        if (comment_user != user_id && user_id != 0) {
            if (comment.hasClass("liked")) {
                // Send ajax request to ulike comment
                $.ajax({
                    url: "includes/ajax.inc.php",
                    method: "POST",
                    async: false,
                    dataType: "json",
                    data: {
                        action: "unlikeComment",
                        comment_id: comment_id,
                        user_id: user_id
                    }
                }).done(function(data, textStatus, jqXHR) {
                    comment.toggleClass("liked").html("<i class='fas fa-heart mr-10'></i>" + data);
                }).fail(function(data) {
                    alert("Something went wrong...");
                });
            } else {
                // Send ajax request to like comment
                $.ajax({
                    url: "includes/ajax.inc.php",
                    method: "POST",
                    async: false,
                    dataType: "json",
                    data: {
                        action: "likeComment",
                        comment_id: comment_id,
                        user_id: user_id
                    }
                }).done(function(data, textStatus, jqXHR) {
                    comment.toggleClass("liked").html("<i class='fas fa-heart mr-10'></i>" + data);
                }).fail(function(data) {
                    alert("Something went wrong...");
                });
            }
        }
    });

    // Copy share link
    $("#share").on("click", function() {
        var success   = true,
            range     = document.createRange(),
            selection;

        // Create a temporary element off screen.
        var tmpElem = $('<div>');
        tmpElem.css({
          position: "absolute",
          left:     "-1000px",
          top:      "-1000px",
        });

        // Add the input value to the temp element.
        tmpElem.text(window.location.href);
        $("body").append(tmpElem);

        // Select temp element.
        range.selectNodeContents(tmpElem.get(0));
        selection = window.getSelection ();
        selection.removeAllRanges ();
        selection.addRange (range);

        // Lets copy.
        try { 
            success = document.execCommand ("copy", false, null);
        }
        catch (e) {
            copyToClipboardFF(window.location.href);
        }
        if (success) {
            // alert ("Deelbare link gekopiëerd!");
            Swal.fire(
                'Gelukt!',
                'Deelbare link gekopiëerd!',
                'success'
              )
            // remove temp element.
            tmpElem.remove();
        }
    });

    // Add new view after 10 seconds
    setTimeout(function() {
        var creation_id = $("#creation-id").html();

        // Send ajax request to add view
        $.ajax({
            url: "includes/ajax.inc.php",
            method: "POST",
            async: false,
            dataType: "json",
            data: {
                action: "viewCreation",
                creation_id: creation_id
            }
        }).done(function(data, textStatus, jqXHR) {
            $(".view_count").html(data);
        }).fail(function(data) {
            console.log("Creation views can't be updated...");
        });
    }, 10000);
    
});