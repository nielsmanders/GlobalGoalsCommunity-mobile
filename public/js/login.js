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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ({

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(25);


/***/ }),

/***/ 25:
/***/ (function(module, exports) {

$(function () {

    // Check label on load
    setTimeout(function () {
        if ($("#email").val() !== "") {
            $("#email").addClass("active");
        }
        if ($("#password").val() !== "") {
            $("#password").addClass("active");
        }
    }, 500);

    $(".input").on("focus", function () {
        $(this).parent().find("input").addClass("active");
    });

    $(".input").on("blur", function () {
        if ($(this).val() === "") {
            $(this).parent().find("input").removeClass("active");
        }
    });

    // Remove error class on keydown
    $("#login-form :input").on("keydown", function () {
        $(this).parent().parent().removeClass("error");

        if (!$("#email").parent().parent().hasClass("show") && !$("#password").parent().parent().hasClass("show")) {
            $(".error-msg").html("Er zijn op dit moment geen errors").removeClass("show");
        }
    });

    // Check register form
    $('#login-form').on("submit", function (e) {
        e.preventDefault();

        var email = $("#email").val();
        var password = $("#password").val();

        var formData = new FormData(this);
        formData.append("action", "login");

        // Check username and password
        if (!email && !password) {
            $(".error-msg").html("Vul aub je inloggegevens in").addClass("show");
            $("#email").parent().parent().addClass("error");
            $("#password").parent().parent().addClass("error");
        } else if (!email) {
            $(".error-msg").html("Vul aub je emailadres in").addClass("show");
            $("#email").parent().parent().addClass("error");
        } else if (!password) {
            $(".error-msg").html("Vul aub je wachtwoord in").addClass("show");
            $("#password").parent().parent().addClass("error");
        }

        // If empty values show error
        if (email && password) {
            // Send ajax request to login
            $.ajax({
                url: "includes/ajax.inc.php",
                method: "POST",
                dataType: "json",
                data: formData,
                processData: false,
                contentType: false
            }).done(function (data, textStatus, jqXHR) {
                if (data.success) {
                    if (data.redirect) {
                        if (data.redirect.page) {
                            location.href = data.redirect.url;
                        } else {
                            location.href = "/" + data.redirect.url + "/";
                        }
                    } else {
                        location.href = "/overview/";
                    }
                } else {
                    $(".error-msg").html("Inloggegevens zijn incorrect").addClass("show");
                }
            }).fail(function (data) {
                $(".error-msg").html("Inloggegevens zijn incorrect").addClass("show");
            });
        }
    });
});

/***/ })

/******/ });