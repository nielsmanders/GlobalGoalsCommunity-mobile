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
/******/ 	return __webpack_require__(__webpack_require__.s = 131);
/******/ })
/************************************************************************/
/******/ ({

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(132);


/***/ }),

/***/ 132:
/***/ (function(module, exports) {

$(document).ready(function () {

    // Check label on load
    if ($("#email").val() !== "") {
        $("#email").addClass("active");
    }
    if ($("#password").val() !== "") {
        $("#password").addClass("active");
    }

    $(".input").on("focus", function () {
        $(this).parent().find("input").addClass("active");
    });

    $(".input").on("blur", function () {
        if ($(this).val() === "") {
            $(this).parent().find("input").removeClass("active");
        }
    });

    // Remove error class on keydown
    $("#reset-password-form :input").on("keydown", function () {
        $(this).parent().parent().removeClass("error");

        if (!$("#email").parent().parent().hasClass("show") && !$("#password").parent().parent().hasClass("show")) {
            $(".error-msg").html("Er zijn op dit moment geen errors").removeClass("show");
        }
    });

    // Check register form
    $('#reset-password-form').on("submit", function (e) {
        e.preventDefault();

        var values = $(this).serializeArray();
        var emptyValues = [];

        var formData = new FormData(this);
        formData.append("action", "reset-password");

        // Check empty values and add to array
        $.each(values, function (index, el) {
            if (!el.value) {
                emptyValues.push(el.name);
            }
        });

        if (emptyValues.length > 0) {
            $(".error-msg").html("Vul aub alle velden in").addClass("show");;

            $.each(emptyValues, function (index, el) {
                $("#" + el).parent().parent().addClass("error");
            });
        } else {
            var password = $("#password").val();
            var passwordCheck = $("#passwordRepeat").val();

            if (password !== passwordCheck) {
                $(".error-msg").html("Wachtwoorden komen niet overeen").addClass("show");
                $("#passwordRepeat").parent().parent().addClass("error");
            } else {
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
                        location.href = "/login/";
                    } else {
                        $(".error-msg").html("Er is iets misgegaan...").addClass("show");
                    }
                }).fail(function (data) {
                    $(".error-msg").html("Er is iets misgegaan...").addClass("show");
                });
            }
        }
    });
});

/***/ })

/******/ });