$(document).ready(function() {

    // Remove error class on keydown
    $("#register-form :input").on("keydown", function() {
        if ($(this).attr('name') !== "passwordRepeat") {
            $(this).removeClass("error");
        }
    });

    // Remove error class on terms checkbox
    $("#acceptTerms").on("change", function() {
        if (this.checked) {
            $(this).parent().removeClass("error");
        }
    });

    // Check password and repeated password
    $("#passwordRepeat").on("keyup", function() {
        let password = $("#password").val();
        let passwordRepeat = $("#passwordRepeat").val();

        if (password) {
            if (password !== passwordRepeat) {
                if (!$(this).hasClass("error")) {
                    $(this).addClass("error");
                }
            } else {
                if ($(this).hasClass("error")) {
                    $(this).removeClass("error");
                }
            }
        }
    });

    // Check register form
    $('#register-form').on("submit", function(e) {
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
            let password = values.find(x => x.name === "password").value;
            let passwordRepeat = values.find(x => x.name === "passwordRepeat").value;

            // Check if password is the same as repeated password
            if (password !== passwordRepeat) {
                $("#passwordRepeat").addClass("error");
            } else {
                // Check if terms are accepted
                let acceptTerms = values.find(x => x.name === "acceptTerms");

                if (acceptTerms) {
                    // Check if user wants to receive a newsletter
                    let newsletter = values.find(x => x.name === "newsletter");
                    if (newsletter) {
                        newsletter = 1;
                    } else {
                        newsletter = 0;
                    }

                    // Send ajax request to create a new user
                    $.ajax({
                        url: "includes/ajax.inc.php",
                        method: "POST",
                        async: false,
                        dataType: "json",
                        data: {
                            action: "register",
                            firstname: values.find(x => x.name === "firstname").value,
                            lastname: values.find(x => x.name === "lastname").value,
                            email: values.find(x => x.name === "email").value,
                            phone: values.find(x => x.name === "phone").value,
                            password: values.find(x => x.name === "password").value,
                            newsletter: newsletter
                        }
                    }).done(function(data, textStatus, jqXHR) {
                        if (data === 1) {
                            location.href = "/login/";
                        } else {
                            console.log(data);
                        }
                    }).fail(function(data) {
                        console.log(data);
                    });
                } else {
                    $("#acceptTerms").parent().addClass("error");
                }
            }
        }
    });
    
});