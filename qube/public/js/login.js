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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports) {

$(document).ready(function () {

    // Check login form
    $("#login-form").on("submit", function (e) {
        e.preventDefault();

        var username = $("#username").val();
        var password = $("#password").val();

        if (!username && !password) {
            $(".error-msg").html("Please fill in your login credentials").fadeIn(1000);
            $("#username").addClass("error");
            $("#password").addClass("error");
        } else if (!username) {
            $(".error-msg").html("Please fill in your username").fadeIn(1000);
            $("#username").addClass("error");
        } else if (!password) {
            $(".error-msg").html("Please fill in your password").fadeIn(1000);
            $("#password").addClass("error");
        }

        var formData = new FormData(this);
        formData.append("action", "login");

        if (username && password) {
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
                    location.href = "/qube/";
                }
            }).catch(function (error) {
                $(".error-msg").html(error.statusText).fadeIn(1000);
            });
        }
    });

    // Remove errors create form
    $("#create-form :input").on("keydown", function () {
        if ($(this).attr('name') !== "repeatPassword") {
            $(this).removeClass("error");
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
                }
            }
        }
    });

    // Check create form
    $("#create-form").on("submit", function (e) {
        e.preventDefault();

        var values = $(this).serializeArray();
        var emptyValues = [];

        var formData = new FormData(this);
        formData.append("action", "install-qube");

        // Check empty values and add to array
        $.each(values, function (index, el) {
            if (!el.value) {
                emptyValues.push(el.name);
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
                    url: "includes/install.qube.php",
                    method: "POST",
                    dataType: "json",
                    data: formData,
                    processData: false,
                    contentType: false
                }).done(function (response) {
                    if (!response["success"]) {
                        $(".error-msg").html(response["message"]).fadeIn(1000);
                    } else {
                        location.reload();
                    }
                }).catch(function (error) {
                    $(".error-msg").html(error.statusText).fadeIn(1000);
                });
            }
        }
    });
});

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ })

/******/ });