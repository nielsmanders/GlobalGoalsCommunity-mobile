$(document).ready(function() {

    $(".input").on("focus", function() {
        $(this).parent().find("input").addClass("active");
    });

    $(".input").on("blur", function() {
        if ($(this).val() === "") {
            $(this).parent().find("input").removeClass("active");
        }
    });

    // Remove error class on keydown
    $("#login-form :input").on("keydown", function() {
        $(this).parent().parent().removeClass("error");

        if (!$("#email").parent().parent().hasClass("show") && !$("#password").parent().parent().hasClass("show")) {
            $(".error-msg").html("Er zijn op dit moment geen errors").removeClass("show");
        }
    });

    // Check register form
    $('#login-form').on("submit", function(e) {
        e.preventDefault();

        let email = $("#email").val();
        let password = $("#password").val();

        // Check username and password
        if (!email && !password) {
            $(".error-msg").html("Vul aub je inloggegevens in").addClass("show");
            $("#email").parent().parent().addClass("error");
            $("#password").parent().parent().addClass("error");
        } else if (!email) {
            $(".error-msg").html("Vul aub je emailadres in");
            $("#email").parent().parent().addClass("error");
        } else if (!password) {
            $(".error-msg").html("Vul aub je wachtwoord in");
            $("#password").parent().parent().addClass("error");
        }

        // If empty values show error
        if (email && password) {
            // Send ajax request to login
            $.ajax({
                url: "includes/ajax.inc.php",
                method: "POST",
                async: false,
                dataType: "json",
                data: {
                    action: "login",
                    email: email,
                    password: password
                }
            }).done(function(data, textStatus, jqXHR) {
                if (data === 1) {
                    location.href = "/overview/";
                }
            }).fail(function(data) {
                $(".error-msg").html("Inloggegevens zijn incorrect").addClass("show");
            });
        }
    });
    
});