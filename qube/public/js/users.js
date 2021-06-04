/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ({

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ }),

/***/ 12:
/***/ (function(module, exports) {

$(document).ready(function () {

    // Remove errors
    $("#create-user :input, #edit-user :input").on("keydown", function () {
        if ($(this).attr('name') !== "repeatPassword") {
            $(this).removeClass("error");
        }

        if ($(this).closest("form").find("input.error").length === 0) {
            $(".error-msg").fadeOut();
        }
    });

    // Check password and repeated password
    $("#repeatPassword").on("keyup", function () {
        var password = $("#password").val();
        var passwordCheck = $("#repeatPassword").val();

        if (password) {
            if (password !== passwordCheck) {
                if (!$(this).hasClass("error")) {
                    $(this).addClass("error");
                }
            } else {
                if ($(this).hasClass("error")) {
                    $(this).removeClass("error");

                    if ($(this).closest("form").find("input.error").length === 0) {
                        $(".error-msg").fadeOut();
                    }
                }
            }
        }
    });

    // Create a new user
    $("#create-user-btn").on("click", function () {
        var form = $("#create-user");

        var values = form.serializeArray();
        var emptyValues = [];

        var formData = new FormData($(form)[0]);
        formData.append("action", "create-user");

        // Check empty values and add to array
        $.each(values, function (index, el) {
            if ($("#" + el.name).hasClass("required")) {
                if (!el.value) {
                    emptyValues.push(el.name);
                }
            }
        });

        // If empty values show error
        if (emptyValues.length > 0) {
            $(".error-msg").html("Please fill in the required fields").fadeIn(1000);

            $.each(emptyValues, function (index, el) {
                $("#" + el).addClass("error");
            });
        } else {
            var password = $("#password").val();
            var passwordCheck = $("#repeatPassword").val();

            if (password !== passwordCheck) {
                $(".error-msg").html("Passwords don't match").fadeIn(1000);
                $("#repeatPassword").addClass("error");
            } else {
                $.ajax({
                    url: "includes/ajax.inc.php",
                    method: "POST",
                    dataType: "json",
                    data: formData,
                    processData: false,
                    contentType: false
                }).done(function (response) {
                    if (!response["success"]) {
                        $(".error-msg").html(response["message"]).fadeIn(1000);
                    } else {
                        location.href = "users/";
                    }
                }).catch(function (error) {
                    $(".error-msg").html(error.statusText).fadeIn(1000);
                });
            }
        }
    });

    // Change existing user
    $("#edit-user-btn").on("click", function () {
        var form = $("#edit-user");

        var values = form.serializeArray();
        var emptyValues = [];

        var formData = new FormData($(form)[0]);
        formData.append("action", "edit-user");

        // Check empty values and add to array
        $.each(values, function (index, el) {
            if ($("#" + el.name).hasClass("required")) {
                if (!el.value) {
                    emptyValues.push(el.name);
                }
            }
        });

        // If empty values show error
        if (emptyValues.length > 0) {
            $(".error-msg").html("Please fill in the required fields").fadeIn(1000);

            $.each(emptyValues, function (index, el) {
                $("#" + el).addClass("error");
            });
        } else {

            var request = false;

            // If user changes password
            var password = $("#password").val();
            var passwordCheck = $("#repeatPassword").val();

            if (password) {
                if (!passwordCheck) {
                    $(".error-msg").html("Please fill in your new password").fadeIn(1000);
                    $("#repeatPassword").addClass("error");
                } else {
                    if (password !== passwordCheck) {
                        $(".error-msg").html("Passwords don't match").fadeIn(1000);
                        $("#repeatPassword").addClass("error");
                    } else {
                        request = true;
                    }
                }
            } else {
                request = true;
            }

            // Send ajax request if true
            if (request) {
                $.ajax({
                    url: "includes/ajax.inc.php",
                    method: "POST",
                    dataType: "json",
                    data: formData,
                    processData: false,
                    contentType: false
                }).done(function (response) {
                    if (!response["success"]) {
                        $(".error-msg").html(response["message"]).fadeIn(1000);
                    } else {
                        location.href = "users/";
                    }
                }).catch(function (error) {
                    $(".error-msg").html(error.statusText).fadeIn(1000);
                });
            }
        }
    });
});

/***/ })

/******/ });